import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtSevice: JwtService,
  ) {}

  async validateUserCredentials(signInDo: SignInDto) {
    try {
      const { email, password } = signInDo;
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new UnauthorizedException();
      }

      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
      const tokenGen = this.generateToken(user);
      return tokenGen;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: error,
          message: 'Error',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async generateToken(user: any) {
    return {
      user: {
        name: user.name,
        email: user.email,
        env: process.env.JWT_SECRET,
        role: user.role,
        userId: user.id,
      },
      access_token: this.jwtSevice.sign({
        sub: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    };
  }
}
