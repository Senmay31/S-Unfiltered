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

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   process.env.MONGODB_URI ||
    //     'mongodb+srv://Senmayor:Senalina@cluster0.bjxr4.mongodb.net/?appName=Cluster0',
    // ),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-db'),
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
