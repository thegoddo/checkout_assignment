"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import {
  useCheckoutStore,
  ShippingDetails,
} from "../../../store/useCheckoutStore";
import { shippingSchema } from "../../../lib/validation";

export default function ShippingForm() {
  const { addresses, addAddress, selectAddress, selectedAddressId } =
    useCheckoutStore();
  const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingDetails>({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmitNew = (data: ShippingDetails) => {
    addAddress(data);
    setIsAddingNew(false);
    reset();
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        Shipping Address
      </Typography>

      <Grid container spacing={2}>
        {addresses.map((addr) => (
          <Grid size={12} key={addr.id}>
            <Card
              variant="outlined"
              sx={{
                border:
                  selectedAddressId === addr.id
                    ? "2px solid #2e7d32"
                    : "1px solid #e0e0e0",
                bgcolor: selectedAddressId === addr.id ? "#f1f8e9" : "white",
              }}
            >
              <CardActionArea onClick={() => selectAddress(addr.id)}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {addr.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {addr.email}
                  </Typography>
                  <Typography variant="body2">
                    {addr.city}, {addr.state} - {addr.pinCode}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {addr.phone}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="text"
        onClick={() => setIsAddingNew(!isAddingNew)}
        sx={{ mt: 2, mb: 3, textTransform: "none" }}
      >
        {isAddingNew ? "✕ Cancel" : "+ Add a different address"}
      </Button>

      {isAddingNew && (
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px dashed #ccc", borderRadius: 2 }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmitNew)}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  {...register("fullName")}
                  label="Full Name"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("email")}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("phone")}
                  label="Phone"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("city")}
                  label="City"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("state")}
                  label="State"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("pinCode")}
                  label="PIN Code"
                  fullWidth
                  error={!!errors.pinCode}
                  helperText={errors.pinCode?.message}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                >
                  Save and Select
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
