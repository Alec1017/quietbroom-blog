import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/profile-pic.jpeg'

const Bio = () => (
  <div className='bio'>
    <img className='bio__profile-pic' src={profilePic} alt='Alec DiFederico' />
    <p className='bio__message'>
      Portfolio and blog by <strong>Alec DiFederico</strong> who lives and works in Boston building useful things.{' '}
      <a href="https://github.com/Alec1017">
        You should check out his github
      </a>
    </p>
  </div>
);

export default Bio
