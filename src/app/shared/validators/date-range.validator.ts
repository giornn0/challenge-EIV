import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isDateInRange } from '@shared';

export function DateRangeValidator(
  startDate: Date,
  endDate: Date,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);

    if (isNaN(inputDate.getTime())) {
      return { invalidDate: { value: control.value } };
    }

    if (!isDateInRange(inputDate, startDate, endDate)) {
      return { dateOutOfRange: { value: control.value, startDate, endDate } };
    }

    return null;
  };
}
