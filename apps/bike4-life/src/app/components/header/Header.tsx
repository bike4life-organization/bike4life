import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';

import '../../styles/header.scss';

const Header = () => {
 
  return (
    <div className='header'>
        <div className="left">
            <img alt="logo" src="../../assets/img/logo-bike4life.png" />
            <Link underline='none' href='/routes'>Find a route!</Link>
        </div>
        <div className="right">
            <Link underline='none' href='/sign-up'>Sign up</Link>
        </div>
    </div>
  )
}

export default Header