import React, { Fragment } from 'react';
import { Routes, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Recipe from './components/Recipe/Recipe';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Contribute from './components/Contribute/Contribute';
import New from './components/New/New';
import Chat from './components/chat/index';

import './App.css'

import io from 'socket.io-client';

const socket = io.connect('https://recipechatserver.onrender.com/'); 

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
      <Fragment>
        <div className='allcontent'>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/card" exact element={<Home/>} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<New />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path='/chat' element={<Chat username={user?.result?.name} room={"JavaScript"} socket={socket} />}/>
          </Routes>
        </div>
        <Footer/>
      </Fragment>
  );
};

export default App;
