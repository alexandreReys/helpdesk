import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swal = withReactContent(Sweetalert2);

export const requestPromotionalPrice = () => {
    const inputValue = 0;

    Swal.fire({
        title: 'Enter your IP address',
        input: 'number',
        inputLabel: 'Preço Promocional',
        inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    })
};

export const estadosList = [
    { estado: "AC", estadoNome: "Acre" },
    { estado: "AL", estadoNome: "Alagoas" },
    { estado: "AP", estadoNome: "Amapá" },
    { estado: "AM", estadoNome: "Amazonas" },
    { estado: "BA", estadoNome: "Bahia" },
    { estado: "CE", estadoNome: "Ceará" },
    { estado: "DF", estadoNome: "Brasilia" },
    { estado: "ES", estadoNome: "Espirito Santo" },
    { estado: "GO", estadoNome: "Goias" },
    { estado: "MA", estadoNome: "Maranhão" },
    { estado: "MT", estadoNome: "Mato Grosso" },
    { estado: "MS", estadoNome: "Mato Grosso do Sul" },
    { estado: "MG", estadoNome: "Minas Gerais" },
    { estado: "PA", estadoNome: "Pará" },
    { estado: "PB", estadoNome: "Paraiba" },
    { estado: "PR", estadoNome: "Parana" },
    { estado: "PE", estadoNome: "Pernambuco" },
    { estado: "PI", estadoNome: "Piaui" },
    { estado: "RJ", estadoNome: "Rio de Janeiro" },
    { estado: "RN", estadoNome: "Rio Grande do Norte" },
    { estado: "RS", estadoNome: "Rio Grande do Sul" },
    { estado: "RO", estadoNome: "Rondonia" },
    { estado: "RR", estadoNome: "Roraima" },
    { estado: "SC", estadoNome: "Santa Catarina" },
    { estado: "SP", estadoNome: "São Paulo" },
    { estado: "SE", estadoNome: "Sergipe" },
    { estado: "TO", estadoNome: "Tocantins" },
];

export const MoneyMaskedToStringUnmasked = (paramValor) => {
    if (typeof paramValor === "number") {
        return paramValor;
    }

    let result = paramValor.replace("R$", "");
    result = result.replace("R$ ", "");
    result = result.replace(".", "");
    result = result.replace(".", "");
    result = result.replace(",", ".");

    return result;
};

export const MoneyMaskedToFloat = (paramValor) => {
    if (typeof paramValor === "number") {
        return paramValor;
    }

    let result = paramValor.replace("R$", "");
    result = result.replace("R$ ", "");
    result = result.replace(".", "");
    result = result.replace(".", "");
    result = result.replace(",", ".");

    return parseFloat(result);
};

export function showAlert(text, title = "", icon = "error", timer = 5000) {
    // success, error, warning,	info, question
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: true,
        position: "top-end",
        timer,
        timerProgressBar: true,
    });
};

export const processing = () => {
    Swal.fire({
        icon: "info",
        title: "Processando ...",
        position: "top-end",
        background: "#lime",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

export const processing2 = () => {
    Swal.fire({
        icon: "success",
        title: "Processando ...",
        // text: "Texto",
        position: "top-end",
        background: "yellow",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        // }).then(() => {
        //   return history.push("/");
    });
};

// dd/mm/yyyy
export const formattedDate = (date) => {
    const d = date.toString().substring(0, 10);
    return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
};

// yyyy-mm-dd
export const formattedDateYearFirst = (date) => {
    const d = date.toString().substring(0, 10);
    return d.substr(6, 4) + "-" + d.substr(3, 2) + "-" + d.substr(0, 2);
};

// dd/mm/yyyy 00:00
export const formattedDateTime = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);
    return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4) + " " + t;
};

// dd/mm 00:00
export const formattedDateTimeNoYear = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);
    return d.substr(8, 2) + "/" + d.substr(5, 2) + " " + t;
};

// Data : dd/mm/yyyy  -  Horário : 00:00
export const formattedDateTime2 = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);

    const dateStr = d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
    const timeStr = t;

    return `Data : ${dateStr}  -  Horário : ${timeStr}`;
};

