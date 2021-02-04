import React, { useEffect, useState } from "react";
import { history } from "routes/history";
import { TextInputMask } from "react-web-masked-text";
import Swal from "sweetalert2";

import store from "store";
import * as clientesService from "../../services/clientesService";
import * as actions from "../../store/actions";
import * as utils from "../../utils";

import ClienteSelect from "components/cliente-select/ClienteSelect";

import "./styles.css";

const ChamadasAdd = (props) => {
    const cod = props.location.cod;
    const nom = props.location.nom;
    const con = props.location.con;
    const tel = props.location.tel;

    const [cliente, setCliente] = useState(null);

    const [contatoChamadas, setContatoChamadas] = useState("");
    const [codEmpresaChamadas, setCodEmpresaChamadas] = useState("");
    const [empresaChamadas, setEmpresaChamadas] = useState("");
    const [telefone1Chamadas, setTelefone1Chamadas] = useState("");

    const [obsCliente, setObsCliente] = useState("");
    const [infFinancCliente, setInfFinancCliente] = useState("");

    const [contato1Cliente, setContato1Cliente] = useState("");
    const [enderecoCliente, setEnderecoCliente] = useState("");

    const [categoriaCliente, setCategoriaCliente] = useState("");
    const [restricaoCliente, setRestricaoCliente] = useState(false);
    const [bloqueadoCliente, setBloqueadoCliente] = useState(false);

    let contatoRef = React.useRef(null);
    let codigoRef = null;

    ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());
    }, []);

    useEffect(() => {
        if (cod) {
            utils.showAlert("Cliente Incluido, Código : " + cod, null, "success", 1500);
            setCodEmpresaChamadas(cod);
            setEmpresaChamadas(nom);
            setContato1Cliente(con);
            setTelefone1Chamadas(tel);
            contatoRef.current.focus();
        };
    }, [cod, nom, con, tel]);

    ////////////////////////////////////////////////////////////////////
    const handleClienteBlur = async () => {

        const clear = () => {
            setEmpresaChamadas("");
            setTelefone1Chamadas("");
            setObsCliente("")
            setInfFinancCliente("");
            setCategoriaCliente("");
            setRestricaoCliente(false);
            setBloqueadoCliente(false);
        };

        if (codEmpresaChamadas === "999999") {
            const clienteObj = {
                ClienteNetAndaresPredio: "",
                ClienteNetAptosPredio: "",
                ClienteNetAtivo: "F",
                ClienteNetBairro: "",
                ClienteNetBairroCobranca: "",
                ClienteNetBairroEntrega: "",
                ClienteNetCNPJ: null,
                ClienteNetCaixasDagua: "",
                ClienteNetCategoria: "DIVERS",
                ClienteNetCep: "",
                ClienteNetCepCobranca: "-",
                ClienteNetCepEntrega: "-",
                ClienteNetCidade: "",
                ClienteNetCidadeCobranca: "",
                ClienteNetCidadeEntrega: "",
                ClienteNetClienteBloqueado: "F",
                ClienteNetClienteRestricao: "F",
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
                ClienteNetEMail: null,
                ClienteNetEMail_c1: null,
                ClienteNetEmail_c2: "",
                ClienteNetEmail_c3: "",
                ClienteNetEndereco: "",
                ClienteNetEnderecoCobranca: "",
                ClienteNetEnderecoEntrega: "",
                ClienteNetEstado: "SP",
                ClienteNetEstadoCobranca: "",
                ClienteNetEstadoEntrega: "",
                ClienteNetFantasia: "",
                ClienteNetFoto: "",
                ClienteNetHomePage: "",
                ClienteNetHoraAlter: "",
                ClienteNetIdEmpresa: 1,
                ClienteNetImprimeEtiqueta: "",
                ClienteNetInscEstadual: "",
                ClienteNetInscMunicipal: "",
                ClienteNetLimiteCredito: 0,
                ClienteNetLimiteCreditoChq: 0,
                ClienteNetLogradouro: "",
                ClienteNetLoja: "Matriz",
                ClienteNetMelhorData: 0,
                ClienteNetNasc_c1: "0000-00-00",
                ClienteNetNasc_c2: "0000-00-00",
                ClienteNetNasc_c3: "0000-00-00",
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
            setCliente(clienteObj);
            clear();
            return;
        };

        if (!!codEmpresaChamadas) {
            const codCliente = utils.leftPad(codEmpresaChamadas, 6);
            setCodEmpresaChamadas(codCliente);

            const clienteObj = await clientesService.getByCode(codCliente);

            if (!clienteObj) {
                alert("Ops, Cliente não cadastrado !!");
                setCodEmpresaChamadas("");
                setContato1Cliente("");
                clear();
                return false;
            };

            let address = utils.getAddress({
                street: clienteObj.ClienteNetLogradouro,
                number: clienteObj.ClienteNetNumEnd,
                neighborhood: clienteObj.ClienteNetBairro,
                city: clienteObj.ClienteNetCidade,
                state: clienteObj.ClienteNetEstado,
                complement: clienteObj.ClienteNetComplEnd,
            });


            setCliente(clienteObj);
            setContato1Cliente(clienteObj.ClienteNetContato1);
            setEmpresaChamadas(clienteObj.ClienteNetNome);
            setTelefone1Chamadas(clienteObj.ClienteNetTelefone1);
            setObsCliente(clienteObj.ClienteNetDadosAdicionais);
            setInfFinancCliente(clienteObj.ClienteNetDadosRestricao);
            setEnderecoCliente(address);

            setCategoriaCliente(clienteObj.ClienteNetCategoria);
            setRestricaoCliente(clienteObj.ClienteNetClienteRestricao === "T"? true: false);
            setBloqueadoCliente(clienteObj.ClienteNetClienteBloqueado === "T"? true: false);

            // ocorrencia = (categoriaCliente || restricaoCliente || bloqueadoCliente );

            if (!clienteObj.ClienteNetTelefone1) {
                utils.showAlert("Telefone não informado, possivel cliente de parceiro !!");
            };
        };
    };

    ////////////////////////////////////////////////////////////////////
    const handleSaveButton = async () => {
        if (!runActionChamadasSet()) return false;

        (() => {
            Swal.fire({
                icon: "success",
                title: "Processando ...",
                position: "top-end",
                background: "yellow",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            }).then(() => {
                return history.push("/form/alterar");
            });
        })();

        function runActionChamadasSet() {
            if (!contatoChamadas) {
                utils.showAlert("Campo Contato é Obrigatório !!");
                return false;
            };

            if (!codEmpresaChamadas) {
                utils.showAlert("Campo Cliente é Obrigatório !!");
                return false;
            };

            store.dispatch(actions.actionChamadasSet({
                IdChamadas: 0,
                IdEmpresaChamadas: 1,
                DataChamadas: utils.getDateNowYMD(),
                PrioridadeChamadas: 5,
                HoraChamadas: utils.getTimeNow(),
                IdParadoxChamadas: 0,
                SituacaoChamadas: "Pendente",
                ContratoChamadas: categoriaCliente === "CONT" || categoriaCliente === "CONT1" ? "Sim" : "Não",
                EmpresaChamadas: empresaChamadas,
                CodEmpresaChamadas: codEmpresaChamadas,
                ContatoChamadas: contatoChamadas,
                TelefoneChamadas: telefone1Chamadas,
                Obs1Chamadas: "",
                Obs2Chamadas: "",
                Obs3Chamadas: "",
                Obs4Chamadas: "",
                Obs5Chamadas: "",
                AnalistaChamadas: "",
                StatusChamadas: "",
                IncluidoPorChamadas: "",
                AtendidoPorChamadas: "",
                BaixadoPorChamadas: "",
                RestricaoChamadas: "",
                DataAltChamadas: "",
                HoraAltChamadas: "",
                VersaoChamadas: "",
            }));

            return true;
        };
    };

    ////////////////////////////////////////////////////////////////////
    const handleAddCliente = async () => {
        history.push({
            pathname: "/clientes-form",
            nextPath: "/add/incluir",
        });
    };

    ////////////////////////////////////////////////////////////////////
    return (
        <div id="chamadas-add" className="chamadas-add-container">

            {/* HEADER */}
            <div className="chamadas-add-header">
                <div className="chamadas-add-header-text">
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>

            {/* BUTTONS */}
            <div className="chamadas-add-buttons">
                <button
                    className="chamadas-add-button-sair"
                    onClick={() => { history.push("/") }}
                >
                    Sair
                </button>

                <button
                    className="chamadas-add-button chamadas-add-button-incluir-cliente"
                    onClick={() => {
                        codigoRef._inputElement.focus();
                        handleAddCliente();
                    }}
                >
                    + Cliente
                </button>

                <button
                    className="chamadas-add-button chamadas-add-button-salvar"
                    style={{ marginLeft: 100 }}
                    onClick={() => handleSaveButton()}>
                    Salvar
                </button>

            </div>

            {/* HEADER MESSAGE */}
            <div className="chamadas-add-warning">
                <div className="chamadas-add-warning-text">
                    Inclusão
                </div>
            </div>

            {/* CONTENT */}
            <div className="chamadas-add-content">

                {/* Nome / Codigo Cliente */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flexStart", flexWrap: "wrap" }}>

                    {/* Nome Contato */}
                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="contatoChamadas">
                                Contato
                            </label>
                            <input
                                id="contatoChamadas"
                                ref={contatoRef}
                                name="contatoChamadas"
                                className="chamadas-add-input"
                                style={{ width: 300 }}
                                placeholder="Nome"
                                maxLength={20}
                                autoFocus
                                autoComplete="new-password"
                                value={contatoChamadas}
                                onChange={(e) => {
                                    setContatoChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {/* Codigo Cliente */}
                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="title">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                id="codEmpresaChamadas"
                                ref={(ref) => codigoRef = ref}
                                name="codEmpresaChamadas"
                                className="chamadas-add-input"
                                // style={{ width: 200 }}
                                kind={"only-numbers"}
                                placeholder="Código Cliente"
                                required
                                maxLength={6}
                                autoComplete="new-password"
                                value={codEmpresaChamadas}
                                onChange={(text) => setCodEmpresaChamadas(text)}
                                onBlur={() => handleClienteBlur()}
                            />
                        </div>
                    </div>

                </div>

                {/* Pesquisa Cliente por Nome */}
                <div style={{ width: "100%" }}>
                    <div className="chamadas-add-input-group">
                        <label className="chamadas-add-label" htmlFor="title">
                            Empresa
                        </label>
                        <ClienteSelect
                            className="chamadas-add-input"
                            onClienteSelecionado={handlerClienteSelecionado}
                        />
                    </div>
                </div>

                {/* CONTRATO / RESTRIÇÂO / BLOQUEIO */}
                { (categoriaCliente === "CONT" || categoriaCliente === "CONT1" || restricaoCliente || bloqueadoCliente) && (
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                        { (categoriaCliente === "CONT" || categoriaCliente === "CONT1") && (
                            <div
                                style={{
                                    backgroundColor: "yellow",
                                    color: "black",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                CONTRATO
                            </div>
                        )}

                        { restricaoCliente && (
                            <div
                                style={{
                                    backgroundColor: "maroon",
                                    color: "white",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                RESTRIÇÂO
                            </div>
                        )}

                        { bloqueadoCliente && (
                            <div
                                style={{
                                    backgroundColor: "red",
                                    color: "yellow",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                BLOQUEADO
                            </div>
                        )}



                    </div>
                )}

                {/* Quadro Cliente Selecionado */}
                <div className="chamadas-add-client-info-container chamadas-add-client-standard-container">
                    <div>
                        <b>
                            Nome Empresa:
                            <span className="chamadas-add-client-info">
                                {` ${empresaChamadas}`}
                            </span>
                        </b>
                    </div>

                    <div>
                        <b>Telefone :</b>
                        <span className="chamadas-add-client-info">
                            {` ${telefone1Chamadas}`}
                        </span>
                    </div>

                    <div>
                        <b>Contato no Cadastro de clientes :</b>
                        <span className="chamadas-add-client-info">
                            {` ${contato1Cliente}`}
                        </span>
                    </div>
                </div>

                {/* Quadro Endereço */}
                {!!enderecoCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Endereço:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {enderecoCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Informações Financeiras */}
                {!!infFinancCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Informações Financeiras / Restrição:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {infFinancCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Observações */}
                {!!obsCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Observações:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {obsCliente}
                            </span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );

    ////////////////////////////////////////////////////////////////////
    async function handlerClienteSelecionado(codCliente) {
        setCodEmpresaChamadas(codCliente);

        const clienteObj = await clientesService.getByCode(codCliente);

        if (!clienteObj) {
            alert("Cliente não encontrado !!")
        } else {
            setCliente(clienteObj);
            setContato1Cliente(clienteObj.ClienteNetContato1);
            setEmpresaChamadas(clienteObj.ClienteNetNome);
            setCodEmpresaChamadas(clienteObj.ClienteNetCodigo);
            setTelefone1Chamadas(clienteObj.ClienteNetTelefone1);
            setCategoriaCliente(clienteObj.ClienteNetCategoria);
            setObsCliente(clienteObj.ClienteNetDadosAdicionais)
            setInfFinancCliente(clienteObj.ClienteNetDadosRestricao)
        };
    };
};

export default ChamadasAdd;
