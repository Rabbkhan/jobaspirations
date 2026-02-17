import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: '',
        jobapplied: [],
        savedJobs: [],
        loading: false
    },

    reducers: {
        // Used when page = 1 or filters change
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },

        // Used for infinite scroll (page > 1)
        appendJobs: (state, action) => {
            const existingIds = new Set(state.allJobs.map((j) => j._id))
            const uniqueJobs = action.payload.filter((job) => !existingIds.has(job._id))
            state.allJobs.push(...uniqueJobs)
        },

        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },

        setAdminJob: (state, action) => {
            state.allAdminJobs = action.payload
        },

        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },

        removeAdminJob: (state, action) => {
            state.allAdminJobs = state.allAdminJobs.filter((job) => job._id !== action.payload)
        },

        setJobapplied: (state, action) => {
            state.jobapplied = action.payload
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload || []
        }
    }
})

export const {
    setAllJobs,
    appendJobs, // ← DO NOT FORGET THIS EXPORT
    setSingleJob,
    setAdminJob,
    setSearchJobByText,
    removeAdminJob,
    setJobapplied,
    setSavedJobs,
    setLoading
} = jobSlice.actions

export default jobSlice.reducer
