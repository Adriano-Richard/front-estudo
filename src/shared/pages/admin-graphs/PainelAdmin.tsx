import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { AdminNavbar, MenuLateral } from "../../components";
import { CardPieChart } from "../../components/charts/CardPieChart";
import { CardBarChart } from "../../components/charts/CardBarChart";
import { InfoCard } from "../../components/charts/InfoCard";
import { AnalysisGraphResponse, GraphService, ResultGraphResponse } from "../../services/graphs/GraphService";
import { CardTableAtuacao } from "../../components/charts/CardTableAtuacao";

export const PainelAdmin = () => {
  

  // Dados para a tabela
  // const tableData = [
  //   {
  //     variable: "Nível de visibilidade do Programa",
  //     cf: 0.725,
  //     network: 2.4,
  //     universities: [2.4, 2.1, 2.7, 2.6, 2.5, 2.3, 2.8, 2.4, 2.5, 2.3, 2.4, 2.2, 2.6, 2.7],
  //   },
  //   {
  //     variable: "Processo de autoavaliação, periodicidade",
  //     cf: 0.7,
  //     network: 2.3,
  //     universities: [2.3, 2.1, 2.6, 2.5, 2.5, 2.3, 2.7, 2.3, 2.4, 2.2, 2.3, 2.1, 2.5, 2.7],
  //   },
  // ];
  // const universitiesHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];

  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const [graphs, setGraphs] = useState<ResultGraphResponse[]>([]);
  const [analysisGraphs, setAnalysisGraphs] = useState<AnalysisGraphResponse[]>([]);
  const [analysisMedia, setAnalysisMedia] = useState<number>();
  const [/*loading*/, setLoading] = useState<boolean>(true);
  const [/*error*/, setError] = useState<string | null>(null);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGraphs = async () => {
        setLoading(true);
        setError(null);

        const result = await GraphService.getUserGraphsByAvaliationName({
        name: "Autoavaliação 2024",
        });

        if (result instanceof Error) {
        setError(result.message);
        } else {
        setGraphs(result);
        }

        setLoading(false);
    };

    const fetchAnalysisGraph = async () => {
        setLoading(true);
        setError(null);

        const result = await GraphService.getAnalysisByAvaliationName({
            name: "Autoavaliação 2024",
        });
    
        if (result instanceof Error) {
        setError(result.message);
        } else {
        setAnalysisGraphs(result);
        }

        setLoading(false);
    };

    const fetchAnalysisMedia = async () => {
        setLoading(true);
        setError(null);

        const result = await GraphService.GetAnalysisMediaByAvaliationName({
            name: "Autoavaliação 2024",
        });
    
        if (result instanceof Error) {
        setError(result.message);
        } else {
            setAnalysisMedia(result);
        }

        setLoading(false);
    };

    const fetchBarChartData = async () => {
      setLoading(true);
      setError(null);

      const result = await GraphService.GetAnalysisUniversityMediaByAvaliationName({
        name: "Autoavaliação 2024",
      });

      if (result instanceof Error) {
        setError(result.message);
      } else {
        const formattedData = result.map((university) => ({
          university: university.universityName,
          media: university.averageScore,
        }));
        setBarChartData(formattedData);
      }

      setLoading(false);
    };
  
    fetchGraphs();
    fetchAnalysisGraph();
    fetchAnalysisMedia();
    fetchBarChartData();
  }, []);

  // Dados para os cards superiores
  const cards = [
    {
      title: "Média Geral da Rede",
      value: analysisMedia?.toFixed(2).toString() || "",
      change: "+5.4% este mês",
      backgroundColor: "#E3F2FD", // Azul claro
    },
    {
      title: "Média Esperada",
      value: "4.00",
      change: "+3.8% este mês",
      backgroundColor: "#E8F5E9", // Verde claro
    },
    {
      title: "Quantidade de Questões",
      value: "43",
      change: "-1.2% este mês",
      backgroundColor: "#9ddee0", // Vermelho claro
    },
  ];

  // Dados para o gráfico de pizza
  const pieCharts =
    graphs?.map((graph) => ({
        title: graph.questionName || "Sem título", // Defina um título padrão caso esteja ausente
        data: Object.entries(graph.valueCount || {}).map(([key, value]) => ({
        id: key,
        label: key,
        value: value || 0, // Garanta um valor numérico válido
        })),
    })) || [];

  const handlePrevious = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex === 0 ? pieCharts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex === pieCharts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentChart = pieCharts[currentChartIndex];

  const formatDeviation = (deviation: string): string => {
    if (!deviation) {
      return "N/A";
    }
    const numericValue = parseFloat(deviation.replace("%", "")); // Remove o símbolo de porcentagem
    return `${numericValue.toFixed(2)}%`; // Mantém apenas 2 casas decimais e adiciona o símbolo de porcentagem
  };

  const tableAtuacaoData = analysisGraphs.map((graph) => ({
    ind: graph.indicador,
    description: graph.descricao,
    perception: {
      G: graph.gestor || 0,
      C: graph.coordenador || 0,
      P: graph.professor || 0,
      T: graph.tecnico || 0,
      D: graph.discente || 0,
      E: graph.egresso || 0,
    },
    generalAverage: graph.media || 0,
    expectation: graph.expectativa || 0,
    deviation: formatDeviation(graph.desvio),
    actions: graph.acoes || "N/A",
  }));

  return (
    <Box display="flex" height="100vh">
      <MenuLateral />
      <Box flex="1" display="flex" flexDirection="column">
        <AdminNavbar brandText="Painel Administrativo" />
        <Box flex="1" padding={4} sx={{ paddingTop: 8 }}>
          <Grid container spacing={2} marginBottom={2}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <InfoCard {...card} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <CardBarChart
                data={barChartData}
                title="Média das Universidades por Avaliação"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
            {graphs.length > 0 && pieCharts.length > 0 && (
                <CardPieChart
                    currentChart={currentChart}
                    currentChartIndex={currentChartIndex}
                    pieCharts={pieCharts}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
                )}
            </Grid>
            {/* <Grid item xs={12}>
              <CardTable
                title="Médias ponderadas do Fator Visibilidade do Programa"
                tableData={tableData}
                universitiesHeaders={universitiesHeaders}
              />
            </Grid> */}
            <Grid item xs={12}>
                <CardTableAtuacao
                    title="Quadro 29 - Atuação e integração - Percepção geral"
                    data={tableAtuacaoData}
                />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
