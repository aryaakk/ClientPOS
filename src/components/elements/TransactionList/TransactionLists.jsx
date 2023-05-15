import styles from "./index.module.css";

const TransactionLists = ({ dataTransactions }) => {
  console.log(dataTransactions);

  const formatRupiahNumber = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className={styles["trx-lists"]}>
      {dataTransactions.map((data, idx) => (
        <div key={idx} className={styles["trx-lists__trx-card"]}>
          <h2>No.Order : {data.no_order}</h2>
          <div className={styles["trx-lists__trx-card__body-card"]}>
            <div
              className={styles["trx-lists__trx-card__body-card__side-left"]}
            >
              <div
                className={
                  styles[
                    "trx-lists__trx-card__body-card__side-left__total-price"
                  ]
                }
              >
                <h3>Total Harga</h3>
                <p>{formatRupiahNumber(data.total_price)}</p>
              </div>
              <div
                className={
                  styles[
                    "trx-lists__trx-card__body-card__side-left__paid-amount"
                  ]
                }
              >
                <h3>Dibayar</h3>
                <p>{formatRupiahNumber(data.paid_amount)}</p>
              </div>
            </div>
            <div
              className={styles["trx-lists__trx-card__body-card__side-right"]}
            >
              <h3>Items</h3>
              <div
                className={
                  styles["trx-lists__trx-card__body-card__side-right__items"]
                }
              >
                {data.products.map((product, idx) => (
                  <ul key={idx}>
                    <li>
                      <p>{product.product}</p>
                      <p>{product.quantity} pcs</p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionLists;
