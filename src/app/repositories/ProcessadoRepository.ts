import { Processado } from "../models/Processado";

class ProcessadoRepository {
  async findNextId() {
    return 999;
  }

  async save(processado: Processado) {
    // salvar dados
    processado.ID = await this.findNextId();
  }
}

export default new ProcessadoRepository();
