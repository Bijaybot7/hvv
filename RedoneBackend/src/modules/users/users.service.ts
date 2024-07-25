import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserBandDto } from './dto/update-user-band.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    });
    const createdUser = await newUser.save();
    return createdUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedRecord = await this.userModel.findByIdAndUpdate(
        id,
        {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          role: updateUserDto.role,
        },
        { new: true },
      );
      if (!updatedRecord) {
        throw new BadRequestException('Id is invalid');
      }
      return updatedRecord;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Error:' + error,
          message: 'Server error. Invite not updated',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getUserById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('Id is invalid');
    }
    return user;
  }

  async getUsers(
    page: number,
    limit: number,
    sortColumn: string,
    sortDirection: string,
    name: string,
    email: string,
  ) {
    // var limit = limit;
    if (limit <= 0) {
      limit = 5;
    } else if (limit > 20) {
      limit = 20;
    }

    var start = (page - 1) * limit;

    var filter: any[] = [];
    if (name) {
      filter.push({ name: { $regex: new RegExp(name, 'i') } });
    }
    if (email) {
      filter.push({ email: { $regex: new RegExp(email, 'i') } });
    }

    const totalRecords = await this.userModel.countDocuments({ filter });

    var sortDefinition: any = {};
    switch (sortColumn) {
      case 'name':
        sortDefinition = {
          name: sortDirection && sortDirection != 'asc' ? -1 : 1,
        };
        break;
      case 'updatedAt':
        sortDefinition = {
          updatedAt: sortDirection && sortDirection != 'asc' ? -1 : 1,
        };
        break;
      case 'createdAt':
        sortDefinition = {
          createdAt: sortDirection && sortDirection != 'asc' ? -1 : 1,
        };
        break;
      default:
        sortDefinition = {
          name: sortDirection && sortDirection != 'asc' ? -1 : 1,
        };
    }

    const data = await this.userModel
      .find(filter.length > 0 ? { $and: filter } : {})
      .select(['name', 'email', 'address', 'createdAt', 'updatedAt'])
      .skip(start)
      .limit(limit)
      .sort(sortDefinition);

    return {
      TotalRecords: totalRecords,
      Data: data,
    };
  }

  async searchUsers(page: number, term: string) {
    const limit: number = 10;
    const start: number = (page - 1) * limit;
    var filter: any[] = [];

    if (term) {
      filter.push({ name: { $regex: new RegExp(term, 'i') } });
      filter.push({ email: { $regex: new RegExp(term, 'i') } });
    }
    const totalRecords = await this.userModel.countDocuments(
      filter.length > 0 ? { $or: filter } : {},
    );
    const totalPages = Math.ceil(totalRecords / limit);

    var results = await this.userModel
      .find(filter.length > 0 ? { $or: filter } : {})
      .select(['_id', 'name', 'email'])
      .skip(start)
      .limit(limit)
      .sort({ name: 1 });

    return {
      HasMore: page < totalPages,
      Results: results,
    };
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException({ id: 'Id is invalid' });
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException({ id: 'Id is invalid' });
    }
    return deletedUser;
  }

  async seedData(no: number) {
    var createdUsers: any[] = [];
    for (var i = 0; i <= 100; i++) {
      const newUser = new this.userModel({
        name: 'test User' + i,
        email: `testuser${i}@test.com`,
        address: `address${i}`,
        password: 'admin',
      });
      createdUsers.push(await newUser.save());
    }
    return createdUsers;
  }

  async updateUserDetails(id: string, updateUserDetailsDto: UpdateUserDetailsDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is invalid');
    }

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            contact: updateUserDetailsDto.contact,
            genre: updateUserDetailsDto.genre,
            description: updateUserDetailsDto.description,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Error:' + error,
          message: 'Server error. User details not updated',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }

  async updateUserBand(id: string, updateUserBandDto: UpdateUserBandDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is invalid');
    }

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            band: updateUserBandDto.band,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Error:' + error,
          message: 'Server error. Band field not updated',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }
}
