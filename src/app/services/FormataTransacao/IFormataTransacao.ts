import { Processamento } from "../../models/Processamento";
import ITransacaoFormatada from "../interfaces/ITransacaoFormatada";

export default interface IFormataTransacao {
  format(Processamento: Processamento): ITransacaoFormatada[];
}
