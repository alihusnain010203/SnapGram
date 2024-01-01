import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appwriteConfig = {
  projectID: import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT_ID,
  Url: import.meta.env.VITE_PUBLIC_APPWRITE_URL ,
  databaseId: import.meta.env.VITE_PUBLIC_APPWRITE_DATABASE_ID,
  strorageId: import.meta.env.VITE_PUBLIC_APPWRITE_STORAGE_ID,
  userCollID: import.meta.env.VITE_PUBLIC_APPWRITE_USERS_ID,
  postCollID: import.meta.env.VITE_PUBLIC_APPWRITE_POSTS_ID,
  savedCollID: import.meta.env.VITE_PUBLIC_APPWRITE_SAVED_ID,
  
};


export const client = new Client();

client.setEndpoint(appwriteConfig.Url).setProject(appwriteConfig.projectID);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
