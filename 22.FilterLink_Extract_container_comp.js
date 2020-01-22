/*jshint esversion: 6 */

const todo = (state = [], action) => {
  switch(action.type) {
      case 'ADD_TODO':
          return {
              id: action.id,
              text: action.text,
              completed: false
          };
      case 'TOGGLE_TODO':
          if(state.id !== action.id) {
              return state;
          }
          return {
              ...state,
              completed: !state.completed
          };
      default:
          return state;
  }
};
const todos = (state = [], action) => {
  switch(action.type) {
      case 'ADD_TODO':
          return[
              ...state,
              todo(undefined, action)
          ]
      case 'TOGGLE_TODO':
          return state.map(t => todo(t, action));
      default:
          return state;
  }
};

const visibilityFilter = ( state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default: 
      return state;
  }
};

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);

  }
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos, 
  visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

/*Link presentational component */
const Link = ({active, children, onClick}) => {
  //current Filter hasnt decoration (dont has link apperance)
  if (active){
    return <span>{children}</span>
  }
  return(
    <a  href='#'
        onClick = { e => {
          e.preventDefault();
          onClick();
        }}
    >
      {children}
    </a>
  );
};

/* FilterLink container component that is subscribed to the Redux chore and 
that provides the data and the behavior for the Link component it renders. */
class FilterLink extends Component{
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return(
      <Link
        active = {
          props.filter === state.visibilityFilter
        }
        onClick = {() =>
            store.dispatch({
              type:'SET_VISIBILITY_FILTER',
              filter:props.filter
            })
        }
      >
          {props.children}
      </Link>
    );
  }
}

/*
PRESENTATIONAL COMPONENTS
The components, such as at to-do, the to-do list, the to-do itself, the footer, and the filter link, they don't dispatch actions. 
They call their callbacks in the props. They are only responsible for the looks but not for the behavior. */
const Todo = ({ onClick, completed, text}) => (
  <li 
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
        'line-through' :
        'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo => 
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
      )}
  </ul>
);

const AddTodo = ({onAddClick}) => {
  let input;
  return(
    <div>
      <input ref = { node => {
        input=node;
      }} />
      <button onClick = { () => {
          onAddClick(input.value);
          input.value = '';//para que se borre el campo
      }}>
        Add Todo
      </button>
    </div>
  )
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>  
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    > 
    Active
    </FilterLink>  
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >  
    Completed
    </FilterLink> 
  </p>
);



let nextTodoId = 0;
/*
MAIN CONTAINER COMPONENT
The to-do app specifies the behaviors, which is what happens when add button, how the to-dos are selected, 
what happens when a single to-do is being clicked, and what happens when a footer link is clicked. */
const TodoApp = ({todos, visibilityFilter}) => (
  <div>
    <AddTodo
      onAddClick = { text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
      />
    <TodoList
      todos= {getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={id => 
        store.dispatch({
          type:'TOGGLE_TODO',
          id
        })
      }
    />
    <Footer />
  </div>
);

const render = () => {
  ReactDOM.render( //va a actualizar dom en respuesta al estado actual de la aplicación
    //I need to the ToDo as a prop, I'm going to pass it to the ToDo app by reading the currents chores straight and written its ToDo field
    <TodoApp 
        {...store.getState()} 
    />,
      document.getElementById('root') //También estoy agregando un div con la raíz ID, que es donde voy a representar mi aplicación de reacción
  );
};

store.subscribe(render);//suscribirme a estos cambios de tarea y llamar a render cada vez que haya cambios en el store y quiera renderizar el estado inicial.
render();