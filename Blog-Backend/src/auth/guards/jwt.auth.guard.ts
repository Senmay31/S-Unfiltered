import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('🛡 JwtAuthGuard running');

    const req = context.switchToHttp().getRequest();
    console.log('🟨 Authorization Header:', req.headers.authorization);
    return super.canActivate(context);
  }
  // handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
  //   console.log('🛡 JwtAuthGuard handleRequest:', { err, user, info });
  //   if (err || !user) {
  //     throw err || new UnauthorizedException('Invalid or missing token');
  //   }
  //   return user;
  // }
}
