import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import StockChart from './StockChart'
import TopNav from './TopNav'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Message } from 'semantic-ui-react'

function SingleStock (props) {

    let [stock , setStock] = useState({})
    let [history , setHistory] = useState([])
    let [number , setNumber] = useState(1)
    let [send , setSend] = useState(false)
    let [password , setPassword] = useState('')
    let [url ,setUrl] = useState('')
    let [msg ,setMsg] = useState('')
    let [err ,setErr] = useState('')
    const {id} = useParams()


    // const getStocks = async () => {
    //     let data = await axios.get(`/stock/stock/${id}`)
    //     await setStock(data.data.stock)
    //     await setHistory([...data.data.stock.history])
    // }

        
    //     let axiosConfig = {
    //         headers:{
    //           'Content-Type': 'application/json; charset=UTF-8',
    //           'auth-token': token,
    //           'Access-Control-Allow-Origin': '*'
    //         }
    //       }
    //       let data = await axios.put(`/stock/buy/${id}`,{email:props.user.email, order: number } ,axiosConfig)


    //       setMsg(data.data.message)
    //       setErr(data.response.data.errors)
    // }
    const getStocks = async () => {
        let data = await axios.get(`/stock/stock/${id}`)
        await setStock(data.data.stock)
        await setHistory([...data.data.stock.history])
    }

    // const verify = async (pw) => {
    //     try {
    //         setUrl(`/stock/sell/${id}`)



    //     }
    //     catch(err){

    //     }
    // }

    useEffect(() => {
    getStocks()
      }, []);

      useEffect(() => {
        
          const buyStock = async () => {
           
              try{
                const token = await JSON.parse(localStorage.getItem('token'))
                let axiosConfig = {
                    headers:{
                      'Content-Type': 'application/json; charset=UTF-8',
                      'auth-token': token,
                      'Access-Control-Allow-Origin': '*'
                    }
                  }
                  let data = await axios.put(url,{email:props.user.email, order: Number(number) , password : password} ,axiosConfig)
                  setMsg(data.data.message)
                  setErr('')
                  props.updateCapital()
              }

              catch(err){
                  console.log(err.response)
                // setErr(err.response.data.errors)
                
              }
          }

          if (send){
            setSend(false)
            props.updateCaptial(password)
            buyStock()
          }
          

      }, [url])

      useEffect(() => {
        
        
        const sellStock = async () => {
                try{

                    const token = await JSON.parse(localStorage.getItem('token'))
                    let axiosConfig = {
                        headers:{
                          'Content-Type': 'application/json; charset=UTF-8',
                          'auth-token': token,
                          'Access-Control-Allow-Origin': '*'
                        }
                      }
                      let data = await axios.put(url,{email:props.user.email, sell: Number(number) , password: password} ,axiosConfig)
                      
                      setMsg(data.data.message)
                      setErr('')
                      setUrl('')
                  }
      
                  catch(err){
                    setUrl('')
                    setMsg("")
                    setErr(err.response.data.errors)
                  }

                    
          
           

        }

        if(send) {
            setSend(false)
            props.updateCaptial(password)
            sellStock()
        }

       
    }, [url])

        return (
            <div style = {{display:'flex' , flexDirection:'column'}}>
                <TopNav  user = {props.user} logout = {props.logout}>{stock.name}</TopNav>


                <div style = {{display:'flex'}}>
                    <CssBaseline />
                   
                    <Container  style = {{width: '200px'}}>
                    <div>
                    <h2> {props.user.email}</h2>
                    <h2> Capital: {props.user.capital}</h2>
                    </div>
                    </Container>
                   <div style= {{flexDirection:'column' , width:'100%'}}>
                        <Container maxWidth="lg" style = {{marginTop : '100px'}}>
                        {err ?  
                    <Message
                   
                    header='Error'
                    content={err}
                    color='red'
                  />
                    :
                    msg
                    ?
                    <Message
                    
                    header='Message'
                    content={msg}
                    color='green'
                  />
                  :
                  <div></div>
                    }
                        <StockChart history = {history} name = {stock.name} />
                        </Container>
                        <hr/>
                        <div style = {{display: 'flex',justifyContent:'center'}}>
                            
                            <div>
                            <div>
                                <h3>Stock Avalible: {stock.units - stock.sold}</h3>
                                <h3>Price Per Stock: {stock.price}</h3>
                            </div>
                            <hr/>
                            <div className='ui fluid input' >
                                    <input type='number' name='amount'  min={1} value = {number} onChange = {(event) =>{
                                        setNumber(event.target.value)
                                        }} />
                                </div>
                                <div style = {{display:'flex'}}>
                                <form className='ui form' onSubmit={(e) => {
                                    const enteredPassword = prompt('Please enter your password')
                                    if(enteredPassword){
                                        setPassword(enteredPassword)
                                        setSend(true)
                                        setUrl(`/stock/buy/${id}`)
                                   }
                                    
                                    e.preventDefault()
                                }}>
                                    <button type='submit' className='ui button green'>
                                    Buy
                                    </button>
                                 </form>
                                 <form className='ui form' onSubmit={(e) => {
                                     e.preventDefault()
                                     const enteredPassword = prompt('Please enter your password')
                                     if(enteredPassword){
                                         setPassword(enteredPassword)
                                         setSend(true)
                                         setUrl(`/stock/sell/${id}`)
                                    }
                                }}>
                                    <button type='submit' className='ui button red'>
                                    sell
                                    </button>
                                </form>
                                </div>
                            </div>
            
                           

                        </div>
                   </div>

                    
             </div>

                {/* <div className = 'container' style>
                    <div style={{width:'50%' , marginTop:'100px'}} >
                        <StockChart history = {history} name = {stock.name}/>
                    </div>
                </div> */}

                

            </div>
        )
    
}

export default  SingleStock