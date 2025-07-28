import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CityService } from '../service/city.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createCitySchema, updateCitySchema } from '../../../common/schemas/city.schema';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 201, description: 'City created successfully.' })
  @JoiValidation(createCitySchema)
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'List of cities.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('idState') idState?: number) {
    return this.cityService.findAll(page, limit, idState);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get city by ID' })
  @ApiResponse({ status: 200, description: 'City found.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update city' })
  @ApiResponse({ status: 200, description: 'City updated successfully.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  @JoiValidation(updateCitySchema)
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete city' })
  @ApiResponse({ status: 200, description: 'City deleted successfully.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}

