import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // return userAccount
                // call another method
                // If user account is created then we are directly login user
                return this.login({email,password})
            }else{
                return userAccount;
            }
            
        } catch (error) {
            console.log(error,"Error during create account")
            throw error
            
        }
    }
    async login({email,password}){
        try {
           const userLogin= await this.account.createEmailSession(email,password);
           if(userLogin){
            return userLogin
           }
            
        } catch (error) {
            
            console.log(error,"Error in login");
            throw error
        }
    }
    async getCurrentUser(){
        try {
            const currentUser= await this.account.get();
            console.log(currentUser,"Current user");
            if(currentUser){
                return currentUser
            }
            else{
                return null;
            }
            
        } catch (error) {
            console.log(error,">>error in get current user");
            throw error
            
        }
        
        
    }
    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log(error,">>Error in logout");
            throw error;
            
        }
    }
}
const authService=new AuthService();

export default authService;