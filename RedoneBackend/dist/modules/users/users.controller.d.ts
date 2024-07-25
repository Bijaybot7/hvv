/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserBandDto } from './dto/update-user-band.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    search(page: number, term: string): Promise<{
        HasMore: boolean;
        Results: (import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    get(page: number, limit: number, sortColumn?: string, sortDirection?: string, name?: string, email?: string): Promise<{
        TotalRecords: number;
        Data: (import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    update(id: string, UpdateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    seedData(no: number): Promise<any[]>;
    updateUserDetails(id: string, updateUserDetailsDto: UpdateUserDetailsDto): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUserBand(id: string, updateUserBandDto: UpdateUserBandDto): Promise<import("mongoose").Document<unknown, {}, import("src/modules/users/entities/user.entity").User> & import("src/modules/users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
