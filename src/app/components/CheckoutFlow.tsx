"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Stepper,
  Step,
  Button,
  StepLabel,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCheckoutStore } from "../../../store/useCheckoutStore";
import CartScreen from "./CartScreen";
import ShippingForm from "./ShippingForm";
import PaymentReview from "./PaymentReview";

const steps = ["Review Cart", "Shipping Details", "Payment"];

export default function CheckoutFlow({ initialData }: { initialData: any }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { setCart, selectedAddressId, addresses } = useCheckoutStore();

  useEffect(() => {
    setIsHydrated(true);
    if (initialData?.cartItems) setCart(initialData.cartItems);
  }, [initialData, setCart]);

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddressId) {
      alert("Please select or add a shipping address.");
      return;
    }

    if (activeStep === steps.length - 1) {
      handleFinalPayment();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isHydrated) return null;

  if (isSuccess) {
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Successful!
        </Typography>
        <Typography>
          Thank you, {selectedAddress?.fullName}. Your order is confirmed.
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} href="/">
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 15 }}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: "350px" }}>
          {activeStep === 0 && <CartScreen onNext={handleNext} />}
          {activeStep === 1 && <ShippingForm />}
          {activeStep === 2 && <PaymentReview isProcessing={isProcessing} />}
        </Box>
      </Paper>

      {/* Sticky Bottom Bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid #ddd",
          p: 2,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setActiveStep((prev) => prev - 1)}
              disabled={activeStep === 0 || isProcessing}
            >
              Back
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleNext}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <CircularProgress size={24} color="inherit" />
              ) : activeStep === steps.length - 1 ? (
                "Pay Securely"
              ) : (
                "Next Step"
              )}
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
