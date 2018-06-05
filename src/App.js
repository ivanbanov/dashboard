import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Filters from './components/Filters';
import Devices from './components/Devices';

class App extends React.Component {
  componentDidMount() {
    return true;
  }

  render() {
    return (
      <Provider store={store()}>
        <div id="app">
          <Filters />
          <Devices />
        </div>
      </Provider>
    )
  }
}

export default App;