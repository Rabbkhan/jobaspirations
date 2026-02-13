import React from 'react'
import Hero from './Hero'
import LatestJobs from './LatestJobs'
import CategoryCarousal from './CategoryCarousal'
import useGetAllJobs from '@/shared/hooks/useGetAllJobs'
import TestimonialCarousel from '../../../pages/TestimonialCarousel'
import FeaturedMetricsCarousel from '../../../pages/FeaturedMetricsCarousel'
import StudentJourney from '../../../pages/StudentJourney'
import SkillResources from '../../../pages/SkillResources'
import EventsSection from '../../../pages/EventsSection'
import NewsletterCTA from '../../../pages/NewsletterCTA'
import FinalCTA from '../../../pages/FinalCTA'
import { useSelector } from 'react-redux'
import StudentHero from './StudentHero'
const Home = () => {

  useGetAllJobs()

const { user } = useSelector(state => state.auth)


  return (
 <div>
    {!user ? <Hero /> : <StudentHero />}

    {/* <CategoryCarousal/> */}
    <LatestJobs/>

    {!user && (
      <>
        <StudentJourney/>
        <TestimonialCarousel/>
        <FeaturedMetricsCarousel/>
        <FinalCTA/>
      </>
    )}
  </div>
  )
}

export default Home




