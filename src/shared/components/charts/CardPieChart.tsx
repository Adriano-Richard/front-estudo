import React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { PieChart } from "../../components/charts/PieChart";

interface ChartCardProps {
  currentChart: {
    title: string;
    data: { id: string; label: string; value: number }[];
  };
  currentChartIndex: number;
  pieCharts: {
    title: string;
    data: { id: string; label: string; value: number }[];
  }[];
  handlePrevious: () => void;
  handleNext: () => void;
  cardHeight?: number;
}

export const CardPieChart: React.FC<ChartCardProps> = ({
  currentChart,
  currentChartIndex,
  pieCharts,
  handlePrevious,
  handleNext,
  cardHeight = 300,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto", // Centraliza o card horizontalmente
      }}
    >
      <CardContent>
        {/* Título do Gráfico */}
        <Typography
          variant="h5"
          component="div"
          align="center"
          gutterBottom
          sx={{ marginBottom: 4 }}
        >
          {currentChart.title}
        </Typography>

        {/* Container dos Gráficos */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: cardHeight,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              transform: `translateX(-${currentChartIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
              width: `${pieCharts.length * 100}%`, // Ajusta a largura com base no número de gráficos
            }}
          >
            {pieCharts.map((chart, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%", // Cada gráfico ocupa 100% da largura disponível
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PieChart data={chart.data} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Botões de Navegação */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <IconButton onClick={handlePrevious}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
