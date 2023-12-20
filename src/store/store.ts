import {createContext} from 'react';
import {Authentication} from './AuthenticationStore';
import {Config} from './Config';
import {Route} from './RouteStore';

export const rootStore = {
  authentication: new Authentication(),
  route: new Route(),
  config: new Config(),
};

export type TRootStore = typeof rootStore;
export const RootStoreContext = createContext<null | TRootStore>(null);
