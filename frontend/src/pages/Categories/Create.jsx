import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "@/components/Categories/Form";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const onSubmit = async (data) => {
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/categories/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      reset();
      navigate("/categories");
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  return (
    <>
      <MainLayout
        title={"Tambah Kategori"}
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

export default Create;
