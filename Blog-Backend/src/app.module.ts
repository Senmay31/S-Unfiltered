import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users/users.module';
import { PostsModule } from './posts/posts/posts.module';
import { CommentsModule } from './comments/comments/comments.module';
import { SubscribersModule } from './subscribers/subscribers/subscribers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'null'),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    // PostsModule,
    // CommentsModule,
    // SubscribersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
