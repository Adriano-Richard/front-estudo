import React from "react";
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface TableAtuacaoData {
  ind: number;
  description: string;
  perception: {
    G: number;
    C: number;
    P: number;
    T: number;
    D: number;
    E: number;
  };
  generalAverage: number;
  expectation: number;
  deviation: string;
  actions: string;
}

interface CardTableAtuacaoProps {
  title: string;
  data: TableAtuacaoData[];
}

export const CardTableAtuacao: React.FC<CardTableAtuacaoProps> = ({ title, data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center" color="primary">
          {title}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">IND.</TableCell>
                <TableCell align="center">DESCRIÇÃO</TableCell>
                <TableCell align="center" colSpan={6}>
                  PERCEPÇÃO PARCIAL
                </TableCell>
                <TableCell align="center">MÉDIA GERAL</TableCell>
                <TableCell align="center">EXP</TableCell>
                <TableCell align="center">DESVIO</TableCell>
                <TableCell align="center">AÇÕES</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">G</TableCell>
                <TableCell align="center">C</TableCell>
                <TableCell align="center">P</TableCell>
                <TableCell align="center">T</TableCell>
                <TableCell align="center">D</TableCell>
                <TableCell align="center">E</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.ind}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">{row.perception.G.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.perception.C.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.perception.P.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.perception.T.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.perception.D.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.perception.E.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.generalAverage.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.expectation.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.deviation}</TableCell>
                  <TableCell align="center">{row.actions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
