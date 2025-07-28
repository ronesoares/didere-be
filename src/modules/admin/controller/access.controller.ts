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
import { AccessService } from '../service/access.service';
import { CreateAccessDto } from '../dto/create-access.dto';
import { UpdateAccessDto } from '../dto/update-access.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createAccessSchema, updateAccessSchema } from '../../../common/schemas/access.schema';

@ApiTags('accesses')
@Controller('accesses')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new access' })
  @ApiResponse({ status: 201, description: 'Access created successfully.' })
  @JoiValidation(createAccessSchema)
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get all accesses' })
  @ApiResponse({ status: 200, description: 'List of accesses.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.accessService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get access by ID' })
  @ApiResponse({ status: 200, description: 'Access found.' })
  @ApiResponse({ status: 404, description: 'Access not found.' })
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update access' })
  @ApiResponse({ status: 200, description: 'Access updated successfully.' })
  @ApiResponse({ status: 404, description: 'Access not found.' })
  @JoiValidation(updateAccessSchema)
  update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessService.update(+id, updateAccessDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete access' })
  @ApiResponse({ status: 200, description: 'Access deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Access not found.' })
  remove(@Param('id') id: string) {
    return this.accessService.remove(+id);
  }
}

