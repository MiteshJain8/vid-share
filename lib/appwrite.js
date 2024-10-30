import { Client, Account, ID, Avatars, Query, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '66fad7470031e0ff8be2',
    platform: 'com.miteshjain8.vidshare',
    databaseId: '66fadbdb001b2dc294a9',
    userCollectionId: '66fadc2e0009a89a2526',
    videoCollectionId: '66fadc75002743700efc',
    storageId: '66fadf8a0037dd72814d'
}

const {
    endpoint,
    projectId,
    platform,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            username
        );
        if (!newAccount) {
            throw new Error('Account creation failed');
        }
        const avatarUrl = avatars.getInitials(username);

        await logIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export const logIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if (!session) {
            throw new Error('Sign in failed');
        }
        return session;
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        );
        // if (!posts) throw Error;
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );
        // if (!posts) throw Error;
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query), Query.search('prompt', query)]
        );
        // if (!posts) throw Error;
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        );
        // if (!posts) throw Error;
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
    }
}