import React, { useEffect, useState } from "react";
import { FaEdit, FaPhoneVolume, FaStopCircle, FaUndo } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import { history } from "routes/history";

import store from "store";
import * as actions from "store/actions";
import * as utils from "utils";
import * as chamadasService from "services/chamadasService";

import "./styles.css";

const Chamadas = () => {
  const [chamadas, setChamadas] = useState([]);

  useEffect(() => {
    var id;
    function handleRefresh() {
      (async function getChamadas() {
        const response = await chamadasService.get();
        setChamadas(response);
      })();
    };
    handleRefresh();
    store.dispatch(actions.actionAdminModuleDeactivate());
    (() => { id = setInterval(() => { handleRefresh() }, 5000) })()
    return () => { clearInterval(id) };
  }, []);


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
            let backColor;
            let frontColor;
            let empresaColor;
            let actionColor1 = "yellow";
            let actionColor2 = "white";

            const emAlmoco = chamada.EmpresaChamadas.toLowerCase() === "almoço" || chamada.EmpresaChamadas.toLowerCase() === "almoco";

            const pendente = chamada.SituacaoChamadas === "Pendente" || chamada.SituacaoChamadas === "Pend.Urgen";
            const atendendo = chamada.SituacaoChamadas === "Atendendo"
            const baixado = chamada.SituacaoChamadas === "Baixado";

            const éContrato = chamada.ContratoChamadas === "Sim";

            if (emAlmoco) {
              backColor = "#000";
              frontColor = "white";
              actionColor1 = "#ffab40";
              actionColor2 = "#80d8ff";
            } else {
              if (pendente) {
                backColor = "#fff59d";
                frontColor = "black";
                actionColor1 = "blue";
                actionColor2 = "#bf360c";
              };
              if (atendendo) {
                backColor = "#795548";
                frontColor = "white";
                actionColor1 = "yellow";
                actionColor2 = "white";
              };
              if (baixado) {
                backColor = "#607d8b";
                frontColor = "silver";
                actionColor1 = "#ffab40";
                actionColor2 = "#80d8ff";
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

            const runDispatch = () => {
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

            const handleAtender = () => {
              runDispatch();
              history.push("/form/atender");
            };

            const handleBaixar = () => {
              runDispatch();
              history.push("/form/baixar");
            };

            const handleAlterar = () => {
              runDispatch();
              history.push("/form/alterar");
            };

            const handleVoltar = () => {
              runDispatch();
              history.push("/form/voltar");
            };

            return (
              <tr
                key={chamada.index}
                style={{ backgroundColor: backColor, color: frontColor, fontSize: "0.8rem" }}
              >
                <td style={{ width: "9%", minWidth: 80, maxWidth: 90, paddingRight: 0 }}>
                  <div style={{ color: "yellow" }}>
                    {!baixado &&
                      <>
                        <FaPhoneVolume
                          data-tip="Atender"
                          onClick={() => { handleAtender() }}
                          style={{ cursor: "pointer", marginRight: 10, color: actionColor1, fontSize: "1.2rem" }}
                        />
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />

                        <FaStopCircle
                          data-tip="Baixar"
                          onClick={() => { handleBaixar() }}
                          style={{ cursor: "pointer", marginRight: 10, color: actionColor2, fontSize: "1.2rem" }}
                        />
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                      </>
                    }

                    <FaEdit
                      data-tip="Alterar"
                      onClick={() => { handleAlterar() }}
                      style={{ cursor: "pointer", marginRight: 10, color: actionColor1, fontSize: "1.2rem" }}
                    />
                    <ReactTooltip place="bottom" effect="solid" className="tool-tip" />

                    {!baixado &&
                      <>
                        <FaUndo
                          data-tip="Voltar para Pendente"
                          onClick={() => { handleVoltar() }}
                          style={{ cursor: "pointer", marginRight: 10, color: actionColor2, fontSize: "1.2rem" }}
                        />
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
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

    </div>
  );
};

export default Chamadas;
