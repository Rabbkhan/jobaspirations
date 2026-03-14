import React from 'react'
import Hero from './sections/Hero'
import LatestJobs from '@/features/job/pages/LatestJobs'
import TestimonialCarousel from '../static/TestimonialCarousel'
import FeaturedMetricsCarousel from '../static/FeaturedMetricsCarousel'
import StudentJourney from '../static/StudentJourney'
import FinalCTA from '../static/FinalCTA'
import { useSelector } from 'react-redux'
import StudentHero from './sections/StudentHero'
const Home = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div>
            {!user ? <Hero /> : <StudentHero />}

            {/* <CategoryCarousal/> */}
            <LatestJobs />

            {!user && (
                <>
                    <StudentJourney />
                    <TestimonialCarousel />
                    <FeaturedMetricsCarousel />
                    <FinalCTA />
                </>
            )}
        </div>
    )
}

export default Home
