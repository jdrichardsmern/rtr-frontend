import React from 'react';
import {Redirect} from 'react-router-dom'



class Auth {
constructor(){
    this.authenticated = false
}


login(cb , user , token) {

    this.authenticated = true
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
    cb()
    return <Redirect to='/' />
}

logout(cb){
    this.authenticated = false
    localStorage.clear()
    cb()
}
isAuthenticated() {
    return this.authenticated
}
}



export default new Auth()