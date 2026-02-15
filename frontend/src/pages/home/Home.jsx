import React from 'react'
import Hero from './sections/Hero'
import LatestJobs from '@/features/job/components/LatestJobs'
import useGetAllJobs from '@/shared/hooks/useGetAllJobs'
import TestimonialCarousel from '../static/TestimonialCarousel'
import FeaturedMetricsCarousel from '../static/FeaturedMetricsCarousel'
import StudentJourney from '../static/StudentJourney'
import FinalCTA from '../static/FinalCTA'
import { useSelector } from 'react-redux'
import StudentHero from './sections/StudentHero'
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




