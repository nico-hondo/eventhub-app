export default function validateRegister(val){
    const {nama, email, pass, confPass, useTerms} = val;
    const objError = {};

    if(!nama.trim()){
        objError.nama = "Full name is required";
    }
    if(!email.trim()){
        objError.email = "Email address is required";
    }
    if(!email.includes("@")){
        objError.email = "Please enter a valid email address";
    }
    if(!pass){
        objError.pass = "Password is required";
    }else if(pass.length < 8){
        objError.pass = "Password must be at least 8 characters";
    }else if(pass !== confPass){
        objError.pass = "Password do not match";
    }
    if(!useTerms){
        objError.useTerms = "You must agree to the Terms of Service and Privacy Policy";
    }

    return objError;
}