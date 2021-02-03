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
        if (!!codEmpresaChamadas) {
            const codCliente = utils.leftPad(codEmpresaChamadas, 6);
            setCodEmpresaChamadas(codCliente);

            const cliente = await clientesService.getByCode(codCliente);

            if (!cliente) {
                alert("Cliente não cadastrado !!")
                setContato1Cliente("");
                setCodEmpresaChamadas("");
                setEmpresaChamadas("");
                setTelefone1Chamadas("");
                setObsCliente("")
                setInfFinancCliente("");

                setCategoriaCliente("");
                setRestricaoCliente(false);
                setBloqueadoCliente(false);

                return false;
            };

            let address = utils.getAddress({
                street: cliente.ClienteNetLogradouro,
                number: cliente.ClienteNetNumEnd,
                neighborhood: cliente.ClienteNetBairro,
                city: cliente.ClienteNetCidade,
                state: cliente.ClienteNetEstado,
                complement: cliente.ClienteNetComplEnd,
            });


            setCliente(cliente);
            setContato1Cliente(cliente.ClienteNetContato1);
            setEmpresaChamadas(cliente.ClienteNetNome);
            setTelefone1Chamadas(cliente.ClienteNetTelefone1);
            setObsCliente(cliente.ClienteNetDadosAdicionais);
            setInfFinancCliente(cliente.ClienteNetDadosRestricao);
            setEnderecoCliente(address);

            setCategoriaCliente(cliente.ClienteNetCategoria);
            setRestricaoCliente(cliente.ClienteNetClienteRestricao === "T"? true: false);
            setBloqueadoCliente(cliente.ClienteNetClienteBloqueado === "T"? true: false);

            // ocorrencia = (categoriaCliente || restricaoCliente || bloqueadoCliente );

            if (!cliente.ClienteNetTelefone1) {
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
                ContratoChamadas: categoriaCliente === "CONT" ? "Sim" : "Não",
                EmpresaChamadas: empresaChamadas,
                CodEmpresaChamadas: codEmpresaChamadas,
                ContatoChamadas: contatoChamadas,
                TelefoneChamadas: cliente.ClienteNetTelefone1,
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
                                maxLength={10}
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
                { (categoriaCliente === "CONT" || restricaoCliente || bloqueadoCliente) && (
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                        { categoriaCliente === "CONT" && (
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

        const cliente = await clientesService.getByCode(codCliente);

        if (!cliente) {
            alert("Cliente não cadastrado !!")
        } else {
            setCliente(cliente);
            setContato1Cliente(cliente.ClienteNetContato1);
            setEmpresaChamadas(cliente.ClienteNetNome);
            setCodEmpresaChamadas(cliente.ClienteNetCodigo);
            setTelefone1Chamadas(cliente.ClienteNetNome);
            setCategoriaCliente(cliente.ClienteNetCategoria);
            setObsCliente(cliente.ClienteNetDadosAdicionais)
            setInfFinancCliente(cliente.ClienteNetDadosRestricao)
        };
    };
};

export default ChamadasAdd;
