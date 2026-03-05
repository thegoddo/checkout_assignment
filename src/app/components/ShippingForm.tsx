"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { useCheckoutStore } from "../../../store/useCheckoutStore";
import { shippingSchema } from "../../../lib/validation";
import { z } from "zod";

type ShippingData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  const { shipping, setShipping } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shipping,
  });

  const onSubmit = (data: ShippingData) => {
    setShipping(data);
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            {...register("fullName")}
            label="Full Name"
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("email")}
            label="Email Address"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("phone")}
            label="Phone Number"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message as string}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("pinCode")}
            label="PIN Code"
            fullWidth
            error={!!errors.pinCode}
            helperText={errors.pinCode?.message as string}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("city")}
            label="City"
            fullWidth
            error={!!errors.city}
            helperText={errors.city?.message as string}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("state")}
            label="State"
            fullWidth
            error={!!errors.state}
            helperText={errors.state?.message as string}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button onClick={onBack} variant="outlined">
          Back to Cart
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
}
