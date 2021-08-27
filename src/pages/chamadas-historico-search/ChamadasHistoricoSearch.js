import ClienteSelect from "components/cliente-select/ClienteSelect";
import React, { useEffect, useState } from "react";
import { TextInputMask } from "react-web-masked-text";
import { history } from "routes/history";
// import Swal from "sweetalert2";
import store from "store";
import * as clientesService from "../../services/clientesService";
import * as historicosService from "../../services/historicosService";
import * as actions from "../../store/actions";
import * as utils from "../../utils";
import "./styles.css";



const ChamadasHistoricoSearch = (props) => {
    const cod = props.location.cod;
    const nom = props.location.nom;
    const con = props.location.con;
    const tel = props.location.tel;

    // const [cliente, setCliente] = useState(null);

    const [codEmpresaChamadas, setCodEmpresaChamadas] = useState("");
    const [empresaChamadas, setEmpresaChamadas] = useState("");
    const [telefone1Chamadas, setTelefone1Chamadas] = useState("");

    const [obsCliente, setObsCliente] = useState("");
    const [infFinancCliente, setInfFinancCliente] = useState("");

    const [contato1Cliente, setContato1Cliente] = useState("");
    const [enderecoCliente, setEnderecoCliente] = useState("");

    const [categoriaCliente, setCategoriaCliente] = useState("");
    const [restricaoCliente, setRestricaoCliente] = useState(false);
    const [bloqueadoCliente, setBloqueadoCliente] = useState(false);
    // const [historicoCliente, setHistoricoCliente] = useState([]);

    let contatoRef = React.useRef(null);
    let codigoRef = null;

    ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());
    }, []);

    useEffect(() => {
        if (cod) {
            utils.showAlert("Cliente Incluido, Código : " + cod, null, "success", 1500);
            setCodEmpresaChamadas(cod);
            setEmpresaChamadas(nom);
            setContato1Cliente(con);
            setTelefone1Chamadas(tel);
            contatoRef.current.focus();
        };
    }, [cod, nom, con, tel]);

    return (
        <div id="chamadas-historico-search" className="chamadas-historico-search-container">

            {/* HEADER */}
            <div className="chamadas-historico-search-header">
                <div className="chamadas-historico-search-header-text">
                    Help Desk - Histórico de Chamadas
                </div>
            </div>

            {/* BUTTONS */}
            <div className="chamadas-historico-search-buttons">
                <button
                    className="chamadas-historico-search-button chamadas-historico-search-button-sair"
                    onClick={() => { history.push("/") }}
                >
                    Sair
                </button>

                <button
                    className="chamadas-historico-search-button chamadas-historico-search-button-incluir-cliente"
                    onClick={() => {
                        codigoRef._inputElement.focus();
                        handleAddCliente();
                    }}
                >
                    + Cliente
                </button>

                <button
                    className="chamadas-historico-search-button chamadas-historico-search-button-salvar"
                    style={{ marginLeft: 30 }}
                    onClick={() => handleSaveButton()}>
                    Salvar
                </button>

            </div>

            {/* HEADER MESSAGE */}
            <div className="chamadas-historico-search-warning">
                <div className="chamadas-historico-search-warning-text">
                    Inclusão
                </div>
            </div>

            {/* CONTENT */}
            <div className="chamadas-historico-search-content">

                {/* Nome / Codigo Cliente */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flexStart", flexWrap: "wrap" }}>

                    {/* Codigo Cliente */}
                    <div>
                        <div className="chamadas-historico-search-input-group">
                            <label className="chamadas-historico-search-label" htmlFor="title">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                id="codEmpresaChamadas"
                                ref={(ref) => codigoRef = ref}
                                name="codEmpresaChamadas"
                                className="chamadas-historico-search-input"
                                // style={{ width: 200 }}
                                kind={"only-numbers"}
                                placeholder="Código Cliente"
                                required
                                maxLength={6}
                                autoComplete="new-password"
                                value={codEmpresaChamadas}
                                onChange={(text) => setCodEmpresaChamadas(text)}
                                onBlur={() => handleClienteBlur()}
                            />
                        </div>
                    </div>

                </div>

                {/* Pesquisa Cliente por Nome */}
                <div style={{ width: "50%", minWidth: "320px" }}>
                    <div className="chamadas-historico-search-input-group">
                        <label className="chamadas-historico-search-label" htmlFor="title">
                            Empresa
                        </label>
                        <ClienteSelect
                            className="chamadas-historico-search-input"
                            onClienteSelecionado={handlerClienteSelecionado}
                        />
                    </div>
                </div>

                {/* CONTRATO / RESTRIÇÂO / BLOQUEIO */}
                { ( utils.getTemContrato(categoriaCliente) || restricaoCliente || bloqueadoCliente ) && (
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                        { utils.getTemContrato(categoriaCliente) && (
                            <div
                                style={{
                                    backgroundColor: "yellow",
                                    color: "black",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                CONTRATO
                            </div>
                        )}

                        { restricaoCliente && (
                            <div
                                style={{
                                    backgroundColor: "maroon",
                                    color: "white",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                RESTRIÇÂO
                            </div>
                        )}

                        { bloqueadoCliente && (
                            <div
                                style={{
                                    backgroundColor: "red",
                                    color: "yellow",
                                    padding: 10,
                                    width: 200,
                                    textAlign: "center",
                                    borderStyle: "solid",
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    fontWeight: "bold",
                                    marginRight: 30,
                                    boxShadow: "0 3px 3px #000",
                                }}
                            >
                                BLOQUEADO
                            </div>
                        )}



                    </div>
                )}

                {/* Quadro Cliente Selecionado */}
                <div className="chamadas-historico-search-client-info-container chamadas-historico-search-client-standard-container">
                    <div>
                        <b>
                            Nome Empresa:
                            <span className="chamadas-historico-search-client-info">
                                {` ${empresaChamadas}`}
                            </span>
                        </b>
                    </div>

                    <div>
                        <b>Telefone :</b>
                        <span className="chamadas-historico-search-client-info">
                            {` ${telefone1Chamadas}`}
                        </span>
                    </div>

                    <div>
                        <b>Contato no Cadastro de clientes :</b>
                        <span className="chamadas-historico-search-client-info">
                            {` ${contato1Cliente}`}
                        </span>
                    </div>
                </div>

                {/* Quadro Endereço */}
                {!!enderecoCliente && (
                    <div className="chamadas-historico-search-client-info-container chamadas-historico-search-client-obs-container">
                        <b>Endereço:</b>
                        <div>
                            <span className="chamadas-historico-search-client-info"
                            > {enderecoCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Informações Financeiras */}
                {!!infFinancCliente && (
                    <div className="chamadas-historico-search-client-info-container chamadas-historico-search-client-obs-container">
                        <b>Informações Financeiras / Restrição:</b>
                        <div>
                            <span className="chamadas-historico-search-client-info"
                            > {infFinancCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Observações */}
                {!!obsCliente && (
                    <div className="chamadas-historico-search-client-info-container chamadas-historico-search-client-obs-container">
                        <b>Observações:</b>
                        <div>
                            <span className="chamadas-historico-search-client-info"
                            > {obsCliente}
                            </span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
    ////////////////////////////////////////////////////////////////////

    async function getHistorico() {
        (async function () {
            const response = await historicosService.get('000470');
            console.log(response);
            // setBaixados(baixadosCount(response));
            // setChamadas(response);
        })();
    };


    function clearStates() {
        setEmpresaChamadas("");
        setTelefone1Chamadas("");
        setObsCliente("")
        setInfFinancCliente("");
        setEnderecoCliente(null);
        setCategoriaCliente("");
        setRestricaoCliente(false);
        setBloqueadoCliente(false);
    };
    function updateStates(clienteObj) {
        let address = utils.getAddress({
            street: clienteObj.ClienteNetLogradouro,
            number: clienteObj.ClienteNetNumEnd,
            neighborhood: clienteObj.ClienteNetBairro,
            city: clienteObj.ClienteNetCidade,
            state: clienteObj.ClienteNetEstado,
            complement: clienteObj.ClienteNetComplEnd,
        });
        setContato1Cliente(clienteObj.ClienteNetContato1);
        setEmpresaChamadas(clienteObj.ClienteNetNome);
        setTelefone1Chamadas(clienteObj.ClienteNetTelefone1);
        setObsCliente(clienteObj.ClienteNetDadosAdicionais);
        setInfFinancCliente(clienteObj.ClienteNetDadosRestricao);
        setEnderecoCliente(address);
        setCategoriaCliente(clienteObj.ClienteNetCategoria);
        setRestricaoCliente(clienteObj.ClienteNetClienteRestricao === "T"? true: false);
        setBloqueadoCliente(clienteObj.ClienteNetClienteBloqueado === "T"? true: false);
    };
    async function handleClienteBlur () {
        if (codEmpresaChamadas === "999999") return clearStates();

        if (!!codEmpresaChamadas) {
            const codCliente = utils.leftPad(codEmpresaChamadas, 6);
            setCodEmpresaChamadas(codCliente);

            const clienteObj = await clientesService.getByCode(codCliente);

            if (!clienteObj) {
                alert("Ops, Cliente não cadastrado !!");
                setCodEmpresaChamadas("");
                setContato1Cliente("");
                clearStates();
                return false;
            };

            updateStates(clienteObj);

            if (!clienteObj.ClienteNetTelefone1) {
                utils.showAlert("Telefone não informado, possivel cliente de parceiro !!");
            };
        };
    };
    async function handlerClienteSelecionado(codCliente) {
        clearStates();

        setCodEmpresaChamadas(codCliente);

        const clienteObj = await clientesService.getByCode(codCliente);

        if (!clienteObj) {
            alert("Cliente não encontrado !!")
        } else {
            setCodEmpresaChamadas(clienteObj.ClienteNetCodigo);
            updateStates(clienteObj);
        };
    };
    async function handleSaveButton() {
        getHistorico();
    };
    async function handleAddCliente() {
        history.push({
            pathname: "/clientes-form",
            nextPath: "/add/incluir",
        });
    };
};

export default ChamadasHistoricoSearch;
