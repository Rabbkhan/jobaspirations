import React from 'react'
import Hero from './Hero'
import LatestJobs from './LatestJobs'
import CategoryCarousal from './CategoryCarousal'
import useGetAllJobs from '../../../hooks/useGetAllJobs'

const Home = () => {

  useGetAllJobs()
  return (
    <div>
<Hero/>
<CategoryCarousal/>
<LatestJobs/>

    </div>
  )
}

export default Home