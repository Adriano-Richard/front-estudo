import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChartConfig } from "./BarChart";

interface CardBarChartProps {
  data: { university: string; media: number }[]; // Alterado para refletir os dados da nova rota
  title: string;
}

export const CardBarChart: React.FC<CardBarChartProps> = ({ data, title }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          color="primary"
        >
          {title}
        </Typography>
        <Box height={380}>
          <BarChartConfig data={data} />
        </Box>
      </CardContent>
    </Card>
  );
};
