import React from "react";
import { history } from "routes/history";
import store from "store";
import * as actions from "../../store/actions";
import * as historicosService from "../../services/historicosService";
import "./styles.css";

const PhoneSearch = (props) => {
  const nextPath = props.location.nextPath;

  const [clienteNetTelefone1, setClienteNetTelefone1] = React.useState("");
  const [resultado, setResultado] = React.useState([]);

  React.useEffect(() => {
    store.dispatch(actions.actionAdminModuleDeactivate());
  }, []);

  const handleExitutton = () => {
    return history.push({ pathname: !nextPath ? "/" : nextPath, result: null });
  };

  const handleSearchButton = async () => {
    if (!clienteNetTelefone1) return;
    const result = await historicosService.getByTelefone(
      1,
      clienteNetTelefone1,
    );

    setResultado(result || []);
  };

  const handleClearButton = () => {
    setClienteNetTelefone1("");
    setResultado([]);
  };

  return (
    <div id="clientes-form" className="clientes-form-container">
      {/* HEADER */}
      <div className="clientes-form-header">
        <div className="clientes-form-header-text">
          Help Desk - Pesquisa de clientes por telefone
        </div>
      </div>

      {/* BUTTONS */}
      <div className="clientes-form-buttons">
        <button
          className="clientes-form-button-sair"
          onClick={() => handleExitutton()}
        >
          Sair
        </button>
      </div>

      {/* CONTENT */}
      <div className="clientes-form-content">
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div>
            {" "}
            {/* clienteNetTelefone1 */}
            <div className="clientes-form-input-group">
              <label
                className="clientes-form-label"
                htmlFor="clienteNetTelefone1"
              >
                Telefone
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <input
                  className="clientes-form-input"
                  style={{ width: 200 }}
                  name="clienteNetTelefone1"
                  id="clienteNetTelefone1"
                  required
                  autoComplete="new-password"
                  value={clienteNetTelefone1}
                  onChange={(e) => {
                    setClienteNetTelefone1(e.target.value);
                  }}
                />
                <button
                  className="clientes-form-button"
                  onClick={() => handleSearchButton()}
                >
                  Pesquisar
                </button>
                <button
                  className="clientes-form-button-sair"
                  onClick={() => handleClearButton()}
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      {resultado.length > 0 && (
        <table
          className="table"
          style={{ marginTop: 20, tableLayout: "fixed", width: "100%" }}
        >
          <thead>
            <tr
              style={{
                fontWeight: "bold",
                backgroundColor: "#343a40",
                color: "white",
                fontSize: "0.8rem",
              }}
            >
              <th style={{ width: 90 }}>Cod.Cliente</th>
              <th style={{ width: 120 }}>Contato</th>
              <th style={{ width: 200 }}>Razão Social</th>
              <th style={{ width: 200 }}>Telefone</th>
              <th style={{ width: 100 }}>Data</th>
              <th style={{ width: 80 }}>Hora</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.8rem" }}>
            {resultado.map((item, index) => (
              <tr key={index}>
                <td style={{ fontWeight: "bold" }}>{item.codEmpresa}</td>
                <td style={{ fontWeight: "bold" }}>{item.contato}</td>
                <td>{item.razaoSocial}</td>
                <td>{item.telefone}</td>
                <td>{item.data?.substring(0, 10)}</td>
                <td>{item.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PhoneSearch;
