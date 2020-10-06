import { Transacao } from "../models/Transacao";

const transacoes: Transacao[] = [];

for (let i = 0; i < 30; ++i) {
  transacoes.push(
    new Transacao({
      ID: i + 30 * 0,
      filial: 1,
      clienteFaturamentoID: 11,
      clienteDestinoID: 21,
      clienteOrigemID: 31,
      data: new Date(2020, 10, i + 1),
      numero: i + 30 * 0,
      quantidade: (i + 1) * 1000,
      tipo: 1,
      valor: (i + 1) * 1000 * 10,
    })
  );
  transacoes.push(
    new Transacao({
      ID: i + 30 * 1,
      filial: 1,
      clienteFaturamentoID: 12,
      clienteDestinoID: 22,
      clienteOrigemID: 32,
      data: new Date(2020, 10, i + 1),
      numero: i + 30 * 1,
      quantidade: (i + 1) * 1000,
      tipo: 2,
      valor: (i + 1) * 1000 * 10,
    })
  );
  transacoes.push(
    new Transacao({
      ID: i + 30 * 2,
      filial: 1,
      clienteDestinoID: 13,
      clienteFaturamentoID: 23,
      clienteOrigemID: 33,
      data: new Date(2020, 10, i + 1),
      numero: i + 30 * 2,
      quantidade: (i + 1) * 1000,
      tipo: 3,
      valor: (i + 1) * 1000 * 10,
    })
  );
}

class TransacaoRepository {
  async findByFilialAndPeriodo(
    filial: number,
    periodoDe: Date,
    periodoAte: Date
  ) {
    return transacoes.filter(
      (transacao) =>
        transacao.filial === filial &&
        transacao.data >= periodoDe &&
        transacao.data <= periodoAte
    );
  }
}

export default new TransacaoRepository();
