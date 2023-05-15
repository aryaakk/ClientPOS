import Layout from "@/components/layouts/Layout";
import { getTransactions } from "@/service/transaction";
import { useEffect, useState } from "react";
import styles from "./../styles/Transaction.module.css";
import TransactionLists from "@/components/elements/TransactionList/TransactionLists";

export default function Transaction() {
  const [dataTransactions, setDataTransactions] = useState([]);

  const getTransaction = async () => {
    await getTransactions()
      .then((res) => {
        setDataTransactions(res.transactions);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <>
      <Layout>
        <h1>Transactions</h1>
        <div className={styles.transaction}>
          <TransactionLists dataTransactions={dataTransactions} />
        </div>
      </Layout>
    </>
  );
}
