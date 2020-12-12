import { api } from "./api";

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
        var resp = await api.delete("/api/v1/suporte/chamadas?idEmpresaChamadas=1");
    } catch (error) {
        console.error("ErrorMessage (chamadasService.delete): ", error);
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

    acertarSituacaoePrioridade();

    const url = "/api/v1/suporte/eventos?idEmpresaChamadas=1&tipoEvento=";
    try {
        var resp = await api.post(url + tipoEvento, updateData);
    } catch (error) {
        console.error("ErrorMessage (chamadasService.postEvento): ", error);
        return null;
    };

    if (!resp.data.insertId) return { message: "deu ruim" };

    return put(updateData);

    function acertarSituacaoePrioridade() {
        if (tipoEvento === 'atender') {
            updateData = {
                ...updateData,
                SituacaoChamadas: 'Atendendo',
                PrioridadeChamadas: 7,
            };
        };
        if (tipoEvento === 'baixar') {
            updateData = {
                ...updateData,
                SituacaoChamadas: 'Baixado',
                PrioridadeChamadas: 10,
            };
        };
        if (tipoEvento === 'voltar') {
            updateData = {
                ...updateData,
                SituacaoChamadas: 'Pendente',
                PrioridadeChamadas: 1,
            };
        };
    };
};
