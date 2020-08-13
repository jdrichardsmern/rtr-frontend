import React from 'react'
import { Component } from 'react';
import StockChart from  './StockChart'
export default class Profile extends Component{


    render (){
        return (
            <div>
                <h1>profle</h1>
                <StockChart/>
            </div>
        )
    }
}