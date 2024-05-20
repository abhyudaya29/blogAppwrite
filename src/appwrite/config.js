/* eslint-disable no-unused-vars */
import conf from "../config/conf";
import { Client, ID,Databases,Storage,Query } from "appwrite";
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const postData= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId

                }
            )
            console.log(postData,"post data");
            if(postData){
                return postData
            }

            
            
        } catch (error) {
            console.log(error,"error in creating post");
            throw error
            
        }

    }
    // update and delete service
    async getPost(slug){
        try {
            const post=await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            console.log(post,"All Post");
            if(post){
                return post
            }
            
        } catch (error) {
            console.log(error,"Error in get post");
            throw error
            
        }

    }
    async getAllPosts(queries=[Query.equal("status","active")]){
        try {
            
            return await this.databases.listDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(error,"error in getting all post")
            
        }


    }
    // file upload 
    async uploadFile(file){
        try {
            
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                
            )
        } catch (error) {
            console.log(error,">>error in upload file")
            return false
            
        }

    }
}
const service=new Service();
export default service