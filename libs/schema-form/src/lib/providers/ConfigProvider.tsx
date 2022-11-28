import React, {useContext} from 'react';

export type Config = {
    displayHeader?: boolean;
    displayErrorList?: boolean;
    isStepper?: boolean;
}

const ConfigContext = React.createContext<Config>({
    displayHeader: true,
    displayErrorList: true,
    isStepper: false
});

export const useConfig = () => useContext(ConfigContext);

export const { Provider: ConfigProvider } = ConfigContext;
