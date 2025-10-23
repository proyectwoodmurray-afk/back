import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  // Rutas públicas
  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  // Rutas protegidas con JWT
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: Partial<CreateTestimonialDto>,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/hard')
  hardDelete(@Param('id') id: string) {
    return this.testimonialsService.hardDelete(id);
  }
} 