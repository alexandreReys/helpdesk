import { api } from "./api";

export const get = async () => {
    try {
        var resp = await api.get("/api/v1/suporte/chamadas?idEmpresaChamadas=1");
    } catch (error) {
        console.error("ErrorMessage (chamadasService.get): ", error);
        return null;
    }
    return resp.data;
};

export const put = async (updateData) => {
    try {
        var resp = await api.put("/delivery-settings", updateData);
    } catch (error) {
        console.error("ErrorMessage (chamadasService.put): ", error);
        return null;
    }
    return resp.data;
};
