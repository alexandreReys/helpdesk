import ClienteSelect from "components/cliente-select/ClienteSelect";
import React, { useEffect, useState } from "react";
import { TextInputMask } from "react-web-masked-text";
import { history } from "routes/history";
import store from "store";
import Swal from "sweetalert2";
import * as clientesService from "../../services/clientesService";
import * as actions from "../../store/actions";
import * as utils from "../../utils";
import "./styles.css";




const ChamadasAdd = (props) => {
    const cod = props.location.cod;
    const nom = props.location.nom;
    const con = props.location.con;
    const tel = props.location.tel;

    // const [cliente, setCliente] = useState(null);

    const [contatoChamadas, setContatoChamadas] = useState("");
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
        <div id="chamadas-add" className="chamadas-add-container">

            {/* HEADER */}
            <div className="chamadas-add-header">
                <div className="chamadas-add-header-text">
                    Help Desk - Controle de Chamados de Suporte Técnico
                </div>
            </div>

            {/* BUTTONS */}
            <div className="chamadas-add-buttons">

                <button
                    className="chamadas-add-button chamadas-add-button-salvar"
                    style={{ marginLeft: 30 }}
                    onClick={() => handleSaveButton()}>
                    Salvar
                </button>

                <button
                    className="chamadas-add-button chamadas-add-button-incluir-cliente"
                    onClick={() => {
                        codigoRef._inputElement.focus();
                        handleAddCliente();
                    }}
                >
                    + Cliente
                </button>

                <button
                    className="chamadas-add-button chamadas-add-button-sair"
                    onClick={() => { history.push("/") }}
                >
                    Sair
                </button>

            </div>

            {/* HEADER MESSAGE */}
            <div className="chamadas-add-warning">
                <div className="chamadas-add-warning-text">
                    Inclusão
                </div>
            </div>

            {/* CONTENT */}
            <div className="chamadas-add-content">

                {/* Nome / Codigo Cliente */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flexStart", flexWrap: "wrap" }}>

                    {/* Nome Contato */}
                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="contatoChamadas">
                                Contato
                            </label>
                            <input
                                id="contatoChamadas"
                                ref={contatoRef}
                                name="contatoChamadas"
                                className="chamadas-add-input"
                                style={{ width: 300 }}
                                placeholder="Nome"
                                maxLength={20}
                                autoFocus
                                autoComplete="new-password"
                                value={contatoChamadas}
                                onChange={(e) => {
                                    setContatoChamadas(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {/* Codigo Cliente */}
                    <div>
                        <div className="chamadas-add-input-group">
                            <label className="chamadas-add-label" htmlFor="title">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                id="codEmpresaChamadas"
                                ref={(ref) => codigoRef = ref}
                                name="codEmpresaChamadas"
                                className="chamadas-add-input"
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
                <div style={{ width: "100%" }}>
                    <div className="chamadas-add-input-group">
                        <label className="chamadas-add-label" htmlFor="title">
                            Empresa
                        </label>
                        <ClienteSelect
                            className="chamadas-add-input"
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
                <div className="chamadas-add-client-info-container chamadas-add-client-standard-container">
                    <div>
                        <b>
                            Nome Empresa:
                            <span className="chamadas-add-client-info">
                                {` ${empresaChamadas}`}
                            </span>
                        </b>
                    </div>

                    <div>
                        <b>Telefone :</b>
                        <span className="chamadas-add-client-info">
                            {` ${telefone1Chamadas}`}
                        </span>
                    </div>

                    <div>
                        <b>Contato no Cadastro de clientes :</b>
                        <span className="chamadas-add-client-info">
                            {` ${contato1Cliente}`}
                        </span>
                    </div>
                </div>

                {/* Quadro Endereço */}
                {!!enderecoCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Endereço:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {enderecoCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Informações Financeiras */}
                {!!infFinancCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Informações Financeiras / Restrição:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {infFinancCliente}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quadro Observações */}
                {!!obsCliente && (
                    <div className="chamadas-add-client-info-container chamadas-add-client-obs-container">
                        <b>Observações:</b>
                        <div>
                            <span className="chamadas-add-client-info"
                            > {obsCliente}
                            </span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
    ////////////////////////////////////////////////////////////////////

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
        if (!runActionChamadasSet()) return false;

        (() => {
            Swal.fire({
                icon: "success",
                title: "Processando ...",
                position: "top-end",
                background: "yellow",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            }).then(() => {
                return history.push("/form/alterar");
            });
        })();

        function runActionChamadasSet() {

            if (!contatoChamadas) {
                utils.showAlert("Campo Contato é Obrigatório !!");
                return false;
            };

            if (!codEmpresaChamadas) {
                utils.showAlert("Campo Cliente é Obrigatório !!");
                return false;
            };

            const chamadaObj = {
                IdChamadas: 0,
                IdEmpresaChamadas: 1,
                DataChamadas: utils.getDateNowYMD(),
                PrioridadeChamadas: 5,
                HoraChamadas: utils.getTimeNow(),
                IdParadoxChamadas: 0,
                SituacaoChamadas: "Pendente",
                ContratoChamadas: utils.getTemContrato(categoriaCliente) ? "Sim" : "Não",
                EmpresaChamadas: empresaChamadas,
                CodEmpresaChamadas: codEmpresaChamadas,
                ContatoChamadas: utils.validaCaracteres(contatoChamadas),
                TelefoneChamadas: utils.validaCaracteres(telefone1Chamadas),
                Obs1Chamadas: "",
                Obs2Chamadas: "",
                Obs3Chamadas: "",
                Obs4Chamadas: "",
                Obs5Chamadas: "",
                AnalistaChamadas: "",
                StatusChamadas: "",
                IncluidoPorChamadas: "",
                AtendidoPorChamadas: "",
                BaixadoPorChamadas: "",
                RestricaoChamadas: restricaoCliente || bloqueadoCliente? "*": "",
                DataAltChamadas: "",
                HoraAltChamadas: "",
                VersaoChamadas: "",
            };
            store.dispatch( actions.actionChamadasSet( chamadaObj ) );

            return true;
        };
    };
    async function handleAddCliente() {
        history.push({
            pathname: "/clientes-form",
            nextPath: "/add/incluir",
        });
    };
};

export default ChamadasAdd;
