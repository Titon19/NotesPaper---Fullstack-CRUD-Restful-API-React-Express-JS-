import MainLayout from "../../layouts/MainLayout";
import axiosInstance from "../../../lib/axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetCategories from "@/hooks/useGetCategories";
import Form from "@/components/Notes/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VITE_BACKEND_URL } from "../../../lib/config";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useGetCategories(
    `${VITE_BACKEND_URL}/api/categories/`
  );
  const [imagePreview, setImagePreview] = useState(null);

  const validationRules = z.object({
    title: z.string().min(1, "Harap isi judul"),
    content: z.string().min(1, "Harap isi konten"),
    category_id: z.string().min(1, "Harap pilih kategori"),
    image: z
      .any()
      .refine((file) => !file || file.type.startsWith("image/"), {
        message: "File harus berupa gambar",
      })
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(validationRules),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImagePreview(
      file.type.startsWith("image/") && URL.createObjectURL(file)
    );
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `${VITE_BACKEND_URL}/api/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      const notes = response.data;

      setValue("title", notes.title);
      setValue("content", notes.content);
      setValue("category_id", notes.category_id);

      setValue("image", notes.image || null);
      console.log(notes.image);

      setImagePreview(notes.image ? `${VITE_BACKEND_URL}${notes.image}` : null);
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category_id", data.category_id);
    data.image?.[0] && formData.append("image", data.image[0]);

    try {
      await axiosInstance.put(`${VITE_BACKEND_URL}/api/notes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      navigate("/notes");
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  return (
    <>
      <MainLayout
        title={"Edit Note"}
        to="/notes"
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

export default Edit;
