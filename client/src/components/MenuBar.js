import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import AuthContext from '../context/authContext/AuthContext'

const MenuBar=()=> {
  const {user,logoutUser}=useContext(AuthContext)
  const pathName=window.location.pathname
  const path=pathName==='/'?'home' : pathName.substr(1)

  const [state,setState]=useState({ activeItem: path })
  const {activeItem}=state

  const handleItemClick = (e, { name }) => setState({ activeItem: name })
  if(user){
    return(
      <Menu pointing secondary size="massive" color="teal" style={{'margin':'0 auto'}}>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link} to='/'
        />
        <Menu.Item name={user.username} active={activeItem === 'home'} as={Link} to="/profile" />
        <Menu.Item name="logout" onClick={logoutUser} as={Link} to='/logout' />
      </Menu>
      )
  }else{
    return (
      <Menu pointing secondary size="massive" color="teal" style={{'margin':'0 auto'}} >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link} to='/'
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link} to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link} to='/register'
        />
      </Menu>
    )
  }
}
export default MenuBar