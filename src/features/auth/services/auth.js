export function getSession(){
    const session = localStorage.getItem("session");

    if(!session){
        return null;
    }

    return JSON.parse(session);
}

export function getRole(){
    const session = getSession();

    return session?.role ?? "guest";
}

export function logout(){
    localStorage.removeItem('session')
}