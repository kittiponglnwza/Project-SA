import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return { message: 'Register success', userId: user.id };
  }

    async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const isAdmin = user.email === 'admin@game.com';

    const token = jwt.sign(
        { sub: user.id, email: user.email, isAdmin },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' },
    );

    return { message: 'Login success', token, isAdmin };
    }


  
}
