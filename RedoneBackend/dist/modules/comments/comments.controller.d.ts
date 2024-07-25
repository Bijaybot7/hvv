import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
    findByPostId(postId: string): Promise<Comment[]>;
    findByUserId(userId: string): Promise<Comment[]>;
}
