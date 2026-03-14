export const timeAgo = (timestamp) => {
    if (!timestamp) return ''
    const now = new Date()
    const created = new Date(timestamp)
    const diff = (now - created) / 1000

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`

    return created.toLocaleDateString()
}

export const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed'

    const toLPA = (n) => `${(n / 100000).toFixed(1)} LPA`

    if (salary.min && salary.max) {
        if (salary.min === salary.max) return toLPA(salary.min)
        return `${toLPA(salary.min)} – ${toLPA(salary.max)}`
    }

    return salary.min ? toLPA(salary.min) : 'Not disclosed'
}
export const formatExperience = (exp) => {
    if (!exp) return 'Not specified'

    let min = Number(exp.min)
    let max = Number(exp.max)

    // normalize order
    if (min > max) [min, max] = [max, min]

    // Fresher case
    if (min === 0 && max === 0) return 'Fresher'

    const toText = (m) => {
        if (m === 0) return '0' // 🔥 KEY FIX
        if (m < 12) return `${m}m`

        const y = Math.floor(m / 12)
        const r = m % 12

        if (r === 0) return `${y}y`
        return `${y}y ${r}m`
    }

    if (min === max) return toText(min)

    return `${toText(min)} – ${toText(max)}`
}
