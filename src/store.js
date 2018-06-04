import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : fn => fn
);

export default function(initialState) {
  return createStore(
    reducers,
    initialState,
    enhancer,
  );
}