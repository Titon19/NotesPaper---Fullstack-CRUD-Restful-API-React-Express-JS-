import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategories = (url) => {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    categories,
    getData,
  };
};

export default useGetCategories;
