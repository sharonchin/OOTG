import { Grid } from "@mui/material";
import React from "react";

const FAQ = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl pt-10 pb-3">
        Frequently Asked Questions
      </h1>
      <Grid container spacing={12}>
        <Grid
          item
          xs={6}
          sx={{ justifyContent: "center", display: "flex flex-col" }}
        >
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              1. How does the food delivery system work?{" "}
            </h1>
            Our food delivery system allows you to browse through a variety of
            cafes in UMS, select your preferred dishes, and place an order
            online. Once your order is confirmed, your friends ensure that your
            food is delivered to your doorstep.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">2. What areas do you serve? </h1>
            We currently operate only in Universiti Malaysia Sabah(UMS).
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">3. How do I place an order? </h1>
            To place an order, simply visit our website. Browse through the
            available cafes, select your desired items, and proceed to checkout.
            Follow the instructions to provide delivery details and complete
            your order.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              4. Can I schedule a delivery for a specific time?{" "}
            </h1>
            Unfortunately, we can't. But we will work on it.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              5. What payment methods do you accept?{" "}
            </h1>
            We accept various payment methods, including credit/debit cards, and
            cash on delivery. You can choose your preferred payment option
            during checkout.
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ justifyContent: "center", display: "flex flex-col" }}
        >
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">6. How can I track my order? </h1>
            Once your order is confirmed, you'll be redirected to a confirmation
            details with a real-time tracking feature.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              {" "}
              7. What if I have food allergies or dietary restrictions?{" "}
            </h1>
            Our system allows users to contact the cafe during their orders. You
            may contact the cafe for the particular issues if there is any.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              8. Can I modify or cancel my order after placing it?{" "}
            </h1>
            Unfortunately, once an order is confirmed, modifications are not
            possible. However, you may contact cafe to inquire about
            cancellation options.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">9. Are there delivery fees? </h1>
            Yes, there will be a fixed delivery fee regardless of your location
            and the restaurant you choose.
          </div>
          <div className="flex flex-col pt-5 gap-5">
            <h1 className="font-bold">
              10. What should I do if there's an issue with my order?{" "}
            </h1>
            <h1>
              If you encounter any issues with your order, such as missing items
              or quality concerns, please contact us at{" "}
              <span className="text-[#778CCC]">+60148859384</span> immediately.
              We are here to assist you and ensure a satisfactory resolution.
            </h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FAQ;
