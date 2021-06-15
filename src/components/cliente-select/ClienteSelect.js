import React from "react";
import AsyncSelect from 'react-select/async';
import * as clientesService from "../../services/clientesService";
import { debounce } from "lodash";

const ClienteSelect = ({ onClienteSelecionado }) => {
    const [selectedValue, setSelectedValue] = React.useState("");

    async function getList(descricao) {
        const data = await clientesService.getByName(descricao);
        const newData = data.map(cliente => {
            return {
                value: cliente.ClienteNetCodigo,
                label: cliente.ClienteNetNome,
                ...cliente,
            };
        });
        return newData;
    };

    function handleClienteSelecionado(cliente) {
        if (!!cliente) {
            setSelectedValue("");
            onClienteSelecionado(cliente.ClienteNetCodigo);
        };
        return;
    };

    const loadSuggestedOptions = React.useCallback(
        debounce((inputValue, callback) => {
            getList(inputValue).then(options => callback(options));
        }, 1500),
        []
      );

    return (
        <div>
            <AsyncSelect
                value={selectedValue}
                closeMenuOnSelect={true}
                cacheOptions
                loadOptions={loadSuggestedOptions}
                placeholder={"Razão Social"}
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                // defaultOptions
                // onInputChange={ value => value }
                onChange={ cliente => handleClienteSelecionado(cliente) }
                isClearable={true}
                isSearchable={true}
            />
        </div>
    );

};

export default ClienteSelect;
