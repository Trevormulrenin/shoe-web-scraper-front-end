import React, { useState, useEffect } from "react";
import DisplayGraphService from '../services/DisplayGraphService';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";
import '../graph.css';
import 'chartjs-adapter-luxon';

Chart.register(CategoryScale, ...registerables);

function DisplayGraph() {
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [shoeId, shoeEmail] = [decodeURIComponent(location.pathname.split('/')[2]), decodeURIComponent(location.pathname.split('/')[3])];

  useEffect(() => {
    setIsLoading(true);

    DisplayGraphService.getPriceHistory(shoeId, shoeEmail)
      .then((response) => {
        setPriceHistory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [shoeId, shoeEmail]);

  console.log(priceHistory)
  console.log(priceHistory[0]?.date)

  const chartTitle = priceHistory[0]?.shoeName + " - Price History";
  /*const minPrice = Math.min(...priceHistory.map(data => data.price));
  const maxPrice = Math.max(...priceHistory.map(data => data.price));*/
  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          parser: "MM/DD/YYYY HH:mm:ss",
          unit: "day",
          displayFormats: {
            day: "DD",
          },
        },
        title: {
          display: true,
          text: "Date",
          color: 'black',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Arial',
            color: 'black',
            fontColor: 'black'
          },
        },
        ticks: {
          autoSkip: true,
          maxticksLimit: 20,
          font: {
            size: 14,
            family: 'Arial',
            color: 'black'
          },
          color: 'black'
        },
        grid: {
          color: 'black'
        }
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
          color: 'black',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Arial',
            color: 'black',
            fontColor: 'black'
          },
        },
        ticks: {
          font: {
            size: 14,
            family: 'Arial',
            color: 'black'
          },
          color: 'black'
        },
        grid: {
          color: 'black'
        }
      },
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeInOutCubic'
      },
      elements: {
        line: {
          tension: 0.1,
          borderColor: 'navy',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        point: {
          radius: 10,
          borderWidth: 2,
          backgroundColor: 'darkgray',
          borderColor: 'navy',
        },
      },
    },
  };

  return (
    <div className="display-graph">
      <h1>{chartTitle}</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load price history: {error.message}</p>}
      {priceHistory && priceHistory.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Line
              data={{
                labels: priceHistory.filter(data => data.datePassed).map(data => data.date),
                datasets: [
                  {
                    label: "Price History",
                    data: priceHistory.map(data => ({ x: new Date(data.date), y: parseFloat(data.price.replace(/[$,]/g, '')) })),
                    fill: false,
                    borderColor: "rgba(52, 58, 64, 1)",
                    pointBackgroundColor: "rgba(52, 58, 64, 1)",
                    pointBorderColor: "rgba(0, 0, 0, 0)",
                    pointHoverBackgroundColor: "rgba(0, 0, 0, 0)",
                    pointHoverBorderColor: "rgba(52, 58, 64, 1)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                ...chartOptions,
                maintainAspectRatio: true,
                responsive: true,
              }}
              style={{ maxHeight: '600px' }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory
                .map((data, index) => ({ date: new Date(data.date), price: data.price, index: index }))
                .sort((a, b) => a.date - b.date)
                .map(data => (
                  <tr key={data.index}>
                    <td>{data.date.toLocaleDateString()}</td>
                    <td>{data.price}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DisplayGraph;
