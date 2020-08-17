import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import StockCard from './StocksCard'
import axios from 'axios'



// componentDidMount(){
    
//     axios.get('/stock/stock/id').then((response) => {
//         console.log(response)
//     })
// }


function SingleStock () {

    let [stock , setStock] = useState('stock')
    const {id} = useParams()

    useEffect(() => {

        axios.get(`/stock/stock/${id}`).then((response) => {
        console.log(response.data.stock)
            setStock(stock = response.data.stock)
    })
      });
      
        return (
            <div>
                {/* <StockCard stock={stock} /> */}
                {/* <h1>{stock.history[0]}</h1> */}
            </div>
        )
    
}

export default  SingleStock