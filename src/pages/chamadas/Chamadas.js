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
                        let frontColor;
                        let empresaColor;

                        const emAlmoco = chamada.EmpresaChamadas.toLowerCase() === "almoço" || chamada.EmpresaChamadas.toLowerCase() === "almoco";
                        const baixado = chamada.SituacaoChamadas === "Baixado";
                        const éContrato = chamada.ContratoChamadas === "Sim";

                        if ( emAlmoco ) {
                            backColor = "black";
                            frontColor = "white";
                        } else {
                            if (chamada.SituacaoChamadas === "Pendente") {
                                backColor = "#fff59d";
                                frontColor = "black";
                            };
                             if (chamada.SituacaoChamadas === "Atendendo") {
                                backColor = "#795548";
                                frontColor = "white";
                            };
                            if (chamada.SituacaoChamadas === "Baixado") {
                                backColor = "#37474f";
                                frontColor = "silver";
                            };
                        };

                        if (chamada.SituacaoChamadas === "Pendente") {
                            empresaColor = "black";
                        } else {
                            if (éContrato) {
                                empresaColor = "yellow"
                            } else {
                                if (chamada.SituacaoChamadas === "Baixado") {
                                    empresaColor = "silver"
                                } else {
                                    empresaColor = "white"
                                };
                            };
                        };

                        return (
                            <tr 
                                key={chamada.index} 
                                style={{backgroundColor: backColor, color: frontColor}}
                            >
                                <td style={{ minWidth: 100, maxWidth: 100 }}>
                                    <div>{utils.formattedDateTimeNoYear(chamada.DataChamadas, chamada.HoraChamadas)}</div>
                                    <div> { !baixado && chamada.SituacaoChamadas }</div>
                                </td>

                                <td style={{ minWidth: 100, maxWidth: 100 }}>
                                    <div> { !emAlmoco && chamada.CodEmpresaChamadas } </div>
                                    <div style={{ fontWeight: "bold", color: empresaColor }}> 
                                        { !emAlmoco && éContrato? "CONTRATO": null } 
                                    </div>
                                </td>
                                
                                <td style={{ minWidth: 150 }}>
                                    <div style={{textTransform: "uppercase", fontWeight: "bold", color: empresaColor}}>
                                        {chamada.AnalistaChamadas}
                                    </div>
                                    <div> { !emAlmoco && chamada.StatusChamadas} </div>
                                </td>
                                
                                <td style={{ minWidth: 220 }}>
                                    <div> { !emAlmoco && chamada.ContatoChamadas} </div>
                                    <div> { !emAlmoco && chamada.TelefoneChamadas} </div>
                                </td>
                                
                                <td>
                                    <div style={{textTransform: "uppercase", fontWeight: "bold", color: empresaColor}}>
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
