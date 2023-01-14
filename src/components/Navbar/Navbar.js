import React from 'react';
import './Navbar.css';
import IMG from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../App';

const Navbar = () => {
    const [,,loggedInUser, setLoggedInUser] = useContext(ShopContext);
    return (
        <nav className='navbar navbar-expand-md navbar-light bg-light'>
            <div className='container'>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/"><img src={IMG} alt="" width="50px" height="50px" />
                    <span style={{ fontSize: "24px" }}>eShop</span>
                </Link>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'><Link className='nav-link active' to='/'>Home</Link></li>                        
                        <li className='nav-item'><Link className='nav-link' to='/history'>History</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/admin'>Admin</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/deals'>Deals</Link></li>
                        <li className='nav-item'>
                        {
                            loggedInUser.email ?
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-bs-toggle='dropdown' aria-haspopup="true" aria-expanded="false">
                                            {loggedInUser.email}
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link className="dropdown-item" to="/" onClick={() => setLoggedInUser({})}>Logout</Link>
                                        </div>
                                    </li>
                                </ul>
                                :
                                <Link className="nav-item nav-link btn btn-info shadow text-white" to="/login">Login</Link>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;