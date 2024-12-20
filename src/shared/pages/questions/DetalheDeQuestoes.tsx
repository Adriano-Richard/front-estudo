import { useEffect, useState } from "react";
import { useVForm} from "../../forms";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ResponseOptionsService } from "../../services/response-options/ResponseOptionsService";
import { LinearProgress } from "@mui/material";
import { RenderQuestion } from "./RenderQuestions/RenderQuestions";

//Criar arquivos para as interfaces e classes
export interface IFormData{
    name: string;
    questionCount: number;
}

export type Question = {
    id: string;
    text: string;
    description: string;
    expectativa: number;
    responseOptionId: number | null;
    obrigatoria: boolean;
    responseOptions?: IResponseOption;
    allowedOccupations: any[];
  };

export interface IResponseOption {
    id: number;
    namePatterns?: string;
    responses?: string[];
}

//Criar arquivo para constantes e funções

export const DetalheDeQuestoes: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { save, saveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome] = useState('');

    const [questions, setQuestions] = useState<Question[]>([]);

    const [responseOption, setResponseOption] = useState<IResponseOption[]>([]);

    const handleSave = () => {
        
    };


    useEffect(() => {
        setIsLoading(true);
        ResponseOptionsService.getAll()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    //navigate('/');
                } else {
                    setResponseOption(result.data);
                }
            });
    }, []);

    return(
        <LayoutBaseDePagina 
            titulo={id === 'nova' ? 'Nova Questão' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={save}
                    aoClicarEmApagar={() => {  }}
                    aoClicarEmNovo={() => navigate('questoes/detalhe/nova')}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/questoes')}
                />
            }
        >
            {isLoading &&(
                <LinearProgress variant="indeterminate" />
            )}
            <RenderQuestion id={parseInt(id)} handleSave={handleSave} responseOption={responseOption} questions={questions} setQuestions={setQuestions}/>
        </LayoutBaseDePagina>
    );
}