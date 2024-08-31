"use client";
import { FormInput } from "@/components/FormInput";
import { useState } from "react";

export default function AddBook() {
  const initialFormData = {
    auth_id: 1,
    title: "",
    publication_year: "",
    genre: "",
    image: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (inputName: string, value: string) => {
    setFormData({ ...formData, [inputName]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required.";
    }

    if (!formData.publication_year.trim()) {
      newErrors.publication_year = "Publication year is required.";
    } else if (
      !/^\d{4}$/.test(formData.publication_year) ||
      parseInt(formData.publication_year) > new Date().getFullYear()
    ) {
      newErrors.publication_year = "Please enter a valid year.";
    }

    if (!formData.image) {
      newErrors.image = "Please upload an image.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("auth_id", formData.auth_id.toString());
    formDataToSend.append("title", formData.title);
    formDataToSend.append("publication_year", formData.publication_year);
    formDataToSend.append("genre", formData.genre);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("/api/protected/books", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to upload:", data);
        setErrors({ form: "Failed to save the book data." });
      } else {
        const data = await response.json();
        console.log("Success:", data);
        // Clear the form or redirect as needed
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors({ form: "An unexpected error occurred." });
    }
  };

  const inputItems = [
    {
      name: "Title*",
      inputName: "title",
      type: "text",
      placeholder: "Enter the book title...",
    },
    {
      name: "Genre*",
      inputName: "genre",
      type: "text",
      placeholder: "Enter the book genre...",
    },
    {
      name: "Publication Year*",
      inputName: "publication_year",
      type: "text",
      placeholder: "Enter the publication year...",
    },
  ];

  return (
    <section className="pb-12 mt-8">
      <div className="w-full bg-white rounded-[15px] md:px-[30px] px-[4%] pt-[20px] pb-[40px]">
        <div className="flex items-center gap-4">
          <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
            New Book
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-10 flex-wrap">
            {inputItems.map((item, itemIndex) => (
              <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                <FormInput
                  data={formData}
                  type={item.type}
                  errors={errors}
                  handleChange={handleChange}
                  name={item.name}
                  inputName={item.inputName}
                  placeholder={item.placeholder}
                />
              </div>
            ))}

            {/* Image Upload */}
            <div className="md:w-[30%] w-full mb-3">
              <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                Upload Image*
              </p>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-[14px] md:text-[14px] font-normal text-gray-900 mt-2"
                onChange={handleFileChange}
              />
              {errors.image && (
                <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                  {errors.image}
                </p>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded-[12px] object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="font-poppins font-normal text-[12px] leading-[18px] text-[#64728C] text-opacity-70 md:mt-5 mt-3">
            *Required Field
          </div>
          <div className="flex justify-end gap-5 md:mt-0 mt-7">
            <button
              className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] text-[#10275E] hover:opacity-80"
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setImagePreview(null);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] flex items-center justify-center gap-2 text-[#10275E] hover:opacity-80"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
