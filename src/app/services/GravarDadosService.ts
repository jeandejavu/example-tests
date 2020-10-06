import AppError from "../erros/AppError";
import { Processado } from "../models/Processado";
import { ProcessadoItem } from "../models/ProcessadoItem";
import ProcessadoItemRepository from "../repositories/ProcessadoItemRepository";
import ProcessadoRepository from "../repositories/ProcessadoRepository";
import ITransacaoFormatada from "./interfaces/ITransacaoFormatada";

class GravarDadosService {
  constructor() {}
  async execute(transacoes: ITransacaoFormatada[]) {
    try {
      const processado = new Processado();
      await ProcessadoRepository.save(processado);

      const processadoItens = transacoes.map(
        (transacao) =>
          new ProcessadoItem({
            codigoEspecial: transacao.codigoEspecial,
            numero: transacao.numero,
            processadoID: processado.ID,
            total: transacao.total,
          })
      );

      await ProcessadoItemRepository.save(processadoItens);

      return processado.ID;
    } catch {
      throw new AppError("Falha ao gravar dados");
    }
  }
}

export default GravarDadosService;
