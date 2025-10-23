import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Importar ConfigModule
import { MongooseModule } from '@nestjs/mongoose'; // ✅ Importar MongooseModule

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ServicesModule } from './services/services.module';
import { ReservationModule } from './reservation/reservation.module';
import { GalleryModule } from './gallery/gallery.module';
import { FaqModule } from './faq/faq.module';
import { ContactModule } from './contact/contact.module';
import { CompanyModule } from './company/company.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkWithUsModule } from './workwithus/workwithus.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Cargar .env de forma global
    MongooseModule.forRoot(process.env.MONGODB_URI), // ✅ Usar URI desde .env
    TestimonialsModule,
    ServicesModule,
    ReservationModule,
    GalleryModule,
    FaqModule,
    ContactModule,
    CompanyModule,
    CloudinaryModule,
    AuthModule,
    UserModule,
    WorkWithUsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
