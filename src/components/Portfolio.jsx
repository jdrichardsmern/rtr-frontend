import React from 'react'
import { Component } from 'react';
import TopNav from './TopNav'
import axios from 'axios'
import { Card } from 'semantic-ui-react'
import {Link } from 'react-router-dom'

export default class Profile extends Component{
                state= {
                    stocks: []
            }
 

componentDidMount(){
    const getPortfolio = async() => {
        try{
            const token = await JSON.parse(localStorage.getItem('token'))
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'auth-token': token,
                  'Access-Control-Allow-Origin': '*'
                }
              }
              let portfolio = await axios.get(`/portfolio/${this.props.user.email}` ,axiosConfig)
              
              let stocks = portfolio.data.portfolio.stocks
              this.setState({
                  stocks
              })
              console.log(this.state.stocks)
          }
          catch(err){
            
          }
    }
    getPortfolio()
}




    render (){
        
        return (
            <div className='ui' style= {{display:'flex' , flexDirection:'column'}} >
               <TopNav user = {this.props.user} logout = {this.props.logout}>Portfolio</TopNav>
               <div style = {{display:'flex' ,flexDirection:'column' , alignItems:'center' , marginTop:'20px'}}>
                         <h2>Name: {this.props.user.name }</h2>
                         <h2>Email: {this.props.user.email}</h2>
                         <h2>Capital: ${this.props.user.capital}</h2>
                    </div>
                <div style={ {marginTop:'50px'}}>
                    <div style = {{display:'flex' ,justifyContent:'center'}}>
                        <Card.Group>
                            {this.state.stocks.map((stock) => {
                                return  <Link key={stock.id} to={`/stock/${stock.id}`}>
                                <Card >
                                <Card.Content>
                                  <Card.Header content={stock.name} />
                                  <div className="description">Own Stock: {stock.units}</div>
                                </Card.Content>
                              </Card>
                              </Link>

                            })}
 
                        </Card.Group>
                    </div>
 
    

                </div>
            </div>
        )
    }
}