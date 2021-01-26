import * as utils from "../../utils";

const INITIAL_STATE = {
    clientes: [],
    cliente: {},
    ClienteNetId: 0,
    ClienteNetIdEmpresa: 0,
    ClienteNetAndaresPredio: "",
    ClienteNetAptosPredio: "",
    ClienteNetAtivo: "",
    ClienteNetBairro: "",
    ClienteNetBairroCobranca: "",
    ClienteNetBairroEntrega: "",
    ClienteNetCNPJ: "",
    ClienteNetCaixasDagua: "",
    ClienteNetCategoria: "",
    ClienteNetCep: "",
    ClienteNetCepCobranca: "",
    ClienteNetCepEntrega: "",
    ClienteNetCidade: "",
    ClienteNetCidadeCobranca: "",
    ClienteNetCidadeEntrega: "",
    ClienteNetClienteBloqueado: "",
    ClienteNetClienteRestricao: "",
    ClienteNetCodMunicipio: "",
    ClienteNetCodPais: "",
    ClienteNetCodRegiao: "",
    ClienteNetCodigo: "",
    ClienteNetComplEnd: "",
    ClienteNetCompl_tel1: "",
    ClienteNetCompl_tel2: "",
    ClienteNetCompl_tel3: "",
    ClienteNetContato1: "",
    ClienteNetContato2: "",
    ClienteNetContato3: "",
    ClienteNetContrato: "",
    ClienteNetDadosAdicionais: "",
    ClienteNetDadosRestricao: "",
    ClienteNetDataAlter: "",
    ClienteNetDataCad: "",
    ClienteNetDataNasc: "",
    ClienteNetDataSaldoConta: "",
    ClienteNetDataUltCompra: "",
    ClienteNetDepto_c1: "",
    ClienteNetDepto_c2: "",
    ClienteNetDepto_c3: "",
    ClienteNetDocCnpjCpf: "",
    ClienteNetEMail: "",
    ClienteNetEMail_c1: "",
    ClienteNetEmail_c2: "",
    ClienteNetEmail_c3: "",
    ClienteNetEndereco: "",
    ClienteNetEnderecoCobranca: "",
    ClienteNetEnderecoEntrega: "",
    ClienteNetEstado: "",
    ClienteNetEstadoCobranca: "",
    ClienteNetEstadoEntrega: "",
    ClienteNetFantasia: "",
    ClienteNetFoto: "",
    ClienteNetHomePage: "",
    ClienteNetHoraAlter: "",
    ClienteNetImprimeEtiqueta: "",
    ClienteNetInscEstadual: "",
    ClienteNetInscMunicipal: "",
    ClienteNetLimiteCredito: 0,
    ClienteNetLimiteCreditoChq: 0,
    ClienteNetLogradouro: "",
    ClienteNetLoja: "",
    ClienteNetMelhorData: 0,
    ClienteNetNasc_c1: "",
    ClienteNetNasc_c2: "",
    ClienteNetNasc_c3: "",
    ClienteNetNome: "",
    ClienteNetNumEnd: "",
    ClienteNetNumfax: "",
    ClienteNetPaginaNoGuia: "",
    ClienteNetPais: "",
    ClienteNetPessoa: "",
    ClienteNetPocos: "",
    ClienteNetPontoReferencia: "",
    ClienteNetQtdeParcelas: 0,
    ClienteNetRecursos: "",
    ClienteNetRegTrib: "",
    ClienteNetSaldoConta: 0,
    ClienteNetSuframa: "",
    ClienteNetTaxaAdm: 0,
    ClienteNetTelef_c1: "",
    ClienteNetTelef_c2: "",
    ClienteNetTelef_c3: "",
    ClienteNetTelefone1: "",
    ClienteNetTelefone2: "",
    ClienteNetTelefone3: "",
    ClienteNetTipoAtividade: "",
    ClienteNetTipo_Tel1: "",
    ClienteNetTipo_Tel2: "",
    ClienteNetTipo_tel3: "",
    ClienteNetVendedor: "",
    ClienteNetZona: "",
};

