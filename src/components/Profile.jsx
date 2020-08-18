import React from 'react'
import { Component } from 'react';
import TopNav from './TopNav'




export default class Profile extends Component{


    render (){
        console.log(this.props.user)
        return (
            <div className='ui' style= {{display:'flex' , flexDirection:'column'}} >
               <TopNav user = {this.props.user} logout = {this.props.logout}>Profile</TopNav>
                <div style={ {marginTop:'50px'}}>
                    <div style = {{display:'flex' ,justifyContent:'center'}}>
                        <img src = {'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'} alt= '' style={{width:'300px' , marginTop:'100px'}} />
                    </div>
                    <div style = {{display:'flex' ,flexDirection:'column' , alignItems:'center' , marginTop:'20px'}}>
                         <h2>Name: {this.props.user.name ? this.props.user.name : 'PlaceHolder'}</h2>
                         <h2>Email: {this.props.user.email}</h2>
                         <h2>Capital: ${this.props.user.capital}</h2>
                    </div>
                </div>
            </div>
        )
    }
}