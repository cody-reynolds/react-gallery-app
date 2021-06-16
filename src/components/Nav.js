import React from 'react';
import {Route, NavLink, Redirect} from 'react-router-dom';
import PhotoContainer from './PhotoContainer';

const Nav = ({match}) => {
    return(
        <nav class="main-nav">
        <ul>
          <li><NavLink to={`${match.url}/sunsets`}>Sunsets</NavLink></li>
          <li><NavLink to={`${match.url}/waterfalls`}>Waterfalls</NavLink></li>
          <li><NavLink to={`${match.url}/beaches`}>Beaches</NavLink></li>
        </ul>

        <Route exact path={match.path} render={ () => <Redirect to={`${match.path}/sunsets`} />} />
        <Route path={`${match.path}/sunsets`} render={() => <PhotoContainer data={'sunsets'} />}/>
        <Route path={`${match.path}/waterfalls`} render={() => <PhotoContainer data={'waterfalls'} />}/>
        <Route path={`${match.path}/beaches`} render={() => <PhotoContainer data={'beaches'} />}/>

      </nav>
    )
}

export default Nav;