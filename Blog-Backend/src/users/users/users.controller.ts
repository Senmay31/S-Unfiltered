import {
  Controller,
  UseGuards,
  Get,
  Req,
  Param,
  Query,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthRequest } from 'src/auth/types/auth-request.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /** Get currently authenticated user */
  @Get('myProfile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<User> {
      if (!user) {
        throw new Error('User not found in request');
      }
    console.log('🟥🟥Current user:', user);
    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('myProfile')
  // getProfile(@Req() req: AuthRequest) {
  //   if (!req.user) {
  //     throw new UnauthorizedException('No requested user found');
  //   }
  //   console.log('🟥🟥 req.user in controller:', req.user);
  //   return req.user;
  // }

  @UseGuards(JwtAuthGuard)
  // @Roles(UserRole.ADMIN)
  @Get('allUsers')
  async findAll() {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    console.log('ID ROUTE HIT:', id);
    return await this.usersService.findUserById(id);
  }

  // @Put()
  //  async updateProfile(
  //   @CurrentUser() user: User,
  //   @Query('data') data: UpdateUserDto,
  // ): Promise<User> {
  //   return await this.usersService.updateUser(user._id, data);
  // }
}
