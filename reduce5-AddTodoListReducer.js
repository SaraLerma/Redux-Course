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
}
testAddTodo();
console.log('All tests are passed');