import { Api } from "../axios-config";

export interface AnalysisGraphResponse {
    indicador: number;
    descricao: string;
    gestor: number;
    coordenador: number;
    professor: number;
    tecnico: number;
    discente: number;
    egresso: number;
    media: number;
    expectativa: number;
    desvio: string;
    acoes: string;
}

export interface UniversityAnalysisGraphResponse{
  univerityId: string;
  universityName: string;
  averageScore: number;
}

export interface ResultGraphResponse {
  questionName: string;
  valueCount: { [key: string]: number };
}

export interface AvaliationRequest {
  name?: string;
}

const getUserGraphsByAvaliationName = async (
  request: AvaliationRequest
): Promise<ResultGraphResponse[] | Error> => {
  try {
    // Montando a URL com os parâmetros da requisição
    const url = `Graph/Users?Name=${request.name || ""}`;

    // Fazendo a chamada para a API
    const { data } = await Api.get<ResultGraphResponse[]>(url);

    // Retornando os dados caso tudo ocorra bem
    if (data) {
      return data;
    }
    return new Error("Erro ao buscar os gráficos.");
  } catch (error) {
    console.error("Erro em getUserGraphsByAvaliationName:", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os gráficos."
    );
  }
};

const getAnalysisByAvaliationName = async (
  request: AvaliationRequest
): Promise<AnalysisGraphResponse[] | Error> => {
  try {
    const url = `Graph/Analysis?Name=${request.name || ""}`;
    const { data } = await Api.get<AnalysisGraphResponse[]>(url);

    if (data) {
      return data;
    }
    return new Error("Erro ao buscar os gráficos de análise.");
  } catch (error) {
    console.error("Erro em getUserAnalysisByAvaliationName:", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os gráficos de análise."
    );
  }
};

const GetAnalysisMediaByAvaliationName = async (
    request: AvaliationRequest
  ): Promise<number | Error> => {
    try {
      const url = `Graph/Analysis/Media?Name=${request.name || ""}`;
      const { data } = await Api.get<number>(url);
  
      if (data) {
        return data;
      }
      return new Error("Erro ao buscar os gráficos de análise.");
    } catch (error) {
      console.error("Erro em getUserAnalysisByAvaliationName:", error);
      return new Error(
        (error as { message: string }).message || "Erro ao buscar os gráficos de análise."
      );
    }
  };

  const GetAnalysisUniversityMediaByAvaliationName = async (
    request: AvaliationRequest
  ): Promise<UniversityAnalysisGraphResponse[] | Error> => {
    try {
      const url = `Graph/Analysis/UniversityMedia?Name=${request.name || ""}`;
      const { data } = await Api.get<UniversityAnalysisGraphResponse[]>(url);
  
      if (data) {
        return data;
      }
      return new Error("Erro ao buscar as médias por universidade.");
    } catch (error) {
      console.error("Erro em GetAnalysisUniversityMediaByAvaliationName:", error);
      return new Error(
        (error as { message: string }).message || "Erro ao buscar as médias por universidade."
      );
    }
  };

export const GraphService = {
  getUserGraphsByAvaliationName,
  getAnalysisByAvaliationName,
  GetAnalysisMediaByAvaliationName,
  GetAnalysisUniversityMediaByAvaliationName 
};
