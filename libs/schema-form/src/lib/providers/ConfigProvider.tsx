import {createContext, useContext} from 'react';

export type Config = {
    canDisplayHeader?: boolean;
    displayErrorList?: boolean;
    isStepper?: boolean;
    props?: any;
}

const ConfigContext = createContext<Config>({
    canDisplayHeader: true,
    displayErrorList: true,
    isStepper: false
});

export const useConfig = () => useContext(ConfigContext);

export const { Provider: ConfigProvider } = ConfigContext;
