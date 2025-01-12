import React from 'react'

import ReactFullpage from '@fullpage/react-fullpage'
import './home.scss'
import sideImg from '../../assets/img/imgs-2.png'
import Banner from './banner'
import EventModal from './EventModal'
const Home = () => {
  const bookingEvent = () => {
    window.location.href = 'https://event.jmssmindmerge.com/event'
  }
  return (
    <>
      {/* <EventModal /> */}
      <ReactFullpage
        scrollingSpeed={1000}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className='section'>
              <Banner />
            </div>
            <div className='section'>
              <div className='container'>
                <h1>What we Offer:</h1>
                <div className='row'>
                  <div className='col-lg-6'>
                    <h4>GBS PLUS Corporate & Game Trainingss: </h4>
                    <p>
                      Tailored programs designed to upskill and develop your
                      workforce, enhancing performance and productivity.
                    </p>
                    <h4>Professional Events: </h4>
                    <p>
                      From seminars to industry conferences, we create platforms
                      for professionals to exchange knowledge and expand their
                      networks.
                    </p>
                    <h4>Educational Workshops: </h4>
                    <p>
                      Enriching learning experiences aimed at sharpening your
                      skills and staying ahead in today’s competitive landscape.
                    </p>
                    <h4>Why JMSS MindMerge? </h4>
                    <p>
                      We don’t just organize events – we curate meaningful
                      interactions that inspire change, foster innovation, and
                      lead to success. Our hands-on approach ensures that every
                      event is designed to meet your organization’s needs,
                      driving both personal and professional growth.
                    </p>
                    <h4>Join Us in the Journey</h4>
                    <p>
                      With JMSS MindMerge, you are not just participating;
                      you’re leading the way toward a brighter, more innovative
                      future. Together, let’s gather, learn, and lead the path
                      to excellence.
                    </p>
                    {/* <button
                      className='btn btn-warning mt-3'
                      onClick={bookingEvent}
                    >
                      <i className='ri-calendar-2-line'></i> Book Event
                    </button> */}
                  </div>
                  <div className='col-lg-6'>
                    <img className='img-fluid' src={sideImg} alt='#' />
                  </div>
                </div>
              </div>
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  )
}

export default Home
