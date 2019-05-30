import React, { Component, Dispatch } from 'react'
import { userState } from '../reducers/userReducer';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { loginRequest } from '../Actions/userActions';

interface Props {
    login: Function,
    userState: any,
    // loogedIn: boolean,
    loginDenied: boolean;
    // user: User
    history: any
}

class Login extends Component<Props> {
    

    handleSubmit() {
        this.props.login({
            username: (document.getElementById("username") as HTMLInputElement).value,
            password: (document.getElementById("password") as HTMLInputElement).value,
        })
        setTimeout(() => {
            if (this.props.userState.user.logedIn == true) {
                this.props.history.push("/");
            }
        }, 500);


    }

    render() {

        return (
            <div className="container addPadding">
                <div className="z-depth-1 grey lighten-4 row">
                    <form className="col s12" method="post"> 
                        <div className='row'>
                            <div className='col s12 red-text'>
                                {
                                    this.props.userState.user.loginDenied ?
                                    "Invalid username or password" : ""
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className={this.props.userState.user.loginDenied ? "error" : ""} type='text' name='username' id='username' />
                                <label>Username</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className={this.props.userState.user.loginDenied ? "error" : ""} type='password' name='password' id='password' />
                                <label>Password</label>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.handleSubmit()
                            }} name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state: userState) {
    return {
        userState: state,
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        login: (user: User) => dispatch(loginRequest(user))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Login);
