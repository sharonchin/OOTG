"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import FormInput from "@/components/shared/FormInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/components/shared/Loading";
import { apiRegisterRider } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import {
  RegisterRiderInput,
  RegisterRiderSchema,
} from "@/lib/validations/rider.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "@/store";
import DELIVERY_MODE from "@/constants/DELIVERY_MODE";

export default function SignUp() {
  const store = useStore();
  const router = useRouter();
  const methods = useForm<RegisterRiderInput>({
    resolver: zodResolver(RegisterRiderSchema),
  });

  function compare(a: any, b: any) {
    if (a.location < b.location) {
      return -1;
    }
    if (a.location > b.location) {
      return 1;
    }
    return 0;
  }

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

  async function RegisterRiderFunction(credentials: RegisterRiderInput) {
    store.setRequestLoading(true);
    //   console.log(credentials);
    try {
      const rider = await apiRegisterRider(JSON.stringify(credentials));
      if (rider) {
        toast.success("User registered successfully!");
        return router.push("/login");
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

  const onSubmitHandler: SubmitHandler<RegisterRiderInput> = (values) => {
    console.log(values);
    RegisterRiderFunction(values);
  };

  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">Sign Up</h1>
        <p>Sign up and hop on to the food journey!</p>
        <div className="flex justify-center h-auto w-full flex-col items-center gap-2 text-[#778ccc]">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
            >
              <FormInput label="First Name" name="firstName" />
              <FormInput label="Last Name" name="lastName" />
              <FormInput label="Email" name="email" type="email" />
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <FormInput label="Phone Number" name="phoneNo" />
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
                Register
              </Button>
            </form>
          </FormProvider>
          <div className="flex justify-center items-center flex-row pt-10">
            <h1>Already have an account?</h1>
            <Link href="/">
              <h1 className="text-black pl-2">Login</h1>
            </Link>
          </div>
        </div>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
