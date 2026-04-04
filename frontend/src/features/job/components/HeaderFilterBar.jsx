import { useGetJobFiltersQuery } from '@/features/job/api/jobApi.js'
import { useMemo } from 'react'
import { MapPin, Building2, IndianRupee, Clock, X, SlidersHorizontal } from 'lucide-react'

const SELECT_BASE =
    'flex-1 min-w-[150px] text-sm bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors cursor-pointer'

const FilterSelect = ({ icon: Icon, value, onChange, placeholder, options }) => (
    <div className="relative flex items-center flex-1 min-w-[150px]">
        <Icon className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        <select
            className={`${SELECT_BASE} pl-9`}
            value={value}
            onChange={(e) => onChange(e.target.value)}>
            <option value="">{placeholder}</option>
            {options.map((opt) =>
                typeof opt === 'string' ? (
                    <option
                        key={opt}
                        value={opt}>
                        {opt}
                    </option>
                ) : (
                    <option
                        key={opt.value}
                        value={opt.value}>
                        {opt.label}
                    </option>
                )
            )}
        </select>
    </div>
)

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
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const hasActiveFilters = Object.values(filters).some(Boolean)

    if (isLoading) {
        return (
            <div className={isMobile ? 'w-full' : 'hidden md:flex justify-center'}>
                <div className="bg-background border border-border shadow-sm rounded-2xl px-6 py-4 w-full md:w-4/5 flex gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-10 flex-1 bg-muted animate-pulse rounded-xl"
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className={isMobile ? 'w-full' : 'hidden md:flex justify-center'}>
                <div className="bg-background border border-border rounded-2xl px-6 py-4 w-full md:w-4/5 text-sm text-destructive text-center">
                    Failed to load filters
                </div>
            </div>
        )
    }

    return (
        <div className={isMobile ? 'w-full' : 'hidden md:flex justify-center'}>
            <div className="bg-background border border-border shadow-sm rounded-2xl px-5 py-4 w-full md:w-4/5">
                {/* header row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <SlidersHorizontal className="w-4 h-4 text-primary" />
                        Filter Jobs
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
                            <X className="w-3.5 h-3.5" />
                            Clear all
                        </button>
                    )}
                </div>

                {/* filters row */}
                <div className="flex flex-wrap gap-3 items-center">
                    <FilterSelect
                        icon={MapPin}
                        value={filters.location}
                        onChange={(val) => updateFilter('location', val)}
                        placeholder="All Locations"
                        options={options.locations}
                    />

                    <FilterSelect
                        icon={Building2}
                        value={filters.industry}
                        onChange={(val) => updateFilter('industry', val)}
                        placeholder="All Industries"
                        options={options.industries}
                    />

                    <FilterSelect
                        icon={IndianRupee}
                        value={filters.salary}
                        onChange={(val) => updateFilter('salary', val)}
                        placeholder="All Salaries"
                        options={options.salaries}
                    />

                    <FilterSelect
                        icon={Clock}
                        value={filters.experience}
                        onChange={(val) => updateFilter('experience', val)}
                        placeholder="All Experience"
                        options={options.experiences}
                    />

                    {/* active filter chips */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2 w-full mt-1">
                            {Object.entries(filters).map(([key, value]) =>
                                value ? (
                                    <span
                                        key={key}
                                        className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        {value}
                                        <button
                                            onClick={() => updateFilter(key, '')}
                                            className="hover:text-primary/60 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ) : null
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderFilterBar
