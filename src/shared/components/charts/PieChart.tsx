import { ResponsivePie } from "@nivo/pie";


// Definindo o tipo para o dado do gráfico
interface PieChartData {
    id: string;
    label: string;
    value: number;
  }
  
  // Adicionando tipagem ao componente
  interface PieChartProps {
    data: PieChartData[];
    height?: number;
    width?: string | number;
  }

  export const PieChart = ({ data, height = 400, width = "100%" }: PieChartProps) => {
    // Criar padrões de preenchimento dinamicamente com base nos dados
    const fill = data.map((item) => ({
      match: { id: item.id },
      id: item.value > 30 ? "dots" : "lines", // Alternar entre "dots" e "lines"
    }));
  
    return (
      <div style={{ height, width }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableArcLinkLabels={true}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          arcLabelsSkipAngle={10}
          tooltip={({ datum }) => (
            <div
              style={{
                padding: 12,
                color: datum.color,
                background: "#222",
                borderRadius: "4px",
              }}
            >
              <strong>{datum.label}:</strong> {datum.value}
            </div>
          )}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={fill} // Aplicar preenchimento dinâmico
        />
      </div>
    );
  };