"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useCheckoutStore } from "../../../store/useCheckoutStore";

export default function PaymentReview({
  isProcessing,
}: {
  isProcessing: boolean;
}) {
  const { cart, addresses, selectedAddressId, shippingFee } =
    useCheckoutStore();
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0,
  );

  return (
    <Box sx={{ opacity: isProcessing ? 0.5 : 1 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        Review & Confirm
      </Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "#f9f9f9" }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              SHIPPING TO
            </Typography>
            {selectedAddress ? (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  {selectedAddress.fullName}
                </Typography>
                <Typography variant="body2">
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.pinCode}
                </Typography>
              </Box>
            ) : (
              <Typography color="error">No address selected.</Typography>
            )}
          </Paper>
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
        <Grid size={12}>
          <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Shipping</Typography>
              <Typography>₹{shippingFee}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{subtotal + shippingFee}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
