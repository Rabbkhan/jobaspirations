const RESET_FILTERS = {
  location: "",
  industry: "",
  salary: "",
  experience: "",
};

const HeaderFilterBar = ({ filters, setFilters }) => {
  const [data, setData] = useState({
    locations: [],
    industries: [],
    salaries: [],
    experiences: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await axios.get(`${JOB_API_END_POINT}/filters`);
      if (res.data.success) setData(res.data.filters);
    };
    fetchFilters();
  }, []);

  const update = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white border shadow-md rounded-2xl px-6 py-4 w-full md:w-4/5 flex flex-wrap gap-5">

        {/* Location */}
        <select
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        >
          <option value="">All Locations</option>
          {data.locations.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>

        {/* Industry */}
        <select
          value={filters.industry}
          onChange={(e) => update("industry", e.target.value)}
        >
          <option value="">All Industries</option>
          {data.industries.map((ind, i) => (
            <option key={i} value={ind}>{ind}</option>
          ))}
        </select>

        {/* Salary */}
        <select
          value={filters.salary}
          onChange={(e) => update("salary", e.target.value)}
        >
          <option value="">All Salaries</option>
          {data.salaries.map((s, i) => (
            <option key={i} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Experience */}
        <select
          value={filters.experience}
          onChange={(e) => update("experience", e.target.value)}
        >
          <option value="">All Experience</option>
          {data.experiences.map((e, i) => (
            <option key={i} value={e.value}>{e.label}</option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={() => setFilters(RESET_FILTERS)}
          className="px-4 py-2 rounded-xl bg-gray-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default HeaderFilterBar;
