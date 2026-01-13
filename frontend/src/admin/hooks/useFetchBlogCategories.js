import { useEffect, useState } from "react";
import axios from "axios";
import { CATEGORY_API_END_POINT } from "../../utils/constants";

export const useFetchBlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(CATEGORY_API_END_POINT);
      setCategories(res.data?.categories || res.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, fetchCategories };
};
