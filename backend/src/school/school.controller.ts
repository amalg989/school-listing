import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolService } from './school.service';
import { School } from './interfaces/school.interface';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {
    this.schoolService.findAll().then(res=> {
      if(res && res.length > 0) {
        return;
      }

      this.schoolService.create({"name":"New School","address":{"street":"168/6, Polwatta Road, Pamunuwa","suburb":"Maharagama","postcode":"10280","state":"Colombo"},"numberOfStudents": 1});      
    })
  }

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    await this.schoolService.create(createSchoolDto);
  }

  @Get()
  async findAll(@Query() query): Promise<School[]> {

    const ranges = [
      {value: '0', displayValue: 'All'},
      {value: '1', displayValue: '0-50'},
      {value: '2', displayValue: '51-250'},
      {value: '3', displayValue: '251-500'},
      {value: '4', displayValue: '500-1000'},
      {value: '5', displayValue: '>1000'}
    ];

    const {filter_name, filter_address, filter_num_students} = query || {};

    const filters = {
      byName: filter_name || false,
      byAddress: filter_address || false,
      byRange: filter_num_students || false
    }

    let schools = await this.schoolService.findAll();

    if(filters.byName && filters.byName !== '') {
      schools = schools.filter(school => school.name.indexOf(filters.byName) > -1);
    }

    if(filters.byAddress && filters.byAddress !== '') {
      schools = schools.filter(school => `${school.address.street} ${school.address.suburb} ${school.address.postcode} ${school.address.state}`.indexOf(filters.byAddress) > -1);
    }

    if(filters.byRange && filters.byRange > 0) {
      schools = schools.filter(school => school.numberOfStudents == parseInt(filters.byRange, 10));
    }

    return schools;
  }
}