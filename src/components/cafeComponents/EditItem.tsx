"use client";
import * as React from "react";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import FormInput from "../shared/FormInput";
import AVAILABILITY from "@/constants/AVAILABILITY";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import error from "next/error";
import toast from "react-hot-toast";
import PRODUCT_CATEGORY from "@/constants/PRODUCT_CATEGORY";
import { apiUpdateProduct } from "@/lib/api-requests";
import {
  UpdateProductInput,
  ProductUpdateSchema,
} from "@/lib/validations/product.schema";
import { Product } from "@/types/Product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../shared/Loading";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

interface EditItemProps {
  product: Product;
}

const EditItem = ({ product }: EditItemProps) => {
  const [file, setFile] = React.useState<File[] | undefined>(undefined);
  const [path, setPath] = React.useState<string>("");
  const store = useStore();
  const router = useRouter();
  //   const [product, setProduct] = React.useState<Product>({} as Product);
  const methods = useForm<UpdateProductInput>({
    resolver: zodResolver(ProductUpdateSchema),
    defaultValues: {
      img: product?.img,
      name: product?.name,
      price: product?.price,
      desc: product?.desc,
      productCategory: product?.productCategory as PRODUCT_CATEGORY,
    },
  });

  React.useEffect(() => {
    setValue("name", product?.name);
    setValue("price", product?.price);
    setValue("desc", product?.desc);
    setValue("productCategory", product?.productCategory as PRODUCT_CATEGORY);
    setValue("img", product?.img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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
        ) : product.img ? (
          <img
            src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${product.img}.jpg`}
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

  async function EditItemFunction(credentials: UpdateProductInput) {
    if (!file) {
      if (!product?.img) {
        console.error("No image selected");
        return;
      } else {
        try {
          store.setRequestLoading(true);
          const img = await apiUpdateProduct(
            JSON.stringify(credentials),
            product?.id
          );
          if (img) {
            toast.success("Product updated!");
            return router.push("/userCafe/management/item");
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
          const img = await apiUpdateProduct(
            JSON.stringify(values),
            product?.id
          );
          if (img) {
            toast.success("Image uploaded");
            return router.push("/userCafe/management/item");
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

  const onSubmitHandler: SubmitHandler<UpdateProductInput> = (values) => {
    console.log(values);
    EditItemFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <div className=" flex flex-row justify-around items-center bg-[#C2D7F3] p-10 w-full gap-5 ">
            <div className=" flex flex-col">
              <h1 className="text-2xl font-bold pl-5 pb-3">Image</h1>
              <ImageUpload />
            </div>
            <div className="flex flex-col gap-3">
              <FormInput label="Name" name="name" />
              <FormInput
                label="Price"
                name="price"
                type="number"
                valueAsNumber
              />
              <FormInput label="Description" name="desc" />
              <div>
                <label
                  htmlFor={"productCategory"}
                  className="block text-ct-blue-600 mb-3"
                >
                  Product Category
                </label>
                <select
                  {...register("productCategory")}
                  className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
                >
                  <option value="" selected disabled hidden>
                    Select one
                  </option>
                  {(
                    Object.keys(PRODUCT_CATEGORY) as Array<PRODUCT_CATEGORY>
                  ).map((cat) => (
                    <option id={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors["productCategory"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["productCategory"]?.message as string}
                  </span>
                )}
              </div>
              {/* <div className="flex flex-row justify-around pt-2 gap-3">
                <label>
                  <div className="flex items-center gap-2 ">
                    <input type="radio" value={1 as AVAILABILITY} />
                    <h1>Available</h1>
                  </div>
                </label>
                <label>
                  <div className="flex items-center gap-2">
                    <input type="radio" value={2 as AVAILABILITY} />
                    <h1>Unavailable</h1>
                  </div>
                </label>
              </div> */}
            </div>
          </div>

          <div className="flex flex-col justify-center w-1/2 gap-3">
            <Button
              type="submit"
              variant="contained"
              style={selectedStyle}
              className=" bg-[#778ccc] text-white"
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={selectedStyle}
              className=" bg-[#778ccc] text-white"
              onClick={() => {
                router.push("/userCafe/management/item");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      {store.requestLoading && <Loading />}
    </FormProvider>
  );
};

export default EditItem;
