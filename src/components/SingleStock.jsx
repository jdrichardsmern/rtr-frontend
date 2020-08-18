import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import StockCard from './StocksCard'
import axios from 'axios'
import StockChart from './StockChart'
import TopNav from './TopNav'



function SingleStock (props) {
    
    let x = async () => {
        let y = await axios.get(`/stock/stock/${id}`)
        
        await setStock(y.data.stock)
        await setHistory([...y.data.stock.history])
        
        
    }

    let [stock , setStock] = useState({})
    let [history , setHistory] = useState([])
    const {id} = useParams()

    useEffect(() => {
      x()
      }, []);
 
    

        return (
            <div>
                <TopNav user = {props.user} logout = {props.logout}>Home</TopNav>
                {/* <StockCard stock={stock} />
                 */}
                <StockChart history = {history} name = {stock.name}/>
                {/* {history.map((x) => {
                    return <h1> {x.price}</h1>
                })} */}
               
            </div>
        )
    
}

export default  SingleStock