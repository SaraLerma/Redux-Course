/*jshint esversion: 6 */
/*import { createStore } from 'redux'*/

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
    };
};

const visibilityFilter = ( state = 'SHOW ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default: 
      return state;
  }
}

const { combineReducers } = Redux;
const todoApp = combineReducers({
    todos, 
    visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref = { node => {
            this.input=node;
        }} />
        <button onClick = { () => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = '';//para que se borre el campo
         }}>
           Add Todo
        </button>
        <ul>
             {this.props.todos.map(todo =>
                <li key={todo.id}
                    onClick={() => {
                      store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: todo.id
                      })
                    }}
                    style={{
                      textDecoration:
                        todo.completed ?
                        'line-through' :
                        'none'
                    }}>
                    {todo.text}
                </li>
             )}
        </ul>        
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render( //va a actualizar dom en respuesta al estado actual de la aplicación
    //I need to the ToDo as a prop, I'm going to pass it to the ToDo app by reading the currents chores straight and written its ToDo field
     <TodoApp 
        todos={store.getState().todos} 
     />,
      document.getElementById('root') //También estoy agregando un div con la raíz ID, que es donde voy a representar mi aplicación de reacción
  );
};

store.subscribe(render);//suscribirme a estos cambios de tarea y llamar a render cada vez que haya cambios en el store y quiera renderizar el estado inicial.
render();