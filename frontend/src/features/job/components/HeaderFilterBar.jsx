import { useGetJobFiltersQuery } from '@/features/job/api/jobApi.js'
import { useMemo } from 'react'

const HeaderFilterBar = ({ filters, setFilters, resetFilters, isMobile = false }) => {
    const { data, isLoading, isError } = useGetJobFiltersQuery()

    const options = useMemo(
        () => ({
            locations: data?.filters?.locations || [],
            industries: data?.filters?.industries || [],
            salaries: data?.filters?.salaries || [],
            experiences: data?.filters?.experiences || []
        }),
        [data]
    )

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    if (isLoading) {
        return <div className="w-full flex justify-center py-4 text-muted-foreground">Loading filters...</div>
    }

    if (isError) {
        return <div className="w-full flex justify-center py-4 text-red-500">Failed to load filters</div>
    }

    return (
        <div className={isMobile ? 'w-full' : 'hidden md:flex justify-center'}>
            <div className="bg-white border shadow-md rounded-2xl px-6 py-4 w-full md:w-4/5 flex flex-wrap gap-5 items-center">
                {/* Location */}
                <select
                    className="border rounded-xl px-4 py-2 min-w-[170px]"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}>
                    <option value="">All Locations</option>
                    {options.locations.map((loc) => (
                        <option
                            key={loc}
                            value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                {/* Industry */}
                <select
                    className="border rounded-xl px-4 py-2 min-w-[170px]"
                    value={filters.industry}
                    onChange={(e) => updateFilter('industry', e.target.value)}>
                    <option value="">All Industries</option>
                    {options.industries.map((ind) => (
                        <option
                            key={ind}
                            value={ind}>
                            {ind}
                        </option>
                    ))}
                </select>

                {/* Salary */}
                <select
                    className="border rounded-xl px-4 py-2 min-w-[170px]"
                    value={filters.salary}
                    onChange={(e) => updateFilter('salary', e.target.value)}>
                    <option value="">All Salaries</option>
                    {options.salaries.map((s) => (
                        <option
                            key={s.value}
                            value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>

                {/* Experience */}
                <select
                    className="border rounded-xl px-4 py-2 min-w-[170px]"
                    value={filters.experience}
                    onChange={(e) => updateFilter('experience', e.target.value)}>
                    <option value="">All Experience</option>
                    {options.experiences.map((e) => (
                        <option
                            key={e.value}
                            value={e.value}>
                            {e.label}
                        </option>
                    ))}
                </select>

                {/* Reset */}
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                    Reset
                </button>
            </div>
        </div>
    )
}

export default HeaderFilterBar
