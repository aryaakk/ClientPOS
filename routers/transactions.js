const express = require("express");
const transactions = express.Router();
const response = require("../helpers/response");
const { randomOrderNumber } = require("../helpers/utils");
const {
  fetchTransaction,
  addTransaction,
} = require("../controllers/transactions");

//Swagger get Transactions
/**
 * @swagger
 * /transactions :
 *   get:
 *     summary: data transaction fetcher
 *     tags: [transactions]
 *     responses:
 *       200:
 *         description: transaction fetched
 *       403:
 *         description: failed to fetch transaction
 */

transactions.route("/").post(async (req, res) => {
  const { total_price, paid_amount, products } = req.body;

//   const changeMoney = paid_amount - total_price;

  const order = {
    no_order: randomOrderNumber(),
    total_price,
    paid_amount,
    // changeMoney,
  };

  try {
    const result = await addTransaction(order, products);
    response.success(result, "transaction created!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

transactions.route("/").get(async (req, res) => {
  try {
    const result = await fetchTransaction();
    response.success(result, "transaction fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = transactions;
