import { Injectable } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
@Injectable({
    providedIn: 'root'
  })
export class CustomValidators {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn   {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const confirmPassword: string = control.get('repeatPassword')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('repeatPassword')?.setErrors({ NoPassswordMatch: true });
    }
  }

  static oldPasswordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const oldPassword: string = control.get('oldPassword')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password === oldPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password')?.setErrors({ NoOldPassswordMatch: true });
    }
  }

  getErrorMessage(fieldName: string,errors: ValidationErrors|null):string{
    if (errors) {
      if (errors['required']) {
        return fieldName+" is required"
       } else if (errors['minlength']) {
        return fieldName+' should have at least '+errors['minlength']['requiredLength']+' Characters'
       }
       else if (errors['min']) {
        return fieldName+' should have min value '+errors['min']['min']
       }
       else if (errors['hasNumber']){
         return fieldName+" should have at least one number"
       }
       else if (errors['hasCapitalCase']){
         return fieldName+" should have at least one capital case"
       }
       else if (errors['hasSpecialCharacters']){
         return fieldName+" should have at least one special characters"
       }
       else if (errors['hasSmallCase']){
         return fieldName+" should have at least one small case"
       }
       else if (errors['matching']){
         return fieldName+" does not match"
       }
       else if(errors['selectOption']){
         return fieldName+" is required"
       } else if(errors['phone']){
         return fieldName+" not a valid phone number"
       }
       else return '';
    }
    return '';
   }
static selectOptionValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedValue = control.value;
    if (selectedValue === '' || selectedValue === null || selectedValue === undefined) {
      return { selectOption: true }; // Validation fails
    }
    return null; // Validation passes
  }

}
