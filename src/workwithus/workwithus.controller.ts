import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, BadRequestException, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateWorkWithUsDto } from './dto/create-workwithus.dto';
import { WorkWithUsService } from './workwithus.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import type { Request } from 'express';

@Controller('workwithus')
export class WorkWithUsController {
  constructor(
    private readonly workWithUsService: WorkWithUsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('resume', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.pdf$/i)) {
        return cb(new Error('Only PDF files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async create(
    @Body() body: CreateWorkWithUsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let resumeUrl: string | undefined = undefined;

    if (file) {
      // Sube el archivo a Cloudinary
      try {
        const result = await this.cloudinaryService.uploadPdf(file);
        resumeUrl = result.secure_url;
      } catch (error) {
        throw new BadRequestException(`Error uploading PDF: ${error.message}`);
      }
    }

    const dto = { ...body, resume: resumeUrl };
    return this.workWithUsService.create(dto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const items = await this.workWithUsService.findAll();
    const host = req.get('host') || 'localhost';
    const protocol = req.protocol || 'http';
    return items.map(item => {
      // Mongoose documents may have toObject(); cast to any to satisfy TS
      const anyItem: any = item as any
      const obj: any = typeof anyItem.toObject === 'function' ? anyItem.toObject() : JSON.parse(JSON.stringify(anyItem))
      if (obj.resume && typeof obj.resume === 'string') {
        if (!obj.resume.startsWith('http')) {
          // Local filename stored — build absolute URL to the uploads folder
          obj.resume = `${protocol}://${host}/uploads/resumes/${obj.resume}`;
        }
      }
      return obj;
    });
  }
}