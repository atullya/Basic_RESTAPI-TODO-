import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// import ComponentA from "./Compoenet/ComponentA";

function App() {
  // const user = {
  //   name: "Atullya",
  //   age: 25,
  //   location: "Nepal",
  // };
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        let response = await axios.get("/api/products", {
          signal: controller.signal,
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Cancel", error.message);
          return;
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  // Filter products based on the search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Using the spread operator to pass all properties of the user object */}
      {/* <ComponentA user={{ ...user, gender: Male }} /> */}
      <h1>Basic API</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <h1>Loading Data...</h1>}
      <h2>Number of Products: {filteredProducts.length}</h2>
      {error && <h1>Something Went Wrong</h1>}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} {/* Assuming products have id, name, and price */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
