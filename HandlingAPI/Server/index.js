const express = require("express");
const app = express();
const PORT = 4001;

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 759.99,
    },
    {
      id: 2,
      name: "Smartphone",
      price: 499.5,
    },
    {
      id: 3,
      name: "Headphones",
      price: 99.99,
    },
    {
      id: 4,
      name: "Keyboard",
      price: 49.99,
    },
    {
      id: 5,
      name: "Mouse",
      price: 25.99,
    },
    {
      id: 6,
      name: "Monitor",
      price: 199.99,
    },
    {
      id: 7,
      name: "Tablet",
      price: 329.49,
    },
    {
      id: 8,
      name: "Smartwatch",
      price: 189.99,
    },
    {
      id: 9,
      name: "Speaker",
      price: 79.99,
    },
    {
      id: 10,
      name: "Camera",
      price: 599.99,
    },
  ];
  // http://localhost:4001/api/products?search=Monitor

  if (req.query.search) {
    const fitlerProducts = products.filter((products) =>
      products.name.includes(req.query.search)
    );
    res.send(fitlerProducts);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server Starting on PORT no ${PORT}`);
});
