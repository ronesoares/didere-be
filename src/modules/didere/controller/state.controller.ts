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
import { StateService } from '../service/state.service';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createStateSchema, updateStateSchema } from '../../../common/schemas/state.schema';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('states')
@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new state' })
  @ApiResponse({ status: 201, description: 'State created successfully.' })
  @JoiValidation(createStateSchema)
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'List of states.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.stateService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get state by ID' })
  @ApiResponse({ status: 200, description: 'State found.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update state' })
  @ApiResponse({ status: 200, description: 'State updated successfully.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  @JoiValidation(updateStateSchema)
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete state' })
  @ApiResponse({ status: 200, description: 'State deleted successfully.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}

