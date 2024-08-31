import React from "react";

interface FormInputProps {
  name: string;
  data: { [key: string]: any }; // or more specifically: Record<string, string>
  inputName: string;
  handleChange: (name: string, value: string) => void;
  errors: { [key: string]: string };
  type: string;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  data,
  inputName,
  handleChange,
  errors,
  type,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
        {name}
      </p>
      <input
        name={inputName}
        type={type}
        className="block w-full rounded-[15px] border-0 py-2.5 pl-3 text-[14px] md:text-[14px] font-normal text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#64728C] mt-2 focus:outline-[#bdbdbd] focus:ring-1 focus:ring-inset font-poppins"
        value={data[inputName] || ""}
        onChange={(e) => handleChange(inputName, e.target.value)}
        placeholder={placeholder}
      />
      {errors[inputName] && (
        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
          {errors[inputName]}
        </p>
      )}
    </div>
  );
};
