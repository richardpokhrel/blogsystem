import Cookies from 'js-cookie';

export const hardcodedAdmin = {
    username: 'admin',
    password: 'password123',
};



export function generateToken(): string {
    return `token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const TOKEN_KEY = 'auth_token';

export function storeToken (token: string) {
    Cookies.set(TOKEN_KEY, token, 
        { expires : 1/24}
    );
}


export function login( username: string, password: string): boolean {
    if (
        username === hardcodedAdmin.username &&
        password === hardcodedAdmin.password 
    ) {
        const token = generateToken();
        storeToken(token);
        return true ;
    }
    return false ;
}


export function isAuthenticated(): boolean {
    return !!Cookies.get(TOKEN_KEY);
}


export function logout() {
    Cookies.remove(TOKEN_KEY);
}