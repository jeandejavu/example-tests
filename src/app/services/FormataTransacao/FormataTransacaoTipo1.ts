import { Processamento } from "../../models/Processamento";
import ITransacaoFormatada from "../interfaces/ITransacaoFormatada";
import IFormataTransacao from "./IFormataTransacao";

interface IFilter {
  clienteDestinoCodigo: string;
  tipo: number;
}

export default class FormataTransacaoTipo1 implements IFormataTransacao {
  constructor() {}
  private filter({ clienteDestinoCodigo, tipo }: IFilter) {
    return clienteDestinoCodigo === "21" && tipo === 1;
  }

  private calcularTotal(quantidade: number, valor: number) {
    return quantidade * valor + 100000;
  }

  format(processamento: Processamento): ITransacaoFormatada[] {
    const result: ITransacaoFormatada[] = [];

    processamento.ProcessamentoClientes.forEach((processamentoClientes) => {
      processamentoClientes.Transacoes.filter((transacao) =>
        this.filter({
          clienteDestinoCodigo: transacao.ClienteDestino.codigo,
          tipo: transacao.tipo,
        })
      ).forEach((transacao) => {
        const total = this.calcularTotal(transacao.quantidade, transacao.valor);

        result.push({
          clienteDestinoCodigo: transacao.ClienteDestino.codigo,
          clienteFaturamentoCodigo: transacao.ClienteFaturamento.codigo,
          clienteOrigemCodigo: transacao.ClienteOrigem.codigo,
          data: transacao.data,
          numero: transacao.numero,
          quantidade: transacao.quantidade,
          tipo: transacao.tipo,
          total,
          valor: transacao.valor,
        });
      });
    });
    return result;
  }
}
