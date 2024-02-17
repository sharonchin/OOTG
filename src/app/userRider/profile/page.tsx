"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import FormInput from "@/components/shared/FormInput";
import DELIVERY_MODE from "@/constants/DELIVERY_MODE";
import { errors } from "jose";
import { register } from "module";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { apiRegisterRider, apiUpdateRider } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import {
  RegisterRiderInput,
  RegisterRiderSchema,
  UpdateRiderInput,
  UpdateRiderSchema,
} from "@/lib/validations/rider.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useStore from "@/store";
import useSession from "@/lib/useSession";
import Loading from "@/components/shared/Loading";

export default function Profile() {
  const user = useSession();
  const store = useStore();
  const methods = useForm<UpdateRiderInput>({
    resolver: zodResolver(UpdateRiderSchema),
    defaultValues: {
      firstName: user?.rider?.firstName,
      lastName: user?.rider?.lastName,
      phoneNo: user?.rider?.phoneNo,
      deliveryMode: user?.rider?.deliveryMode as DELIVERY_MODE,
      vehicleNo: user?.rider?.vehicleNo,
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

  async function UpdateRiderFunction(credentials: UpdateRiderInput) {
    //   console.log(credentials);
    try {
      store.setRequestLoading(true);
      const rider = await apiUpdateRider(
        JSON.stringify(credentials),
        user?.rider?.id as string
      );
      if (rider) {
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

  const onSubmitHandler: SubmitHandler<UpdateRiderInput> = (values) => {
    console.log(values);
    UpdateRiderFunction(values);
  };

  return (
    <div className="h-auto w-full flex justify-center pt-20">
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
              <div className="flex flex-col justify-around">
                <label
                  htmlFor={"deliveryMode"}
                  className="block text-ct-blue-600 mb-3"
                >
                  Mode of Delivery
                </label>
                <div className="flex flex-row justify-around">
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"CAR" as DELIVERY_MODE}
                        {...register("deliveryMode")}
                      />
                      <h1 className="pl-2">Car</h1>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"MOTORCYCLE" as DELIVERY_MODE}
                        {...register("deliveryMode")}
                      />
                      <h1 className="pl-2">Motorcycle</h1>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"BYFOOT" as DELIVERY_MODE}
                        {...register("deliveryMode")}
                      />
                      <h1 className="pl-2">By Foot</h1>
                    </div>
                  </label>
                </div>
                {errors["deliveryMode"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["deliveryMode"]?.message as string}
                  </span>
                )}
              </div>
              <FormInput
                label="Vehicle Number"
                name="vehicleNo"
                placeholder="If by foot, input '-'"
              />

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
      {store.requestLoading && <Loading />}
    </div>
  );
}
