const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return[
                ...state,
                /*new todo */
                {
                    id:action.id,
                    text:action.text,
                    completed:false
                }
            ]

        case 'TOGGLE_TODO':
            return state.map(todo => {
                if(todo.id !== action.id) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed
                };
            });
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


