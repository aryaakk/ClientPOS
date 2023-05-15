import React, { useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import { Button } from "antd";
import styles from "./index.module.css";
import {
  useCart,
  useCartDispatch,
  calcTotalPrice,
} from "@/context/CartContext";
import { postTransactions } from "@/service/transaction";
import ListCart from "./ListCart";
import ModalComponent from "../Modals/ModalComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formattedOnchange = (price) => {
  let number_string = price.toString();
  let split = number_string.split(",");
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

// main component
const Cart = () => {
  const carts = useCart();
  const dispatch = useCartDispatch();
  const totalPrice = calcTotalPrice();
  const [amountPaid, setAmountPaid] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [resTransactions, setResTransactions] = useState({});

  const formatRupiahNumber = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const unFormatRupiah = (price) => {
    return Number(price.replace(/[^0-9,-]+/g, ""));
  };

  // function untuk handle checkout dan hit api transactions
  const handleCheckout = async () => {
    if (carts.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Your cart empty!!",
        text: "there should be items in the cart.",
        showClass: {
          popup: "animate__animated animate__bounceInDown",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOutUp",
        },
      });
    } else if (
      amountPaid === "" ||
      unFormatRupiah(amountPaid) - totalPrice < 0 === true
    ) {
      return Swal.fire({
        icon: "warning",
        title: "there is a problem with your money!!",
        text: "harus ada duitt dulu bray dan harus pas yaa. Gak boleh kurang!!",
        showClass: {
          popup: "animate__animated animate__bounceInDown",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOutUp",
        },
      });
    }

    const dataProducts = [];
    carts.map((cart) => {
      dataProducts.push({
        id: cart.id,
        quantity: cart.quantity,
      });
    });

    const data = {
      total_price: totalPrice,
      paid_amount: unFormatRupiah(amountPaid),
      products: dataProducts,
    };
    // console.log(data);

    await postTransactions(data)
      .then((res) => {
        console.log(res);
        setResTransactions(res);
        setModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAmountPaid("")
        carts.splice(0, carts.length);
      });
  };

  const handleOk = () => {
    setModalOpen(false);
    toast.success("Transaksi anda sukses!!😋", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // function untuk handle add product ke cart
  const handleAddToCart = (product) => {
    dispatch({
      type: "add",
      payload: product,
    });
  };

  // function untuk handle decrease atau mengurangi product dari cart
  const handleDecreaseCart = (product) => {
    dispatch({
      type: "decrease",
      payload: product,
    });
  };

  const handleFormatRupiah = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmountPaid(formattedOnchange(value));
  };

  return (
    <>
      <div className={styles.cart}>
        <h2>Cart</h2>
        <div className={styles["cart__cart-list"]}>
          {!carts.length == 0 ? (
            carts.map((cart, idx) => (
              <ListCart
                cart={cart}
                idx={idx}
                styles={styles}
                formatRupiahNumber={formatRupiahNumber}
                handleDecreaseCart={handleDecreaseCart}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className={styles["cart-empty"]}>
              <h2>Please add product to cart!!</h2>
            </div>
          )}
        </div>
        <div className={styles["cart-footer"]}>
          <div className={styles["cart-footer__total-price"]}>
            <p>Total</p>
            <p> : </p>
            <input
              type="text"
              name=""
              id=""
              readOnly={true}
              value={formatRupiahNumber(totalPrice)}
            />
          </div>
          <div className={styles["cart-footer__paid"]}>
            <p>Bayar</p>
            <p> : </p>
            <input
              type="text"
              value={"Rp " + amountPaid}
              onChange={handleFormatRupiah}
              required
            />
          </div>
          <div className={styles["cart-footer__button"]}>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <ModalComponent
          title={"NO.ORDER : " + resTransactions.payload[0].no_order}
          centered={true}
          isOpenModal={modalOpen}
          onOk={handleOk}
          onCancel={handleOk}
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              Selesai
            </Button>,
          ]}
        >
          <div className={styles["container-modal"]}>
            <div className={styles["container-modal__input-group"]}>
              <label htmlFor="">Total Belanja</label>
              <input
                readOnly
                type="text"
                value={formatRupiahNumber(
                  resTransactions.payload[0].total_price
                )}
              />
            </div>
            <div className={styles["container-modal__input-group"]}>
              <label htmlFor="">Total Dibayar</label>
              <input
                readOnly
                type="text"
                value={formatRupiahNumber(
                  resTransactions.payload[0].paid_amount
                )}
              />
            </div>
            <div className={styles["container-modal__input-group"]}>
              <label htmlFor="">Uang Kembalian </label>
              <input
                readOnly
                type="text"
                value={formatRupiahNumber(
                  resTransactions.payload[0].paid_amount -
                    resTransactions.payload[0].total_price
                )}
              />
            </div>
          </div>
        </ModalComponent>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
};

export default Cart;
