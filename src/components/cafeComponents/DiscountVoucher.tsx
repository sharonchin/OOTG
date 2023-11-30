"use client";
import FormInput from "../shared/FormInput";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useEffect } from "react";

export default function DiscountVoucher() {
  const methods = useForm({});

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

  async function NewPromoFunction(credentials: any) {
    console.log("yay");
  }

  const onSubmitHandler: SubmitHandler<any> = (values) => {
    NewPromoFunction(values);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-row gap-3">
          <FormInput label="Discount" name="discountPercentage" />
          <FormInput label="Min Spend" name="minSpend" />
          <FormInput label="Capped At" name="cappedAmount" />
        </div>
      </form>
    </FormProvider>
  );
}
