import {AbstractControl} from '@angular/forms';
export function passwordValidator(control:AbstractControl):{[key:string]:any}|null{
   const password=control.get('password');
   const cpassword=control.get('cpassword');
   if(password.pristine || cpassword.pristine){return null}
   return password && cpassword && password.value != cpassword.value ? {'misMatch':true}:null;
}
