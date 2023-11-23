"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import {
  LoginStudentInput,
  LoginStudentSchema,
} from "@/lib/validations/student.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginStudent } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const store = useStore();
  const router = useRouter();
  const methods = useForm<LoginStudentInput>({
    resolver: zodResolver(LoginStudentSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function LoginStudentFunction(credentials: LoginStudentInput) {
    store.setRequestLoading(true);
    console.log(credentials);
    try {
      await apiLoginStudent(JSON.stringify(credentials));

      toast.success("Logged in successfully");
      return router.push("/");
    } catch (error: any) {
      console.log(error);
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

  const onSubmitHandler: SubmitHandler<LoginStudentInput> = (values) => {
    console.log(values);
    LoginStudentFunction(values);
  };

  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">Sign In</h1>
        <p>Sign in to start your food adventure</p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              className="normal-case bg-[#778ccc] text-white hover:bg-[#492cb1]"
            >
              Login
            </Button>
          </form>
        </FormProvider>
        <div className="flex justify-between w-full items-center">
          <Link href="/forgotPassword">
            <h1>
              <em>Forgot password?</em>
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-row pt-10">
          <h1>Don't have an account?</h1>
          <Link href="/signUp">
            <h1 className="text-black pl-2">Sign Up</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
