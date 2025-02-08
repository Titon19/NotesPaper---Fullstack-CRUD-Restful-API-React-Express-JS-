import MainLayout from "../../layouts/MainLayout";
import axiosInstance from "../../../lib/axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useGetCategories from "@/hooks/useGetCategories";
import Form from "@/components/Notes/Form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VITE_BACKEND_URL } from "../../../lib/config";

const Index = () => {
  const navigate = useNavigate();
  const { categories } = useGetCategories(`${VITE_BACKEND_URL}/api/categories`);
  const [imagePreview, setImagePreview] = useState(null);

  const validationRules = z.object({
    title: z.string().min(1, "Harap isi judul"),
    content: z.string().min(1, "Harap isi konten"),
    category_id: z.string().min(1, "Harap pilih kategori"),
    image: z
      .any()
      .refine(
        (file) =>
          !file || (file instanceof File && file.type.startsWith("image/")),
        {
          message: "File harus berupa gambar",
        }
      )
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      category_id: "",
      image: null,
    },
    resolver: zodResolver(validationRules),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImagePreview(
      file.type.startsWith("image/") && URL.createObjectURL(file)
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category_id", data.category_id);
    data.image?.[0] && formData.append("image", data.image[0]);

    try {
      await axiosInstance.post(`${VITE_BACKEND_URL}/api/notes/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      reset();
      navigate("/notes");
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  return (
    <>
      <MainLayout
        title={"Tambah Notes"}
        to={"/notes"}
        buttonTopText={"Kembali"}
        icon={<ArrowLeftCircleIcon />}
      >
        <Form
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          categories={categories}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        />
      </MainLayout>
    </>
  );
};

export default Index;
