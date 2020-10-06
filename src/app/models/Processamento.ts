import { ProcessamentoCliente } from "./ProcessamentoCliente";

export class Processamento {
  ID: number;
  filial: number;
  periodoDe: Date;
  periodoAte: Date;
  tipo1: boolean;
  tipo2: boolean;
  tipo3: boolean;

  ProcessamentoClientes: ProcessamentoCliente[];

  constructor(props?: Partial<Processamento>) {
    Object.assign(this, props);
    this.ProcessamentoClientes = [];
  }
}
