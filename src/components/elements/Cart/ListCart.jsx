import Image from "next/image";

const ListCart = ({
  idx,
  cart,
  styles,
  formatRupiahNumber,
  handleDecreaseCart,
  handleAddToCart,
}) => {
  return (
    <div key={idx} className={styles["cart-item"]}>
      <div className={styles["cart-item__image"]}>
        <Image
          src={cart.img_product}
          alt={cart.name}
          fill
          style={{ objectFit: "contain", borderRadius: "15px" }}
        />
      </div>
      <div className={styles["cart-item__desc"]}>
        <p>{cart.name}</p>
        <p>{formatRupiahNumber(cart.price)}</p>
      </div>
      <div className={styles["cart-item__action"]}>
        <button onClick={() => handleDecreaseCart(cart)}>-</button>
        <p>{cart.quantity}</p>
        <button onClick={() => handleAddToCart(cart)}>+</button>
      </div>
    </div>
  );
};
export default ListCart;
