import React from 'react';
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from '../assets/profile-pic.jpg';


function Bio() {
  return (
    <div className='bio'>
      <img className='bio__profile-pic' src={profilePic} alt='Alec DiFederico' />
      <p className='bio__message'>
        Hey there, I'm <strong>Alec</strong>.
        
        <br></br>
        <br></br>

        This is my portfolio/blog where you can fing things I find interesting or some projects I've built. 

        <br></br>
        <br></br>
        
        Enjoy your stay, and feel free to check out my{' '}
        <a href="https://github.com/Alec1017">
          github
        </a>{' '}
        while you're here.
      </p>
    </div>
  );
}

export default Bio;
