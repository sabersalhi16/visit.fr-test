import React from "react";
import { Doughnut } from "react-chartjs-2";
function chart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Temperature",
        data: props.data,
        fill: true, // Don't fill area under the line
        borderColor: "#fff",
        backgroundColor: ["#d93025", "#1e8e3e", "#d42fc7", "#fbc500", "yellow"], // Line color
      },
    ],
  };
  return <Doughnut data={data} />;
}

export default chart;
