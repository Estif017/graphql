import React, { useReducer } from 'react'
import { LOGIN, LOGOUT, REGISTER } from '../Types'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'

const AuthSelectors = props => {
    const initialState = {
        user:null,
        login:{},
        logout:()=>{}
    }

    const [state,dispatch]=useReducer(AuthReducer,initialState)

    const loginUser=(userData)=>{
        dispatch({
            type:LOGIN,
            payload:userData
        })
    }
    const userRegister=(userData)=>{
        dispatch({
            type:REGISTER,
            payload:userData
        })
    }
    const logoutUser = ()=>{
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <AuthContext.Provider value={{
            user:state.user,
            userRegister,
            loginUser,
            logoutUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthSelectors
