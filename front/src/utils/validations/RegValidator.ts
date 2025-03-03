function RegValidator(login:string, email:string, pass:string, repass: string){
    let errors: object={}
    if(login.length==0){
        errors['login']="Заполните";
    }
    if(email.length==0){
        errors['emai']="Заполните";
    }
    if(pass.length==0){
        errors['email']="Заполнит";
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

export default RegValidator