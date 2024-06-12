import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";
import useURLContext from "../../Context/useURLContext";
import { useGlobalContext } from "../../Context/hook";
import { getAllURL } from "../../Services/APIservice"; 

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function URLBarChart() {
  const { monthlyURLlist, setMonthlyURLlist } = useURLContext(); 
  const { isLogged, currentUser } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const tokenAuth = localStorage.getItem("tokenAuth");
      const loggedUser = localStorage.getItem("loggedUser");

      if (!loggedUser || !tokenAuth) {
        window.alert("log in to continue");
        return;
      }

      const config = { headers: { "x-auth-token": tokenAuth } };
      const data = { email: loggedUser };
      try {
        const response = await getAllURL(data, config); // Fetch monthly URL data
        if (response.status === 200) {
          setMonthlyURLlist(response.data.data); // Set monthly URL data
        }
      } catch (err) {
        window.alert("Network error");
      }
    };

    fetchData();
  }, [isLogged, currentUser]);

  const chartData = {
    labels: monthlyURLlist.map((url) => url.shortURL),
    datasets: [
      {
        label: "URL Clicks",
        data: monthlyURLlist.map((url) => url.clicked),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="url-chart">
      <h5 className="fs-4 text-decoration-underline mb-3">URL Clicks (Bar Chart)</h5>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default URLBarChart;
