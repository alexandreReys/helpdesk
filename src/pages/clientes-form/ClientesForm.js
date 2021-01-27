import React from "react";
import { TextInputMask } from "react-web-masked-text";
import { history } from "routes/history";
import store from "store";
import * as clientesService from "../../services/clientesService";
import * as actions from "../../store/actions";
import * as utils from "../../utils"

import "./styles.css";
import Swal from "sweetalert2";

const ClientesForm = () => {
    const [clienteNetCodigo, setClienteNetCodigo] = React.useState("");
    const [clienteNetNome, setClienteNetNome] = React.useState("");

    const [clienteNetContato1, setClienteNetContato1] = React.useState("");
    const [clienteNetTelefone1, setClienteNetTelefone1] = React.useState("");

    let clienteNetCodigoRef = React.useRef(null);

    React.useEffect(() => {
        store.dispatch(actions.actionAdminModuleDeactivate());
    }, []);

    const handleSaveButton = () => {
        if (!validate()) return;

        const updateData = {
            ClienteNetLoja: "Matriz",
            ClienteNetFantasia: "",
            ClienteNetNome: clienteNetNome,
            ClienteNetEndereco: "",
            ClienteNetLogradouro: "",
            ClienteNetNumEnd: "",
            ClienteNetComplEnd: "",
            ClienteNetBairro: "",
            ClienteNetCidade: "",
            ClienteNetEstado: "",
            ClienteNetCep: "",
            ClienteNetTipo_Tel1: "",
            ClienteNetTelefone1: clienteNetTelefone1,
            ClienteNetTipo_Tel2: "",
            ClienteNetTelefone2: "",
            ClienteNetNumfax: "",
            ClienteNetContato1: clienteNetContato1,
            ClienteNetDepto_c1: "",
            ClienteNetEMail: null,
            ClienteNetDataNasc: "0000-00-00",
            ClienteNetCompl_tel1: "",
            ClienteNetCompl_tel2: "",
            ClienteNetCompl_tel3: "",
            ClienteNetTipo_tel3: "",
            ClienteNetTelefone3: "",
            ClienteNetTelef_c1: "",
            ClienteNetEMail_c1: null,
            ClienteNetNasc_c1: "0000-00-00",
            ClienteNetContato2: "",
            ClienteNetDepto_c2: "",
            ClienteNetTelef_c2: "",
            ClienteNetEmail_c2: "",
            ClienteNetNasc_c2: "0000-00-00",
            ClienteNetContato3: "",
            ClienteNetDepto_c3: "",
            ClienteNetTelef_c3: "",
            ClienteNetEmail_c3: "",
            ClienteNetNasc_c3: "0000-00-00",
            ClienteNetPessoa: "",
            ClienteNetCNPJ: null,
            ClienteNetInscEstadual: "",
            ClienteNetDataCad: "2011-01-06T02:00:00.000Z",
            ClienteNetDadosAdicionais: "",
            ClienteNetDadosRestricao: "",
            ClienteNetSaldoConta: 0,
            ClienteNetDataSaldoConta: "0000-00-00",
            ClienteNetCategoria: "",
            ClienteNetCodRegiao: "",
            ClienteNetZona: "",
            ClienteNetVendedor: "",
            ClienteNetEnderecoEntrega: "",
            ClienteNetBairroEntrega: "",
            ClienteNetCidadeEntrega: "",
            ClienteNetEstadoEntrega: "",
            ClienteNetCepEntrega: "-",
            ClienteNetEnderecoCobranca: "",
            ClienteNetBairroCobranca: "",
            ClienteNetCidadeCobranca: "",
            ClienteNetEstadoCobranca: "",
            ClienteNetCepCobranca: "-",
            ClienteNetImprimeEtiqueta: "",
            ClienteNetContrato: "",
            ClienteNetPaginaNoGuia: "",
            ClienteNetAndaresPredio: "",
            ClienteNetAptosPredio: "",
            ClienteNetPocos: "",
            ClienteNetCaixasDagua: "",
            ClienteNetLimiteCredito: 0,
            ClienteNetLimiteCreditoChq: 0,
            ClienteNetDataAlter: "2011-01-14T02:00:00.000Z",
            ClienteNetHoraAlter: "",
            ClienteNetAtivo: "",
            ClienteNetClienteRestricao: "",
            ClienteNetClienteBloqueado: "",
            ClienteNetRecursos: "",
            ClienteNetHomePage: "",
            ClienteNetInscMunicipal: "",
            ClienteNetFoto: "",
            ClienteNetSuframa: "",
            ClienteNetTipoAtividade: "",
            ClienteNetPais: "Brasil",
            ClienteNetDataUltCompra: "0000-00-00",
            ClienteNetRegTrib: "",
            ClienteNetCodPais: "",
            ClienteNetCodMunicipio: "",
            ClienteNetDocCnpjCpf: "",
            ClienteNetPontoReferencia: "",
            ClienteNetTaxaAdm: 0,
            ClienteNetMelhorData: 0,
            ClienteNetQtdeParcelas: 0,
            ClienteNetCodigo: clienteNetCodigo,
            ClienteNetIdEmpresa: 1,
        };

        clientesService.post( updateData );

        showExitMessage();
        
        function validate() {
            if(!clienteNetCodigo) {
                clienteNetCodigoRef.current._inputElement.focus();
                return showAlert("Campo codigo é obrigatório !!");
            };
            if(!clienteNetNome) return showAlert("Campo Razão Social é obrigatório !!");
            if(!clienteNetContato1) return showAlert("Campo Contato é obrigatório !!");
            if(!clienteNetTelefone1) return showAlert("Campo Telefone é obrigatório !!");
            return true;
        };
    };

    const handleBlur = async () => {
        if (!!clienteNetCodigo) {
            const codCliente = utils.leftPad(clienteNetCodigo, 6);
            const cliente = await clientesService.getByCode(codCliente);
            
            if (!!cliente) {
                clienteNetCodigoRef.current._inputElement.focus();
                showAlert("Cliente já cadastrado !!");
                setClienteNetCodigo("");
                return false;
            };

            setClienteNetCodigo(codCliente);
        };
        return true;
    };

    return (
        <div id="clientes-form" className="clientes-form-container">

            {/* HEADER */}
            <div className="clientes-form-header">
                <div className="clientes-form-header-text">
                    Help Desk - Cadastro de Clientes
                </div>
            </div>
            
            {/* BUTTONS */}
            <div className="clientes-form-buttons">
                <button className="clientes-form-button-sair" onClick={ () => { history.push("/") }}>
                    Sair
                </button>
                <button className="clientes-form-button" onClick={ () => handleSaveButton() }>
                    Salvar
                </button>
            </div>

            {/* HEADER MESSAGE EVENTO */}
            <div className="clientes-form-warning">
                <div className="clientes-form-warning-text" style={{ color: "grey"}}>
                    Se não preencher o campo Código este será gerado automaticamente ...
                </div>
            </div>

            {/* CONTENT */}
            <div className="clientes-form-content">

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    <div> {/* clienteNetCodigo */}
                        <div className="clientes-form-input-group">
                            <label className="clientes-form-label" htmlFor="clienteNetCodigo">
                                Cod.Cliente
                            </label>
                            <TextInputMask
                                id="clienteNetCodigo"
                                name="clienteNetCodigo"
                                className="clientes-form-input"
                                style={{ width: 100 }}
                                kind={ "only-numbers" }
                                // placeholder="opcional"
                                ref={ clienteNetCodigoRef }
                                maxLength={6}
                                required
                                autoFocus
                                autoComplete="new-password"
                                value={ clienteNetCodigo }
                                onChange={ text => setClienteNetCodigo(text) }
                                onBlur={ handleBlur }
                            />
                        </div>
                    </div>

                    <div> {/* clienteNetNome */}
                        <div className="clientes-form-input-group">
                            <label className="clientes-form-label" htmlFor="clienteNetNome">
                                Razão Social
                            </label>
                            <input
                                className="clientes-form-input"
                                style={{ width: 450 }}
                                name="clienteNetNome"
                                id="clienteNetNome"
                                required
                                autoComplete="new-password"
                                value={clienteNetNome}
                                onChange={(e) => {
                                    setClienteNetNome(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* clienteNetContato1 */}
                        <div className="clientes-form-input-group">
                            <label className="clientes-form-label" htmlFor="clienteNetContato1">
                                Contato
                            </label>
                            <input
                                className="clientes-form-input"
                                style={{ width: 200 }}
                                name="clienteNetContato1"
                                id="clienteNetContato1"
                                required
                                autoComplete="new-password"
                                value={clienteNetContato1}
                                onChange={(e) => {
                                    setClienteNetContato1(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div> {/* clienteNetTelefone1 */}
                        <div className="clientes-form-input-group">
                            <label className="clientes-form-label" htmlFor="clienteNetTelefone1">
                                Telefone
                            </label>
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
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

const showExitMessage = () => {
    Swal.fire({
        icon: "success",
        title: "Processando ...",
        position: "top-end",
        background: "yellow",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
    }).then(() => {
        return history.push("/");
    });
};

const showAlert = ( message ) => {
    Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: message,
        position: "top-end",
        background: "white",
        showConfirmButton: true,
        timer: 5000,
        timerProgressBar: true,
    });
};

export default ClientesForm;
