import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import AscendingCsvPath from "../../db/data/ascending.csv";
import DescendingCsvPath from "../../db/data/descending.csv";
import { calculateDateAverages, csvDecoder } from "../../utils/helpers";
import { Point } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

const options = {
  scales: {
    x: {
      type: "time" as const,
      time: {
        unit: "day" as const,
      },
    },
    y: {
      title: {
        display: true,
        text: "Average Points",
      },
    },
  },
};

const ChartComponent: React.FC = () => {
  const [data, setData] =
    useState<ChartData<"line", (number | Point | null)[], unknown>>();

  useEffect(() => {
    const fetchLocalData = async () => {
      const decodedAsc = await csvDecoder(AscendingCsvPath);
      const decodedDes = await csvDecoder(DescendingCsvPath);
      const parsedAsc = Papa.parse(decodedAsc, { header: true });
      const parsedDes = Papa.parse(decodedDes, { header: true });

      const ascData = calculateDateAverages(parsedAsc.data);
      const desData = calculateDateAverages(parsedDes.data);

      const chartData = {
        labels: [...Object.keys(ascData), ...Object.keys(desData)],
        datasets: [
          {
            label: "Ascending",
            data: Object.values(ascData),
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Descending",
            data: Object.values(desData),
            borderColor: "rgb(102, 100, 22)",
            borderWidth: 2,
            fill: false,
          },
        ],
      };
      setData(chartData);
    };
    fetchLocalData();
  }, []);

  return (
    <div>
      <h2>Data Visualization</h2>
      {data ? <Line data={data} options={options} /> : "Loading..."}
    </div>
  );
};

export default ChartComponent;
