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
import { OwnerService } from '../service/owner.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createOwnerSchema, updateOwnerSchema } from '../../../common/schemas/owner.schema';

@ApiTags('owners')
@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new owner' })
  @ApiResponse({ status: 201, description: 'Owner created successfully.' })
  @JoiValidation(createOwnerSchema)
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get all owners' })
  @ApiResponse({ status: 200, description: 'List of owners.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.ownerService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get owner by ID' })
  @ApiResponse({ status: 200, description: 'Owner found.' })
  @ApiResponse({ status: 404, description: 'Owner not found.' })
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update owner' })
  @ApiResponse({ status: 200, description: 'Owner updated successfully.' })
  @ApiResponse({ status: 404, description: 'Owner not found.' })
  @JoiValidation(updateOwnerSchema)
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete owner' })
  @ApiResponse({ status: 200, description: 'Owner deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Owner not found.' })
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}

