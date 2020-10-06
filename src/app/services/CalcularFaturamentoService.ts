import SelecionarDadosService from "./SelecionarDadosService";
import FormataTransacaoService from "./FormataTransacaoService";
import PreencheCodigoEspecialService from "./PreencheCodigoEspecialService";
import GravarDadosService from "./GravarDadosService";

class CalcularFaturamentoService {
  private selecionarDadosService: SelecionarDadosService;
  private formataTransacaoService: FormataTransacaoService;
  private preencheCodigoEspecialService: PreencheCodigoEspecialService;
  private gravarDadosService: GravarDadosService;

  constructor() {
    this.selecionarDadosService = new SelecionarDadosService();
    this.formataTransacaoService = new FormataTransacaoService();
    this.preencheCodigoEspecialService = new PreencheCodigoEspecialService();
    this.gravarDadosService = new GravarDadosService();
  }

  async execute(id: number) {
    const dados = await this.selecionarDadosService.execute(id);
    const transacoes = this.formataTransacaoService.execute(dados);
    await this.preencheCodigoEspecialService.execute(transacoes);
    return this.gravarDadosService.execute(transacoes);
  }
}
export default CalcularFaturamentoService;
