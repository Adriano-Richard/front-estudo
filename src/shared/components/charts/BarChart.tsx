import React from "react";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartConfigProps {
  data: { university: string; media: number }[];
}

export const BarChartConfig: React.FC<BarChartConfigProps> = ({ data }) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["media"]}
      indexBy="university"
      margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
      padding={0.3}
      colors={["#3e85b0"]} // Azul mais suave
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Universidade",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Média",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#4A4A4A", // Cor neutra para os textos
            },
          },
          legend: {
            text: {
              fill: "#4A4A4A",
            },
          },
        },
      }}
      tooltip={({ indexValue, value }) => (
        <div
          style={{
            padding: "5px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <strong>{indexValue}</strong>: {value.toFixed(2)} {/* Apenas duas casas decimais */}
        </div>
      )}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#ffffff" // Branco para melhor contraste
      label={(d) => d.value!.toFixed(2)} // Formatar rótulos com 2 casas decimais
    />
  );
};
