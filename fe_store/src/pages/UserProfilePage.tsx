import { Button } from "common/components/Button";
import { InputField } from "common/components/Form/InputField";
import { RequiredErrorMessage } from "features/Products/ProductCreatePopup";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import API from "api/axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { getInitialsFromName } from "common/utils/common";
import { useLoading } from "hooks/useLoading";
export interface UserInfoProps {
  account_id: string;
  name: string;
  address?: string;
  city?: string;
  birthday?: Date | string;
  gender?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userInfoSchema: yup.SchemaOf<UserInfoProps> = yup.object().shape({
  name: yup.string().required(RequiredErrorMessage),
  account_id: yup.string().required(RequiredErrorMessage),
  address: yup.string().notRequired(),
  city: yup.string().notRequired(),
  avatar: yup.string().notRequired(),
  birthday: yup.date().notRequired(),
  gender: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});
export const UserProfilePage = (): JSX.Element => {
  const { currentUserProfile } = useAuth();
  const [profileInfo, setProfileInfo] = useState<UserInfoProps>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      const data: UserInfoProps = await API.get(
        `user/account/${currentUserProfile?.account_id}`
      );
      const profileData = {
        account_id: data.account_id,
        name: data.name,
        address: data.address ?? "",
        city: data.city ?? "",
        birthday: data.birthday?.toString().slice(0, 10) ?? "",
        gender: data?.gender?.toString() ?? "",
        avatar: data.avatar ?? "",
      };
      setProfileInfo(profileData);
    };
    fetchData();
  }, [currentUserProfile?.account_id]);

  const initialValues = profileInfo ?? {
    account_id: "",
    name: "",
    address: "",
    city: "",
    birthday: "",
    gender: false,
    avatar: "",
  };
  const handleUpdateProfile = async (values: FormikValues) => {
    console.log("values submit", values);
    try {
      showLoading();
      await API.put(`user/account/${currentUserProfile?.account_id}`, values);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  return (
    <div>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={userInfoSchema}
        onSubmit={(values) => {
          handleUpdateProfile(values);
        }}
        enableReinitialize
      >
        {({ values }) => {
          return (
            <Form
              autoComplete="off"
              noValidate
              className="flex flex-col font-medium"
            >
              <div className="px-20 flex flex-col">
                <div className="flex items-center">
                  <div className="basis-1/2">
                    <div className="flex justify-between items-center gap-2 mb-4 text-base">
                      <InputField
                        name="name"
                        label="Name*"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-4 text-base">
                      <InputField
                        name="address"
                        label="Address"
                        className="basis-1/2"
                      />
                      <InputField
                        name="city"
                        label="City"
                        className="basis-1/2"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-4 text-base">
                      <InputField
                        name="birthday"
                        label="Birthday"
                        className="basis-1/2"
                        type="date"
                      />
                      <div className="flex items-center justify-evenly gap-2 basis-1/2">
                        <div className="flex items-center gap-2">
                          <label htmlFor="radio-male">Male</label>
                          <Field
                            type="radio"
                            name="gender"
                            id="radio-male"
                            value="true"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="radio-female">Female</label>
                          <Field
                            type="radio"
                            name="gender"
                            id="radio-female"
                            value="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2 flex flex-col items-center">
                    {currentUserProfile?.avatar ? (
                      <div className="w-40 h-40 rounded-full overflow-hidden mb-2">
                        <img
                          src={currentUserProfile.avatar}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 w-40 rounded-full flex items-center justify-center bg-light-red text-white font-medium cursor-pointer mb-2">
                        <span className="text-h1">
                          {getInitialsFromName(currentUserProfile?.name)}
                        </span>
                      </div>
                    )}

                    <div>
                      <span>{currentUserProfile?.email}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="flex items-center gap-4 w-64 justify-center mt-2 mb-4 mx-auto"
                  type="submit"
                >
                  <span>Save</span>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
