export default function handleLogin(val, getUser){
    const {email, pass} = val;

    //tempat penampungan error
    const objErr = {};

    if(!email.trim()){
        objErr.email = "Email address is required";
    }else if(!email.includes("@")){
        objErr.email = "Please enter a valid email address";
    }

    if(!pass){
        objErr.pass = "Password is required";
    }else if(pass.length < 8){
        objErr.pass = "Minimum 8-character";
    }
    
    if (Object.keys(objErr).length > 0) {
        return objErr;
    }

    const foundUser = getUser.find(
        (user) => user.email === email
    );

    if(!foundUser){
        objErr.email = "Email does not match";
    }
    
    if(foundUser.pass !== pass){
        objErr.pass = "Pass does not match";
    }

    return objErr;
}