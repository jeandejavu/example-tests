import { Transacao } from "./Transacao";

export class ProcessamentoCliente {
  processamentoID: number;
  clienteID: number;
  Transacoes: Transacao[];

  constructor(props?: Partial<ProcessamentoCliente>) {
    Object.assign(this, props);
    this.Transacoes = [];
  }
}
