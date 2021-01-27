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
    const [cliente, setCliente] = useState(null);
    const [contatoChamadas, setContatoChamadas] = useState("");
    const [codEmpresaChamadas, setCodEmpresaChamadas] = useState("");
    const [empresaChamadas, setEmpresaChamadas] = useState("");
    const [telefone1Chamadas, setTelefone1Chamadas] = useState("");

    ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());
    }, []);

    ////////////////////////////////////////////////////////////////////
    const handleSaveButton = async () => {
        if (!runActionChamadasSet()) return false;

        (() => {
            Swal.fire({
                icon: "success",
                title: "Processando ...",
                // text: "Texto",
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
                showMessage("Campo Contato é Obrigatório !!");
                return false;
            };

            if (!codEmpresaChamadas) {
                showMessage("Campo Cliente é Obrigatório !!");
                return false;
            };

            function showMessage(msg) {
                Swal.fire("Erro", msg, "error");
            };

            store.dispatch(actions.actionChamadasSet({
                IdChamadas: 0,
                IdEmpresaChamadas: 1,
                DataChamadas: utils.getDateNowYMD(),
                PrioridadeChamadas: 5,
                HoraChamadas: utils.getTimeNow(),
                IdParadoxChamadas: 0,
                SituacaoChamadas: "Pendente",
                ContratoChamadas: "Não",
                EmpresaChamadas: empresaChamadas,
                CodEmpresaChamadas: codEmpresaChamadas,
                ContatoChamadas: contatoChamadas,
                TelefoneChamadas: cliente.ClienteNetTelefone1,
                Obs1Chamadas: "",
                Obs2Chamadas: "",
                Obs3Chamadas: "",
                Obs4Chamadas: "",
                Obs5Chamadas: "",
                AnalistaChamadas: store.getState().loginState.loggedUser,
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
                <button className="chamadas-add-button-sair" onClick={() => { history.push("/") }}>
                    Sair
                </button>
                <button className="chamadas-add-button" onClick={() => handleSaveButton()}>
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

                {/* Contato */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flexStart", flexWrap: "wrap" }}>

                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="contatoChamadas">
                                Contato
                            </label>
                            <input
                                id="contatoChamadas"
                                name="contatoChamadas"
                                className="chamadas-add-input"
                                style={{ width: 300 }}
                                placeholder="Nome"
                                required
                                autoFocus
                                autoComplete="new-password"
                                value={contatoChamadas}
                                onChange={(e) => {
                                    setContatoChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="title">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                id="codEmpresaChamadas"
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
                                onBlur={async () => {

                                    if (!!codEmpresaChamadas) {
                                        const codCliente = utils.leftPad(codEmpresaChamadas, 6);
                                        setCodEmpresaChamadas(codCliente);

                                        const cliente = await clientesService.getByCode(codCliente);

                                        if (!cliente) {
                                            alert("Cliente não cadastrado !!")
                                            setCodEmpresaChamadas("");
                                            setEmpresaChamadas("");
                                            setTelefone1Chamadas("");
                                        } else {
                                            setCliente(cliente);
                                            setEmpresaChamadas(cliente.ClienteNetNome);
                                            setTelefone1Chamadas(cliente.ClienteNetTelefone1);
                                        };
                                    };
                                }}
                            />
                        </div>
                    </div>

                </div>

                {/* Empresa */}
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

                {/* Quadro Cliente Selecionado */}
                <div className="chamadas-add-client-info-container">
                    <div>
                        <b>Contato :</b>
                        <span className="chamadas-add-client-info"
                        > {contatoChamadas}
                        </span>
                    </div>

                    <div>
                        <b>Código :</b>
                        <span className="chamadas-add-client-info"
                        > {codEmpresaChamadas}
                        </span>
                    </div>

                    <div>
                        <b>Nome :</b>
                        <span className="chamadas-add-client-info"
                        > {empresaChamadas}
                        </span>
                    </div>

                    <div>
                        <b>Telefone :</b>
                        <span className="chamadas-add-client-info"
                        > {telefone1Chamadas}
                        </span>
                    </div>
                </div>

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
            setEmpresaChamadas(cliente.ClienteNetNome);
            setCodEmpresaChamadas(cliente.ClienteNetCodigo);
            setTelefone1Chamadas(cliente.ClienteNetNome);
        };
    };
};

export default ChamadasAdd;
