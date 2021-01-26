const INITIAL_STATE = {
  appTitle: "ANR AtendWeb",
  loadingText: "Acessando dados ...",
  errorMsgText: "Verificando ...",
  adminModule: true,

  IntegracaoAnrSettings: "T",
};

export default function defaultReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_ADMIN_MODULE_ACTIVATE":
      return { ...state, adminModule: true };
    case "ACTION_ADMIN_MODULE_DEACTIVATE":
      return { ...state, adminModule: false };
    case "ACTION_GET_SETTINGS":
      return functionGetSettings(state, action);
    default:
      return state;
  }
}

const functionGetSettings = (state, { settings }) => {
  return {
    ...state,
    IntegracaoAnrSettings: settings.IntegracaoAnrSettings,
  };
};
