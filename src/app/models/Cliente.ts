export class Cliente {
  ID: number;
  codigo: string;
  filial: number;

  constructor(props?: Partial<Cliente>) {
    Object.assign(this, props);
  }
}
