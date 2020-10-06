import { Processamento } from "../models/Processamento";

const processamentos = [
  new Processamento({
    ID: 1,
    filial: 1,
    periodoDe: new Date(2020, 10, parseFloat("01")),
    periodoAte: new Date(2020, 10, 31),
    tipo1: false,
    tipo2: false,
    tipo3: true,
  }),
];

class ProcessamentoRepository {
  async findOneById(id: number) {
    return processamentos.find((processamento) => processamento.ID === id);
  }
}

export default new ProcessamentoRepository();
