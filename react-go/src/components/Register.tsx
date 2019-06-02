import React, { Component } from 'react'
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { User } from '../models/user';
import { register } from '../Actions/userActions';

interface Props {
    failedRequest: boolean;
    register: Function;
    history: any,
    usernameTaken: boolean
}

class Register extends Component<Props> {

    handelSubmit() {
        const newUser: User = {
            moderator: (document.getElementById("registerAsMod") as HTMLInputElement).checked,
            favoritePosts: [],
            username: (document.getElementById("username") as HTMLInputElement).value,
            password: (document.getElementById("password") as HTMLInputElement).value,
        }

        this.props.register(newUser);

        setTimeout(() => {
            if (this.props.usernameTaken == false) {
                this.props.history.push("/");
            }

        }, 700);

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
                                        this.props.usernameTaken ?
                                            "Username is already taken please try another one" : ""
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
                                <input type='text' name='username' id='username' />
                                <label>Username</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input type='password' name='password' id='password' />
                                <label>Password</label>
                            </div>
                        </div>
                        <label className="marginBottom">
                            <input type="checkbox" className="filled-in" id="registerAsMod"></input>
                            <span> Moderator? </span>
                        </label>
                        <br />
                        <div className='row'>
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.handelSubmit();
                            }} name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Register</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state: any) {
    return {
        failedRequest: state.user.failedRequest,
        usernameTaken: state.user.usernameTaken
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        register: (user: User) => dispatch(register(user)),
    }
}

export default connect(mapStateToProps, dispatchToProps)(Register);

