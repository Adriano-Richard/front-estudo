import { FerramentasDeDetalhe } from "../../components"
import { LayoutBaseDePagina } from "../../layouts"


export const Dashboard = () => {
    return (
        <LayoutBaseDePagina 
            titulo="Página Inicial" 
            barraDeFerramentas={<FerramentasDeDetalhe mostrarBotaoSalvarEFechar />} 
            children={undefined}>
            
        </LayoutBaseDePagina>
    )
}