import React from "react";
import { Card, Typography } from "@mui/material";

interface InfoCardProps {
  title: string;
  value: string;
  change: string;
  backgroundColor: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  backgroundColor,
}) => {
  return (
    <Card
      sx={{
        backgroundColor,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
    </Card>
  );
};
