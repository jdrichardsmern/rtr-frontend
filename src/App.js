import React from 'react'
import { Component } from 'react';
import {BrowserRouter as Router, Route , Switch , Link , useHistory , Redirect} from 'react-router-dom'
import Profile from './components/Profile'
// import Signup from './components/Signup'
// import Login from './components/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'
// import axios from 'axios'
// import {ProtectedRoute} from './components/protected.route'
import SingleStock from './components/SingleStock';
import history from './middleware/history'



export default class App extends Component{
    state = {
        login: false,
        user:{
            email:'',
            name:'',
            capital:0,
        },
        portfolio:[],
        stocks: [],
        errors:"",
    }
    updateStock = (data) => {
        let stocks = data
        this.setState({
            stocks
        }, () => {console.log(this.state.stocks)})
    }

    // routeChange=(path)=> {
    //     let history = useHistory();
    //     history.push(path);
    //   }

    updateUser = (data) => {
        const {email , name , capital} = data.user
        let updatedUser = {...this.state.user}
        updatedUser.email = email
        updatedUser.name = name
        updatedUser.capital = capital

        this.setState({
            login: true,
            user: updatedUser
        })
    }
    logout = (cb) => {
        cb()
        this.setState({
            user : {name: "" , email: "" , capital: 0,},
            portfolio: [],
            login:false
        })
        
    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('user'))
        if (data){
            const {email , name , capital} = data
            let updatedUser = {...this.state.user}
            updatedUser.email = email
            updatedUser.name = name
            updatedUser.capital = capital
            this.setState({
                login: true,
                user: updatedUser
            })
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

    render (){
        
        return (
           
            
            <Router history={history}>
                {this.state.login ? 
                    (
                <Switch>
                    <Route exact path= "/" render = {props => <Dashboard  user = {this.state.user.email} logout = {this.logout} updateStock = {this.updateStock} stocks={this.state.stocks} routeChange = {this.routeChange}  />}/>
                    <Route excact path = "/profile" component = {Profile}/>
                    <Route excact path='/stock/:id' render={(props) => {
                    return ( <SingleStock {...props }  logout = {this.logout} user = {this.state.user} /> )
                }} />
                    {/* <ProtectedRoute 
                    exact
                    path= "/profile"
                    component = {Profile}
                    /> */}
                    <Route path="*" component={NotFound}/>
                </Switch>
                )
                :
                 (
                <Switch>
                    <Route exact path= "/"  render = {props => <Home  updateUser = {this.updateUser}/>}/>
                    
                    <Route path="*" component={NotFound}/>
                </Switch>
                 )}
          
            </Router>
           
        )
    }
}