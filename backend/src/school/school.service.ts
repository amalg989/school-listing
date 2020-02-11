import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from './interfaces/school.interface';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(@InjectModel('School') private readonly schoolModel: Model<School>) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async findAll(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }
}