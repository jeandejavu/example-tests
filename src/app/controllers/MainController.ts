import express from "express";
import CalcularFaturamentoService from "../services/CalcularFaturamentoService";

export enum Message {
  ServidorOnline = "Servidor online",
  ServidorOffline = "Servidor offline",
  CalculoConcluido = "Cálculo concluído, Número : :numero",
}

function getConnection() {
  return { isConnected: true };
}

class MainController {
  checkConnection = (req: express.Request, res: express.Response) =>
    res.status(200).json({
      msg: getConnection().isConnected
        ? Message.ServidorOnline
        : Message.ServidorOffline,
    });

  calculate = async (req: express.Request, res: express.Response) => {
    if (!getConnection().isConnected)
      return res.status(400).json({ msg: Message.ServidorOffline });
    const { id } = req.body;
    const service = new CalcularFaturamentoService();
    const numeroCalculo = await service.execute(id);
    return res.status(200).json({
      msg: Message.CalculoConcluido.replace(":numero", String(numeroCalculo)),
    });
  };
}

export default new MainController();
