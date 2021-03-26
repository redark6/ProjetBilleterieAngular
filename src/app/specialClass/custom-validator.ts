import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function passwordsMatch(password: string, passwordConfirm: string): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[passwordConfirm];

    if (matchingControl.errors && !matchingControl.errors.passwordsmatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordsmatch: true });
    } else {
      matchingControl.setErrors(null);
    }

  };
}

export function ageMatchRange(birthDate: AbstractControl): object {
    if (!birthDate) {
      return null;
    }
    if (!birthDate.value) {
      return null;
    }
    const convertDate = new Date(birthDate.value).toISOString().substring(0, 10);
    const birthDateSplit = convertDate.split('-');
    const dateBirthDate = new Date(parseInt(birthDateSplit[0], 10), parseInt(birthDateSplit[1], 10), parseInt(birthDateSplit[2], 10));
    const finalBirthDate = dateBirthDate.getTime();
    const yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days

    const now = new Date().getTime();
    const maxAgeMS = now - (18 * yearMS);
    const minAgeMS = now - (122 * yearMS);

    if (finalBirthDate > maxAgeMS || finalBirthDate < minAgeMS) {
      return { birthDateInvalid: true};
    }
    return null;
}
