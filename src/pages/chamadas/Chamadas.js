import React, { useEffect, useState } from "react";
// import { history } from "routes/history";

// import { TextInputMask } from "react-web-masked-text";

// import Sweetalert2 from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

import store from "store";
import * as actions from "store/actions";
import * as utils from "utils";
// import * as masks from "utils/masks";

import * as chamadasService from "services/chamadasService";


import "./styles.css";

// const Swal = withReactContent(Sweetalert2);

const TabelaSac = () => {
    const [chamadas, setChamadas] = useState([]);

    useEffect(() => {
        handleRefresh();
        store.dispatch(actions.actionAdminModuleDeactivate());
        (() => { setInterval(()=>{ handleRefresh() }, 10000) })()
        return clearInterval();
    }, []);

    const handleRefresh = () => {
        (async function getChamadas() {
            const response = await chamadasService.get();
            setChamadas(response);
        })();
    };

    return (
        <div id="tabela-sac" className="tabela-sac-container">
            <div className="tabela-sac-header">
                <div className="tabela-sac-header-text">
                    Help Desk
                </div>
            </div>
            <div className="tabela-sac-buttons">
                <button className="tabela-sac-button" onClick={handleRefresh}>
                    Refresh
                </button>
                {/* <button className="tabela-sac-button" onClick={() => { }}>
                    Incluir
                </button>
                <button className="tabela-sac-button" onClick={() => { }}>
                    Alterar
                </button>
                <button className="tabela-sac-button" onClick={() => { }}>
                    Atender
                </button>
                <button className="tabela-sac-button" onClick={() => { }}>
                    Baixar
                </button> */}
            </div>
            <div className="tabela-sac-warning">
                <div className="tabela-sac-warning-text">
                    Sistema de Controle de Chamados de Suporte Técnico - Help Desk
                </div>
            </div>


            <table className="table" style={{ marginTop: 30 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    <tr style={{ fontWeight: "bold", backgroundColor: "#4682b4", color: "white" }}>
                        <th scope="col">
                            <div>Data</div>
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
                        let backColor;
                        let frontColor = "black";

                        switch (chamada.SituacaoChamadas) {
                            case "Atendendo": 
                                backColor = "#795548";
                                frontColor = "white";
                                break;
                            case "Baixado": 
                                backColor = "#37474f";
                                frontColor = "silver";
                                break;
                            default: 
                                backColor = "white";
                        }
                        return (
                            <tr 
                                key={chamada.index} 
                                style={{backgroundColor: backColor, color: frontColor}}
                            >
                                <td style={{ minWidth: 100, maxWidth: 100 }}>
                                    <div>{utils.formattedDateTimeNoYear(chamada.DataChamadas, chamada.HoraChamadas)}</div>
                                    <div>{chamada.SituacaoChamadas}</div>
                                </td>
                                <td style={{ minWidth: 100, maxWidth: 100 }}>
                                    <div>{chamada.ContratoChamadas}</div>
                                    <div>{chamada.CodEmpresaChamadas}</div>
                                </td>
                                <td style={{ maxWidth: 30 }}>
                                    <div>{chamada.AnalistaChamadas}</div>
                                    <div>{chamada.StatusChamadas}</div>
                                </td>
                                <td style={{ minWidth: 180 }}>
                                    <div>{chamada.ContatoChamadas}</div>
                                    <div>{chamada.TelefoneChamadas}</div>
                                </td>
                                <td>
                                    <div style={{fontWeight: "bold", fontSize: "1.1rem", textTransform: "lowercase"}}>
                                        {chamada.EmpresaChamadas}
                                    </div>

                                    <div>{`${chamada.Obs1Chamadas} ${ !!chamada.Obs2Chamadas? ", ": "" }
                                           ${chamada.Obs2Chamadas} ${ !!chamada.Obs3Chamadas? ", ": "" }
                                           ${chamada.Obs3Chamadas} ${ !!chamada.Obs4Chamadas? ", ": "" }
                                           ${chamada.Obs4Chamadas}`}
                                    </div>
                                </td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>

        </div>
    );
};

export default TabelaSac;
