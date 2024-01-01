import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, avatars } from "./config";
import { databases } from "./config";
import { appwriteConfig } from "./config";
export async function saveUsertoDB(user: {
  accountId:string,
  name:string,
  email:string,
  image:URL,
   username?:string,
}) { 
try {
  const newUser=await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollID,
    ID.unique(),
    user,
  );

  return newUser;  
} catch (error) {
  console.log(error);
}
}

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    
     if(!newAccount) throw new Error("Account creation failed");

     const avatarsURL=avatars.getInitials(user.name);

     await saveUsertoDB({
        accountId:newAccount.$id,
        name:user.name,
        email:user.email,
        image:avatarsURL,
        username:user.username
      });
     return newAccount;
     }
        
   catch (error) {
    console.log(error);
  }
}



export async function SignIN(user:{email:string, password:string}) {
  try {
    const newSession=await account.createEmailSession(user.email, user.password);
    console.log(newSession);
    
    return newSession;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount=await account.get();

    if(!currentAccount) throw Error;

    const currentUser=await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollID,
      [Query.equal('accountId',currentAccount.$id)]
    )
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    
  }
}