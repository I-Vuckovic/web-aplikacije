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
import { composeWithDevTools } from 'redux-devtools-extension';
import { request } from './Actions/gloablActions';
import PostPage from './components/PostPage';
import AddPost from './components/AddPost';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

store.dispatch(request());
// setTimeout(() => {
//   store.dispatch(checkLoginStatus());
//   store.dispatch(getPosts());
// }, 500);
console.log(new Date());
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/post/:postId" component={PostPage}></Route>
            <Route path="/addpost" component={AddPost}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
