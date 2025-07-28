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
import { SellerService } from '../service/seller.service';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createSellerSchema, updateSellerSchema } from '../../../common/schemas/seller.schema';

@ApiTags('sellers')
@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new seller' })
  @ApiResponse({ status: 201, description: 'Seller created successfully.' })
  @JoiValidation(createSellerSchema)
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get all sellers' })
  @ApiResponse({ status: 200, description: 'List of sellers.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.sellerService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get seller by ID' })
  @ApiResponse({ status: 200, description: 'Seller found.' })
  @ApiResponse({ status: 404, description: 'Seller not found.' })
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update seller' })
  @ApiResponse({ status: 200, description: 'Seller updated successfully.' })
  @ApiResponse({ status: 404, description: 'Seller not found.' })
  @JoiValidation(updateSellerSchema)
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete seller' })
  @ApiResponse({ status: 200, description: 'Seller deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Seller not found.' })
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }
}

