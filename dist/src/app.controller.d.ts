import { PrismaService } from './prisma.service';
import { User as UserModel, Post as PostModel, Prisma, Profile } from '@prisma/client';
export declare class AppController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getPostById(id: string): Promise<PostModel>;
    getFilteredPosts(take?: number, skip?: number, searchString?: string, orderBy?: 'asc' | 'desc'): Promise<PostModel[]>;
    getAllUsers(): Promise<UserModel[]>;
    getDraftsByUser(id: string): Promise<PostModel[]>;
    createDraft(postData: {
        title: string;
        content?: string;
        authorEmail: string;
    }): Promise<PostModel>;
    signupUser(userData: {
        name?: string;
        email: string;
        posts?: Prisma.PostCreateInput[];
    }): Promise<UserModel>;
    togglePublishPost(id: string): Promise<PostModel>;
    deletePost(id: string): Promise<PostModel>;
    incrementPostViewCount(id: string): Promise<PostModel>;
    createUserProfile(id: string, userBio: {
        bio: string;
    }): Promise<Profile>;
}
