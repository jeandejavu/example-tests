import { Processamento } from "../models/Processamento";
import FormataTransacaoTipo1 from "./FormataTransacao/FormataTransacaoTipo1";
import FormataTransacaoTipo2 from "./FormataTransacao/FormataTransacaoTipo2";
import FormataTransacaoTipo3 from "./FormataTransacao/FormataTransacaoTipo3";
import IFormataTransacao from "./FormataTransacao/IFormataTransacao";
import ITransacaoFormatada from "./interfaces/ITransacaoFormatada";

class FormataTransacaoService {
  formataTransacao: IFormataTransacao[];

  constructor() {
    this.formataTransacao = [];
    this.formataTransacao.push(new FormataTransacaoTipo1());
    this.formataTransacao.push(new FormataTransacaoTipo2());
    this.formataTransacao.push(new FormataTransacaoTipo3());
  }

  execute(processamento: Processamento): ITransacaoFormatada[] {
    const result: ITransacaoFormatada[] = [];
    this.formataTransacao.forEach((format) =>
      result.push(...format.format(processamento))
    );
    return result;
  }
}

export default FormataTransacaoService;
