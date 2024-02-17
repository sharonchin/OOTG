"use client";

import Button from "@mui/material/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateStudentInput,
  UpdateStudentSchema,
} from "@/lib/validations/student.schema";
import useSession from "@/lib/useSession";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useStore from "@/store";
import { useEffect } from "react";
import { apiUpdateStudent } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import toast from "react-hot-toast";
import FormInput from "@/components/shared/FormInput";

export default function Profile() {
  const user = useSession();
  const store = useStore();
  const methods = useForm<UpdateStudentInput>({
    resolver: zodResolver(UpdateStudentSchema),
    defaultValues: {
      firstName: user?.student?.firstName,
      lastName: user?.student?.lastName,
      phoneNo: user?.student?.phoneNo,
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function UpdateStudentFunction(credentials: UpdateStudentInput) {
    try {
      store.setRequestLoading(true);
      const student = await apiUpdateStudent(
        JSON.stringify(credentials),
        user?.student?.id as string
      );
      if (student) {
        toast.success("User updated successfully!");
        return window.location.reload();
      }
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<UpdateStudentInput> = (values) => {
    UpdateStudentFunction(values);
  };

  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">My Profile</h1>

        <div className="flex justify-center h-auto w-full flex-col items-center gap-2 text-[#778ccc]">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
            >
              <FormInput label="First Name" name="firstName" />
              <FormInput label="Last Name" name="lastName" />
              <FormInput label="Phone Number" name="phoneNo" />

              <Button
                type="submit"
                variant="outlined"
                fullWidth
                className="normal-case bg-[#778ccc] text-white hover:bg-[#492cb1]"
              >
                Save
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
