import React from 'react'
import PropTypes from 'prop-types'
import {FiVideo} from 'react-icons/fi'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const VideoPreview = ({value}) => {
  const {url} = value
  const id = getYouTubeId(url)
  return <YouTube videoId={id} />
}

VideoPreview.propTypes = {
  value: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
}

export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: FiVideo,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Video URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: VideoPreview,
  },
}
