"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import FormInput from "@/components/shared/FormInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/components/shared/Loading";
import { apiRegisterCafe } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import {
  RegisterCafeInput,
  RegisterCafeSchema,
} from "@/lib/validations/cafe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "@/store";
import { Location } from "@/types/Cafe.type";
import CAFE_CATEGORY from "@/constants/CAFE_CATEGORY";
import { useDropzone } from "react-dropzone";

export default function SignUp() {
  const [locations, setLocations] = useState<Location[]>([] as Location[]);
  const [file, setFile] = useState<File[] | undefined>(undefined);
  const [path, setPath] = useState<string>("");
  const store = useStore();
  const router = useRouter();
  const methods = useForm<RegisterCafeInput>({
    resolver: zodResolver(RegisterCafeSchema),
    defaultValues: {
      img: "cafe_placeholder_dc8er7",
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = methods;
  //get data from localhost 3000
  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/location", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong!");
    }

    setLocations(await res.json());
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function compare(a: any, b: any) {
    if (a.location < b.location) {
      return -1;
    }
    if (a.location > b.location) {
      return 1;
    }
    return 0;
  }

  const ImageUpload = () => {
    const onDrop = useCallback((acceptedImages: File[]) => {
      setFile(acceptedImages);
      setPath(URL.createObjectURL(acceptedImages[0]));
      setValue("img", "true");
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div
        {...getRootProps()}
        className="p-4 bg-white rounded-xl h-96 flex justify-center items-center"
      >
        <input {...getInputProps()} />
        {path ? (
          <img src={path} height={350} width={350} />
        ) : (
          <div>
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag 'n' drop some file here, or click to select file...</p>
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterCafeFunction(credentials: RegisterCafeInput) {
    store.setRequestLoading(true);
    if (!file) {
      console.error("No image selected");
      return;
    }
    const formData = new FormData();

    formData.append("file", file[0]);

    formData.append("upload_preset", "feriptks");

    try {
      store.setRequestLoading(true);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/devlognxn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const values = {
        ...credentials,
        img: data.public_id,
      };
      try {
        const cafe = await apiRegisterCafe(JSON.stringify(values));
        if (cafe) {
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
      }
    } catch (error) {
      console.error(error)
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<RegisterCafeInput> = (values) => {
    console.log(values);
    RegisterCafeFunction(values);
  };

  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/2 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">Sign Up</h1>
        <p>Sign up and hop on to the food journey!</p>
        <div className="flex flex-row justify-around w-full">
          <div className="flex justify-center h-auto w-full flex-col items-center gap-2 text-[#778ccc]">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
              >
                <FormInput label="Name" name="name" />
                <FormInput label="Email" name="email" type="email" />
                <FormInput label="Password" name="password" type="password" />
                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <FormInput label="Phone Number" name="phoneNo" />
                <div>
                  <label
                    htmlFor={"locId"}
                    className="block text-ct-blue-600 mb-3"
                  >
                    Location
                  </label>
                  <select
                    {...register("locId")}
                    className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
                  >
                    <option value="" selected disabled hidden>
                      Select one
                    </option>
                    {locations.sort(compare).map((loc) => (
                      <option id={loc.id} value={loc.id}>
                        {`${loc.location}`}
                      </option>
                    ))}
                  </select>
                  {errors["locId"] && (
                    <span className="text-red-500 text-xs pt-1 block">
                      {errors["locId"]?.message as string}
                    </span>
                  )}
                </div>
                <FormInput label="Operating hour" name="operatingHour" />
                <div>
                  <label
                    htmlFor={"cafeCategory"}
                    className="block text-ct-blue-600 mb-3"
                  >
                    Cafe Category
                  </label>
                  <select
                    {...register("cafeCategory")}
                    className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
                  >
                    <option value="" selected disabled hidden>
                      Select one
                    </option>
                    {(Object.keys(CAFE_CATEGORY) as Array<CAFE_CATEGORY>).map(
                      (cat) => (
                        <option id={cat} value={cat}>
                          {cat}
                        </option>
                      )
                    )}
                  </select>
                  {errors["cafeCategory"] && (
                    <span className="text-red-500 text-xs pt-1 block">
                      {errors["cafeCategory"]?.message as string}
                    </span>
                  )}
                </div>

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
          <div className="w-full pt-8">
            <h1 className="pb-5">Image</h1>
            <div className="flex items-center bg-[#C2D7F3] p-10 w-full gap-5 rounded-2xl h-1/2">
              <div className=" flex flex-col">
                {/* <h1 className="text-xl font-bold pl-5 pb-3">Image</h1> */}
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
