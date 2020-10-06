import { ProcessamentoCliente } from "../models/ProcessamentoCliente";

const processamentoClientes = [
  new ProcessamentoCliente({
    processamentoID: 1,
    clienteID: 11,
  }),
  new ProcessamentoCliente({
    processamentoID: 1,
    clienteID: 12,
  }),
  new ProcessamentoCliente({
    processamentoID: 2,
    clienteID: 11,
  }),
  new ProcessamentoCliente({
    processamentoID: 2,
    clienteID: 12,
  }),
  new ProcessamentoCliente({
    processamentoID: 3,
    clienteID: 15,
  }),
];

class ProcessamentoClienteRepository {
  async findByProcessamentoId(id: number) {
    return processamentoClientes.filter(
      (processamentoCliente) => processamentoCliente.processamentoID === id
    );
  }
}

export default new ProcessamentoClienteRepository();
