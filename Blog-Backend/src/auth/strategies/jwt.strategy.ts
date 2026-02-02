import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/users/entities/user.entity';
import { UsersService } from 'src/users/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'RANDOM_SECRET_KEY',
    });

    console.log('💥💥 JwtStrategy constructor called, and secret initialized.');
    console.log(process.env.JWT_ACCESS_SECRET || 'RANDOM_SECRET_KEY');
  }

  async validate(payload: { sub: string; email: string; role?: string }) {
    console.log('🟩🟩🟨 JwtStrategy.validate method called');

    const user = await this.authService.validateToken(payload.sub);

    console.log('User fetched from database:', user);

    if (!user || !user.isLoggedIn) {
      throw new UnauthorizedException('Session expired. Please login again.');
    }

    return user;
  }
}
