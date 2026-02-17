import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'

const HeaderFilterBar = ({ filters, setFilters }) => {
    const [data, setData] = useState({
        locations: [],
        industries: [],
        salaries: []
    })

    useEffect(() => {
        const fetchFilters = async () => {
            const res = await axios.get(`${JOB_API_END_POINT}/filters`)
            if (res.data.success) setData(res.data.filters)
        }
        fetchFilters()
    }, [])

    const update = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="w-full flex justify-center">
            <div className="bg-white border shadow-md rounded-2xl px-6 py-4 w-full md:w-4/5 flex flex-wrap items-center justify-center gap-5">
                {/* Location */}
                <select
                    className="border rounded-xl cursor-pointer px-4 py-2 min-w-[180px] outline-none"
                    value={filters.location}
                    onChange={(e) => update('location', e.target.value)}>
                    <option value="">All Locations</option>
                    {data.locations.map((loc, i) => (
                        <option
                            key={i}
                            value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                {/* Industry */}
                <select
                    className="border rounded-xl cursor-pointer px-4 py-2 min-w-[180px] outline-none"
                    value={filters.industry}
                    onChange={(e) => update('industry', e.target.value)}>
                    <option value="">All Industries</option>
                    {data.industries.map((ind, i) => (
                        <option
                            key={i}
                            value={ind}>
                            {ind}
                        </option>
                    ))}
                </select>

                {/* Salary */}
                <select
                    className="border rounded-xl cursor-pointer px-4 py-2 min-w-[180px] outline-none"
                    value={filters.salary}
                    onChange={(e) => update('salary', e.target.value)}>
                    <option value="">All Salaries</option>
                    {data.salaries.map((s, i) => (
                        <option
                            key={i}
                            value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>

                {/* Reset Button */}
                <button
                    onClick={() => setFilters({ location: '', industry: '', salary: '' })}
                    className="px-4 py-2 cursor-pointer rounded-xl bg-gray-100 hover:bg-gray-200">
                    Reset
                </button>
            </div>
        </div>
    )
}

export default HeaderFilterBar
