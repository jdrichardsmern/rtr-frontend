import React from 'react'
import { Component } from 'react';
import Login from './Login'
import axios from 'axios'
import Authentication from "../middleware/auth"


export default class Home extends Component{
    state = {
        user:{
            email:'',
            password:'',
        },
        errors:"",
        signup: false
    }



    handleChange = (event) => {
        let user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({
            user
        })
    }




    handleLogin = () => { 


        if (this.state.signup){
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            axios.post('/users/signup', this.state.user, axiosConfig)
            .then((response) => {
                // this.props.history.push('/profile')
                if (response.data.errors){
                    this.setState({
                        errors : response.data.errors
                    })
                }
            })
            .catch((err) => {
                throw(err)
                // this.setState({
                //     errors : err
                // })
            })

        }else {



            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            axios.post('/users/login', this.state.user, axiosConfig)
            .then((response) => {
                console.log(response)
                Authentication.login(()=> {
                    // this.props.history.push('/profile')
                    this.props.updateUser(response.data)

                } , response.data.user , response.data.token)

                
                // const isAuthenticated = response.data.isAuthenticated
              
    
                if (response.data.errors){
                    this.setState({
                        errors : response.data.errors
                    })
                }
            })
            .catch((err) => {
                throw(err)
                // this.setState({
                //     errors : err
                // })
            })

        }

    }


    handleToggle = () => {
        this.setState({
            signup : !this.state.signup
        })
    }

    render (){
        return (
            <div>
                {this.state.signup ? 
                <Login Login = {this.handleLogin} errors = {this.state.errors} password={this.state.password} email = {this.state.email} handleChange = {this.handleChange} toggle = {this.handleToggle} message = {"Have an account? Log In"} signup = {this.state.signup}>
                    SignUp
                </Login>
                
                :
                (
                <Login Login = {this.handleLogin} errors = {this.state.errors} password={this.state.password} email = {this.state.email} handleChange = {this.handleChange} toggle = {this.handleToggle} message = {"Don't have an account? Sign Up"} signup = {this.state.signup}>
                Login
                </Login>
                )
                }

            </div>
        )
    }
}