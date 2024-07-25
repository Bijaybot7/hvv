import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, req: any): Promise<{
        user: {
            name: any;
            email: any;
            env: string;
            role: any;
            userId: any;
        };
        access_token: string;
    }>;
    getProfile(dto: SignInDto, req: any): {
        user: any;
        body: any;
    };
}
