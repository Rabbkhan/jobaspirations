import React, { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import { setAdminJob } from '@/features/job/jobSlice'

const useGetAllAdminJobs = () => {
    const disptach = useDispatch()

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminJobs`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    disptach(setAdminJob(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAdminJobs()
    }, [])
}

export default useGetAllAdminJobs
