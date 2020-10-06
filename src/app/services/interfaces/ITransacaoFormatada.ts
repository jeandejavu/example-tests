export default interface ITransacaoFormatada {
  clienteOrigemCodigo: string;
  clienteDestinoCodigo: string;
  clienteFaturamentoCodigo: string;
  numero: number;
  tipo: number;
  data: Date;
  quantidade: number;
  valor: number;
  total: number;
  codigoEspecial?: number;
}
