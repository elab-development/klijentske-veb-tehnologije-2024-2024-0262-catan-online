import type { IUser } from '../models/User';

const USERS_KEY = 'catan_users';
const SESSION_KEY = 'catan_session';

const getUsers = (): IUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveUsers = (users: IUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (username: string, email: string, password: string): IUser => {
  const users = getUsers();

  if (users.some((u) => u.email === email)) {
    throw new Error('Korisnik sa ovim mejlom već postoji.');
  }

  const newUser: IUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
  return newUser;
};

export const loginUser = (email: string, password: string): IUser => {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) {
    throw new Error('Pogrešan email ili lozinka.');
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(found));
  return found;
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): IUser | null => {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};