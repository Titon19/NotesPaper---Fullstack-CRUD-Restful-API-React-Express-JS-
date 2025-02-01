import React from "react";
import SelectOption from "../Items/SelectOption";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const Form = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
  control,
  categories,
  category_id,
  title,
  content,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-4">
        <Input
          {...register("title", title)}
          label={"Judul"}
          name={"title"}
          placeholder={"Masukkan judul..."}
          error={errors.title?.message}
        />
        <Input
          {...register("content", content)}
          label={"Konten"}
          name={"content"}
          placeholder={"Masukkan konten..."}
          error={errors.content?.message}
        />

        <SelectOption
          name={"category_id"}
          control={control}
          datas={categories}
          rules={category_id}
          label={"Kategori"}
          dataKey={"name"}
          placeholder={"--Pilih kategori--"}
          error={errors.category_id?.message}
        />
      </div>
      <Button type="submit">Simpan</Button>
    </form>
  );
};

export default Form;
