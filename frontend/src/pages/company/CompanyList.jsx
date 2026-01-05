// pages/company/CompanyList.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CompanyTable from "../../components/company/CompanyTable";
import { COMPANY_API_END_POINT } from "../../utils/constants";
import FilterBar from "../../components/company/FilterBar";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${COMPANY_API_END_POINT}`, {
        withCredentials: true,
      });

      // console.log(res);

      setCompanies(res.data.companies);
      // setFilteredData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Companies</h1>

        <Link to="/recruiter/companies/create">
          <Button
            className="flex items-center cursor-pointer gap-2"
            onClick={() => navigate("/recruiter/companies/create")}
          >
            <Plus size={18} />
            Add Company
          </Button>
        </Link>
      </div>

      {/* Company Table */}
      {/* <FilterBar /> */}

      <CompanyTable data={companies} loading={loading} />
    </div>
  );
};

export default CompanyList;
