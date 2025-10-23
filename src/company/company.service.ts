import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async getCompanyInfo(): Promise<Company> {
    let company = await this.companyModel.findOne();
    
    if (!company) {
      // Crear una compañía por defecto si no existe
      company = new this.companyModel({
        name: 'Wood Construction',
        tagline: 'Building Dreams',
        description: 'Professional construction services',
        address: '123 Main St, City, State',
        phone: '+1234567890',
        email: 'info@woodconstruction.com',
        hours: {
          monday: '9:00 AM - 5:00 PM',
          tuesday: '9:00 AM - 5:00 PM',
          wednesday: '9:00 AM - 5:00 PM',
          thursday: '9:00 AM - 5:00 PM',
          friday: '9:00 AM - 5:00 PM',
          saturday: '10:00 AM - 2:00 PM',
          sunday: 'Closed'
        },
        socialMedia: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      });
      await company.save();
    }
    
    return company;
  }

  async updateCompanyInfo(dto: UpdateCompanyDto): Promise<Company> {
    let company = await this.companyModel.findOne();
    
    if (!company) {
      throw new NotFoundException('Company info not found');
    }

    // Actualizar solo los campos proporcionados
    Object.assign(company, dto);
    
    return await company.save();
  }
}