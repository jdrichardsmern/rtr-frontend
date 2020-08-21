import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
// import Signup from './components/Signup'
// import Login from './components/Login'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
// import axios from 'axios'
// import {ProtectedRoute} from './components/protected.route'
import SingleStock from './components/SingleStock';
// import history from './middleware/history'
import Portfolio from './components/Portfolio';
import axios from 'axios';
import CreateStock from './components/CreateStock';

export default class App extends Component {
  state = {
    login: false,
    user: {
      email: '',
      name: '',
      capital: 0
    },
    searchTerm: '',
    portfolio: [],
    stocks: [],
    errors: ''
  };

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  updateStock = (data) => {
    let stocks = data;
    this.setState({
      stocks
    });
  };

  updateCaptial = async (pw) => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    };
    let response = await axios.post(
      'https://jdrichardstech-test-dave.herokuapp.com/users/user',
      { email: this.state.user.email, password: pw },
      axiosConfig
    );
    const capital = response.data.user.capital;
    let updatedUser = { ...this.state.user };
    updatedUser.capital = capital;
    localStorage.setItem('user', JSON.stringify(response.data.user));
    this.setState({
      user: updatedUser
    });
  };

  updateUser = async (data) => {
    const { email, name, capital } = data.user;
    let updatedUser = { ...this.state.user };
    updatedUser.email = email;
    updatedUser.name = name;
    updatedUser.capital = capital;
    localStorage.setItem('user', JSON.stringify(data.user));
    this.setState({
      login: true,
      user: updatedUser
    });
  };
  logout = (cb) => {
    cb();
    this.setState({
      user: { name: '', email: '', capital: 0 },
      portfolio: [],
      login: false
    });
  };
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      const { email, name, capital } = data;
      let updatedUser = { ...this.state.user };
      updatedUser.email = email;
      updatedUser.name = name;
      updatedUser.capital = capital;
      this.setState({
        login: true,
        user: updatedUser
      });
    }
  }

  // componentDidUpdate(){

  //     setInterval(() => {
  //         axios.get('/stock/all').then((response) => {
  //          this.updateStock(response.data)
  //         })
  //     },7000)

  //     // if (this.state.login){
  //     //     axios.get('/stock/all').then((response) => {
  //     //         // if(response.data.stocks !== this.state.stocks){
  //     //         //     this.updateStock(response.data)
  //     //         // }
  //     //         // console.log(response.data.stocks)
  //     //         console.log(response.data.stocks[1] === this.state.stocks[1])
  //     //     })
  //     // }
  // }

  render() {
    const { user, searchTerm, stocks } = this.state;
    return (
      <Router>
        {this.state.login ? (
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Dashboard
                  searchTerm={searchTerm}
                  handleSearch={this.handleSearch}
                  user={user}
                  logout={this.logout}
                  updateStock={this.updateStock}
                  stocks={stocks}
                />
              )}
            />
            <Route
              exact
              path='/profile'
              render={(props) => (
                <Profile
                  user={user}
                  logout={this.logout}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path='/portfolio'
              render={(props) => <Portfolio user={user} logout={this.logout} />}
            />
            <Route
              exact
              path='/createstock'
              render={(props) => (
                <CreateStock
                  user={user}
                  logout={this.logout}
                  updateStock={this.updateStock}
                />
              )}
            />
            <Route
              excact
              path='/stock/:id'
              render={(props) => {
                return (
                  <SingleStock
                    {...props}
                    logout={this.logout}
                    user={user}
                    updateCaptial={this.updateCaptial}
                  />
                );
              }}
            />
            {/* <ProtectedRoute 
                    exact
                    path= "/profile"
                    component = {Profile}
                    /> */}
            <Route path='*' component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            {/* <Route exact path= "/"  render = {props => <Live />}/> */}
            <Route
              exact
              path='/'
              render={(props) => <Home updateUser={this.updateUser} />}
            />

            <Route path='*' component={NotFound} />
          </Switch>
        )}
      </Router>
    );
  }
}
