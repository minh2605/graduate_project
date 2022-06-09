import { ErrorMessage, Field, FormikErrors } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import tw, { styled } from "twin.macro";
import SvgBin from "../svg/Bin";
import SvgPlus from "../svg/Plus";

interface UploadFieldProps {
  label: string;
  name: string;
  className?: string;
  value?: string;
  errors?: any;
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
  value,
  errors,
}: UploadFieldProps) => {
  console.log("errors");
  const [previewImg, setPreviewImg] = useState(value || "");
  const fileRef = useRef<any>(null);
  const handleImageChange = (e: ChangeEvent<any>) => {
    if (e.target && e.target.files[0]) {
      const file = e.target.files[0];
      const validMessage = validateUpload(file);
      if (validMessage) {
        setFieldError(name, validMessage);
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreviewImg(previewUrl);
        setFieldError(name, "");
        setFieldValue(name, file);
      }
    }
  };
  return (
    <div className="flex flex-col gap-2 mb-4 text-base">
      <label htmlFor="name">{label}*</label>

      <div className="relative h-60 w-96 border-2 border-light-red rounded-xl overflow-hidden">
        <Field
          name={name}
          type="file"
          className="border py-2 px-4 rounded text-sm"
          onChange={handleImageChange}
          accept="image/*"
          value=""
          hidden
          innerRef={fileRef}
        />
        {previewImg && (
          <div className="absolute inset-0 bg-dark-red">
            <img
              src={previewImg}
              alt="product-preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <UploadActionArea>
          <ActionButton onClick={() => fileRef.current.click()}>
            <SvgPlus />
          </ActionButton>
          <ActionButton onClick={() => setPreviewImg("")}>
            <SvgBin />
          </ActionButton>
        </UploadActionArea>
      </div>
      <span className="text-light-red text-xs">{errors.image}</span>
    </div>
  );
};

const UploadActionArea = styled.div(
  tw`opacity-0 flex items-center justify-center gap-4 absolute inset-0 hover:opacity-100 hover:bg-overlay hover:pointer-events-auto transition`
);
const ActionButton = styled.div(
  tw`w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-light-red hover:text-white`
);
