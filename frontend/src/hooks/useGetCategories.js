import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategories = (url, id, setValue) => {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(url);
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
  }, [id, setValue]);

  return {
    categories,
    getData,
  };
};

export default useGetCategories;