// Horário : 00:00
export const formattedTime = (time) => {
    return time.toString().substring(0, 5);
};

// dd/mm/yyyy as 00:00
export const formattedDateTime3 = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);
    return (
        d.substr(8, 2) +
        "/" +
        d.substr(5, 2) +
        "/" +
        d.substr(0, 4) +
        " as " +
        t +
        "hs"
    );
};

export const firstWord = (phrase) => {
    if (!phrase) return "";

    const arrWords = phrase.split(" ");
    if (arrWords) return arrWords[0];
    return phrase;
};

// dd/mm/yyyy
export const formatttedToday = () => {
    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
};

// 00:00
export const formatttedCurrentTime = () => {
    const now = new Date();

    let hh = now.getHours();
    let mm = now.getMinutes() + 1;

    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;

    return hh + ":" + mm;
};

export const leftPad = (value, totalWidth, paddingChar) => {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};

export const getDateNowYMD = () => {
    const d = new Date();
    const m = d.getMonth() + 1;
    return (
        d.getFullYear().toString().padStart(4, "0") + "-" +
        m.toString().padStart(2, "0") + "-" +
        d.getDate().toString().padStart(2, "0")
    );
};

export const getDateNow = () => {
    const d = new Date();
    const m = d.getMonth() + 1;
    return (
        d.getDate().toString().padStart(2, "0") + "/" +
        m.toString().padStart(2, "0") + "/" +
        d.getFullYear().toString().padStart(4, "0")
    );
};

export const getTimeNow = () => {
    var data = new Date();
    let hour = data.getUTCHours() - 3;
    if (hour < 0) hour = hour + 24;
    return (
        hour.toString().padStart(2, "0") + ":" +
        data.getMinutes().toString().padStart(2, "0") + ":" +
        data.getSeconds().toString().padStart(2, "0")
    );
};

export const parseStringAsArray = (arrayAsString) => {
    return arrayAsString.split(",").map(str => str.trim());
};

export const getAddress = (addr) => {
    let address = addr.street;

    address += addr.number ? ", " + addr.number : "";
    address += addr.neighborhood ? ", " + addr.neighborhood : "";
    address += addr.city ? ", " + addr.city : "";
    address += addr.state ? ", " + addr.state : "";
    address += addr.complement ? ", " + addr.complement : "";

    return address;
};

export const getTemContrato = categoria => {
    return categoria === "CONT" ||
        categoria === "CONT1" ||
        categoria === "PARC";
};

export const getDiffBetweenDates = (date1, date2 = new Date()) => {
    const now = new Date(date1);
    const past = new Date(date2);
    const diff = Math.abs(now.getTime() - past.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return (days);
};

// const formatDuraction = (duraction) => {
//     const arrDuraction = duraction.split(":");
//     const vDias = 0;
//     const vHora = parseInt(arrDuraction[0]);
//     const vMin = parseInt(arrDuraction[1]);
//     const vSeg = parseInt(arrDuraction[2]);

//     if (!!vDias) {
//         return vDias + ' dia(s) ' + vHora + ' h. ' + vMin + ' m.';
//     } else if (!!vHora) {
//         return vHora + ' h. ' + vMin + ' m. ';
//     } else if (!!vMin) {
//         return vMin + ' min.';
//     } else {
//         return vSeg + ' seg.';
//     };
// };

export const getSeconds = (time) => {
    const a = time.toString();
    const aSplit = a.split(":");
    const aHH = parseInt(aSplit[0]);
    const aMM = parseInt(aSplit[1]);
    const aSeconds = (aHH * 3600) + (aMM * 60);
    return aSeconds;
};

export const getElapsedTime = (initialDate, initialTime, finalDate, finalTime) => {
    
    return "1 seg.";

    // const x = initialDate.substr(0, 10) + " " + initialTime;
    // const initialSeconds = new Date(x).getTime() / 1000;

    // const finalSeconds = new Date().getTime() / 1000;
    
    // const x2 = new Date((finalSeconds - initialSeconds) * 1000).toISOString().substr(11, 8);
    // const x3 = formatDuraction(x2);
    // return (x3);
};
