"use client";

import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { useCheckoutStore } from "../../../store/useCheckoutStore";

export default function CartScreen({ onNext }: { onNext: () => void }) {
  const { cart, shippingFee } = useCheckoutStore();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0,
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.product_id} sx={{ py: 1, px: 0 }}>
            <Avatar
              src={item.image}
              variant="rounded"
              sx={{ mr: 2, width: 56, height: 56 }}
            />
            <ListItemText
              primary={item.product_name}
              secondary={`Qty: ${item.quantity} x ₹${item.product_price}`}
            />
            <Typography variant="body1">
              ₹{item.product_price * item.quantity}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          Total (incl. ₹{shippingFee} shipping)
        </Typography>
        <Typography variant="h6">₹{subtotal + shippingFee}</Typography>
      </Box>
      <Button variant="contained" fullWidth onClick={onNext} sx={{ mt: 3 }}>
        Proceed to Checkout
      </Button>
    </Box>
  );
}
