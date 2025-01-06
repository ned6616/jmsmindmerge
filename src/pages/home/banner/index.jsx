import React, { useState } from 'react'
import logo from '../../../assets/img/logo.png'
import VideoPlayer from './video-player'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
const Banner = () => {
  const [videoVisible, setVideoVisible] = useState(false)
  const bookingEvent = () => {
    window.location.href = 'https://event.jmssmindmerge.com/event'
  }
  const programVideo = () => {
    setVideoVisible(true)
  }
  const headerElement = (
    <div className='inline-flex align-items-center justify-content-center gap-2'>
      <span className='font-bold white-space-nowrap text-secondary'>
        <span className='text-danger'>JMMS</span> Program Video
      </span>
    </div>
  )

  const footerContent = (
    <div>
      <Button
        label='Close'
        icon='pi pi-check'
        onClick={() => setVideoVisible(false)}
        severity='danger'
        autoFocus
      />
    </div>
  )
  return (
    <>
      <div id='bg-img-wrapper'></div>
      <div className='banner-wrapper'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 text-white '>
              <img className='img-fluid mb-4' width={360} src={logo} alt='#' />
              <h1 className='text-start'>Elevate Your Potential</h1>
              <h4>Where Professionals Gather to Learn and Lead</h4>
              <p>
                At JMSS Mind Merge, we believe in creating transformative
                experiences that bring professionals together, fostering growth,
                and igniting leadership potential. Specializing in the
                organization of world-class events, professional training, and
                educational programs, we empower individuals and teams to excel
                in their fields.
              </p>
              {/* <button className='btn btn-warning mt-3' onClick={bookingEvent}>
                <i className='ri-calendar-2-line'></i> Book Event
              </button>
              <button
                className='btn btn-outline-light ms-3 me-3 mt-3'
                onClick={programVideo}
              >
                <i className='ri-play-fill'></i> Watch Video
              </button>
              <a href='/brochure.pdf' download>
                <button className='btn btn-danger mt-3'>
                  <i className='ri-download-fill'></i> Download Brochure
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className=' flex justify-content-center'>
        <Dialog
          visible={videoVisible}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: '50rem' }}
          onHide={() => {
            if (!videoVisible) return
            setVideoVisible(false)
          }}
        >
          <VideoPlayer visible={videoVisible} />
        </Dialog>
      </div>
    </>
  )
}

export default Banner
