import { api } from "./api";
import store from "store";
import * as utils from "utils";

export const get = async () => {
    try {
        var resp = await api.get("/api/v1/suporte/chamadas?idEmpresaChamadas=1");
    } catch (error) {
        console.error("ErrorMessage (chamadasService.get): ", error);
        return null;
    };
    return resp.data;
};

export const clear = async () => {
    try {
        var resp = await api.delete("/api/v1/suporte/chamadas/clear?idEmpresa=1");
    } catch (error) {
        console.error("ErrorMessage (chamadasService.clear): ", error);
        return null;
    };
    return resp.data;
};

export const post = async (updateData) => {
    try {
        var resp = await api.post("/api/v1/suporte/chamadas?idEmpresaChamadas=1", updateData);
    } catch (error) {
        console.error("ErrorMessage (chamadasService.post): ", error);
        return null;
    };
    return resp.data;
};

export const put = async (updateData) => {
    try {
        var resp = await api.put("/api/v1/suporte/chamadas?idEmpresaChamadas=1", updateData);
    } catch (error) {
        console.error("ErrorMessage (chamadasService.put): ", error);
        return null;
    };
    return resp.data;
};

export const postEvento = async (tipoEvento, updateData) => {
    const isInsert = tipoEvento === "incluir";
    const integrarComAnr = store.getState().defaultState.IntegracaoAnrSettings === 1;

    if ( !integrarComAnr ) {
        ajustaCamposEvento();
        if( isInsert ) { post(updateData) } else { put(updateData) };

    } else {

        if( !updateData.IdParadoxChamadas && !isInsert ) return false;

        const loggedUser = store.getState().loginState.loggedUser;
        const data = { ...updateData, LoggedUser: loggedUser };
        
        const url = "/api/v1/suporte/eventos?idEmpresaChamadas=1&tipoEvento=";
        try {
            await api.post(url + tipoEvento, data);
        } catch (error) {
            console.error("ErrorMessage (chamadasService.postEvento): ", error);
        };

        if( isInsert ) {
            // Será incluido no mysql pelo integradorParadox.exe
        } else {
            ajustaCamposEvento();
            put(updateData);
        };
    };

    function ajustaCamposEvento() {
        const loggedUser = store.getState().loginState.loggedUser;
        const info = `. - ${ loggedUser } - ${ utils.getDateNow() } - ${ utils.getTimeNow() }`;

        if (tipoEvento === "incluir") {
            const emAlmoco = updateData.EmpresaChamadas.toUpperCase() === "ALMOÇO";

            updateData = { 
                ...updateData, 
                SituacaoChamadas: !emAlmoco? "Pendente": "Atendendo", 
                PrioridadeChamadas: !emAlmoco? 5: 6, 
                IncluidoPorChamadas: "Inc" + info,
                DataAltChamadas: !emAlmoco? "0000-00-00": utils.getDateNowYMD(),
            };
        };
    
        if (tipoEvento === "alterar") {
            updateData = { 
                ...updateData, 
                Obs5Chamadas: "Alt" + info,
            };
        };
    
        if (tipoEvento === "atender") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Atendendo", 
                PrioridadeChamadas: 7, 
                AtendidoPorChamadas: "Ate" + info,
                DataAltChamadas: utils.getDateNowYMD(),
                HoraAltChamadas: utils.getTimeNow(),
            };
        };
    
        if (tipoEvento === "baixar") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Baixado", 
                PrioridadeChamadas: 10, 
                BaixadoPorChamadas: "Bai" + info,
            };
        };
    
        if (tipoEvento === "voltar") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Pendente", 
                PrioridadeChamadas: 1, 
                Obs5Chamadas: "Nov" + info,
            };
        };
    };
};

export const postEvento2 = async (tipoEvento, updateData) => {
    const isInsert = tipoEvento === "incluir";
    const integrarComAnr = store.getState().defaultState.IntegracaoAnrSettings === 1;
    
    if (integrarComAnr) {
        const loggedUser = store.getState().loginState.loggedUser;
        const data = { ...updateData, LoggedUser: loggedUser };
        
        const url = "/api/v1/suporte/eventos?idEmpresaChamadas=1&tipoEvento=";
        try {
            await api.post(url + tipoEvento, data);
        } catch (error) {
            console.error("ErrorMessage (chamadasService.postEvento): ", error);
        };

        if( isInsert ) return;  // Será incluido no mysql pelo integradorParadox.exe
    };

    ajustaCamposEvento();
    
    return isInsert? post(updateData): put(updateData);

    function ajustaCamposEvento() {
        const loggedUser = store.getState().loginState.loggedUser;
        const info = `. - ${ loggedUser } - ${ utils.getDateNow() } - ${ utils.getTimeNow() }`;

        if (tipoEvento === "incluir") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Pendente", 
                PrioridadeChamadas: 5, 
                IncluidoPorChamadas: "Inc" + info,
            };
        };
    
        if (tipoEvento === "alterar") {
            updateData = { 
                ...updateData, 
                Obs5Chamadas: "Alt" + info,
            };
        };
    
        if (tipoEvento === "atender") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Atendendo", 
                PrioridadeChamadas: 7, 
                AtendidoPorChamadas: "Ate" + info,
                DataAltChamadas: utils.getDateNowYMD(),
                HoraAltChamadas: utils.getTimeNow(),
            };
        };
    
        if (tipoEvento === "baixar") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Baixado", 
                PrioridadeChamadas: 10, 
                BaixadoPorChamadas: "Bai" + info,
            };
        };
    
        if (tipoEvento === "voltar") {
            updateData = { 
                ...updateData, 
                SituacaoChamadas: "Pendente", 
                PrioridadeChamadas: 1, 
                Obs5Chamadas: "Nov" + info,
            };
        };
    };
};
