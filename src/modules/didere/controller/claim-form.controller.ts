import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClaimFormService } from '../service/claim-form.service';
import { CreateClaimFormDto } from '../dto/create-claim-form.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createClaimFormSchema } from '../../../common/schemas/claim-form.schema';

@ApiTags('claim-forms')
@Controller('claim-forms')
export class ClaimFormController {
  constructor(private readonly claimFormService: ClaimFormService) {}

  @Post()
  @JoiValidation(createClaimFormSchema)
  @ApiOperation({ summary: 'Criar novo formulário de interesse' })
  @ApiResponse({ status: 201, description: 'Formulário de interesse criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createClaimFormDto: CreateClaimFormDto) {
    return this.claimFormService.create(createClaimFormDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Listar todos os formulários de interesse' })
  @ApiResponse({ status: 200, description: 'Lista de formulários de interesse retornada com sucesso.' })
  findAll() {
    return this.claimFormService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Buscar formulário de interesse por ID' })
  @ApiResponse({ status: 200, description: 'Formulário de interesse encontrado.' })
  @ApiResponse({ status: 404, description: 'Formulário de interesse não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claimFormService.findOne(id);
  }

  @Get('property/:propertyId')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Buscar formulários de interesse por propriedade' })
  @ApiResponse({ status: 200, description: 'Lista de formulários de interesse da propriedade retornada com sucesso.' })
  findByProperty(@Param('propertyId', ParseIntPipe) propertyId: number) {
    return this.claimFormService.findByProperty(propertyId);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Remover formulário de interesse' })
  @ApiResponse({ status: 200, description: 'Formulário de interesse removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Formulário de interesse não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.claimFormService.remove(id);
  }
}

