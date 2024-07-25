import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<void>;
    findByUserId(userId: string): Promise<Post[]>;
}
