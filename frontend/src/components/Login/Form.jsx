import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const Form = ({ onSubmit, register, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-4 ">
        <Input
          {...register("email")}
          className={"w-full"}
          label={"Email"}
          name={"email"}
          placeholder={"Masukkan email..."}
          error={errors.email?.message}
        />
        <Input
          {...register("password")}
          className={"w-full"}
          label={"Password"}
          type={"password"}
          name={"password"}
          placeholder={"Masukkan password..."}
          error={errors.password?.message}
        />
      </div>
      <Button type="submit">LOGIN</Button>
    </form>
  );
};

export default Form;
