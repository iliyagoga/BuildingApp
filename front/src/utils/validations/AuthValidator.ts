function valEmail(value: string): string|boolean
{
        if(value.length==0){
            return("Заполните")
        }
        else{
            if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(value))){
                return("Неверный формат почты");
            }
           return(false)
        }

    }

function valPassword(value: string): string|boolean
    {
        if(value.length==0){
            return("Заполните")
        }
        else if(value.length<=8 && value.length>0){
            return("Пароль должен быть больше 8 символов")
        }
            return(false)
    }

function valRepass(value1:string, value2:string): string|boolean{
    if(value1!==value2){
        return "пароли не совпадают";
    }
    return false
}

function valLogin(value:string): string|boolean{
    if(value.length==0 || value==null){
        return "Заполните";
    }
    return false
}

function regValidator(login:string, email:string, pass:string, repass: string){
    let errors: object={}
    if(login.length==0){
        errors['login']="Заполните";
    }
    if(email.length==0){
        errors['email']="Заполните";
    }
    if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email))){
        errors['email']="Неверный формат почты";
    }
    if(pass.length==0){
        errors['pass']="Заполните";
    }
    if(pass.length<8){
        errors['pass']="Пароль должен быть больше 8 символов";
    }
    if(pass!=repass){
        errors['pass']="пароли не совпадают";
        errors['repass']="пароли не совпадают";
    }
    if(Object.entries(errors).length>0){
        return errors
    }
    return false
   
}


function loginValidator(email:string, pass:string){
    let errors: object={}
    if(email.length==0){
        errors['email']="Заполните";
    }
    if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email))){
        errors['email']="Неверный формат почты";
    }
    if(pass.length==0){
        errors['pass']="Заполните";
    }
    if(pass.length<8){
        errors['pass']="Пароль должен быть больше 8 символов";
    }
    if(Object.entries(errors).length>0){
        return errors
    }
    return false
   
}

   

export {valEmail,valPassword, valRepass, valLogin, regValidator, loginValidator}