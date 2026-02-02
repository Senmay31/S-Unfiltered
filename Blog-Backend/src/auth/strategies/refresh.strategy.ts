import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      passReqToCallback: true,
    });
  }

//   async validate(req: Request, payload: any) {
//     const authHeader = req.get('Authorization'); // string | undefined

//     if (!authHeader) {
//       throw new Error('Refresh token not found in request headers');
//     }

//     const refreshToken = authHeader.replace('Bearer', '').trim();

//     return { ...payload, refreshToken };
//   }

    async validate(req: Request, payload: any) {
      const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
      if(!refreshToken){
          throw new Error('Refresh token not found in request headers');
      }
      return { ...payload, refreshToken };
    }

}
