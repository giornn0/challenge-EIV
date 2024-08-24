import { Environments } from '@shared';

export const getEnvironment = () => {
  return Environments.Dev;
};

export const appBaseUrl = location.origin + '/';
