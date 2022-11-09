
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { notifyError } from "../../utils";
import api from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await api.get("/orders")
        setOrders(response.data)
      } catch (error) {
        notifyError(error);
      }
    }
    fetch()
  }, [])

  return (
    <>
      <Header />
      <div className="margin-sides-small margin-top-large">
        <div className="margin-auto max-width overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Ativo</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order) =>
                  <tr key={order.id}>
                    <td>{order.order_date}</td>
                    <td>{order.asset.ticker}</td>
                    <td>R$ {order.value.toFixed(2)}</td>
                    <td>{order.quantity}</td>
                    <td>{order.order_type.name === "Compra" ? <span style={{ color: "green" }}>{order.order_type.name}</span> : <span style={{ color: "red" }}>{order.order_type.name}</span>}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}