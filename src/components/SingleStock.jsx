import React from 'react'
import { Component } from 'react';
import StockChart from  './StockChart'
import {useParams} from 'react-router-dom'



function SingleStock () {
    const {name} = useParams()

        return (
            <div>
                <h1>{name}</h1>
                
            </div>
        )
    
}

export default  SingleStock