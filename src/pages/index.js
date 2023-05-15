import Layout from "@/components/layouts/Layout";
import React, { useEffect, useState } from "react";
import ProductList from "@/components/elements/ProductLists/ProductList";
import styles from "./../styles/Home.module.css";
import Cart from "@/components/elements/Cart/Cart";
import { getProductss } from "@/service/product";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await getProductss().then((res) => {
      setProducts(res);
    }).catch((err) => {
      throw err
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
