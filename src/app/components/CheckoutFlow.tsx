"use client";

import React, { useState, useEffect } from "react";
import { Container, Stepper, Step, StepLabel, Paper, Box } from "@mui/material";
import { useCheckoutStore } from "../../../store/useCheckoutStore";
import CartScreen from "./CartScreen";
import ShippingForm from "./ShippingForm";
import PaymentReview from "./PaymentReview";

const steps = ["Review Cart", "Shipping Details", "Payment"];

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

interface CartResponse {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied?: number;
}

export default function CheckoutFlow({
  initialData,
}: {
  initialData: CartResponse;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const setCart = useCheckoutStore((state) => state.setCart);

  useEffect(() => {
    if (initialData?.cartItems) {
      setCart(initialData.cartItems);
    }
  }, [initialData, setCart]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CartScreen onNext={handleNext} />;
      case 1:
        return <ShippingForm onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <PaymentReview onBack={handleBack} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>{renderStepContent(activeStep)}</Box>
      </Paper>
    </Container>
  );
}
