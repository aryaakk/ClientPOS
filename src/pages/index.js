import api from "@/api";
import Layout from "@/components/layouts/Layout";
import React, { useEffect, useState } from "react";
import ProductList from "@/components/elements/ProductLists/ProductList";
import styles from "./../styles/Home.module.css";
import Cart from "@/components/elements/Cart/Cart";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await api.get("/products").then((res) => {
      const data = res.data.payload;
      setProducts(data);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Layout>
        <h1>Home</h1>
        <div className={styles.home}>
          <ProductList dataProduct={products} />
          <Cart />
        </div>
      </Layout>
    </>
  );
}
