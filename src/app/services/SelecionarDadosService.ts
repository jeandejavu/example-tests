import AppError from "../erros/AppError";
import { Cliente } from "../models/Cliente";
import { Processamento } from "../models/Processamento";
import { ProcessamentoCliente } from "../models/ProcessamentoCliente";
import { Transacao } from "../models/Transacao";
import ClienteRepository from "../repositories/ClienteRepository";
import ProcessamentoClienteRepository from "../repositories/ProcessamentoClienteRepository";
import ProcessamentoRepository from "../repositories/ProcessamentoRepository";
import TransacaoRepository from "../repositories/TransacaoRepository";
import linkObjects from "../utils/linkObjects";

interface IDadosCalculo {
  processamento: Processamento;
  processamentoClientes: ProcessamentoCliente[];
  clientes: Cliente[];
  transacoes: Transacao[];
}

export default class SelecionarDadosService {
  construct() {}

  private async getDependencias(processamento: Processamento) {
    return Promise.all([
      ClienteRepository.findByFilial(processamento.filial),
      TransacaoRepository.findByFilialAndPeriodo(
        processamento.filial,
        processamento.periodoDe,
        processamento.periodoAte
      ),
    ]);
  }

  private async linkDependencias({
    processamento,
    processamentoClientes,
    clientes,
    transacoes,
  }: IDadosCalculo) {
    linkObjects({
      main: {
        registers: processamentoClientes,
        compareFields: ["clienteID"],
        setFieldName: "Transacoes",
      },
      child: {
        registers: transacoes,
        compareFields: ["clienteFaturamentoID"],
      },
    });

    linkObjects({
      main: {
        registers: transacoes,
        compareFields: ["clienteDestinoID"],
        setFieldName: "ClienteDestino",
      },
      parent: {
        registers: clientes,
        compareFields: ["ID"],
      },
    });

    linkObjects({
      main: {
        registers: transacoes,
        compareFields: ["clienteOrigemID"],
        setFieldName: "ClienteOrigem",
      },
      parent: {
        registers: clientes,
        compareFields: ["ID"],
      },
    });

    linkObjects({
      main: {
        registers: transacoes,
        compareFields: ["clienteFaturamentoID"],
        setFieldName: "ClienteFaturamento",
      },
      parent: {
        registers: clientes,
        compareFields: ["ID"],
      },
    });

    linkObjects({
      main: {
        registers: processamentoClientes,
        compareFields: ["clienteID"],
        setFieldName: "Transacoes",
      },
      child: {
        registers: transacoes,
        compareFields: ["clienteFaturamentoID"],
      },
    });


    processamento.ProcessamentoClientes = processamentoClientes;
  }

  async execute(id: number) {
    const processamento = await ProcessamentoRepository.findOneById(id);
    if (!processamento) throw new AppError("Calculo não encontrado");
    const processamentoClientes = await ProcessamentoClienteRepository.findByProcessamentoId(
      id
    );
    if (!processamentoClientes) throw new AppError("Calculo sem cliente");

    const [clientes, transacoes] = await this.getDependencias(processamento);

    if (!transacoes) throw new AppError("Calculo sem transacoes");

    this.linkDependencias({
      processamento,
      processamentoClientes,
      clientes,
      transacoes,
    });
    return processamento;
  }
}
