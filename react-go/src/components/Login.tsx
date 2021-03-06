import React, { Component, Dispatch } from 'react'
import { userState } from '../reducers/userReducer';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { loginRequest } from '../Actions/userActions';
import { Link } from 'react-router-dom';

interface Props {
    login: Function,
    userState: any,
    // loogedIn: boolean,
    loginDenied: boolean;
    failedRequest: false;
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
                            <div className='col s12'>
                                <h5 className="red-text">
                                    {
                                        this.props.userState.user.loginDenied ?
                                            "Invalid username or password" : ""
                                    }
                                    {
                                        this.props.failedRequest ?   
                                             "Could not connect to server"
                                             : ""
                                    }
                                </h5>
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
                        <div className="row center">
                            <div>Don't have an account? </div>
                            <Link to="/register" className="btn indigo">Register</Link>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userState: state,
        failedRequest: state.user.failedRequest
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        login: (user: User) => dispatch(loginRequest(user))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Login);
