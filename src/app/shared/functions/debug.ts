import { ValidEnvironments } from '@shared';
import { workingEnvironment as workingEnvironment } from './environment';

export const debug = (...message: any[]) => {
  if (workingEnvironment() == ValidEnvironments.Dev) {
    console.debug(...message);
  }
};

export const log = (...message: any[]) => {
  if (workingEnvironment() == ValidEnvironments.Dev) {
    console.log(...message);
  }
};
