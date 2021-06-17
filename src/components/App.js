//Imports all the necessary React libraries.
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//Imports the various application components
import Search from './Search';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: 'dogs'
    }
  this.updateSearchTerm = this.updateSearchTerm.bind('this');
  }

  updateSearchTerm = (query) => {
    console.log(query);
    this.setState({
      searchTerm: query
    })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search handleSearch={this.updateSearchTerm}/>
          <Nav />
          <Switch>
            <Route path='/dogs' render={() => <PhotoContainer searchTerm={'dogs'} />}></Route>
            <Route path='/cats' render={() => <PhotoContainer searchTerm={'cats'} />}></Route>
            <Route path='/birds' render={() => <PhotoContainer searchTerm={'birds'} />}></Route>
          </Switch>
          <PhotoContainer searchTerm={this.state.searchTerm}/>
        </div>
      </Router>
    );
  }
}
export default App;