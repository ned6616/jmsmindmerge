// EventModal.js
import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import EventImg from '../../assets/img/event_img.jpg'
import VideoPlayer from './banner/video-player'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../redux/features/modal/modalSlice'

const EventModal = () => {
  const [videoVisible, setVideoVisible] = useState(false)
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.modal.isOpen)

  useEffect(() => {
    setTimeout(() => {
      dispatch(openModal()) // Open the dialog via Redux
    }, 1000)

    setTimeout(() => {
      setVideoVisible(true)
    }, 2500)
  }, [dispatch])

  const bookingEvent = () => {
    window.location.href = 'https://event.jmssmindmerge.com/event'
  }

  const footerContent = (
    <div>
      <Button
        label={
          <>
            <i class='ri-calendar-2-line'></i> Book Event
          </>
        }
        icon='pi pi-check'
        severity='danger'
        onClick={bookingEvent}
      />
    </div>
  )

  return (
    <Dialog
      header=''
      visible={isOpen}
      onHide={() => dispatch(closeModal())} // Close the dialog via Redux
      style={{ width: '50vw' }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      footer={footerContent}
    >

        <img
          src={EventImg}
          alt='Event'
          style={{ width: '100%', height: 'auto' }}
        />

    </Dialog>
  )
}

export default EventModal
