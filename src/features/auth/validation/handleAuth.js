import { DEFAULT_ACC } from "../config/authConfig";

// console.log(DEFAULT_ACC);
export function findDefaultUser(email, pass){
    return DEFAULT_ACC.find((acc) => String(acc.email) === String(email) && String(acc.password) === String(pass));
}

export function findAttendeeUser(email, pass, users){
    // console.log(users[0].email);
    // console.log(email, pass);

    // console.log(String(email) === String(users.email));
    // console.log(String(pass) === String(users.password));
    return users.find((res) => String(res.email) === String(email) && String(res.password) === String(pass));
}