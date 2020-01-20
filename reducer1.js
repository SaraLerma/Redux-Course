const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
}

//1
const {createStore} = Redux; //ES6
//var createStore = Redux.createStore();
//import { createStore } from 'redux'; //NPM  o babel

/* 4. const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);//No hemos proporcionado una forma de cancelar la suscripción de un listener. En lugar de agregar un método de cancelación de suscripción dedicado, solo devolveremos una función del método de suscripción que elimina a este listener del array de listeners.
        }
    };
    
    return { getState, dispatch, subscribe};
};*/
const store  = createStore(counter);//reducer counter

console.log(store.getState());//obenemos 0 xq es el estado inicial del estado

store.dispatch({ type: 'INCREMENT'});
console.log(store.getState());//1

const render = () => {
    document.body.innerText = store.getState();
};
store.subscribe(render);
render();

/*2. store.subscribe(() => {
    document.body.innerText = store.getState();
    //el estado inicial, el cero, no se procesó. Esto se debe a que estoy renderizando dentro de la devolución de llamada de suscripción, pero en realidad no se dispara la primera vez.
    // Entonces extraigo esta lógica en el método de renderizado. Suscribo el método de renderizado a esta tarea. También lo llamo una vez para representar el estado inicial. Ahora representa el cero y el clic incrementa el contador. 
});*/
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});//cada ved q se hace click, se incrementa
});

/*1. TESTS */
/*expect(
    counter(0, {type:'INCREMENT'})
).toEqual(1);
expect(
    counter(1, {type:'INCREMENT'})
).toEqual(2);
expect(
    counter(2, {type:'DECREMENT'})
).toEqual(1);
expect(
    counter(1, {type:'DECREMENT'})
).toEqual(0);
expect(
    counter(1, {type:'SOMETHING_ELSE'})
).toEqual(1);
expect(
    counter(undefined, {})//estado es undefined retorne 0
).toEqual(0);
console.log("Tests passed!!");*/
