import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { useCartDispatch } from "@/context/CartContext";

const ProductList = ({ dataProduct }) => {
  const dispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    dispatch({
      type : 'add', 
      payload : product
    })
  };

  return (
    <div className={styles["product-list"]}>
      {dataProduct?.map((product, idx) => (
        <div key={idx} className={styles["product-list__product-card"]}>
          <div className={styles["product-list__product-card__image"]}>
            <Image
              src={product.img_product}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              priority={false}
            />
          </div>
          <div className={styles["product-list__product-card__desc"]}>
            <p>{product.name}</p>
            <button onClick={() => handleAddToCart(product)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
