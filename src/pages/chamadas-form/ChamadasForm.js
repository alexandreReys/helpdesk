import React, { useEffect, useState } from "react";
import { history } from "routes/history";
import store from "store";
import * as chamadasService from "../../services/chamadasService";
import * as clientesService from "../../services/clientesService";
import * as actions from "../../store/actions";
import * as utils from "../../utils"

import "./styles.css";
import Swal from "sweetalert2";

const ChamadasForm = ( props ) => {
    const [evento] = useState(props.match.params.evento);
    
    const [dataChamadas] = useState( store.getState().chamadasState.DataChamadas );
    const [horaChamadas] = useState( store.getState().chamadasState.HoraChamadas );
    const [codEmpresaChamadas] = useState( store.getState().chamadasState.CodEmpresaChamadas );
    const [empresaChamadas] = useState( store.getState().chamadasState.EmpresaChamadas );
    const [contatoChamadas, setContatoChamadas] = useState( store.getState().chamadasState.ContatoChamadas );
    const [telefoneChamadas, setTelefoneChamadas] = useState( store.getState().chamadasState.TelefoneChamadas );
    const [obs1Chamadas, setObs1Chamadas] = useState( store.getState().chamadasState.Obs1Chamadas );
    const [obs2Chamadas, setObs2Chamadas] = useState( store.getState().chamadasState.Obs2Chamadas );
    const [obs3Chamadas, setObs3Chamadas] = useState( store.getState().chamadasState.Obs3Chamadas );
    const [obs4Chamadas, setObs4Chamadas] = useState( store.getState().chamadasState.Obs4Chamadas );
    const [statusChamadas, setStatusChamadas] = useState( store.getState().chamadasState.StatusChamadas );
    const [analistaChamadas, setAnalistaChamadas] = useState( store.getState().chamadasState.AnalistaChamadas );

    const [categoriaCliente, setCategoriaCliente] = useState("");
    const [enderecoCliente, setEnderecoCliente] = useState("");
    const [restricaoCliente, setRestricaoCliente] = useState(false);
    const [bloqueadoCliente, setBloqueadoCliente] = useState(false);
    const [infFinancCliente, setInfFinancCliente] = useState("");


    useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());

        if (codEmpresaChamadas !== "999999") {
            getCliente(codEmpresaChamadas);
        };

        if (evento === "atender" && !statusChamadas) setStatusChamadas("na linha");
        if (evento === "atender" && !analistaChamadas) setAnalistaChamadas(store.getState().loginState.loggedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codEmpresaChamadas]);

    const getCliente = async (codCliente) => {
        if (codCliente) {
            let cliente = await clientesService.getByCode(codCliente);

            if (!cliente) {
                alert("Cliente não cadastrado !!")
                setCategoriaCliente("");
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
            });

            setCategoriaCliente(
                cliente.ClienteNetCategoria === "CONT" || 
                cliente.ClienteNetCategoria === "CONT1"? "CONTRATO": null
            );
            setEnderecoCliente(address);
            setRestricaoCliente(cliente.ClienteNetClienteRestricao === "T"? true: false);
            setBloqueadoCliente(cliente.ClienteNetClienteBloqueado === "T"? true: false);
            setInfFinancCliente(cliente.ClienteNetDadosRestricao);
        };
    };

    const handleSaveButton = () => {
        if (!evento) {
            alert("Event Error !!");
            return;
        };
        
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
            EmpresaChamadas: empresaChamadas,
            HoraAltChamadas: horaChamadas,
            HoraChamadas: store.getState().chamadasState.HoraChamadas,
            IncluidoPorChamadas: store.getState().chamadasState.IncluidoPorChamadas,
            Obs1Chamadas: obs1Chamadas,
            Obs2Chamadas: obs2Chamadas,
            Obs3Chamadas: obs3Chamadas,
            Obs4Chamadas: obs4Chamadas,
            Obs5Chamadas: store.getState().chamadasState.Obs5Chamadas,
            PrioridadeChamadas: store.getState().chamadasState.PrioridadeChamadas,
            RestricaoChamadas: store.getState().chamadasState.RestricaoChamadas,
            SituacaoChamadas: store.getState().chamadasState.SituacaoChamadas,
            StatusChamadas: statusChamadas,
            TelefoneChamadas: telefoneChamadas,
            VersaoChamadas: store.getState().chamadasState.VersaoChamadas,
        };

        chamadasService.postEvento( 
            updateData.IdChamadas === 0? "incluir": evento, 
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
                <button className="chamadas-form-button-sair" onClick={ () => { history.push("/") }}>
                    Sair
                </button>
                <button className="chamadas-form-button" onClick={ () => handleSaveButton() }>
                    Salvar
                </button>
                {evento}
            </div>



            {/* HEADER INFO CHAMADAS E CLIENTE */}
            <div className="chamadas-form-info">

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    {/* Contrato */}
                    { !!categoriaCliente && (
                        <div className="chamadas-form-info-col">
                            <div 
                                style={{ 
                                    backgroundColor: "yellow", 
                                    color: "blue", 
                                    marginTop: 5, 
                                    padding: "8px 8px 5px", 
                                    borderRadius: 8,
                                    borderColor: "black",
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                    fontWeight: "bold",
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                CONTRATO
                            </div>
                        </div>
                    )}

                    {/* restricao */}
                    { restricaoCliente && (
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
                    { bloqueadoCliente && (
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
                    { enderecoCliente && (
                        <div className="chamadas-form-info-col">
                            <div style={{ color: "blue", fontWeight: "bold", fontSize: "0.9rem" }}>Endereço</div>
                            <div style={{ fontSize: "0.9rem" }}>{enderecoCliente}</div>
                        </div>
                    )}

                    {/* Inf.Financeiras */}
                    { infFinancCliente && (
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
                        <div className="chamadas-form-input-group">
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

                {/* Analista / Status */}
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

                </div>

            </div>

        </div>
    );
};

export default ChamadasForm;
