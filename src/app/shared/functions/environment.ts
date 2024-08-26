import { ValidEnvironments } from '@shared';

export const workingEnvironment = () => {
  return ValidEnvironments.Dev;
};

export const appBaseUrl = location.origin + '/';
