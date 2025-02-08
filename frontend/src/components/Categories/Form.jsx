import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const Form = ({ onSubmit, register, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-4">
        <Input
          {...register("name")}
          label={"Nama Kategori"}
          name={"name"}
          placeholder={"Masukkan nama kategori..."}
          error={errors.name?.message}
        />
      </div>
      <Button type="submit">Simpan</Button>
    </form>
  );
};

export default Form;
