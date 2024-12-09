import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface TableData {
  variable: string;
  cf: number;
  network: number;
  universities: number[];
}

interface CardTableProps {
  title: string;
  tableData: TableData[];
  universitiesHeaders: string[];
}

export const CardTable: React.FC<CardTableProps> = ({
  title,
  tableData,
  universitiesHeaders,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Variável</TableCell>
                <TableCell align="center">CF</TableCell>
                <TableCell align="center">Rede</TableCell>
                {universitiesHeaders.map((university, index) => (
                  <TableCell key={index} align="center">
                    {university}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.variable}</TableCell>
                  <TableCell align="center">{row.cf}</TableCell>
                  <TableCell align="center">{row.network}</TableCell>
                  {row.universities.map((value, idx) => (
                    <TableCell key={idx} align="center">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
