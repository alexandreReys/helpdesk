import React, { useEffect, useState } from "react";
import { history } from "routes/history";
import { TextInputMask } from "react-web-masked-text";
import store from "store";
import * as chamadasService from "../../services/chamadasService";
import * as actions from "../../store/actions";
import * as utils from "../../utils"

import "./styles.css";
import Swal from "sweetalert2";

// IdChamadas: 45
// IdEmpresaChamadas: 1
// IdParadoxChamadas: 80// AnalistaChamadas: "wilson"
// AtendidoPorChamadas: "Ate. - ale - 27/11/2020 - 15:48:08"
// BaixadoPorChamadas: ""
// CodEmpresaChamadas: "006773"
// ContatoChamadas: "feltrin"
// ContratoChamadas: "Não"
// DataAltChamadas: "0000-00-00"
// DataChamadas: "2020-11-27T03:00:00.000Z"
// EmpresaChamadas: "Feltrin Yamaha"
// HoraAltChamadas: "00:00:00"
// HoraChamadas: "11:13:42"
// IncluidoPorChamadas: "Inc. - ale - 27/11/2020 - 10:14:03"
// Obs1Chamadas: "EM SUPORTE PRESENCIAL"
// Obs2Chamadas: ""
// Obs3Chamadas: ""
// Obs4Chamadas: ""
// Obs5Chamadas: "Nov. - ale - 27/11/2020 - 15:48:03"
// PrioridadeChamadas: 7
// RestricaoChamadas: ""
// SituacaoChamadas: "Atendendo"
// StatusChamadas: "presencial"
// TelefoneChamadas: "11 99901-2438"
// VersaoChamadas: ""

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

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());
    }, []);

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
            DataAltChamadas: store.getState().chamadasState.DataAltChamadas,
            DataChamadas: dataChamadas,
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
        chamadasService.postEvento( evento, updateData );
        utils.processing();

        (() => {
            Swal.fire({
                icon: "success",
                title: "Processando ...",
                // text: "As notificações estão sendo enviadas ao servidor e em breve começarão a chegar nos dispositivos dos usuários do app",
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
        <div id="tabela-sac" className="tabela-sac-container">

            {/* HEADER */}
            <div 
                className="tabela-sac-header"
            >
                <div className="tabela-sac-header-text">
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>
            
            {/* BUTTONS */}
            <div 
                className="tabela-sac-buttons"
            >
                <button className="tabela-sac-button-sair" onClick={ () => { history.push("/") }}>
                    Sair
                </button>
                <button className="tabela-sac-button" onClick={ () => handleSaveButton() }>
                    Salvar
                </button>
            </div>

            {/* HEADER MESSAGE */}
            <div
                className="tabela-sac-warning"
            >
                <div className="tabela-sac-warning-text">
                    É nóis Queiróiz. Autor: Bozonaro´s Gang.
                </div>
            </div>

            {/* CONTENT */}
            <div 
                className="tabela-sac-content"
            >

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <div> {/* Data */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="title">
                                Data
                            </label>
                            <TextInputMask
                                kind={"datetime"} options={{ format: "DD/MM/YYYY" }}
                                className="tabela-sac-input"
                                style={{ width: 200 }}
                                name="dataChamadas"
                                id="dataChamadas"
                                required
                                autoComplete="new-password"
                                value={dataChamadas}
                                // onChange={(text) => setdDataChamadas(text)}
                            />
                        </div>
                    </div>

                    <div> {/* Hora */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="title">
                                Hora
                            </label>
                            <TextInputMask
                                kind={"datetime"} options={{ format: "HH:mm" }}
                                className="tabela-sac-input"
                                style={{ width: 100 }}
                                name="horaChamadas"
                                id="horaChamadas"
                                required
                                autoComplete="new-password"
                                value={horaChamadas}
                                // onChange={(text) => setHoraChamadas(text)}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <div> {/* Cod.Cliente */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="title">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                kind={"only-numbers"}
                                className="tabela-sac-input"
                                style={{ width: 200 }}
                                name="codEmpresaChamadas"
                                id="codEmpresaChamadas"
                                required
                                autoComplete="new-password"
                                value={codEmpresaChamadas}
                                // onChange={(text) => setCodEmpresaChamadas(text)}
                            />
                        </div>
                    </div>

                    <div> {/* Empresa */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="title">
                                Empresa
                            </label>
                            <input
                                className="tabela-sac-input"
                                style={{ width: 480 }}
                                name="empresaChamadas"
                                id="empresaChamadas"
                                required
                                autoComplete="new-password"
                                value={empresaChamadas}
                                // onChange={(e) => { setEmpresaChamadas(e.target.value) }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <div> {/* Contato */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="contatoChamadas">
                                Contato
                            </label>
                            <input
                                kind={"only-numbers"}
                                className="tabela-sac-input"
                                style={{ width: 200 }}
                                name="contatoChamadas"
                                id="contatoChamadas"
                                required
                                autoComplete="new-password"
                                value={contatoChamadas}
                                onChange={(e) => {
                                    setContatoChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* Telefone */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="telefoneChamadas">
                                Telefone
                            </label>
                            <input
                                className="tabela-sac-input"
                                style={{ width: 300 }}
                                name="telefoneChamadas"
                                id="telefoneChamadas"
                                required
                                autoComplete="new-password"
                                value={telefoneChamadas}
                                onChange={(e) => {
                                    setTelefoneChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "block", flexDirection: "row", flexWrap: "wrap" }}>

                    <div> {/* Observações */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="obs1Chamadas">
                                Observações
                            </label>
                            <input
                                className="tabela-sac-input"
                                style={{ width: "100%" }}
                                name="obs1Chamadas"
                                id="obs1Chamadas"
                                required
                                autoComplete="new-password"
                                value={obs1Chamadas}
                                onChange={(e) => {
                                    setObs1Chamadas(e.target.value);
                                }}
                            />
                            <input
                                className="tabela-sac-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs2Chamadas"
                                id="obs2Chamadas"
                                required
                                autoComplete="new-password"
                                value={obs2Chamadas}
                                onChange={(e) => {
                                    setObs2Chamadas(e.target.value);
                                }}
                            />
                            <input
                                className="tabela-sac-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs3Chamadas"
                                id="obs3Chamadas"
                                required
                                autoComplete="new-password"
                                value={obs3Chamadas}
                                onChange={(e) => {
                                    setObs3Chamadas(e.target.value);
                                }}
                            />
                            <input
                                className="tabela-sac-input"
                                style={{ width: "100%", marginTop: 10 }}
                                name="obs4Chamadas"
                                id="obs4Chamadas"
                                required
                                autoComplete="new-password"
                                value={obs4Chamadas}
                                onChange={(e) => {
                                    setObs4Chamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <div> {/* Analista */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="statusChamadas">
                                Analista
                            </label>
                            <input
                                kind={"only-numbers"}
                                className="tabela-sac-input"
                                style={{ width: 200 }}
                                name="statusChamadas"
                                id="statusChamadas"
                                required
                                autoComplete="new-password"
                                value={statusChamadas}
                                onChange={(e) => {
                                    setStatusChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* Telefone */}
                        <div className="tabela-sac-input-group">
                            <label className="tabela-sac-label" htmlFor="analistaChamadas">
                                Status
                            </label>
                            <input
                                className="tabela-sac-input"
                                style={{ width: 200 }}
                                name="analistaChamadas"
                                id="analistaChamadas"
                                required
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
