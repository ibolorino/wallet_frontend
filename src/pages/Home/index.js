
import Header from "../../components/Header";
import { ResponsivePie } from '@nivo/pie'
import React, { useEffect, useState } from "react";
import { notifyError } from "../../utils";
import api from "../../services/api";
import axios from "axios";

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          0.2
        ]
      ]
    }}
    valueFormat={v => `R$ ${v.toFixed(2)}`}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#fff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          2
        ]
      ]
    }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}

  />
)

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const [response1, response2] = await axios.all([api.get("my_wallet"), api.get("my_wallet/chart")])
        setStocks(response1.data)
        setChartData(response2.data)
      } catch (error) {
        notifyError(error);
      }
    }
    fetch()
  }, [])

  return (
    <>
      <Header />
      <div style={{ height: "500px" }}>
        <MyResponsivePie data={chartData} />
      </div>
      {
        stocks.length > 0 &&
        <p className="flex-row flex-crossaxis-center bold size-large">Total investido: R$ {stocks[0].total.toFixed(2)}</p>
      }
      <div className="margin-sides-small">
        <div className="margin-auto max-width">
          {
            stocks.map((stock) =>
              <div key={stock.id} className="flex-column padding-small margin-bottom-small content-box">
                <div className="flex-row flex-axis-center flex-space-between margin-bottom-medium">
                  <div>
                    <div className="bold">{stock.asset.asset_type.name}</div>
                    <div>{stock.asset.ticker}</div>
                  </div>
                  <div className="text-right">
                    <div>R$ {stock.asset.current_price.toFixed(2)}</div>
                    <div>Último preço </div>
                  </div>
                </div>
                <div className="flex-row flex-axis-center flex-space-between">
                  <div>
                    <div className="size-smaller">Valor total</div>
                    <div>R$ {stock.current_value.toFixed(2)} <span> </span>
                      ({
                        (stock.current_value / stock.invested_amount) > 1 ?
                          <span style={{ color: "green" }}>↑{(stock.current_value / stock.invested_amount * 100).toFixed(2)} %</span> :
                          <span style={{ color: "red" }}>↓{(stock.current_value / stock.invested_amount * 100).toFixed(2)} %</span>
                      })
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="size-smaller">Quantidade</div>
                    <div>{stock.quantity}</div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}