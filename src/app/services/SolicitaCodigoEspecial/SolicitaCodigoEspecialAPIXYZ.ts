import AppError from "../../erros/AppError";
import ISolicitaCodigoEspecial, {
  ICodigoEspecial,
} from "./ISolicitaCodigoEspecial";

export default class SolicitaCodigoEspecialAPIXYZ
  implements ISolicitaCodigoEspecial {
  constructor() {}

  private formatXMLImpostoSIPDataSul(codigos: string[]) {
    const xml = `<![CDATA[<?xml version="1.0"?><ttImpostos xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`.concat(
      codigos
        .map(
          (codigo, index) => `
              <ttRow id="${index}">
                <Registro>
                  <cliente>${codigo}</cliente>
                </Registro>
              </ttRow>`
        )
        .join(""),
      `</ttImpostos>]]>`
    );

    return xml;
  }

  async solicitar(
    xml: string
  ): Promise<
    Array<{
      cliente: string;
      codigo: number;
    }>
  > {
    try {
      return [];
    } catch {
      throw new AppError("Problema ao solicitar codigos");
    }
  }

  async call(codigosClienteDestino: string[]): Promise<ICodigoEspecial[]> {
    const xml = this.formatXMLImpostoSIPDataSul(codigosClienteDestino);
    const codigosEspecial = await this.solicitar(xml);

    return codigosClienteDestino.map((codigo) => ({
      codigoClienteDestino: codigo,
      codigoEspecial:
        codigosEspecial.find((especial) => especial.cliente === codigo)
          ?.codigo || 9999,
    }));
  }
}
