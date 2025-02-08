import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
const useGetCategories = (url, id, setValue) => {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(url, {
        withCredentials: true,
      });
      const data = response.data;

      setCategories(data);
      if (setValue && data) {
        setValue("name", data.name);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id, setValue, url]);

  return {
    categories,
    getData,
  };
};

export default useGetCategories;
