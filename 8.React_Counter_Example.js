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

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}> + </button>
    <button onClick={onDecrement}> - </button>
  </div>
);

const {createStore} = Redux; //ES6
const store  = createStore(counter);//reducer counter

const render = () => {
    ReactDOM.render(
        <Counter 
            value={store.getState()} //el valor del contador se tiene q coger del estado actual del store
            onIncrement={() => //Cuando el usuario presiona "incrementar" o "disminuir", enviamos la acción correspondiente al store
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('root') //para renderizar
    );
};

store.subscribe(render);//nos suscribimos al store, por lo q render se ejecuta cada vez q cambia el estado, por l q el contador obtiene el estado actual
render();