import { ErrorMessage, Field } from "formik";
import { ChangeEvent, useState } from "react";

interface UploadFieldProps {
  label: string;
  name: string;
  className?: string;
  setFieldValue: (field: string, value: any) => void;
  setFieldError: (field: string, value: any) => void;
}

const validateUpload = (file: File) => {
  const extArray = ["jpeg", "jpg", "png", "gif"];
  const ext = file.type.slice(6);

  if (extArray.indexOf(ext) === -1) {
    return "File type is incorrect";
  }

  if (file.size > 1024 ** 2) {
    return "File must be under 1Mb";
  }

  return null;
};

export const UploadField = ({
  label,
  name,
  setFieldValue,
  setFieldError,
}: UploadFieldProps) => {
  const [previewImg, setPreviewImg] = useState("");
  const handleImageChange = (e: ChangeEvent<any>) => {
    if (e.target && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file", file);
      const validMessage = validateUpload(file);
      if (validMessage) {
        setFieldError(name, validMessage);
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreviewImg(previewUrl);
        setFieldValue(name, file);
      }
    }
  };
  return (
    <div className="flex flex-col gap-2 mb-4 text-base">
      <label htmlFor="name">{label}*</label>

      <Field
        name={name}
        type="file"
        className="border py-2 px-4 rounded text-sm"
        onChange={handleImageChange}
        accept="image/*"
        value=""
      />
      {previewImg && <img src={previewImg} alt="product-preview" />}
      <ErrorMessage
        name={name}
        component="div"
        className={`text-light-red text-xs`}
      />
    </div>
  );
};
