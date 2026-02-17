import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users/users.service';
import { AuthUser } from './types/auth-user.type';
import { User } from 'src/users/users/entities/user.entity';
import { AuthResponse } from './entities/auth-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async generateTokens(user: User) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async validateToken(userId: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('User with refresh token not found!');
    }

    const refreshMatch = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshMatch) {
      throw new UnauthorizedException('Invalid Refresh Token.');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user);

    const hashedRef = await bcrypt.hash(newRefreshToken, 10);

    user.hashedRefreshToken = hashedRef; // rotate refresh token
    await user.save();

    return { accessToken, refreshToken: newRefreshToken };
    // return this.generateTokens(user);
  }

  async login(input: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const existingUser = await this.usersService.findUserByEmail(input.email);
    if (!existingUser) throw new UnauthorizedException('No User Found.');

    const passMatch = await bcrypt.compare(
      input.password,
      existingUser.password,
    );
    if (!passMatch) throw new UnauthorizedException('Invalid password.');

    if (existingUser.hashedRefreshToken) {
      throw new ForbiddenException(
        'User is already logged in. Kindly log out first.',
      );
    }

    const { accessToken, refreshToken } =
      await this.generateTokens(existingUser);

    const currentHashedRefToken = await bcrypt.hash(refreshToken, 10);
    // await this.usersService.updateUser(user._id, {
    //   hashedRefreshToken: currentHashedRefToken,
    // });

    // Update login state
    // existingUser.lastLoginAt = new Date();
    existingUser.hashedRefreshToken = currentHashedRefToken;
    existingUser.isLoggedIn = true;
    await existingUser.save();

    const safeUser: AuthUser = {
      id: existingUser._id.toString(),
      email: existingUser.email,
      role: existingUser.role,
      name: existingUser.name,
    };

    // const { password, ...safeUser } = existingUser.toObject();
    return {
      accessToken,
      refreshToken,
      user: safeUser,
      message: 'User successfully logged in!',
    };
  }

  async signup(input: { email: string; password: string }) {
    const existingUser = await this.usersService.findUserByEmail(input.email);
    if (existingUser) throw new UnauthorizedException('User already exists.');

    const hashedPass = await bcrypt.hash(input.password, 10);
    const newUser = await this.usersService.createUser({
      email: input.email,
      password: hashedPass,
    });

    const { password, ...safeUser } = newUser.toObject();
    return {
      tokens: await this.generateTokens(newUser),
      message: 'User successfully registered!',
      safeUser,
    };
  }

  async logout(userId: string) {
    const res = await this.usersService.clearUserSession(userId);
    return { ...res, message: 'You have successfully logged out!' };
  }

  async logoutAllUsers() {
    const count = await this.usersService.clearAllUserSessions();
    return { message: `${count} users have been logged out successfully!` };
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) return true;

    const resetToken = this.jwtService.sign(
      {
        sub: user._id.toString(),
        type: 'password-reset',
      },
      {
        secret: process.env.JWT_RESET_SECRET,
        expiresIn: '1h',
      },
    );

    // TODO: send email via notification service

    // const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // await this.notificationService.sendForgotPassword(
    //   user.email,
    //   resetLink,
    // );

    console.log(
      `Reset link: http://localhost:3000/reset-password?token=${resetToken}`,
    );

    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    if (payload.type !== 'password-reset') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) throw new NotFoundException('User not found');

    const hashedPass = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS),
    );

    await this.usersService.updatePassword(user._id.toString(), hashedPass);

    return true;
  }
}
