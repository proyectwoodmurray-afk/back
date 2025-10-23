import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { WorkWithUs, WorkWithUsSchema } from './schemas/workwithus.schema';
import { WorkWithUsService } from './workwithus.service';
import { WorkWithUsController } from './workwithus.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkWithUs.name, schema: WorkWithUsSchema }]),
    CloudinaryModule,
  ],
  controllers: [WorkWithUsController],
  providers: [WorkWithUsService],
})
export class WorkWithUsModule {}