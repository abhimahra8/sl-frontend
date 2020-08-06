export class Validation {

    validate (key, value, setErrorCallback){
        this[key] = value;
        const checkCondition = {
            email: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
            phone: new RegExp(/^[0-9\b]+$/),
        }
        const errors = {};
        let isConfirmPass = false;

        // additional checks

        switch (key) {
            case 'confirm_password' : 
                if(this.password !== value){
                    errors[key] = 'password does not match';
                } 
                break;

            case 'password' : 
                if(this.confirm_password && this.confirm_password === value){
                    isConfirmPass = true;
                } else {
                    errors['confirm_password'] = 'password does not match';
                }
                break;
            case 'phone' : 
                if(value.length !== 10){
                    errors[key] = 'phone number should be of 10 digits';
                }  
                break;  
        }

        // regex checks
        
        if(checkCondition[key] && !checkCondition[key].test(value)){
            errors[key] = `Please enter valid ${key}`;
        }

        setErrorCallback( previousError =>{
            const _key = isConfirmPass ? 'confirm_password' : key;
            return this.errorState(errors, _key, previousError)   
        });
        return errors;    
    }

    errorState(errors, key, previousError){
        if(errors[key]){
            return {
                ...previousError, ...errors
            }
        }
        else if(previousError[key]){
            delete previousError[key];
        }
        return {
            ...previousError
        }
    }
}


