import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PropertyService } from '../service/property.service';
import { PropertyRentalPeriodService } from '../service/property-rental-period.service';
import { PropertyFeatureService } from '../service/property-feature.service';
import { PropertyTypeActivityService } from '../service/property-type-activity.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { CreatePropertyRentalPeriodDto } from '../dto/create-property-rental-period.dto';
import { CreatePropertyFeatureDto } from '../dto/create-property-feature.dto';
import { CreatePropertyTypeActivityDto } from '../dto/create-property-type-activity.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createPropertySchema, updatePropertySchema } from '../../../common/schemas/property.schema';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly propertyRentalPeriodService: PropertyRentalPeriodService,
    private readonly propertyFeatureService: PropertyFeatureService,
    private readonly propertyTypeActivityService: PropertyTypeActivityService,
  ) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully.' })
  @JoiValidation(createPropertySchema)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all properties (Public)' })
  @ApiResponse({ status: 200, description: 'List of properties.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.propertyService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID (Public)' })
  @ApiResponse({ status: 200, description: 'Property found.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update property' })
  @ApiResponse({ status: 200, description: 'Property updated successfully.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  @JoiValidation(updatePropertySchema)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete property' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.remove(id);
  }

  // Property Rental Periods
  @Post(':id/rental-periods')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Add rental period to property' })
  @ApiResponse({ status: 201, description: 'Rental period added successfully.' })
  addRentalPeriod(
    @Param('id', ParseIntPipe) propertyId: number,
    @Body() createPropertyRentalPeriodDto: CreatePropertyRentalPeriodDto,
  ) {
    return this.propertyRentalPeriodService.create({
      ...createPropertyRentalPeriodDto,
      idProperty: propertyId,
    });
  }

  @Public()
  @Get(':id/rental-periods')
  @ApiOperation({ summary: 'Get rental periods for property' })
  @ApiResponse({ status: 200, description: 'List of rental periods.' })
  getRentalPeriods(@Param('id', ParseIntPipe) propertyId: number) {
    return this.propertyRentalPeriodService.findByProperty(propertyId);
  }

  @Post(':id/features')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Add feature to property' })
  @ApiResponse({ status: 201, description: 'Feature added successfully.' })
  addFeature(
    @Param('id', ParseIntPipe) propertyId: number,
    @Body() createPropertyFeatureDto: CreatePropertyFeatureDto,
  ) {
    return this.propertyFeatureService.create({
      ...createPropertyFeatureDto,
      idProperty: propertyId,
    });
  }

  @Public()
  @Get(':id/features')
  @ApiOperation({ summary: 'Get features for property' })
  @ApiResponse({ status: 200, description: 'List of features.' })
  getFeatures(@Param('id', ParseIntPipe) propertyId: number) {
    return this.propertyFeatureService.findByProperty(propertyId);
  }

  @Post(':id/type-activities')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Add type activity to property' })
  @ApiResponse({ status: 201, description: 'Type activity added successfully.' })
  addTypeActivity(
    @Param('id', ParseIntPipe) propertyId: number,
    @Body() createPropertyTypeActivityDto: CreatePropertyTypeActivityDto,
  ) {
    return this.propertyTypeActivityService.create({
      ...createPropertyTypeActivityDto,
      idProperty: propertyId,
    });
  }

  @Public()
  @Get(':id/type-activities')
  @ApiOperation({ summary: 'Get type activities for property' })
  @ApiResponse({ status: 200, description: 'List of type activities.' })
  getTypeActivities(@Param('id', ParseIntPipe) propertyId: number) {
    return this.propertyTypeActivityService.findByProperty(propertyId);
  }
}

