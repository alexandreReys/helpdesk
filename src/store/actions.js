export function actionAdminModuleActivate() {
  return { type: "ACTION_ADMIN_MODULE_ACTIVATE" };
}
export function actionAdminModuleDeactivate() {
  return { type: "ACTION_ADMIN_MODULE_DEACTIVATE" };
}

export function actionGetSettings(settings) {
  return { type: "ACTION_GET_SETTINGS", settings };
};

export function actionLogin(user) {
  return { type: "ACTION_LOGIN", user };
}
export function actionLogout() {
  return { type: "ACTION_LOGOUT" };
}

export function actionChamadasSet(data) {
  return { type: "ACTION_CHAMADAS_SET", data };
}
export function actionChamadasClear() {
  return { type: "ACTION_CHAMADAS_CLEAR" };
}

export function actionClientesSet(data) {
  return { type: "ACTION_CLIENTES_SET", data };
}
export function actionClientesClear() {
  return { type: "ACTION_CLIENTES_CLEAR" };
}
