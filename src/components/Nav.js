import React from 'react';
import {Route, NavLink, Redirect} from 'react-router-dom';
import PhotoContainer from './PhotoContainer';

const Nav = (props) => {
    return(
        <nav class="main-nav">
        <ul>
          <li><NavLink to='/dogs'>Dogs</NavLink></li>
          <li><NavLink to='/cats'>Cats</NavLink></li>
          <li><NavLink to='/birds'>Birds</NavLink></li>
        </ul>
      </nav>
    )
}

export default Nav; 