"use client";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Link from "next/link";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { apiUpdateCafe, apiUpdateRider } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import useSession from "@/lib/useSession";
import {
  UpdateCafeInput,
  UpdateCafeSchema,
} from "@/lib/validations/cafe.schema";
import { UpdateRiderInput } from "@/lib/validations/rider.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "@/store";
import CAFE_CATEGORY from "@/constants/CAFE_CATEGORY";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import FormInput from "../shared/FormInput";
import { Location } from "@/types/Cafe.type";
import Loading from "../shared/Loading";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

export default function Profile() {
  const [locations, setLocations] = React.useState<Location[]>(
    [] as Location[]
  );
  const user = useSession();
  const store = useStore();
  const router = useRouter();
  const [file, setFile] = React.useState<File[] | undefined>(undefined);
  const [path, setPath] = React.useState<string>("");
  const methods = useForm<UpdateCafeInput>({
    resolver: zodResolver(UpdateCafeSchema),
    defaultValues: {
      img: user?.cafe?.img,
      name: user?.cafe?.name,
      phoneNo: user?.cafe?.phoneNo,
      locId: user?.cafe?.locId,
      operatingHour: user?.cafe?.operatingHour,
      cafeCategory: user?.cafe?.cafeCategory as CAFE_CATEGORY,
    },
  });

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

  useEffect(() => {
    setValue("locId", user?.cafe?.locId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

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
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const ImageUpload = () => {
    const onDrop = React.useCallback((acceptedImages: File[]) => {
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
        ) : user?.cafe?.img ? (
          <img
            src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${user?.cafe?.img}.jpg`}
            height={350}
            width={350}
          />
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

  async function UpdateCafeFunction(credentials: UpdateCafeInput) {
    if (!file) {
      if (!user?.cafe?.img) {
        console.error("No image selected");
        return;
      } else {
        try {
          store.setRequestLoading(true);
          const img = await apiUpdateCafe(
            JSON.stringify(credentials),
            user?.cafe?.id
          );
          if (img) {
            toast.success("Cafe profile updated!");
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
    } else {
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
          const img = await apiUpdateCafe(
            JSON.stringify(values),
            user?.cafe?.id as string
          );
          if (img) {
            toast.success("Cafe profile updated");
            return window.location.reload();
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
        console.error(error);
      } finally {
        store.setRequestLoading(false);
      }
    }
  }

  const onSubmitHandler: SubmitHandler<UpdateCafeInput> = (values) => {
    UpdateCafeFunction(values);
  };

  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/2 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-4xl pb-5">Cafe Information</h1>
        <div className="flex flex-row justify-around w-full">
          <div className="flex justify-center h-auto w-full flex-col items-center gap-2 text-[#778ccc]">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
              >
                <FormInput label="Name" name="name" />

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
                  Save
                </Button>
              </form>
            </FormProvider>
          </div>
          <div className="w-full pt-8">
            <h1 className="pb-5">Image</h1>
            <div className="flex justify-center items-center bg-[#C2D7F3] p-10 w-full gap-5 rounded-2xl h-full">
              <div className=" flex flex-col">
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