export default function clientesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ACTION_CLIENTES_SET": 
            return functionSet(state, action);
        case "ACTION_CLIENTES_CLEAR": 
            return INITIAL_STATE;
        default: return state;
    };
};

const functionSet = (state, { data }) => {
    return {
        ...state,
        ClienteNetId: data.ClienteNetId,
        ClienteNetIdEmpresa: data.ClienteNetIdEmpresa,
        ClienteNetAndaresPredio: data.ClienteNetAndaresPredio,
        ClienteNetAptosPredio: data.ClienteNetAptosPredio,
        ClienteNetAtivo: data.ClienteNetAtivo,
        ClienteNetBairro: data.ClienteNetBairro,
        ClienteNetBairroCobranca: data.ClienteNetBairroCobranca,
        ClienteNetBairroEntrega: data.ClienteNetBairroEntrega,
        ClienteNetCNPJ: data.ClienteNetCNPJ,
        ClienteNetCaixasDagua: data.ClienteNetCaixasDagua,
        ClienteNetCategoria: data.ClienteNetCategoria,
        ClienteNetCep: data.ClienteNetCep,
        ClienteNetCepCobranca: data.ClienteNetCepCobranca,
        ClienteNetCepEntrega: data.ClienteNetCepEntrega,
        ClienteNetCidade: data.ClienteNetCidade,
        ClienteNetCidadeCobranca: data.ClienteNetCidadeCobranca,
        ClienteNetCidadeEntrega: data.ClienteNetCidadeEntrega,
        ClienteNetClienteBloqueado: data.ClienteNetClienteBloqueado,
        ClienteNetClienteRestricao: data.ClienteNetClienteRestricao,
        ClienteNetCodMunicipio: data.ClienteNetCodMunicipio,
        ClienteNetCodPais: data.ClienteNetCodPais,
        ClienteNetCodRegiao: data.ClienteNetCodRegiao,
        ClienteNetCodigo: data.ClienteNetCodigo,
        ClienteNetComplEnd: data.ClienteNetComplEnd,
        ClienteNetCompl_tel1: data.ClienteNetCompl_tel1,
        ClienteNetCompl_tel2: data.ClienteNetCompl_tel2,
        ClienteNetCompl_tel3: data.ClienteNetCompl_tel3,
        ClienteNetContato1: data.ClienteNetContato1,
        ClienteNetContato2: data.ClienteNetContato2,
        ClienteNetContato3: data.ClienteNetContato3,
        ClienteNetContrato: data.ClienteNetContrato,
        ClienteNetDadosAdicionais: data.ClienteNetDadosAdicionais,
        ClienteNetDadosRestricao: data.ClienteNetDadosRestricao,
        ClienteNetDataAlter: utils.formattedDate(data.ClienteNetDataAlter),
        ClienteNetDataCad: data.ClienteNetDataCad,
        ClienteNetDataNasc: data.ClienteNetDataNasc,
        ClienteNetDataSaldoConta: data.ClienteNetDataSaldoConta,
        ClienteNetDataUltCompra: data.ClienteNetDataUltCompra,
        ClienteNetDepto_c1: data.ClienteNetDepto_c1,
        ClienteNetDepto_c2: data.ClienteNetDepto_c2,
        ClienteNetDepto_c3: data.ClienteNetDepto_c3,
        ClienteNetDocCnpjCpf: data.ClienteNetDocCnpjCpf,
        ClienteNetEMail: data.ClienteNetEMail,
        ClienteNetEMail_c1: data.ClienteNetEMail_c1,
        ClienteNetEmail_c2: data.ClienteNetEmail_c2,
        ClienteNetEmail_c3: data.ClienteNetEmail_c3,
        ClienteNetEndereco: data.ClienteNetEndereco,
        ClienteNetEnderecoCobranca: data.ClienteNetEnderecoCobranca,
        ClienteNetEnderecoEntrega: data.ClienteNetEnderecoEntrega,
        ClienteNetEstado: data.ClienteNetEstado,
        ClienteNetEstadoCobranca: data.ClienteNetEstadoCobranca,
        ClienteNetEstadoEntrega: data.ClienteNetEstadoEntrega,
        ClienteNetFantasia: data.ClienteNetFantasia,
        ClienteNetFoto: data.ClienteNetFoto,
        ClienteNetHomePage: data.ClienteNetHomePage,
        ClienteNetHoraAlter: data.ClienteNetHoraAlter,
        ClienteNetImprimeEtiqueta: data.ClienteNetImprimeEtiqueta,
        ClienteNetInscEstadual: data.ClienteNetInscEstadual,
        ClienteNetInscMunicipal: data.ClienteNetInscMunicipal,
        ClienteNetLimiteCredito: data.ClienteNetLimiteCredito,
        ClienteNetLimiteCreditoChq: data.ClienteNetLimiteCreditoChq,
        ClienteNetLogradouro: data.ClienteNetLogradouro,
        ClienteNetLoja: data.ClienteNetLoja,
        ClienteNetMelhorData: data.ClienteNetMelhorData,
        ClienteNetNasc_c1: data.ClienteNetNasc_c1,
        ClienteNetNasc_c2: data.ClienteNetNasc_c2,
        ClienteNetNasc_c3: data.ClienteNetNasc_c3,
        ClienteNetNome: data.ClienteNetNome,
        ClienteNetNumEnd: data.ClienteNetNumEnd,
        ClienteNetNumfax: data.ClienteNetNumfax,
        ClienteNetPaginaNoGuia: data.ClienteNetPaginaNoGuia,
        ClienteNetPais: data.ClienteNetPais,
        ClienteNetPessoa: data.ClienteNetPessoa,
        ClienteNetPocos: data.ClienteNetPocos,
        ClienteNetPontoReferencia: data.ClienteNetPontoReferencia,
        ClienteNetQtdeParcelas: data.ClienteNetQtdeParcelas,
        ClienteNetRecursos: data.ClienteNetRecursos,
        ClienteNetRegTrib: data.ClienteNetRegTrib,
        ClienteNetSaldoConta: data.ClienteNetSaldoConta,
        ClienteNetSuframa: data.ClienteNetSuframa,
        ClienteNetTaxaAdm: data.ClienteNetTaxaAdm,
        ClienteNetTelef_c1: data.ClienteNetTelef_c1,
        ClienteNetTelef_c2: data.ClienteNetTelef_c2,
        ClienteNetTelef_c3: data.ClienteNetTelef_c3,
        ClienteNetTelefone1: data.ClienteNetTelefone1,
        ClienteNetTelefone2: data.ClienteNetTelefone2,
        ClienteNetTelefone3: data.ClienteNetTelefone3,
        ClienteNetTipoAtividade: data.ClienteNetTipoAtividade,
        ClienteNetTipo_Tel1: data.ClienteNetTipo_Tel1,
        ClienteNetTipo_Tel2: data.ClienteNetTipo_Tel2,
        ClienteNetTipo_tel3: data.ClienteNetTipo_tel3,
        ClienteNetVendedor: data.ClienteNetVendedor,
        ClienteNetZona: data.ClienteNetZona,
    };
};

