"use client";
import { useState } from "react";
import { InputItem } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const initialFormData = {
    username: "",
    password: "",
  };

  const { token } = useAuth();

  console.log("JWT Token:", token);

  const router = useRouter();
  const { setToken } = useAuth(); // Use setToken from context

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || "Login failed" });
      } else {
        setToken(data.token); // Save the token in context
        router.push("/home", { scroll: false });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors({ form: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputItems = [
    {
      name: "Username",
      inputName: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "Password",
      inputName: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[40%] flex items-center">
        <div className="flex items-center flex-col w-full border border-1 border-[#B9B9B9] py-10 md:py-12 md:p-12 p-5 rounded-[15px] mb-20">
          <h3 className="font-poppins text-[#64728C] font-bold leading-9 md:leading-[20px] text-[32px] text-center">
            Sign In
          </h3>
          <h4 className="font-nunito font-semibold text-[#64728C] leading-[24px] text-[18px] mt-2">
            Sign In to continue
          </h4>
          {errors.form && (
            <p className="text-red-500 text-center font-poppins font-medium">
              {errors.form}
            </p>
          )}
          <div className="w-full flex justify-between flex-col gap-6 mt-5 md:mt-10">
            {inputItems.map((item, itemIndex) => (
              <div className="w-full" key={itemIndex}>
                <InputItem
                  data={formData}
                  type={item.type}
                  errors={errors}
                  handleChange={handleChange}
                  name={item.inputName}
                  placeholder={item.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between mt-5 md:mt-8 w-full">
            <div
              className={`w-[80%] bg-[#FF8828] mx-auto flex justify-center p-3 text-[15px] md:text-[20px] text-white font-bold font-nunito leading-[28px] rounded-[10px] mt-5 md:mt-8 cursor-pointer ${
                isSubmitting ? "opacity-50" : ""
              }`}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </div>
          </div>
          <div className="mt-5 md:mt-8 text-[14px] md:text-[18px] leading-[24px] font-nunito font-semibold text-[#202224]">
            Don't have an account?{" "}
            <a
              className="text-[#FF8828] underline cursor-pointer"
              href="/register"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
