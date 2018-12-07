import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Alec DiFederico`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Portfolio and blog by <strong>Alec DiFederico</strong> who lives and works in Boston building useful things.{' '}
          <a href="https://github.com/Alec1017">
            You should check out his github
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
