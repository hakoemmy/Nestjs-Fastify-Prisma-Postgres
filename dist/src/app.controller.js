"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let AppController = class AppController {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getPostById(id) {
        return this.prismaService.post.findUnique({ where: { id: Number(id) } });
    }
    async getFilteredPosts(take, skip, searchString, orderBy) {
        const or = searchString
            ? {
                OR: [
                    { title: { contains: searchString } },
                    { content: { contains: searchString } },
                ],
            }
            : {};
        return this.prismaService.post.findMany({
            where: Object.assign({ published: true }, or),
            include: { author: true },
            take: Number(take) || undefined,
            skip: Number(skip) || undefined,
            orderBy: {
                updatedAt: orderBy,
            },
        });
    }
    async getAllUsers() {
        return this.prismaService.user.findMany({
            include: { profile: true }
        });
    }
    async getDraftsByUser(id) {
        return this.prismaService.user
            .findUnique({
            where: { id: Number(id) },
        })
            .posts({
            where: {
                published: false,
            },
        });
    }
    async createDraft(postData) {
        const { title, content, authorEmail } = postData;
        return this.prismaService.post.create({
            data: {
                title,
                content,
                author: {
                    connect: { email: authorEmail },
                },
            },
        });
    }
    async signupUser(userData) {
        var _a;
        const postData = (_a = userData.posts) === null || _a === void 0 ? void 0 : _a.map((post) => {
            return { title: post === null || post === void 0 ? void 0 : post.title, content: post === null || post === void 0 ? void 0 : post.content };
        });
        return this.prismaService.user.create({
            data: {
                name: userData === null || userData === void 0 ? void 0 : userData.name,
                email: userData.email,
                posts: {
                    create: postData,
                },
            },
        });
    }
    async togglePublishPost(id) {
        const postData = await this.prismaService.post.findUnique({
            where: { id: Number(id) },
            select: {
                published: true,
            },
        });
        return this.prismaService.post.update({
            where: { id: Number(id) || undefined },
            data: { published: !(postData === null || postData === void 0 ? void 0 : postData.published) },
        });
    }
    async deletePost(id) {
        return this.prismaService.post.delete({ where: { id: Number(id) } });
    }
    async incrementPostViewCount(id) {
        return this.prismaService.post.update({
            where: { id: Number(id) },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
    }
    async createUserProfile(id, userBio) {
        return this.prismaService.profile.create({
            data: {
                bio: userBio.bio,
                user: {
                    connect: {
                        id: Number(id)
                    }
                }
            }
        });
    }
};
__decorate([
    (0, common_1.Get)('post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Get)('feed'),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('searchString')),
    __param(3, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getFilteredPosts", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('user/:id/drafts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getDraftsByUser", null);
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signupUser", null);
__decorate([
    (0, common_1.Put)('publish/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "togglePublishPost", null);
__decorate([
    (0, common_1.Delete)('post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Put)('/post/:id/views'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "incrementPostViewCount", null);
__decorate([
    (0, common_1.Post)('user/:id/profile'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUserProfile", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map