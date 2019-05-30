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
                            <li><Link to="/Prvi link">Prvi link</Link></li>
                            <li><Link to="/Drugi link">Drugi link</Link></li>
                            {this.props.logedIn ?
                                <li>
                                    <li>
                                        <li><Link to="/Treci link" className="waves-effect waves-light btn indigo"> <i className="material-icons left">account_circle</i> Profile</Link></li>
                                    </li>
                                    <li>

                                        <div onClick={() => this.props.logout()} className="waves-effect waves-light btn indigo lighten-1">Logout</div>
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
                    <li><Link to="/Prvi link">Prvi link</Link></li>
                    <li><Link to="/Drugi link">Drugi link</Link></li>
                    <li><Link to="/Treci link">Treci link</Link></li>
                </ul>

            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        logedIn: state.user.logedIn
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, dispatchToProps)(Navbar);
