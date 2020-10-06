import ITransacaoFormatada from "./interfaces/ITransacaoFormatada";
import SolicitaCodigoEspecialAPIXYZ from "./SolicitaCodigoEspecial/SolicitaCodigoEspecialAPIXYZ";

class PreencheCodigoEspecialService {
  constructor() {}

  private format(transacoes: ITransacaoFormatada[]) {
    return [
      ...new Set(transacoes.map((transacao) => transacao.clienteDestinoCodigo)),
    ];
  }

  async execute(transacoes: ITransacaoFormatada[]) {
    const solicitacao = new SolicitaCodigoEspecialAPIXYZ();
    const codigos = this.format(transacoes);

    const codigosEspecial = await solicitacao.call(codigos);
    transacoes.forEach((transacao) => {
      const codigoEspecial =
        codigosEspecial.find(
          (codigo) =>
            codigo.codigoClienteDestino === transacao.clienteDestinoCodigo
        )?.codigoEspecial || 0;
      transacao.codigoEspecial = codigoEspecial;
    });
  }
}

export default PreencheCodigoEspecialService;
