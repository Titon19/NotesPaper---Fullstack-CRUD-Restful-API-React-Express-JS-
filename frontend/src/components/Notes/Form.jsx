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
  handleImageChange,
  imagePreview,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-4">
        <Input
          {...register("title")}
          className={"w-full md:w-3/4"}
          label={"Judul"}
          name={"title"}
          placeholder={"Masukkan judul..."}
          error={errors.title?.message}
        />
        <Input
          {...register("content")}
          className={"w-full md:w-3/4"}
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
        <Input
          {...register("image")}
          className={"w-full md:w-3/4"}
          onChange={handleImageChange}
          label={"Gambar"}
          type={"file"}
          accept="image/*"
          name={"image"}
          error={errors.image?.message}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            width={100}
            height={100}
            className="rounded-xl"
            alt="preview"
          />
        )}
      </div>
      <Button type="submit">Simpan</Button>
    </form>
  );
};

export default Form;
