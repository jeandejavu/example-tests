import { Cliente } from "../models/Cliente";

const clientes = [
  new Cliente({
    filial: 1,
    ID: 11,
    codigo: "11",
  }),
  new Cliente({
    filial: 1,
    ID: 12,
    codigo: "12",
  }),
  new Cliente({
    filial: 1,
    ID: 13,
    codigo: "13",
  }),
  new Cliente({
    filial: 1,
    ID: 21,
    codigo: "21",
  }),
  new Cliente({
    filial: 1,
    ID: 22,
    codigo: "22",
  }),
  new Cliente({
    filial: 1,
    ID: 23,
    codigo: "23",
  }),
  new Cliente({
    filial: 1,
    ID: 31,
    codigo: "31",
  }),
  new Cliente({
    filial: 1,
    ID: 32,
    codigo: "32",
  }),
  new Cliente({
    filial: 1,
    ID: 33,
    codigo: "33",
  }),
];

class ClienteRepository {
  async findByFilial(filial: number) {
    return clientes.filter((cliente) => cliente.filial === filial);
  }
}

export default new ClienteRepository();
