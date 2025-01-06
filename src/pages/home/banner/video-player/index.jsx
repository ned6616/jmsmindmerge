import React, { useLayoutEffect, useRef, useState } from 'react'
import IntroVideo from '../../../../assets/video/intro_video.mp4'
import './player.scss'

function VideoPlayer({ visible }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useLayoutEffect(() => {
    const video = videoRef.current
    if (video) {
      // Attempt to play the video with sound
      video.muted = false
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log('Autoplay with sound blocked:', error)
            setIsPlaying(false) // Show play button if autoplay is blocked
          })
      }
    }
  }, [visible])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        video.muted = false // Ensure sound is enabled on play
        video.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className='video-container'>
      <video ref={videoRef} width='100%' height='800' controls>
        <source src={IntroVideo} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button className='overlay-play-button' onClick={togglePlayPause}>
          <i className='ri-play-circle-line'></i> Play JMMS
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
