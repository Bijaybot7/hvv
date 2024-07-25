import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    create(createLikeDto: CreateLikeDto): Promise<Like>;
    findAll(): Promise<Like[]>;
    findOne(id: string): Promise<Like>;
    update(id: string, updateLikeDto: UpdateLikeDto): Promise<Like>;
    remove(id: string): Promise<void>;
    findByPostId(postId: string): Promise<Like[]>;
    findByUserId(userId: string): Promise<Like[]>;
}
