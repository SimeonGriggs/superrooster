import PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({url}) {
  if (!url) return null

  return (
    <div className="player-wrapper">
      <ReactPlayer className="react-player" url={url} width="100%" height="100%" />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
}
