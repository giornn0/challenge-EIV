import { Environments } from '@shared';
import { getEnvironment } from './environment';

export const debug = (...message: any[]) => {
  if (getEnvironment() == Environments.Dev) {
    console.debug(...message);
  }
};

export const log = (...message: any[]) => {
  if (getEnvironment() == Environments.Dev) {
    console.log(...message);
  }
};
