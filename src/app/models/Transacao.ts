import { Cliente } from "./Cliente";

export class Transacao {
  ID: number;
  filial: number;
  clienteOrigemID: number;
  clienteDestinoID: number;
  clienteFaturamentoID: number;
  numero: number;
  tipo: number;
  data: Date;
  quantidade: number;
  valor: number;

  ClienteOrigem: Cliente;
  ClienteDestino: Cliente;
  ClienteFaturamento: Cliente;

  constructor(props?: Partial<Transacao>) {
    Object.assign(this, props);
  }
}
