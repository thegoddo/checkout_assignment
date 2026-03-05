import CheckoutFlow from "./components/CheckoutFlow";

async function getCartData() {
  return {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://via.placeholder.com/150",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://via.placeholder.com/150",
      },
    ],
    shipping_fee: 50,
  };
}

export default async function Home() {
  const data = await getCartData();

  return (
    <main style={{ padding: "2rem 0" }}>
      <h1>Hello world</h1>
      <CheckoutFlow initialData={data} />
    </main>
  );
}
