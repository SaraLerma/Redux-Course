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
const store  = createStore(counter);//reducer counter

const render = () => {
    document.body.innerText = store.getState();
};
store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});//cada vez q se hace click, se incrementa
});

