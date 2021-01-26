import { api } from "./api";
import store from "../store";
import { actionGetSettings } from "../store/actions";

export const get = async () => {
    try {
        var resp = await api.get("/api/v1/suporte/settings?idEmpresa=1");
    } catch (error) {
        console.error("ErrorMessage (settingsService.get): ", error);
        return null;
    }
    const settings = resp.data[0];
    store.dispatch( actionGetSettings(settings) );
    return settings;
};
