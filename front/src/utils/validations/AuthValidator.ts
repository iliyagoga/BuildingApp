function AuthValidator(email:string, pass:string){
    let errors: object={}

    if(email.length==0){
        errors['email']="Заполните";
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

export default AuthValidator