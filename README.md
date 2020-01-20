I use the JSbin tool to do the course, as Dan Abramov does.

The first three videos are the Redux principles:

1. Single source of truth

  -> The state of your whole application is stored in an object tree within a single store.

2. State is read-only

  -> The only way to change the state is to emit an action, an object describing what happened.

3. Changes are made with pure functions

  -> To specify how the state tree is transformed by actions, you write pure reducers.
