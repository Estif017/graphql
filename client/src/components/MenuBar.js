import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuBar=()=> {
  const pathName=window.location.pathname
  const path=pathName==='/'?'home' : pathName.substr(1)

  const [state,setState]=useState({ activeItem: path })
  const {activeItem}=state

  const handleItemClick = (e, { name }) => setState({ activeItem: name })


    return (
        <Menu pointing secondary>
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
export default MenuBar