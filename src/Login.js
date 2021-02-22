import { Button } from '@material-ui/core'
import React,{useEffect} from 'react'
import './Login.css';
import {auth,provider} from './firebase';
import {useStateValue} from './StateProvider';
function Login() {

    const [{},dispatch]=useStateValue();

    const clicktoLogin=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:"SET_USER",
                user:result.user
            })
        })
        .catch((error)=>alert(error.message))
    }


    return (
        <div className="login">
            <div className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />

            <div className="login__containerInfo">
                <h2>Sign in to WhatsApp</h2>
                
            </div>

            <Button onClick={clicktoLogin}>SIGN IN WITH GOOGLE</Button>
            </div>

            
        </div>
    )
}

export default Login
