import React, { useEffect, useState } from "react";
import { FaEdit, FaPhoneVolume, FaStopCircle, FaUndo } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import { history } from "routes/history";

import store from "store";
import * as actions from "store/actions";
import * as utils from "utils";
import * as chamadasService from "services/chamadasService";
import * as settingsService from "services/settingsService";

import "./styles.css";

const Chamadas = () => {
    const [chamadas, setChamadas] = useState([]);

    useEffect(() => {
        var id;
        store.dispatch(actions.actionAdminModuleDeactivate());

        settingsService.get();

        (async function clearChamadas() {
            await chamadasService.clear();
            await handleRefresh();
            (() => { id = setInterval(() => { handleRefresh() }, 15000) })()
        })();
        
        return () => { clearInterval(id) };
    }, []);

    async function handleRefresh() {
        (async function getChamadas() {
            const response = await chamadasService.get();
            setChamadas(response);
        })();
    };

    return (
        <div id="tabela-sac" className="tabela-sac-container">
            <div className="tabela-sac-header" style={{ width: 1500 }}>
                <div className="tabela-sac-header-text">
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>

            <table className="table" style={{ marginTop: 5, width: 1500 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    <tr style={{ fontWeight: "bold", backgroundColor: "#4682b4", color: "white", fontSize: "1rem" }}>
                        <th scope="col">
                            <div style={{ marginBottom: 12 }}>Ações</div>
                        </th>
                        <th scope="col">
                            <div style={{ marginBottom: 12 }}>Data</div>
                            <div> </div>
                        </th>
                        <th scope="col">
                            <div>Contrato</div>
                            <div>Cod.Cliente</div>
                        </th>
                        <th scope="col">
                            <div>Analista</div>
                            <div>Status</div>
                        </th>
                        <th scope="col">
                            <div>Contato</div>
                            <div>telefone</div>
                        </th>
                        <th scope="col">
                            <div>Empresa</div>
                            <div>Motivo do Chamado</div>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "0.8rem" }}>

                    {chamadas.map((chamada) => {
                        const { 
                            backColor, frontColor, empresaColor, emAlmoco, baixado, éContrato 
                        } = setVariables( chamada );

                        return (
                            <tr
                                key={chamada.IdChamadas}
                                style={{ backgroundColor: backColor, color: frontColor, fontSize: "0.8rem" }}
                            >
                                <td 
                                    style={{ width: "9%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}
                                >
                                    
                                    <ReactTooltip place="bottom" effect="solid" className="tool-tip" />

                                    <div style={{ color: "yellow" }}>
                                        <FaEdit
                                            data-tip="Alterar"
                                            onClick={() => { handleAlterar(chamada) }}
                                            style={{
                                                cursor: "pointer",
                                                marginRight: 20,
                                                color: colorAlterar(chamada.SituacaoChamadas[0]),
                                                display: displayAlterar(chamada.SituacaoChamadas[0]),
                                                fontSize: "1.2rem"
                                            }}
                                        />

                                        {!baixado &&
                                            <>
                                                <FaPhoneVolume
                                                    data-tip="Atender"
                                                    onClick={() => { handleAtender(chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: colorAtender(chamada.SituacaoChamadas[0]),
                                                        display: displayAtender(chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />

                                                <FaStopCircle
                                                    data-tip="Baixar"
                                                    onClick={() => { handleBaixar(chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: colorBaixar(chamada.SituacaoChamadas[0]),
                                                        display: displayBaixar(chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />
                                            </>
                                        }

                                        {!baixado &&
                                            <>
                                                <FaUndo
                                                    data-tip="Voltar para Pendente"
                                                    onClick={() => { handleVoltar(chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: colorVoltar(chamada.SituacaoChamadas[0]),
                                                        display: displayVoltar(chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />
                                            </>
                                        }
                                    </div>
                                </td>

                                <td style={{ width: "6%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div>{utils.formattedDateTimeNoYear(chamada.DataChamadas, chamada.HoraChamadas)}</div>
                                </td>

                                <td style={{ width: "6%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div> {!emAlmoco && chamada.CodEmpresaChamadas} </div>
                                    {!baixado &&
                                        <div style={{ fontWeight: "bold", color: empresaColor }}>
                                            {!emAlmoco && éContrato ? "CONTRATO" : null}
                                        </div>
                                    }
                                </td>

                                <td style={{ width: "8%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div style={{ textTransform: "uppercase", fontWeight: "bold", color: emAlmoco ? "white" : empresaColor }}>
                                        {chamada.AnalistaChamadas}
                                    </div>
                                    <div> {!emAlmoco && chamada.StatusChamadas.toLowerCase() !== 'ok' &&
                                        chamada.StatusChamadas}
                                    </div>
                                </td>

                                <td style={{ width: "14%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div> {!emAlmoco && chamada.ContatoChamadas} </div>
                                    {!baixado &&
                                        <div> {!emAlmoco && chamada.TelefoneChamadas} </div>
                                    }
                                </td>

                                <td style={{ paddingRight: 0 }}>
                                    {!!baixado &&
                                        <div>
                                            {emAlmoco &&
                                                <div style={{ textTransform: "uppercase", color: "white", fontWeight: "bold" }}>
                                                    {`${chamada.EmpresaChamadas}`}
                                                </div>
                                            }
                                            {!emAlmoco &&
                                                <div>
                                                    <span style={{ color: "white" }}>
                                                        {chamada.EmpresaChamadas},{"      "}
                                                    </span>
                                                    <span style={{ color: "yellow" }}>
                                                        {chamada.Obs1Chamadas}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {!baixado &&
                                        <>
                                            <div style={{ textTransform: "uppercase", fontWeight: "bold", color: emAlmoco ? "white" : empresaColor }}>
                                                {chamada.EmpresaChamadas}
                                            </div>
                                            <div>
                                                {`${chamada.Obs1Chamadas} ${!!chamada.Obs2Chamadas ? ", " : ""}
                                                  ${chamada.Obs2Chamadas} ${!!chamada.Obs3Chamadas ? ", " : ""}
                                                  ${chamada.Obs3Chamadas} ${!!chamada.Obs4Chamadas ? ", " : ""}
                                                  ${chamada.Obs4Chamadas}`
                                                }
                                            </div>
                                        </>
                                    }
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <div className="btnMais">
                <ButtonMais />
            </div>
        </div>
    );
};

function ButtonMais() {
    const handleAdd = () => {
        history.push("/add/incluir");
    };

    return (
        <button
            className="btn btnCircular"
            onClick={() => { handleAdd() }}
        >
            <i>
                <FaPlus />
            </i>
        </button>);
};

const displayAtender = (sit) => {
    if (sit === "P") return "inline";
    if (sit === "A") return "none";
    if (sit === "B") return "none";
};
const displayBaixar = (sit) => {
    if (sit === "P") return "none";
    if (sit === "A") return "inline";
    if (sit === "B") return "inline";
};
const displayAlterar = (sit) => {
    if (sit === "P") return "inline";
    if (sit === "A") return "inline";
    if (sit === "B") return "inline";
};
const displayVoltar = (sit) => {
    if (sit === "P") return "none";
    if (sit === "A") return "inline";
    if (sit === "B") return "inline";
};

const colorAlterar = (sit) => {
    if (sit === "P") return "#2979ff";
    if (sit === "A") return "cyan";
    if (sit === "B") return "cyan";
};
const colorAtender = (sit) => {
    if (sit === "P") return "red";
    if (sit === "A") return "silver";
    if (sit === "B") return "silver";
};
const colorBaixar = (sit) => {
    if (sit === "P") return "silver";
    if (sit === "A") return "yellow";
    if (sit === "B") return "silver";
};
const colorVoltar = (sit) => {
    if (sit === "P") return "silver";
    if (sit === "A") return "limegreen";
    if (sit === "B") return "silver";
};

function setVariables( chamada ) {
    const emAlmoco = chamada.EmpresaChamadas.toLowerCase() === "almoço" || chamada.EmpresaChamadas.toLowerCase() === "almoco";
    const pendente = chamada.SituacaoChamadas === "Pendente" || chamada.SituacaoChamadas === "Pend.Urgen";
    const atendendo = chamada.SituacaoChamadas === "Atendendo"
    const baixado = chamada.SituacaoChamadas === "Baixado";
    const éContrato = chamada.ContratoChamadas === "Sim";

    let backColor;
    let frontColor;
    let empresaColor;

    if (pendente) {
        if (emAlmoco) {
            backColor = "#000";
            frontColor = "#fff";
        } else {
            backColor = "#fff59d";
            frontColor = "#000";
        };
    };
    if (atendendo) {
        if (emAlmoco) {
            backColor = "#000";
            frontColor = "#fff";
        } else {
            backColor = "#795548";
            frontColor = "#fff";
        };
    };
    if (baixado) {
        if (emAlmoco) {
            backColor = "#607d8b";
            frontColor = "#fff";
        } else {
            backColor = "#607d8b";
            frontColor = "silver";
        };
    };

    if (pendente) {
        empresaColor = "black";
    } else {
        if (éContrato) {
            empresaColor = "yellow"
        } else {
            if (baixado) {
                empresaColor = "silver"
            } else {
                empresaColor = "white"
            };
        };
    };

    return { backColor, frontColor, empresaColor, emAlmoco, baixado, éContrato };
};

const handleAtender = (chamada) => {
    runActionChamadasSet(chamada);
    history.push("/form/atender");
};
const handleBaixar = (chamada) => {
    runActionChamadasSet(chamada);
    history.push("/form/baixar");
};
const handleAlterar = (chamada) => {
    runActionChamadasSet(chamada);
    history.push("/form/alterar");
};
const handleVoltar = (chamada) => {
    runActionChamadasSet(chamada);
    history.push("/form/voltar");
};

const runActionChamadasSet = (chamada) => {
    store.dispatch(actions.actionChamadasSet({
        IdChamadas: chamada.IdChamadas,
        IdEmpresaChamadas: chamada.IdEmpresaChamadas,
        DataChamadas: chamada.DataChamadas,
        PrioridadeChamadas: chamada.PrioridadeChamadas,
        HoraChamadas: chamada.HoraChamadas,
        IdParadoxChamadas: chamada.IdParadoxChamadas,
        SituacaoChamadas: chamada.SituacaoChamadas,
        ContratoChamadas: chamada.ContratoChamadas,
        EmpresaChamadas: chamada.EmpresaChamadas,
        CodEmpresaChamadas: chamada.CodEmpresaChamadas,
        ContatoChamadas: chamada.ContatoChamadas,
        TelefoneChamadas: chamada.TelefoneChamadas,
        Obs1Chamadas: chamada.Obs1Chamadas,
        Obs2Chamadas: chamada.Obs2Chamadas,
        Obs3Chamadas: chamada.Obs3Chamadas,
        Obs4Chamadas: chamada.Obs4Chamadas,
        Obs5Chamadas: chamada.Obs5Chamadas,
        AnalistaChamadas: chamada.AnalistaChamadas,
        StatusChamadas: chamada.StatusChamadas,
        IncluidoPorChamadas: chamada.IncluidoPorChamadas,
        AtendidoPorChamadas: chamada.AtendidoPorChamadas,
        BaixadoPorChamadas: chamada.BaixadoPorChamadas,
        RestricaoChamadas: chamada.RestricaoChamadas,
        DataAltChamadas: chamada.DataAltChamadas,
        HoraAltChamadas: chamada.HoraAltChamadas,
        VersaoChamadas: chamada.VersaoChamadas,
    }));
};


export default Chamadas;
