import React, { Component } from 'react'
import M from 'materialize-css';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

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
                <nav className="nav-wrapper indigo">
                    <div className="container">
                        <Link to="/" className="brand-logo">React GO</Link>
                        <div data-target="mobile-demo" className="sidenav-trigger hide-on-large-only">
                            <i className="material-icons">menu</i>
                        </div>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/Prvi link">Prvi link</Link></li>
                            <li><Link to="/Drugi link">Drugi link</Link></li>
                            <li><Link to="/Treci link">Treci link</Link></li>
                            <li>
                                <a className="waves-effect waves-light btn indigo lighten-1"><i className="material-icons left">account_circle</i>Login</a>
                            </li>
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
