"use client";
import * as React from "react";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DiscountVoucher from "./DiscountVoucher";
import FormInput from "@/components/shared/FormInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/components/shared/Loading";
import { apiCreatePromo } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import {
  CreatePromoInput,
  PromoCreationSchema,
} from "@/lib/validations/promo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useStore from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PROMO_TYPE from "@/constants/PROMO_TYPE";
import useSession from "@/lib/useSession";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

const NewPromo = () => {
  const [value, setValue] = React.useState("");
  const store = useStore();
  const methods = useForm<CreatePromoInput>({
    resolver: zodResolver(PromoCreationSchema),
    defaultValues: {
      name: "-",
      discount: 0,
      min_spend_amount: 0,
      capped_amount: 0,
    },
  });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const user = useSession();

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
  }, [isSubmitSuccessful]);

  useEffect(() => {
    register("cafeId", { value: user?.cafe?.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  async function CreatePromo(credentials: CreatePromoInput) {
    store.setRequestLoading(true);
    //   console.log(credentials);
    try {
      const promo = await apiCreatePromo(JSON.stringify(credentials));
      if (promo) {
        toast.success("Promo Added");
        return router.push("/userCafe/management/promo");
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

  const onSubmitHandler: SubmitHandler<CreatePromoInput> = (values) => {
    console.log(values);
    CreatePromo(values);
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 gap-5">
      <div className=" flex flex-row justify-center items-center bg-[#C2D7F3] p-10 w-full ">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5 flex flex-col items-center"
          >
            <div className="flex flex-row justify-around gap-10">
              <label>
                <div className="flex">
                  <input
                    type="radio"
                    value={"DELIVERY_VOUCHER" as PROMO_TYPE}
                    {...register("type")}
                    onChange={handleChange}
                  />
                  <h1 className="pl-2">Delivery Voucher</h1>
                </div>
              </label>
              <label>
                <div className="flex">
                  <input
                    type="radio"
                    value={"DISCOUNT_VOUCHER" as PROMO_TYPE}
                    {...register("type")}
                    onChange={handleChange}
                  />
                  <h1 className="pl-2">Discount Voucher</h1>
                </div>
              </label>
            </div>
            {value === "DISCOUNT_VOUCHER" && (
              <div className="flex flex-row gap-15 item-center justify-around w-full">
                <FormInput label="Name" name="name" />
                <FormInput label="Discount (%)" name="discount" valueAsNumber />
                <FormInput
                  label="Min Spend"
                  name="min_spend_amount"
                  valueAsNumber
                />
                <FormInput
                  label="Capped At"
                  name="capped_amount"
                  valueAsNumber
                />
              </div>
            )}
            <div className="flex flex-col justify-center item-center w-1/2 gap-3">
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
                  router.push("/userCafe/management/promo");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default NewPromo;
