import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

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
    const date = new Date(birthDate.value);
    date.setHours(1);
    const convertDate = date.toISOString().substring(0, 10);
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

export function datecompare(startDate1: string, endDate1: string): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    const control = formGroup.controls[startDate1];
    const matchingControl = formGroup.controls[endDate1];

    if (matchingControl.errors && !matchingControl.errors.datecompare) {
      return;
    }

    if (!control || !matchingControl) {
      return null;
    }

    let startdate = control.value;
    let enddate = matchingControl.value;

    if (!startdate || !enddate) {
      return null;
    }

    startdate = new Date(startdate);
    startdate.setHours(1);

    enddate = new Date(enddate);
    enddate.setHours(1);

    if (startdate.getTime() > enddate.getTime()) {
      matchingControl.setErrors({ datecompare: true });
    }else {
      matchingControl.setErrors(null);
    }
  };

}

export function descriptionSize(description: string): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    const control = formGroup.controls[description];

    if (control.errors && !control.errors.descirptionToBig && !control.errors.descirptionToLitle) {
      return;
    }

    if (control.value.replace( /(<([^>]+)>)/ig, '').length < 10 ) {
      control.setErrors({ descirptiontolitle: true });
    } else if (control.value.replace( /(<([^>]+)>)/ig, '').length > 3000) {
      control.setErrors({ descirptiontobig: true });
    }else{
      control.setErrors(null);
    }

  };
}

