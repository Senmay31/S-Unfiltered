import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
     canActivate(context: ExecutionContext) {
        console.log('💥👌 JwtRefreshGuard is running');
    
        const req = context.switchToHttp().getRequest();
        console.log('🟨 Authorization Header:', req.headers.authorization);
        return super.canActivate(context);
      }
}