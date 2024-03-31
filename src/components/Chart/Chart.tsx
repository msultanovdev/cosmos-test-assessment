import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import cl from "./Chart.module.css";
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
      ticks: {
        color: "#fff",
      },
      grid: {
        color: "rgba(255,255,255,.2)",
        borderColor: "white",
      },
      type: "time" as const,
      time: {
        unit: "day" as const,
        unitStepSize: 1,
        displayFormats: {
          day: "dd MMM, yyyy",
        },
      },
    },
    y: {
      ticks: {
        color: "#fff",
      },
      grid: {
        color: "rgba(255,255,255,.2)",
        borderColor: "white",
      },
      title: {
        display: true,
        text: "Average Points",
        color: "#fff",
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
            borderColor: "orange",
            backgroundColor: "yellow",
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "yellow",
            pointHoverBackgroundColor: "white",
          },
          {
            label: "Descending",
            data: Object.values(desData),
            borderColor: "yellowgreen",
            backgroundColor: "green",
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "green",
            pointHoverBackgroundColor: "white",
          },
        ],
      };
      setData(chartData);
    };
    fetchLocalData();
  }, []);

  return (
    <div className={cl.chart}>
      <h2>
        The Line Chart illustrates the displacement of points at 12-day
        intervals from the beginning of 2019 to the end of 2020.
      </h2>
      {data ? <Line data={data} options={options} /> : "Loading..."}
    </div>
  );
};

export default ChartComponent;
