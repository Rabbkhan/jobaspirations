import { useState, useEffect } from 'react'
import axios from 'axios'
import { BLOG_API_END_POINT } from '../../utils/constants'

export const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await axios.get(BLOG_API_END_POINT, {
                withCredentials: true
            })
            setBlogs(res.data?.blogs || res.data || [])
        } finally {
            setLoading(false)
        }
    }

    const createBlog = async (formData) => {
        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                payload.append(key, value)
            }
        })

        const res = await axios.post(`${BLOG_API_END_POINT}/create`, payload, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        setBlogs((prev) => [res.data, ...prev])
        return res.data
    }

    const updateBlog = async (id, formData) => {
        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                payload.append(key, value)
            }
        })

        const res = await axios.put(`${BLOG_API_END_POINT}/${id}`, payload, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        setBlogs((prev) => prev.map((b) => (b._id === id ? res.data : b)))

        return res.data
    }

    const deleteBlog = async (id) => {
        await axios.delete(`${BLOG_API_END_POINT}/${id}`, {
            withCredentials: true
        })
        setBlogs((prev) => prev.filter((b) => b._id !== id))
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return {
        blogs,
        loading,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog
    }
}
