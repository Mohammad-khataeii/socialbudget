import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Social Budget</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <button className="nav-link btn" onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