// EXEMPLO
// ClienteNetAndaresPredio: ""
// ClienteNetAptosPredio: ""
// ClienteNetAtivo: "T"
// ClienteNetBairro: "Ipiranga"
// ClienteNetBairroCobranca: "Centro"
// ClienteNetBairroEntrega: "Centro"
// ClienteNetCNPJ: null
// ClienteNetCaixasDagua: ""
// ClienteNetCategoria: "* A"
// ClienteNetCep: "08900-000"
// ClienteNetCepCobranca: "08900-000"
// ClienteNetCepEntrega: "08900-000"
// ClienteNetCidade: "Guararema"
// ClienteNetCidadeCobranca: "Guararema"
// ClienteNetCidadeEntrega: "Guararema"
// ClienteNetClienteBloqueado: "F"
// ClienteNetClienteRestricao: "F"
// ClienteNetCodMunicipio: ""
// ClienteNetCodPais: ""
// ClienteNetCodRegiao: ""
// ClienteNetCodigo: "000874"
// ClienteNetComplEnd: ""
// ClienteNetCompl_tel1: ""
// ClienteNetCompl_tel2: ""
// ClienteNetCompl_tel3: ""
// ClienteNetContato1: "Luciano"
// ClienteNetContato2: ""
// ClienteNetContato3: ""
// ClienteNetContrato: ""
// ClienteNetDadosAdicionais: "Usuario HD 807735560 Lib 150 dias (05/12/03) Luciana↵||       Lib 150 dias (17/12/03) Luciana↵||       Lib 150 dias (08/01/04) Alexandre↵End Antigo : Rua: Coronel Ramalho, nº 42↵"
// ClienteNetDadosRestricao: "Boletos de Suporte em Aberto OS {22446}↵↵Venc 25/06/18 - 26379-7 de R$ 120,00 - ok em 24/08/18↵_______________________________________________↵"
// ClienteNetDataAlter: "2018-08-29T03:00:00.000Z"
// ClienteNetDataCad: "2003-12-02T02:00:00.000Z"
// ClienteNetDataNasc: "0000-00-00"
// ClienteNetDataSaldoConta: "1995-01-01T02:00:00.000Z"
// ClienteNetDataUltCompra: "0000-00-00"
// ClienteNetDepto_c1: ""
// ClienteNetDepto_c2: ""
// ClienteNetDepto_c3: ""
// ClienteNetDocCnpjCpf: "06149898000140"
// ClienteNetEMail: null
// ClienteNetEMail_c1: null
// ClienteNetEmail_c2: ""
// ClienteNetEmail_c3: ""
// ClienteNetEndereco: "Avenida Antonio Teixeira Muniz, 1369"
// ClienteNetEnderecoCobranca: "Rua: Corolil Ramalho"
// ClienteNetEnderecoEntrega: "Rua: Corolil Ramalho"
// ClienteNetEstado: "SP"
// ClienteNetEstadoCobranca: ""
// ClienteNetEstadoEntrega: ""
// ClienteNetFantasia: "Fabio Gomes de Almeida Peças"
// ClienteNetFoto: ""
// ClienteNetHomePage: "fagmotos@hotmail.com"
// ClienteNetHoraAlter: "15:00:43"
// ClienteNetId: 836
// ClienteNetIdEmpresa: 1
// ClienteNetImprimeEtiqueta: ""
// ClienteNetInscEstadual: ""
// ClienteNetInscMunicipal: ""
// ClienteNetLimiteCredito: 0
// ClienteNetLimiteCreditoChq: 0
// ClienteNetLogradouro: "Avenida Antonio Teixeira Muniz"
// ClienteNetLoja: "Matriz"
// ClienteNetMelhorData: 0
// ClienteNetNasc_c1: "0000-00-00"
// ClienteNetNasc_c2: "0000-00-00"
// ClienteNetNasc_c3: "0000-00-00"
// ClienteNetNome: "Guara Motos"
// ClienteNetNumEnd: "1369"
// ClienteNetNumfax: "(011)4693-5911"
// ClienteNetPaginaNoGuia: ""
// ClienteNetPais: ""
// ClienteNetPessoa: "Juridica"
// ClienteNetPocos: ""
// ClienteNetPontoReferencia: ""
// ClienteNetQtdeParcelas: 0
// ClienteNetRecursos: ""
// ClienteNetRegTrib: ""
// ClienteNetSaldoConta: 0
// ClienteNetSuframa: ""
// ClienteNetTaxaAdm: 0
// ClienteNetTelef_c1: ""
// ClienteNetTelef_c2: ""
// ClienteNetTelef_c3: ""
// ClienteNetTelefone1: "(001)4695-1414"
// ClienteNetTelefone2: "(011)4693-5911"
// ClienteNetTelefone3: ""
// ClienteNetTipoAtividade: "Comercial"
// ClienteNetTipo_Tel1: "Comercial"
// ClienteNetTipo_Tel2: "Comercial"
// ClienteNetTipo_tel3: ""
// ClienteNetVendedor: "000001"
// ClienteNetZona: "DIVERS"
