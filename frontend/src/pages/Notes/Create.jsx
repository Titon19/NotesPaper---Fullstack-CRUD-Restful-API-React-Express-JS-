import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useGetCategories from "@/hooks/useGetCategories";
import Form from "@/components/Notes/Form";

const Index = () => {
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
    },
  });

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

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { categories } = useGetCategories(`${VITE_BACKEND_URL}/api/categories`);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/notes/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
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
          category_id={category_id}
          title={title}
          content={content}
        />
      </MainLayout>
    </>
  );
};

export default Index;
