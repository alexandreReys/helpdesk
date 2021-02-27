import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

import { history } from "routes/history";
import store from "store";
import * as chamadasService from "../../services/chamadasService";
import * as clientesService from "../../services/clientesService";
import * as historicosService from "../../services/historicosService";
import * as actions from "../../store/actions";
import * as utils from "../../utils"

import "./styles.css";
import Swal from "sweetalert2";

const ChamadasForm = (props) => {
    const [evento] = useState(props.match.params.evento);

    const [dataChamadas] = useState(store.getState().chamadasState.DataChamadas);
    const [horaChamadas] = useState(store.getState().chamadasState.HoraChamadas);
    const [codEmpresaChamadas] = useState(store.getState().chamadasState.CodEmpresaChamadas);
    const [empresaChamadas] = useState(store.getState().chamadasState.EmpresaChamadas);
    const [contatoChamadas, setContatoChamadas] = useState(store.getState().chamadasState.ContatoChamadas);
    const [telefoneChamadas, setTelefoneChamadas] = useState(store.getState().chamadasState.TelefoneChamadas);
    const [obs1Chamadas, setObs1Chamadas] = useState(store.getState().chamadasState.Obs1Chamadas);
    const [obs2Chamadas, setObs2Chamadas] = useState(store.getState().chamadasState.Obs2Chamadas);
    const [obs3Chamadas, setObs3Chamadas] = useState(store.getState().chamadasState.Obs3Chamadas);
    const [obs4Chamadas, setObs4Chamadas] = useState(store.getState().chamadasState.Obs4Chamadas);
    const [statusChamadas, setStatusChamadas] = useState(store.getState().chamadasState.StatusChamadas);
    const [analistaChamadas, setAnalistaChamadas] = useState(store.getState().chamadasState.AnalistaChamadas);

    const [incluidoPorChamadas] = useState(store.getState().chamadasState.IncluidoPorChamadas);
    const [atendidoPorChamadas] = useState(store.getState().chamadasState.AtendidoPorChamadas);
    const [baixadoPorChamadas] = useState(store.getState().chamadasState.BaixadoPorChamadas);

    const [temContrato, setTemContrato] = useState("");
    const [enderecoCliente, setEnderecoCliente] = useState("");
    const [restricaoCliente, setRestricaoCliente] = useState(false);
    const [bloqueadoCliente, setBloqueadoCliente] = useState(false);
    const [infFinancCliente, setInfFinancCliente] = useState("");

    const [ultimosTelefonesHistorico, setUltimosTelefonesHistorico] = useState("");


    useEffect( () => {
        const getDadosClienteEHistorico = async () => {
            if ( !await getCliente(codEmpresaChamadas) ) return history.push("/");
            await getUltimosTelefones(codEmpresaChamadas);
        };

        store.dispatch(actions.actionAdminModuleDeactivate());

        if (codEmpresaChamadas !== "999999") getDadosClienteEHistorico();

        if (evento === "atender" && !statusChamadas) setStatusChamadas("na linha");
        if (evento === "atender" && !analistaChamadas) setAnalistaChamadas(store.getState().loginState.loggedUser);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codEmpresaChamadas]);

    return (
        <div id="chamadas-form" className="chamadas-form-container">
            {/* HEADER */}
            <div className="chamadas-form-header">
                <div className="chamadas-form-header-text">
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>



            {/* BUTTONS */}
            <div className="chamadas-form-buttons">
                <button className="chamadas-form-button-sair" onClick={() => { history.push("/") }}>
                    Sair
                </button>
                <button className="chamadas-form-button" onClick={() => handleSaveButton()}>
                    Salvar
                </button>
                {evento}
            </div>



            {/* HEADER INFO CHAMADAS E CLIENTE */}
            <div className="chamadas-form-info">

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    {/* Contrato */}
                    {!!temContrato && (
                        <div className="chamadas-form-info-col">
                            <div className="chamadas-form-info-contrato">
                                CONTRATO
                            </div>
                        </div>
                    )}

                    {/* restricao */}
                    {restricaoCliente && (
                        <div className="chamadas-form-info-col">
                            <div
                                style={{
                                    backgroundColor: "maroon",
                                    color: "white",
                                    marginTop: 5,
                                    padding: "8px 8px 5px",
                                    borderRadius: 8,
                                    fontWeight: "bold",
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                RESTRIÇÂO
                            </div>
                        </div>
                    )}

                    {/* bloqueio */}
                    {bloqueadoCliente && (
                        <div className="chamadas-form-info-col">
                            <div
                                style={{
                                    backgroundColor: "red",
                                    color: "YELLOW",
                                    marginTop: 5,
                                    padding: "8px 8px 5px",
                                    borderRadius: 8,
                                    fontWeight: "bold",
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                BLOQUEADO
                            </div>
                        </div>
                    )}

                    {/* Data */}
                    <div className="chamadas-form-info-col">
                        <div style={{ color: "blue", fontWeight: "bold", fontSize: "0.9rem" }}>Data/Hora</div>
                        <div style={{ fontSize: "0.9rem" }}>{`${dataChamadas} ${horaChamadas}`}</div>
                    </div>

                    {/* Cod.Cliente */}
                    <div className="chamadas-form-info-col">
                        <div style={{ color: "blue", fontWeight: "bold", fontSize: "0.9rem" }}>Cliente</div>
                        <div style={{ fontSize: "0.9rem" }}>{`(${codEmpresaChamadas})  ${empresaChamadas}`}</div>
                    </div>

                    {/* Endereço */}
                    {enderecoCliente && (
                        <div className="chamadas-form-info-col">
                            <div style={{ color: "blue", fontWeight: "bold", fontSize: "0.9rem" }}>Endereço</div>
                            <div style={{ fontSize: "0.7rem" }}>{enderecoCliente}</div>
                        </div>
                    )}

                    {/* Inf.Financeiras */}
                    {infFinancCliente && (
                        <div className="chamadas-form-info-col">
                            <div style={{ color: "blue", fontWeight: "bold", fontSize: "0.9rem" }}>Informações Financeiras</div>
                            <div style={{ fontSize: "0.7rem" }}>{infFinancCliente}</div>
                        </div>
                    )}

                </div>
            </div>



            {/* CONTENT */}
            <div className="chamadas-form-content">

                {/* Contato / Telefone */}
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    <div> {/* Contato */}
                        <div className="chamadas-form-input-group">
                            <label className="chamadas-form-label" htmlFor="contatoChamadas">
                                Contato
                            </label>
                            <input
                                kind={"only-numbers"}
                                className="chamadas-form-input"
                                style={{ width: 200 }}
                                name="contatoChamadas"
                                id="contatoChamadas"
                                maxLength={10}
                                autoComplete="new-password"
                                value={contatoChamadas}
                                onChange={(e) => {
                                    setContatoChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* Telefone */}
                        <div className="chamadas-form-input-group-small">
                            <label className="chamadas-form-label" htmlFor="telefoneChamadas">
                                Telefone
                            </label>
                            <input
                                className="chamadas-form-input"
                                style={{ width: 300 }}
                                name="telefoneChamadas"
                                id="telefoneChamadas"
                                maxLength={30}
                                autoFocus
                                autoComplete="new-password"
                                value={telefoneChamadas}
                                onChange={(e) => {
                                    setTelefoneChamadas(e.target.value);
                                }}
                            />
                            <label 
                                style={{ 
                                    fontSize: "0.7rem", 
                                    fontWeight: "bold",
                                    color: "maroon", 
                                    marginBottom: 0 
                                }} 
                                htmlFor="telefoneChamadas"
                            >
                                Ultimo(s) Chamado(s): { ` ${ultimosTelefonesHistorico}` }
                            </label>
                        </div>
                    </div>
                </div>

                {/* Observações */}
                <div style={{ display: "block", flexDirection: "row", flexWrap: "wrap" }}>

                    <div> {/* Observações */}
                        <div className="chamadas-form-input-group">
                            <label className="chamadas-form-label" htmlFor="obs1Chamadas">
                                Observações
                            </label>
                            <input
                                className="chamadas-form-input"
                                style={{ width: "100%" }}
                                name="obs1Chamadas"
                                id="obs1Chamadas"
                                maxLength={100}
                                autoComplete="new-password"
                                value={obs1Chamadas}
                                onChange={(e) => { setObs1Chamadas(e.target.value) }}
                            />
                            <input
                                className="chamadas-form-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs2Chamadas"
                                id="obs2Chamadas"
                                maxLength={100}
                                autoComplete="new-password"
                                value={obs2Chamadas}
                                onChange={(e) => {
                                    setObs2Chamadas(e.target.value);
                                }}
                            />
                            <input
                                className="chamadas-form-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs3Chamadas"
                                id="obs3Chamadas"
                                maxLength={100}
                                autoComplete="new-password"
                                value={obs3Chamadas}
                                onChange={(e) => {
                                    setObs3Chamadas(e.target.value);
                                }}
                            />
                            <input
                                className="chamadas-form-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs4Chamadas"
                                id="obs4Chamadas"
                                maxLength={100}
                                autoComplete="new-password"
                                value={obs4Chamadas}
                                onChange={(e) => {
                                    setObs4Chamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status / Analista */}
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    <div> {/* Status */}
                        <div className="chamadas-form-input-group">
                            <label className="chamadas-form-label" htmlFor="analistaChamadas">
                                Status
                            </label>
                            <input
                                className="chamadas-form-input"
                                style={{ width: 200 }}
                                name="statusChamadas"
                                id="statusChamadas"
                                maxLength={20}
                                autoComplete="new-password"
                                value={statusChamadas}
                                onChange={(e) => {
                                    setStatusChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* Analista */}
                        <div className="chamadas-form-input-group">
                            <label className="chamadas-form-label" htmlFor="statusChamadas">
                                Analista
                            </label>
                            <input
                                className="chamadas-form-input"
                                style={{ width: 200 }}
                                name="analistaChamadas"
                                id="analistaChamadas"
                                maxLength={20}
                                autoComplete="new-password"
                                value={analistaChamadas}
                                onChange={(e) => {
                                    setAnalistaChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {/* Botão Salvar */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingRight: 17,
                            paddingLeft: 17,
                            backgroundColor: "#4682b4",
                            color: "white",
                            borderRadius: 50,
                            boxShadow: "2px 4px 6px #000",
                            cursor: "pointer",
                        }}
                        onClick={() => handleSaveButton()}
                    >
                        <FaCheck />
                    </div>


                </div>

            </div>


                {/* Histórico da chamada */}
                <div className="chamadas-form-historico-container">
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        flexWrap: "wrap",
                        marginTop: 10, 
                        fontSize: "0.8rem" }}
                    >
                        <div
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                marginLeft: 20,
                                marginRight: 20,
                                marginTop: 8,
                                marginBottom: 15,
                            }}
                        >
                            Histórico
                        </div>

                        { !!incluidoPorChamadas && (
                            <div className="chamadas-form-historico-item">
                                {`${incluidoPorChamadas}`}
                            </div>
                        )}
                        { !!atendidoPorChamadas && (
                            <div className="chamadas-form-historico-item">
                                {`${atendidoPorChamadas}`}
                            </div>
                        )}
                        { !!baixadoPorChamadas && (
                            <div className="chamadas-form-historico-item">
                                {`${baixadoPorChamadas}`}
                            </div>
                        )}

                    </div>
                </div>


        </div>
    );

    ///////////////////////////////////////////////////////////////////////////////
    async function getCliente(codCliente) {
        if (codCliente) {
            let cliente = await clientesService.getByCode(codCliente);

            if (!cliente) {
                alert("Cliente não cadastrado !!")
                setTemContrato(false);
                setEnderecoCliente("");
                setRestricaoCliente(false);
                setBloqueadoCliente(false);
                setInfFinancCliente("");
                return false;
            };

            let address = utils.getAddress({
                street: cliente.ClienteNetLogradouro,
                number: cliente.ClienteNetNumEnd,
                neighborhood: cliente.ClienteNetBairro,
                city: cliente.ClienteNetCidade,
                state: cliente.ClienteNetEstado,
                complement: cliente.ClienteNetComplEnd,
                cnpj: cliente.ClienteNetDocCnpjCpf,
            });

            setTemContrato(
                utils.getTemContrato(cliente.ClienteNetCategoria) ? "CONTRATO" : null
            );
            setEnderecoCliente(address);
            setRestricaoCliente(cliente.ClienteNetClienteRestricao === "T" ? true : false);
            setBloqueadoCliente(cliente.ClienteNetClienteBloqueado === "T" ? true : false);
            setInfFinancCliente(cliente.ClienteNetDadosRestricao);

            return address;
        };
    };

    ///////////////////////////////////////////////////////////////////////////////
    async function getUltimosTelefones(codCliente) {
        if (codCliente) {
            setUltimosTelefonesHistorico(
                await historicosService.getUltimosTelefonesByCodEmpresa(codCliente)
            );
        };
    };

    ///////////////////////////////////////////////////////////////////////////////
    function handleSaveButton() {
        if (!evento) {
            alert("Event Error !!");
            return;
        };

        const emAlmoco = obs1Chamadas.toLowerCase() === "almoco" || 
            obs1Chamadas.toLowerCase() === "almoço";

        const updateData = {
            IdChamadas: store.getState().chamadasState.IdChamadas,
            IdEmpresaChamadas: store.getState().chamadasState.IdEmpresaChamadas,
            IdParadoxChamadas: store.getState().chamadasState.IdParadoxChamadas,
            AnalistaChamadas: analistaChamadas,
            AtendidoPorChamadas: store.getState().chamadasState.AtendidoPorChamadas,
            BaixadoPorChamadas: store.getState().chamadasState.BaixadoPorChamadas,
            CodEmpresaChamadas: codEmpresaChamadas,
            ContatoChamadas: contatoChamadas,
            ContratoChamadas: store.getState().chamadasState.ContratoChamadas,
            DataAltChamadas: utils.formattedDateYearFirst(store.getState().chamadasState.DataAltChamadas),
            DataChamadas: utils.formattedDateYearFirst(dataChamadas),
            EmpresaChamadas: !emAlmoco? empresaChamadas: "ALMOÇO",
            HoraAltChamadas: horaChamadas,
            HoraChamadas: store.getState().chamadasState.HoraChamadas,
            IncluidoPorChamadas: store.getState().chamadasState.IncluidoPorChamadas,
            Obs1Chamadas: !emAlmoco? obs1Chamadas: "",
            Obs2Chamadas: obs2Chamadas,
            Obs3Chamadas: obs3Chamadas,
            Obs4Chamadas: obs4Chamadas,
            Obs5Chamadas: store.getState().chamadasState.Obs5Chamadas,
            PrioridadeChamadas: store.getState().chamadasState.PrioridadeChamadas,
            RestricaoChamadas: store.getState().chamadasState.RestricaoChamadas,
            SituacaoChamadas: store.getState().chamadasState.SituacaoChamadas,
            StatusChamadas: !emAlmoco? statusChamadas: "Baixado",
            TelefoneChamadas: telefoneChamadas,
            VersaoChamadas: store.getState().chamadasState.VersaoChamadas,
        };

        chamadasService.postEvento(
            updateData.IdChamadas === 0 ? "incluir" : evento,
            updateData
        );

        // Alerta Processando
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
                return history.push("/");
            });
        })();
    };
};

export default ChamadasForm;
