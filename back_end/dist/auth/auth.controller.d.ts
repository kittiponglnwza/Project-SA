import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        message: string;
        userId: number;
    }>;
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        token: string;
        isAdmin: boolean;
    }>;
}
