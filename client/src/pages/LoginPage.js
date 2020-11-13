import React, { useState } from 'react'
import  { useMutation,gql } from '@apollo/client'
import { useForm } from '../utils/hooks'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

const LoginPage = () => {
    const history=useHistory()
    const [error,setError]=useState({})
    const {onSubmit,values,onChange}=useForm(loginUserCallback,{
        username:'',
        password: ''
    })
    const [login,{loading}]=useMutation(LOGIN_USER,{
        update(_,result){
            history.push('/')
        },
        onError(err) {
            setError(err.graphQLErrors[0].extensions.exception.errors);
          },
          variables: values
    })
    function loginUserCallback(){
        login()
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading?'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={error.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={error.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
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
const LOGIN_USER=gql`
    mutation login($username:String! $password:String!){
        login(username:$username password:$password){
            id
            username
            email
            createdAt
            token
        }
    }
`

export default LoginPage
