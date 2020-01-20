const toggleTodo = (todo) => {
    /* modifica
    todo.completed = !todo.completed;
    return todo;*/
    /* para no poner todo
    return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
    };*/
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
    /* El argumento de la izquierda es aquel cuyas propiedades se asignarán, por lo que se mutará.
    Es por eso que estamos pasando un objeto vacío {} como primer argumento, para no mutar ningún dato existente. 
    Cada argumento adicional para la asignación de objetos se considerará uno de los objetos fuente cuyas propiedades
    se copiarán al objeto de destino.
    Es importante que si varias fuentes especifican valores diferentes para la misma propiedad, la última gana. 
    Esto es lo que usamos para anular el campo completado a pesar de lo que dice el objeto de tareas original.*/ 
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };

    deepFreeze(todoBefore);
    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
}