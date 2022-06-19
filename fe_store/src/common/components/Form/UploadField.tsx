import { Field } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import tw, { styled } from "twin.macro";
import SvgBin from "../svg/Bin";
import SvgPlus from "../svg/Plus";
import ImagePlaceholder from "assets/images/img_placeholder.jpg";

interface UploadFieldProps {
  index?: number;
  label: string;
  name: string;
  className?: string;
  value?: string | null;
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
  index,
  label,
  name,
  setFieldValue,
  setFieldError,
  value,
  errors,
  className,
}: UploadFieldProps) => {
  // console.log("value", value);
  const [previewImg, setPreviewImg] = useState("");
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
  const handleDeleteImage = () => {
    setPreviewImg("");
    setFieldValue(name, null);
  };

  return (
    <div
      className={`flex flex-col justify-between gap-2 mb-4 text-base ${className}`}
    >
      <label htmlFor="name">{label}*</label>
      <div
        className={`relative border-2 border-light-red rounded-xl overflow-hidden w-full h-full`}
      >
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
        {(value && value !== "null") || previewImg ? (
          <div className="absolute inset-0 rounded-xl shrink-0">
            <img
              src={typeof value === "string" ? value : previewImg}
              alt="product-preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-dark-red rounded-xl shrink-0">
            <img
              src={ImagePlaceholder}
              alt="product-preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <UploadActionArea>
          <ActionButton onClick={() => fileRef.current.click()}>
            <SvgPlus />
          </ActionButton>
          <ActionButton onClick={handleDeleteImage}>
            <SvgBin />
          </ActionButton>
        </UploadActionArea>
      </div>

      <span className="text-light-red text-xs">
        {index && errors && errors.slideImages
          ? errors.slideImages[index]
          : errors.image || ""}
      </span>
    </div>
  );
};

const UploadActionArea = styled.div(
  tw`opacity-0 flex items-center justify-center gap-4 absolute inset-0 hover:opacity-100 hover:bg-overlay hover:pointer-events-auto transition`
);
const ActionButton = styled.div(
  tw`w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-light-red hover:text-white`
);
