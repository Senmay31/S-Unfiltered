import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/users/dto/create-user.dto';
import { JwtRefreshGuard } from './guards/refresh.auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { AuthResponse } from './entities/auth-response.entity';
import { AuthUser } from './types/auth-user.type';
import { UserRole } from 'src/common/enums/role.enums';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() input: CreateUserDto) {
    return await this.authService.signup(input);
  }

  @Post('login')
  async login(@Body() input: LoginUserDto): Promise<AuthResponse> {
    const data = await this.authService.login(input);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return await this.authService.logout(req.user.sub);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post('logout-all')
  async logoutAll() {
    return await this.authService.logoutAllUsers();
  }

  // @Post('logout')
  // async logout(@Body() userId: string) {
  //   return await this.authService.logout(userId);
  // }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  // @Post('login')
  // async login(@Body() input: LoginUserDto,  @Res({ passthrough: true }) res: Response) {

  //   const validated = await this.authService.validateUser(input.email, input.password);
  //   if (!validated) throw new UnauthorizedException('Invalid Credentials.');

  //   const tokens = await this.authService.login(validated);

  //   res.cookie('refresh_token', tokens.refreshToken, {
  //     httpOnly: true,
  //     secure: true, // in production (HTTPS)
  //     sameSite: 'lax',
  //     path: '/auth/refresh',
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //   });
  //   return await this.authService.login(input);
  // }

  // @Post('logout')
  // // @UseGuards(JwtAuthGuard)
  // async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   await this.authService.logout(req.user.userId);
  //   // res.clearCookie('refresh_token', { path: '/auth/refresh' });
  //   return { message: "You've been Logged out" };
  // }
}
