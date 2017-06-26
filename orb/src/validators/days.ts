import { FormControl } from '@angular/forms';
 
export class DaysValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }
 
        if(control.value > 15){
            return {
                "exceeded the maximum number of days to travel": true
            };
        }
 
        return null;
    }
 
}