import { api } from "./api";

export const getUltimosTelefonesByCodEmpresa = async (codEmpresa) => {
    try {
        var resp = await api.get(`/api/v1/suporte/historicos/${codEmpresa}/codempresa`);
    } catch (error) {
        console.error("ErrorMessage (historicosService.getByCodEmpresa): ", error);
        return null;
    };

    let response = "";
    let historico1 = "";
    let contato1 = "";
    
    if (resp.data.length === 0) {
        response = "Sem historico !!";
    };

    if (resp.data.length >= 1) {
        response = `${resp.data[0].ContatoChamadasHistorico} ${resp.data[0].TelefoneChamadasHistorico}`;
        historico1 = response;
        contato1 = resp.data[0].ContatoChamadasHistorico.toLowerCase();
    };

    if (resp.data.length === 2) {
        const historico2 = 
            `${resp.data[1].ContatoChamadasHistorico} ${resp.data[1].TelefoneChamadasHistorico}`;

        const contato2 = resp.data[1].ContatoChamadasHistorico.toLowerCase();

        if ( historico2.toLowerCase() !== historico1.toLowerCase() ) {

            if (contato2 === contato1) {
                response = response + 
                ` e ${resp.data[1].TelefoneChamadasHistorico}`;
            } else {
                response = response + 
                ` e ${resp.data[1].ContatoChamadasHistorico} ${resp.data[1].TelefoneChamadasHistorico}`;
            };
        };
    };

    return response;
};

export const get = async (codigoClente) => {
    try {
        var resp = await api.get(`/api/v1/suporte/historicos/${codigoClente}?idEmpresaChamadas=1`);
    } catch (error) {
        console.error("ErrorMessage (historicosService.get): ", error);
        return null;
    };
    return resp.data;
};

// 0:
// ContatoChamadasHistorico: "wilson"
// DataChamadasHistorico: "2016-01-04T02:00:00.000Z"
// HoraChamadasHistorico: "10:15:15"
// TelefoneChamadasHistorico: "(011)4411-2200"
