import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const SelectOption = ({
  name,
  control,
  rules,
  label,
  placeholder,
  datas,
  errors,
  dataKey,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error: errors } }) => {
        return (
          <Select
            className="mb-4"
            onValueChange={field.onChange}
            value={field.value || ""}
          >
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {datas.map((data) => (
                  <SelectItem
                    key={data.id}
                    value={data.id.toString()}
                    className="cursor-pointer"
                  >
                    {data[dataKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectGroup>
            {errors && <span className="text-red-500">{errors.message}</span>}
          </Select>
        );
      }}
    />
  );
};

export default SelectOption;
