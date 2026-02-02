import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/users/entities/user.entity';
import { UserRole } from 'src/common/enums/role.enums';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

  //   const adminEmail = 'admin@example.com';
  //   const adminPass = 'Admin@123';

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPass = process.env.ADMIN_PASSWORD!;

  const existingAdmin = await userModel.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('✅ Admin already exists. No seeding needed.');
    process.exit(0);
  }

  const hashedPass = await bcrypt.hash(adminPass, 10);

  await userModel.create({
    email: adminEmail,
    password: hashedPass,
    role: UserRole.ADMIN,
  });

  console.log('🚀 Successfully seeded Admin!');
  process.exit(0);
}

seedAdmin();
