import React, { useEffect, useRef } from "react";
import * as Papa from "papaparse";
import AscendingCsvPath from "../../db/data/ascending.csv";
import DescendingCsvPath from "../../db/data/descending.csv";
import { calculateDateAverages, csvDecoder } from "../../utils/helpers";
import Chart, {
  BubbleDataPoint,
  ChartTypeRegistry,
  Point,
} from "chart.js/auto";

const ChartComponent: React.FC = () => {
  let chart: Chart<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint | null)[],
    unknown
  >;
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      const decodedAsc = await csvDecoder(AscendingCsvPath);
      const decodedDes = await csvDecoder(DescendingCsvPath);
      const parsedAsc = Papa.parse(decodedAsc, { header: true });
      const parsedDes = Papa.parse(decodedDes, { header: true });

      const ascData = calculateDateAverages(parsedAsc.data);
      const desData = calculateDateAverages(parsedDes.data);

      const res = [ascData, desData];
      if (!res) return;
      generateChart(res);
    };
    fetchLocalData();
  }, []);

  const generateChart = (data: { [date: string]: number }[]) => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      if (!ctx) return;
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Object.keys(data[0]), ...Object.keys(data[1])],
          datasets: [
            {
              label: "Ascending",
              data: Object.values(data[0]),
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Descending",
              data: Object.values(data[1]),
              borderColor: "rgb(102, 100, 22)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Average Points",
              },
            },
          },
        },
      });
    }
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartComponent;
