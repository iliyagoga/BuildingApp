function AppValidator(title: string, description:string, email: string, date: string, object: string){
    let errors: object={}
    if(title.length==0){
        errors['title']=true
    }
    if(description.length==0){
        errors['description']=true
    }
    if(email.length==0){
        errors['email']=true
    }
    if(date.length==0){
        errors['date']=true
    }
    if(object.length==0){
        errors['object']=true
    }
    if(Object.entries(errors).length>0){
        return errors
    }
    return false
   
}

export default AppValidator