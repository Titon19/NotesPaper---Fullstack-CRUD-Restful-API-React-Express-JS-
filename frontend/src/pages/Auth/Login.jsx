import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/Login/Form";
import axiosInstance from "../../../lib/axios";
const Login = () => {
  const navigate = useNavigate();

  const validationRules = z.object({
    email: z.string().min(1, "Harap isi email"),
    password: z.string().min(1, "Harap isi password minimal 8 karakter"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(validationRules),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);

      navigate("/");
      reset();
      return response.data;
    } catch (error) {
      console.log(error || "Login gagal");
    }
  };

  return (
    <>
      <MainLayout title={"NewsPaper"}>
        <div className="min-h-96 w-full flex items-center justify-center">
          <div className="w-1/2 flex flex-col gap-3 border-2 border-dashed border-neutral-950 rounded-xl p-12">
            <h1 className="text-3xl font-bold">Login</h1>
            <Form
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Login;
