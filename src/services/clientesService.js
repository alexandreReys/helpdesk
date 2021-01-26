import { api } from "./api";

export const getByName = async (name) => {
    try {
        var resp = await api.get(`/api/v1/autocom/clientes/${name}/nome?idEmpresa=1`);
    } catch (error) {
        console.error("ErrorMessage (clientesService.getByName): ", error);
        return null;
    };
    return resp.data;
};

export const getByCode = async (code) => {
    try {
        var resp = await api.get(`/api/v1/autocom/clientes/${code}/codigo?idEmpresa=1`);
    } catch (error) {
        console.error("ErrorMessage (clientesService.getByCode): ", error);
        return null;
    };
    return resp.data[0];
};
