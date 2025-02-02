import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { set, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Form from "@/components/Categories/Form";
import useGetCategories from "@/hooks/useGetCategories";

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const validationRules = {
    name: {
      required: "Harap isi nama kategori",
    },
  };

  const { name } = validationRules;
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  useGetCategories(`${VITE_BACKEND_URL}/api/categories/${id}`, id, setValue);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${VITE_BACKEND_URL}/api/categories/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/categories");
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  return (
    <>
      <MainLayout
        title={"Edit Kategori"}
        to={"/categories"}
        buttonTopText={"Kembali"}
        icon={<ArrowLeftCircleIcon />}
      >
        <Form
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          name={name}
        />
      </MainLayout>
    </>
  );
};

export default Edit;
