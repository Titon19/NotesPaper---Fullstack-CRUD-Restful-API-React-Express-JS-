import MainLayout from "../../layouts/MainLayout";
import axiosInstance from "../../../lib/axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Form from "@/components/Categories/Form";
import useGetCategories from "@/hooks/useGetCategories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VITE_BACKEND_URL } from "../../../lib/config";

const Edit = () => {
  const validationRules = z.object({
    name: z.string().min(1, "Harap isi nama kategori"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(validationRules),
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useGetCategories(`${VITE_BACKEND_URL}/api/categories/${id}`, id, setValue);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(
        `${VITE_BACKEND_URL}/api/categories/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
        />
      </MainLayout>
    </>
  );
};

export default Edit;
