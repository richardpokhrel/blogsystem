import Cookies from 'js-cookie';

import { User } from '@/types/user'


export const hardcodedAdmin = {
  username: 'admin',
  password: 'password123',
};

export function generateToken(): string {
  return `token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const ADMIN_TOKEN_KEY = 'admin_token';

export function storeToken(token: string) {
  Cookies.set(ADMIN_TOKEN_KEY, token, { expires: 1 / 24 });
}



export function login(username: string, password: string): 'admin' | 'user' | 'invalid' {
  // Admin logic
  if (username === hardcodedAdmin.username && password === hardcodedAdmin.password) {
    const token = generateToken();
    storeToken(token);
    return 'admin';
  }

  // User logic
  const isUser = authenticateUser(username, password);
  if (isUser) return 'user';

  // Invalid
  return 'invalid';
}



export function isAdminAuthenticated(): boolean {
  return !!Cookies.get(ADMIN_TOKEN_KEY);
}

export function logout() {
  Cookies.remove(ADMIN_TOKEN_KEY);
}

const USERS_KEY = 'users';
const USER_TOKEN = 'user_token';
const CURRENT_USER = 'current_user';

export function getAllUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) as User[] : [];
}



export function saveUser(user: User) {
  const users = getAllUsers();
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
}

export function userExists(username: string): boolean {
  return getAllUsers().some((u: User) => u.username === username);


}

export function authenticateUser(username: string, password: string): boolean {
  const user = getAllUsers().find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(USER_TOKEN, 'token-' + user.id);
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    return true;
  }
  return false;
}

export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(USER_TOKEN);
}


export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
  localStorage.removeItem(USER_TOKEN);
  localStorage.removeItem(CURRENT_USER);
}


