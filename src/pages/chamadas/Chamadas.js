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
        (() => { setInterval(() => { handleRefresh() }, 10000) })()
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
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>

            <table className="table" style={{ marginTop: 5 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    <tr style={{ fontWeight: "bold", backgroundColor: "#4682b4", color: "white", fontSize: "0.8rem" }}>
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

                        const pendente = chamada.SituacaoChamadas === "Pendente" || chamada.SituacaoChamadas === "Pend.Urgen";
                        const atendendo = chamada.SituacaoChamadas === "Atendendo"
                        const baixado = chamada.SituacaoChamadas === "Baixado";

                        const éContrato = chamada.ContratoChamadas === "Sim";

                        if (emAlmoco) {
                            backColor = "black";
                            frontColor = "white";
                        } else {
                            if (pendente) {
                                backColor = "#fff59d";
                                frontColor = "black";
                            };
                            if (atendendo) {
                                backColor = "#795548";
                                frontColor = "white";
                            };
                            if (baixado) {
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

                        return (
                            <tr
                                key={chamada.index}
                                style={{ backgroundColor: backColor, color: frontColor, fontSize: "0.6rem" }}
                            >
                                <td style={{ width: "10%" }}>
                                    <div>{utils.formattedDateTimeNoYear(chamada.DataChamadas, chamada.HoraChamadas)}</div>
                                </td>

                                <td style={{ width: "10%" }}>
                                    <div> {!emAlmoco && chamada.CodEmpresaChamadas} </div>

                                    {!baixado &&
                                        <div style={{ fontWeight: "bold", color: empresaColor }}>
                                            {!emAlmoco && éContrato ? "CONTRATO" : null}
                                        </div>
                                    }
                                </td>

                                <td style={{ width: "10%" }}>
                                    <div style={{ textTransform: "uppercase", fontWeight: "bold", color: emAlmoco? "white": empresaColor }}>
                                        {chamada.AnalistaChamadas}
                                    </div>
                                    <div> {!emAlmoco && chamada.StatusChamadas.toLowerCase() !== 'ok' &&
                                        chamada.StatusChamadas}
                                    </div>
                                </td>

                                <td style={{ width: "20%" }}>
                                    <div> {!emAlmoco && chamada.ContatoChamadas} </div>
                                    {!baixado &&
                                        <div> {!emAlmoco && chamada.TelefoneChamadas} </div>
                                    }
                                </td>

                                <td style={{ width: "50%" }}>
                                    {!!baixado &&
                                        <div>
                                            { emAlmoco &&
                                                <div style={{ textTransform: "uppercase", color: "white", fontWeight: "bold" }}>
                                                    {`${chamada.EmpresaChamadas}`}
                                                </div>
                                            }
                                            { !emAlmoco &&
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
                                            <div style={{ textTransform: "uppercase", fontWeight: "bold", color: emAlmoco? "white": empresaColor }}>
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

        </div>
    );
};

export default TabelaSac;