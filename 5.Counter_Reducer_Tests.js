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

/*TESTS */
expect(
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
console.log("Tests passed!!");
