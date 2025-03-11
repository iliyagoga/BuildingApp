    function valTitle(value: string): string|boolean
    {
        if(value.length==0 || value===undefined ||value===null){
            return("Заполните")
        }
        return false
    }
    function valDescription(value: string): string|boolean
    {
        if(value.length==0 || value===undefined ||value===null){
            return("Заполните")
        }
        return false
    }
    function valEmail(value: string): string|boolean
{
        if(value.length==0 || value===undefined ||value===null){
            return("Заполните")
        }
        else{
            if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(value))){
                return("Неверный формат почты");
            }
           return(false)
        }

    }
    function valDate(value: string): string|boolean
    {
        if(value.length==0 || value===undefined ||value===null){
            return("Заполните")
        }
        return false
    }

    function valObject(value: string): string|boolean
    {
        if(value.length==0 || value===undefined ||value===null){
            return("Заполните")
        }
        return false
    }

    function appValidator (title: string, description:string, email: string, date: string, object: string){

        let errors: object={}
        if(title.length==0){
            errors['title']="Заполните"
        }
        if(description.length==0){
            errors['description']="Заполните"
        }
        if(email.length==0){
            errors['email']="Заполните"
        }
        if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email))){
            errors['email']="Неправильный формат";
        }
        if(date.length==0){
            errors['date']="Заполните"
        }
        if(object.length==0){
            errors['object']="Заполните"
        }
        if(Object.entries(errors).length>0){
            return errors
        }
        return false
        
        
    }

   


export {valTitle,valDescription,valEmail, valDate, valObject, appValidator}