import { Client, Account, ID, Avatars, Query, Databases } from 'react-native-appwrite';
import { Platform } from 'react-native';

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
            [Query.orderDesc('$createdAt')]
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
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
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

export async function uploadFile(file, type) {
    if (!file) return;
    const { mimeType, ...rest } = file;
    const asset = { 
        name: file.filename,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };
    try {
    const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
    } catch (error) {
    throw new Error(error);
    }
}

export async function getFilePreview(fileId, type) {
    let fileUrl;
    try {
        if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
        fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );
        } else {
        throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createVideoPost(form) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        ID.unique(),
        {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId,
        }
        );

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}