export class ProcessadoItem {
  processadoID: number;
  numero: number;
  codigoEspecial: number;
  total: number;

  constructor(props?: Partial<ProcessadoItem>) {
    Object.assign(this, props);
  }
}
