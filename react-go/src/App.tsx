import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';
import Login from './components/Login';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { checkLoginStatus } from './Actions/userActions';
import Home from './components/Home';
import { getPosts } from './Actions/postActions';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
store.dispatch(checkLoginStatus());
store.dispatch(getPosts());

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
