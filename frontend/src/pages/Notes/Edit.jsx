import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetCategories from "@/hooks/useGetCategories";
import Form from "@/components/Notes/Form";
const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useGetCategories(
    `${VITE_BACKEND_URL}/api/categories/`
  );

  const validationRules = {
    title: {
      required: "Harap isi judul",
    },
    content: {
      required: "Harap isi konten",
    },
    category_id: {
      required: "Harap pilih kategori",
    },
  };

  const { title, content, category_id } = validationRules;

  const getData = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/notes/${id}`);
      const notes = response.data;

      setValue("title", notes.title);
      setValue("content", notes.content);
      setValue("category_id", notes.category_id);
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${VITE_BACKEND_URL}/api/notes/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
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
          category_id={category_id}
          title={title}
          content={content}
        />
      </MainLayout>
    </>
  );
};

export default Edit;
