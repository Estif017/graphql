import React, { useState } from 'react'
import {useHistory}from 'react-router-dom'
import {useMutation,gql}from'@apollo/client'
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../utils/hooks'

const RegisterPage = () => {
    const history=useHistory()
    const [error,setError]=useState({})
    const {values,onSubmit,onChange}=useForm(registerUser,{
        username:'',
        email: '',
        password:'',
        confirmPassword: ''
    })
    const [addUser,{loading}]=useMutation(REGISTER_USER,{
        update(_,result){
            history.push('/')
        },
        onError(err) {
            setError(err.graphQLErrors[0].extensions.exception.errors);
          },
          variables: values
    })
    function registerUser(){
        addUser()
    }
    const {username, email,password, confirmPassword}=values
    return (
       <div className="form-container">
           <Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''}>
                <h1>Register</h1>
                <Form.Input 
                    label='Username'
                    placeholder='Username'
                    type='text'
                    name='username'
                    value={username}
                    onChange={onChange}
                />
                <Form.Input 
                    label='email'
                    placeholder='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                />
                <Form.Input 
                    label='password'
                    placeholder='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                />
                <Form.Input 
                    label='confirmPassword'
                    placeholder='confirmPassword'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
           </Form>
           {Object.keys(error).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(error).map((value) => (
                        <li key={value}>{value}</li>
                ))}
          </ul>
        </div>
      )}
       </div>
    )
}
const REGISTER_USER=gql`

    mutation register(
        $username:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        register(
            registerInput:{
                username:$username
                email:$email
                password:$password
                confirmPassword:$confirmPassword
            }){
            id,
            email,
            username,
            createdAt,
            token
        }
    }

`

export default RegisterPage
