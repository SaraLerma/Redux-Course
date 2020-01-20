//el código para actualizar el elemento de tarea pendiente o para crear uno nuevo se coloca dentro del reductor de tareas pendientes.
//Cada funcion solo aborde una funcionalidad
//el state aqui se refiere al de 1 tarea
const todo = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id:action.id,
                text:action.text,
                completed:false
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
    };
};
//el state aqui se refiere a la lista de tareas
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return[
                ...state,
                /*new todo */
                todo(undefined, action)
            ]

        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    };
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD-TODO',
        id: 0,
        text: 'Learn Redux'
    };

    const stateAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        toggleTodo(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests are passed');

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];

    const action = {
        type: 'TOGGLE_TODO',
        id:1
    };

    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        toggleTodo(stateBefore, action)
    ).toEqual(stateAfter);
};
testToggleTodo();
console.log('All tests are passed');


