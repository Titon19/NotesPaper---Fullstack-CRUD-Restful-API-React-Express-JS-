import MainLayout from "../../layouts/MainLayout";
import axiosInstance from "../../../lib/axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Form from "@/components/Categories/Form";
import { VITE_BACKEND_URL } from "../../../lib/config";

const Create = () => {
  const validationRules = z.object({
    name: z.string().min(1, "Harap isi nama kategori"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },

    resolver: zodResolver(validationRules),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(`${VITE_BACKEND_URL}/api/categories/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
        />
      </MainLayout>
    </>
  );
};

export default Create;
