const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
}

const {createStore} = Redux; //ES6
//var createStore = Redux.createStore();
//import { createStore } from 'redux'; //NPM  o babel

const createStore = (reducer) => {
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
        };
    };
    dispatch({});// dummy dispatch
    return { getState, dispatch, subscribe};
};
const store  = createStore(counter);

const render = () => {
    document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});//cada ved q se hace click, se incrementa
});


