const CategoryFilter = ({ categories, selected, onChange }) => {
    return (
        <div className="flex gap-2 flex-wrap">
            <button
                onClick={() => onChange('')}
                className={`px-3 py-1 rounded text-sm border ${!selected ? 'bg-black text-white' : ''}`}>
                All
            </button>

            {categories.map((cat) => (
                <button
                    key={cat._id}
                    onClick={() => onChange(cat._id)}
                    className={`px-3 py-1 rounded text-sm border ${selected === cat._id ? 'bg-black text-white' : ''}`}>
                    {cat.name}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
