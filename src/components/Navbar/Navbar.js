import React,{ useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {MenuData} from "./MenuData"
import logo from '../../images/Websitelogo.jpeg' 
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import './NavbarStyles.css'

import {  Typography, Toolbar, Avatar, Button, makeStyles } from '@material-ui/core';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [clicked,setClicked]=useState(false);
    const [scrolling,setScrolling]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const classes = useStyles();
    // console.log("hi")
    useEffect(()=>{
        // console.log("hi")
        
        if(user && user.result){
            dispatch({ type: actionType.AUTH, data:user });
        }
    },[user])

    const handleClick=()=>{
        setClicked(!clicked)
    }

    const handlescroll=()=>{
        if(window.pageYOffset<=50){
            setScrolling(false)
        }else{
            setScrolling(true)
        }
    }

    window.addEventListener('scroll',handlescroll);

    function trimname(name){
        var i=name.indexOf(' ');
        name=name.substr(0,i);
        if(name.length>10) return makeStyles.substr(0,10);
        else return name;
    }

  return (
    <div>
      <nav className={scrolling?"NavbarItems scrolling":"NavbarItems"}>
        <Link to='/' className='text-decoration-none'>
            <h1 className='logo' >
                <img src={logo} height="50px" width="50px" alt='cookwell'/>
                COOKWELL 
            </h1>
        </Link>
        <div className='menu-icons' onClick={handleClick}>
            <i className={clicked?"fas fa-times":"fas fa-bars"}></i>
        </div>
        <ul className={clicked?"nav-menu active":"nav-menu"}>
            {MenuData.map((item,index)=>{
                return(
                    <li key={index}>
                        <Link to={item.url} className={item.cName}>
                            <i className={item.icon}></i>{item.title}
                        </Link>
                    </li>
                )
            })}
            <li key='Sign Up' className='signup'>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar onClick={()=>navigate('/profile')} className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}></Avatar>
                            <Typography onClick={()=>navigate('/profile')} className="userName" variant="h6">{trimname(user?.result.name)}</Typography>
                            {/* <Button variant="contained" className={classes.logout} color="secondary" size="small" onClick={logout}>&nbsp;&nbsp;Logout&nbsp;&nbsp;<i className='fa-solid fa-right-from-bracket'></i>&nbsp;&nbsp;</Button> */}
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
