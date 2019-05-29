import React, { Component, Dispatch } from 'react'
import { userState } from '../reducers/userReducer';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { loginRequest } from '../Actions/userActions';

interface Props{
    login: Function,
    userState: userState,
    // loogedIn: boolean,
    // user: User
}

class Login extends Component<Props> {

    render() {
        return (
            <div className="container login">
                <div className="z-depth-1 grey lighten-4 row">
                    <form className="col s12" method="post">
                        <div className='row'>
                            <div className='col s12'>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='text' name='username' id='username' />
                                <label>Username</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='password' name='password' id='password' />
                                <label >Password</label>
                            </div>
                        </div>
                        <br />
                            <div className='row'>
                                <button  onClick={(event )=> { event.preventDefault(); 
                                    this.props.login({
                                    username: (document.getElementById("username") as HTMLInputElement).value,
                                    password:(document.getElementById("password") as HTMLInputElement).value,
                                })}} name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: userState){
    return{
        userState: state,
    }
}

function dispatchToProps(dispatch: Dispatch<Action>){
    return{
        login: (user: User) => dispatch(loginRequest(user))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Login);
