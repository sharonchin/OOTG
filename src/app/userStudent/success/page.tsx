"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log(`pi: ${payment_intent}`);
        const res = await fetch(
          `http://localhost:3000/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );

        const order = await res.json();
        console.log(order);
        router.push(`/orders/${order.order.id}`);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [payment_intent, router]);
  return (
    <div className="w-full flex justify-center items-center p-10">
      Payment successful. You are being redirected to the order details page.
      Please do not close this page.
    </div>
  );
};

export default SuccessPage;
