export interface ICodigoEspecial {
  codigoClienteDestino: string;
  codigoEspecial: number;
}

export default interface ISolicitaCodigoEspecial {
  call(codigosClienteDestino: string[]): Promise<ICodigoEspecial[]>;
}
