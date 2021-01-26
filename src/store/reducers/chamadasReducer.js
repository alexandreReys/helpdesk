import * as utils from "../../utils";

const INITIAL_STATE = {
    IdChamadas: 0,
    IdEmpresaChamadas: 0,
    DataChamadas: "",
    PrioridadeChamadas: 0,
    HoraChamadas: "",
    IdParadoxChamadas: 0,
    SituacaoChamadas: "",
    ContratoChamadas: "",
    EmpresaChamadas: "",
    CodEmpresaChamadas: "",
    ContatoChamadas: "",
    TelefoneChamadas: "",
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
    RestricaoChamadas: "",
    DataAltChamadas: "",
    HoraAltChamadas: "",
    VersaoChamadas: "",
};

export default function chamadasReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ACTION_CHAMADAS_SET": 
            return functionSet(state, action);
        case "ACTION_CHAMADAS_CLEAR": 
            return INITIAL_STATE;
        default: return state;
    };
};

const functionSet = (state, { data }) => {
    return {
        ...state,
        IdChamadas: data.IdChamadas,
        IdEmpresaChamadas: data.IdEmpresaChamadas,
        DataChamadas: utils.formattedDate(data.DataChamadas),
        PrioridadeChamadas: data.PrioridadeChamadas,
        HoraChamadas: data.HoraChamadas,
        IdParadoxChamadas: data.IdParadoxChamadas,
        SituacaoChamadas: data.SituacaoChamadas,
        ContratoChamadas: data.ContratoChamadas,
        EmpresaChamadas: data.EmpresaChamadas,
        CodEmpresaChamadas: data.CodEmpresaChamadas,
        ContatoChamadas: data.ContatoChamadas,
        TelefoneChamadas: data.TelefoneChamadas,
        Obs1Chamadas: data.Obs1Chamadas,
        Obs2Chamadas: data.Obs2Chamadas,
        Obs3Chamadas: data.Obs3Chamadas,
        Obs4Chamadas: data.Obs4Chamadas,
        Obs5Chamadas: data.Obs5Chamadas,
        AnalistaChamadas: data.AnalistaChamadas,
        StatusChamadas: data.StatusChamadas,
        IncluidoPorChamadas: data.IncluidoPorChamadas,
        AtendidoPorChamadas: data.AtendidoPorChamadas,
        BaixadoPorChamadas: data.BaixadoPorChamadas,
        RestricaoChamadas: data.RestricaoChamadas,
        DataAltChamadas: utils.formattedDate(data.DataAltChamadas),
        HoraAltChamadas: data.HoraAltChamadas,
        VersaoChamadas: data.VersaoChamadas,
    };
};

// EXEMPLO
// IdChamadas: 45
// IdEmpresaChamadas: 1
// IdParadoxChamadas: 80// AnalistaChamadas: "wilson"
// AtendidoPorChamadas: "Ate. - ale - 27/11/2020 - 15:48:08"
// BaixadoPorChamadas: ""
// CodEmpresaChamadas: "006773"
// ContatoChamadas: "feltrin"
// ContratoChamadas: "Não"
// DataAltChamadas: "0000-00-00"
// DataChamadas: "2020-11-27T03:00:00.000Z"
// EmpresaChamadas: "Feltrin Yamaha"
// HoraAltChamadas: "00:00:00"
// HoraChamadas: "11:13:42"
// IncluidoPorChamadas: "Inc. - ale - 27/11/2020 - 10:14:03"
// Obs1Chamadas: "EM SUPORTE PRESENCIAL"
// Obs2Chamadas: ""
// Obs3Chamadas: ""
// Obs4Chamadas: ""
// Obs5Chamadas: "Nov. - ale - 27/11/2020 - 15:48:03"
// PrioridadeChamadas: 7
// RestricaoChamadas: ""
// SituacaoChamadas: "Atendendo"
// StatusChamadas: "presencial"
// TelefoneChamadas: "11 99901-2438"
// VersaoChamadas: ""
