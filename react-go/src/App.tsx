import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer);


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
