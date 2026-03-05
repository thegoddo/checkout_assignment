"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCheckoutStore } from "../../../store/useCheckoutStore";

export default function PaymentReview({ onBack }: { onBack: () => void }) {
  const { cart, shipping, shippingFee } = useCheckoutStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0,
  );
  const grandTotal = subtotal + shippingFee;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Order Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for your purchase, {shipping.fullName}. Your order is
          successful.
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} href="/">
          Return To Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Review Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Summaries */}
        <Grid size={12}>
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Shipping To:
            </Typography>
            <Typography variant="body2">{shipping.fullName}</Typography>
            <Typography variant="body2">
              {shipping.email} | {shipping.phone}
            </Typography>
            <Typography variant="body2">
              {shipping.city}, {shipping.state} - {shipping.pinCode}
            </Typography>
          </Paper>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Items:
          </Typography>
          <List disablePadding>
            {cart.map((item) => (
              <ListItem key={item.product_id} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={item.product_name}
                  secondary={`Qty: ${item.quantity}`}
                />
                <Typography variant="body2">
                  ₹{item.product_price * item.quantity}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right Side: Totals */}
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Shipping</Typography>
              <Typography>₹{shippingFee}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{grandTotal}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Pay Securely"
              )}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={onBack}
              sx={{ mt: 1 }}
              disabled={isProcessing}
            >
              Back to Shipping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
