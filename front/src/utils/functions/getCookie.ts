const getCookie = (name:string)=>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    return parts[1];  
      
}

export default getCookie