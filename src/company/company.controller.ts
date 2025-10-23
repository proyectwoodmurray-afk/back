import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanyInfo() {
    return this.companyService.getCompanyInfo();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateCompanyInfo(@Body() dto: UpdateCompanyDto) {
    return this.companyService.updateCompanyInfo(dto);
  }
} 