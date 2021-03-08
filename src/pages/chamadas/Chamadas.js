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
    const [baixados, setBaixados] = useState([]);

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
            setBaixados(baixadosCount(response));
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

            { baixados.length > 0 && (
                <table style={{ marginLeft: 10 }}>

                    <tbody style={{ fontSize: "0.8rem" }}>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>

                            <div
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: 20,
                                }}
                            >
                                Baixados
                            </div>

                            {baixados.map(it => {
                                return (
                                    <div key={it.name}>
                                        <div
                                            style={{
                                                width: 100, textAlign: "center", backgroundColor: "blue",
                                                marginRight: 10, padding: 5, borderRadius: 15,
                                                fontWeight: "bold", color: "white", marginBottom: 4,
                                            }}
                                        >
                                            {`${it.name} : ${it.qtde}`}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </tbody>
                </table>
            )}

            <table className="table" style={{ marginTop: 5, width: 1500 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    {/* <tr style={{ fontWeight: "bold", backgroundColor: "#4682b4", color: "white", fontSize: "1rem" }}> */}
                    <tr style={{ fontWeight: "bold", backgroundColor: "#343a40", color: "white", fontSize: "0.8rem" }}>
                        <th scope="col">
                            <div style={{ marginBottom: 6 }}>
                                Ações
                                <span
                                    style={{
                                        marginTop: 15,
                                        marginLeft: 20,
                                        padding: "3px 10px",
                                        backgroundColor: "blue",
                                        borderRadius: 50,
                                        borderColor: "grey",
                                        borderStyle: "solid",
                                        borderWidth: 3,
                                        boxShadow: "0 0 1px white",
                                        cursor: "pointer",
                                        fontSize: 20,
                                    }}
                                    onClick={() => history.push("/add/incluir")}
                                >
                                    +
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div style={{ marginBottom: 12 }}>
                                Data
                            </div>
                            <div> </div>
                        </th>
                        <th scope="col">
                            <div>Cod.Cliente</div>
                            <div>Contrato</div>
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
                            backColor, frontColor, empresaColor, emAlmoco, baixado, clienteContrato, clienteRestricao
                        } = setVariables(chamada);

                        return (
                            <tr
                                key={chamada.IdChamadas}
                                style={{ backgroundColor: backColor, color: frontColor, fontSize: "0.8rem" }}
                            >
                                {/* BOTÕES - AÇÕES */}
                                <td
                                    style={{ width: "9%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}
                                >

                                    <ReactTooltip place="bottom" effect="solid" className="tool-tip" />

                                    <div style={{ color: "yellow" }}>
                                        {!emAlmoco && 
                                            <FaEdit
                                                data-tip="Alterar"
                                                onClick={() => { handleClick("Alterar", chamada) }}
                                                style={{
                                                    cursor: "pointer",
                                                    marginRight: 20,
                                                    color: getColor("Alterar", chamada.SituacaoChamadas[0]),
                                                    display: getDisplay("Alterar", chamada.SituacaoChamadas[0]),
                                                    fontSize: "1.2rem"
                                                }}
                                            />
                                        }

                                        {!baixado &&
                                            <>
                                                <FaPhoneVolume
                                                    data-tip="Atender"
                                                    onClick={() => { handleClick("Atender", chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: getColor("Atender", chamada.SituacaoChamadas[0]),
                                                        display: getDisplay("Atender", chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />

                                                <FaStopCircle
                                                    data-tip="Baixar"
                                                    onClick={() => { handleClick("Baixar", chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: getColor("Baixar", chamada.SituacaoChamadas[0]),
                                                        display: getDisplay("Baixar", chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />
                                            </>
                                        }

                                        {!baixado && !emAlmoco && 
                                            <>
                                                <FaUndo
                                                    data-tip="Voltar para Pendente"
                                                    onClick={() => { handleClick("Voltar", chamada) }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginRight: 20,
                                                        color: getColor("Voltar", chamada.SituacaoChamadas[0]),
                                                        display: getDisplay("Voltar", chamada.SituacaoChamadas[0]),
                                                        fontSize: "1.2rem"
                                                    }}
                                                />
                                            </>
                                        }
                                    </div>
                                </td>

                                {/* DATA / TEMPO */}
                                <td style={{ width: "6%", minWidth: 120, maxWidth: 140, paddingRight: 0, fontSize: "0.8rem" }}>
                                    <div>
                                        {utils.formattedDateTimeOrTime(chamada.DataChamadas, chamada.HoraChamadas)}

                                        {(!emAlmoco) && (clienteContrato) && (baixado) && (
                                            <span style={{ marginLeft: 15, backgroundColor: "black", padding: "3px 5px", borderRadius: 50 }}>
                                                C
                                            </span>
                                        )}
                                        {(!emAlmoco) && (clienteRestricao) && (baixado) && (
                                            <span style={{ marginLeft: 15, backgroundColor: "maroon", padding: "3px 5px", borderRadius: 50 }}>
                                                R
                                            </span>
                                        )}
                                    </div>



                                    {chamada.SituacaoChamadas === "Pendente" && (
                                        <div>{utils.getElapsedTime(chamada.DataChamadas, chamada.HoraChamadas)}</div>
                                    )}
                                    {chamada.SituacaoChamadas === "Atendendo" && (
                                        <div>{utils.getElapsedTime(chamada.DataAltChamadas, chamada.HoraAltChamadas)}</div>
                                    )}

                                </td>

                                {/* CÓD.CLIENTE / CONTRATO */}
                                <td style={{ width: "6%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div style={{ fontSize: 12, textAlign: "center" }}>
                                        {!emAlmoco && chamada.CodEmpresaChamadas}
                                    </div>

                                    <SituacaoCliente 
                                        situacao={chamada.SituacaoChamadas}
                                        baixado={baixado}
                                        emAlmoco={emAlmoco}
                                        clienteContrato={clienteContrato}
                                        clienteRestricao={clienteRestricao}
                                    />

                                </td>

                                {/* ANALISTA / STATUS */}
                                <td style={{ width: "4%", minWidth: 60, maxWidth: 90, paddingRight: 0 }}>
                                    <div style={{ textTransform: "uppercase", fontWeight: "bold", color: emAlmoco ? "white" : empresaColor }}>
                                        {chamada.AnalistaChamadas}
                                    </div>
                                    {/* {!emAlmoco && chamada.StatusChamadas.toLowerCase() !== 'ok' && ( */}
                                    {!emAlmoco && !baixado && (
                                        <div style={{ fontSize: "0.8rem" }}>
                                            {chamada.StatusChamadas}
                                        </div>
                                    )}
                                </td>

                                {/* CONTATO / TELEFONE */}
                                <td style={{ width: "9%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                                    <div> {!emAlmoco && chamada.ContatoChamadas} </div>

                                    {!baixado &&
                                        <div style={{ fontSize: "0.6rem" }}> {!emAlmoco && chamada.TelefoneChamadas} </div>
                                    }
                                </td>

                                {/* EMPRESA / MOTIVO DO CHAMADO */}
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

///////////////////////////////////////////////////////////////////////////////////////////////////
function SituacaoCliente({ situacao, baixado, emAlmoco, clienteContrato, clienteRestricao }) {

    let temContrato = (
        ( situacao === "Pendente"  && !baixado && !emAlmoco && clienteContrato ) || 
        ( situacao === "Atendendo" && !baixado && !emAlmoco && clienteContrato )
    );

    let temRestricao = (
        ( situacao === "Pendente"  && !baixado && !emAlmoco && clienteRestricao ) || 
        ( situacao === "Atendendo" && !baixado && !emAlmoco && clienteRestricao )
    );

    if ( temRestricao ) {
        return (
            <div className="tabela-sac-cliente-mark tabela-sac-restricao-mark">
                Restrição
            </div>
        );
    };
    
    if ( temContrato ) {
        return (
            <div className="tabela-sac-cliente-mark tabela-sac-contrato-mark">
                Contrato
            </div>
        );
    };

    return null;
};

///////////////////////////////////////////////////////////////////////////////////////////////////

function baixadosCount(arr) {
    var arrBaixados = [];
    if (arr) {
        for (let item of arr) {
            if (item && item.BaixadoPorChamadas) {
                let analista = item.BaixadoPorChamadas.substr(7, 20).split(" ", 1).toString();

                let qt = arr.filter(
                    it2 => analista === it2.BaixadoPorChamadas.substr(7, 20).split(" ", 1).toString()
                ).length;

                if (arrBaixados.filter(it => it.name === analista).length === 0)
                    arrBaixados = [...arrBaixados, { name: analista, qtde: qt }];
            };
        };

        arrBaixados.sort((a, b) =>
            a.qtde > b.qtde ? -1 : a.qtde < b.qtde ? 1 :
                a.name < b.name ? -1 : a.name > b.name ? 1 :
                    0
        );

        return arrBaixados;
    };
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
const getDisplay = (opt, sit) => {

    if (opt === "Atender") {
        if (sit === "P") return "inline";
        if (sit === "A") return "none";
        if (sit === "B") return "none";
        return;
    };
    if (opt === "Baixar") {
        if (sit === "P") return "none";
        if (sit === "A") return "inline";
        if (sit === "B") return "inline";
        return;
    };
    if (opt === "Alterar") {
        if (sit === "P") return "inline";
        if (sit === "A") return "inline";
        if (sit === "B") return "inline";
        return;
    };
    if (opt === "Voltar") {
        if (sit === "P") return "none";
        if (sit === "A") return "inline";
        if (sit === "B") return "inline";
        return;
    };
};
const getColor = (opt, sit) => {

    if (opt === "Alterar") {
        if (sit === "P") return "#2979ff";
        if (sit === "A") return "cyan";
        if (sit === "B") return "cyan";
    };
    if (opt === "Atender") {
        if (sit === "P") return "red";
        if (sit === "A") return "silver";
        if (sit === "B") return "silver";
    };
    if (opt === "Baixar") {
        if (sit === "P") return "silver";
        if (sit === "A") return "yellow";
        if (sit === "B") return "silver";
    };
    if (opt === "Voltar") {
        if (sit === "P") return "silver";
        if (sit === "A") return "limegreen";
        if (sit === "B") return "silver";
    };
};
const handleClick = (opt, chamada) => {

    if (opt === "Atender") {
        runActionChamadasSet(chamada);
        history.push("/form/atender");
    };
    if (opt === "Baixar") {
        runActionChamadasSet(chamada);
        history.push("/form/baixar");
    };
    if (opt === "Alterar") {
        runActionChamadasSet(chamada);
        history.push("/form/alterar");
    };
    if (opt === "Voltar") {
        runActionChamadasSet(chamada);
        history.push("/form/voltar");
    };
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
function setVariables(chamada) {
    const emAlmoco =
        chamada.EmpresaChamadas.toLowerCase() === "almoço" ||
        chamada.EmpresaChamadas.toLowerCase() === "almoco" ||
        chamada.Obs1Chamadas.toLowerCase() === "almoço" ||
        chamada.Obs1Chamadas.toLowerCase() === "almoco";

    const pendente = chamada.SituacaoChamadas === "Pendente" || chamada.SituacaoChamadas === "Pend.Urgen";
    const atendendo = chamada.SituacaoChamadas === "Atendendo"
    
    const verificando = 
        chamada.StatusChamadas.toLowerCase() === "verificando" || 
        chamada.StatusChamadas.toLowerCase() === "externo" || 
        chamada.StatusChamadas.toLowerCase() === "aguardando" || 
        chamada.StatusChamadas.toLowerCase() === "folga";

    const baixado = chamada.SituacaoChamadas === "Baixado";
    const clienteContrato = chamada.ContratoChamadas === "Sim";
    const clienteRestricao = chamada.RestricaoChamadas.length > 0;

    let backColor;
    let frontColor;
    let empresaColor;

    if (pendente) {
        if (emAlmoco) {
            backColor = "#000";
            frontColor = "#fff";
        } else {
            // backColor = "#ffff00";
            backColor = "#fff59d";
            frontColor = "#000";
        };
    };
    if (atendendo) {
        if (emAlmoco) {
            backColor = "#000";
            frontColor = "#fff";
        } else {
            backColor = "#5d4037";
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
        if (clienteContrato) {
            empresaColor = "yellow"
        } else {
            if (baixado) {
                empresaColor = "silver"
            } else {
                empresaColor = "white"
            };
        };
    };

    // EXCESSÕES

    if (verificando) {
        backColor = "#bf360c";
        frontColor = "#fff";
        empresaColor = "yellow"
    };

    return { backColor, frontColor, empresaColor, emAlmoco, baixado, clienteContrato, clienteRestricao };
};

export default Chamadas;
