import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Component } from 'react';
import axios from 'axios'
import TopNav from './TopNav'
import StockCard from './StocksCard'

// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';




  

export default class Dashboard extends Component{
    

    componentDidMount(){
        axios.get('/stock/all').then((response) => {
            this.props.updateStock(response.data.stocks)
        })
    }

 

    render (){
        return (
            <div>
                <TopNav user = {this.props.user} logout = {this.props.logout}>Home</TopNav>
                <Container maxWidth='lg'>
                    

                    <div >

                    <Grid container spacing={3} justify = {'center'} style = {{marginTop: '50px'}}>
                    {this.props.stocks.map((stock , idx) => {
                    return   <Grid item xs={3} key = {stock._id}> 
                                <StockCard stock = {stock} />
                            </Grid>
                            
                    })}
                    </Grid>
                    </div>


                </Container>
            </div>
        )
    }
}