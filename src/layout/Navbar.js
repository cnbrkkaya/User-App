import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Switch, Link } from 'react-router-dom';

const Navbar = props => {
   const { title } = props;
   return (
      <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 pb-3">
         <a href="/" className="navbar-brand">
            {title}
         </a>
         <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
               <Link to="/" className="nav-link">
                  USERS
               </Link>
            </li>
            <li className="nav-item active">
               <Link to="/add" className="nav-link">
                  ADD USER
               </Link>
            </li>
         </ul>
      </nav>
   );
};

Navbar.propTypes = {
   title: PropTypes.string.isRequired
};
Navbar.defaultProps = {
   title: 'default'
};

export default Navbar;
