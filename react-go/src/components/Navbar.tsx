import React, { Component, Dispatch } from 'react'
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userState } from '../reducers/userReducer';
import { Action } from 'redux';
import { logout } from '../Actions/userActions';

interface Props {
    logedIn: boolean
    logout: Function
    moderator: boolean
    username: boolean
}

class Navbar extends Component<Props> {

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.sidenav');
            const instances = M.Sidenav.init(elems, {
                inDuration: 350,
                outDuration: 350,
                edge: 'left'
            });
        });
    }

    render() {
        return (
            <div>
                <nav className="nav-wrapper indigo ">
                    <div className="container">
                        <Link to="/" className="brand-logo">React GO</Link>
                        <div data-target="mobile-demo" className="sidenav-trigger hide-on-large-only">
                            <i className="material-icons">menu</i>
                        </div>
                        <ul className="right hide-on-med-and-down">
                            {this.props.logedIn ?
                                <li>
                                    {
                                        this.props.moderator ?
                                            <li>
                                                <li><Link to="/addpost" className="waves-effect waves-light btn indigo lighten-1"> <i className="material-icons left">add</i> Add new post</Link></li>
                                            </li> :
                                            null
                                    }
                                    <li>
                                        <li><Link to="/profilepage" className="waves-effect waves-light btn indigo lighten-1"> <i className="material-icons left">account_circle</i> {this.props.username}</Link></li>
                                    </li>
                                    <li>

                                        <Link to="/" onClick={() => this.props.logout()} className="waves-effect waves-light btn indigo lighten-1"><i className="material-icons left">label_outline</i>Logout</Link>
                                    </li>
                                </li>
                                :
                                <li>
                                    <Link to="/login" className="waves-effect waves-light btn indigo lighten-1"><i className="material-icons left">account_circle</i>Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    {this.props.logedIn ?
                        <li>
                            {
                                this.props.moderator ?
                                    <li>
                                        <li><Link to="/addpost" className="waves-effect waves-light  indigo sidenav-close"> <i className="material-icons left">add</i> Add new post</Link></li>
                                    </li> :
                                    null
                            }
                            <li>
                                <li><Link to="/profilepage" className="waves-effect waves-light  indigo sidenav-close"> <i className="material-icons left">account_circle</i> {this.props.username}</Link></li>
                            </li>
                            <li>

                                <Link to="/" onClick={() => this.props.logout()} className="waves-effect waves-light  indigo sidenav-close"><i className="material-icons left">label_outline</i>Logout</Link>
                            </li>
                        </li>
                        :
                        <li>
                            <Link to="/login" className="waves-effect waves-light indigo lighten-1 sidenav-close"><i className="material-icons left">account_circle</i>Login</Link>
                        </li>
                    }
                </ul>

            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        logedIn: state.user.logedIn,
        moderator: state.user.moderator,
        username: state.user.username
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, dispatchToProps)(Navbar);
