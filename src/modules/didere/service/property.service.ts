import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Criar o endereço primeiro
      const address = await prisma.address.create({
        data: {
          zipCode: createPropertyDto.address.zipCode,
          name: createPropertyDto.address.name,
          neighborhood: createPropertyDto.address.neighborhood,
          number: createPropertyDto.address.number,
          complement: createPropertyDto.address.complement,
          idCity: createPropertyDto.address.idCity,
          idState: createPropertyDto.address.idState,
        },
      });

      // 2. Criar a propriedade
      const property = await prisma.property.create({
        data: {
          idLocator: createPropertyDto.idLocator,
          title: createPropertyDto.title,
          description: createPropertyDto.description,
          idAddress: address.id,
          height: createPropertyDto.height,
          width: createPropertyDto.width,
          depth: createPropertyDto.depth,
          mainPhoto: createPropertyDto.mainPhoto,
          periodicity: createPropertyDto.periodicity || 'M',
          value: createPropertyDto.value,
          urlMaps: createPropertyDto.urlMaps,
        },
      });

      // 3. Criar as relações com features
      if (createPropertyDto.featureIds && createPropertyDto.featureIds.length > 0) {
        await prisma.propertyFeature.createMany({
          data: createPropertyDto.featureIds.map(featureId => ({
            idProperty: property.id,
            idFeature: featureId,
          })),
        });
      }

      // 4. Criar as relações com type activities
      if (createPropertyDto.typeActivityIds && createPropertyDto.typeActivityIds.length > 0) {
        await prisma.propertyTypeActivity.createMany({
          data: createPropertyDto.typeActivityIds.map(typeActivityId => ({
            idProperty: property.id,
            idTypeActivity: typeActivityId,
          })),
        });
      }

      // 5. Criar os períodos de aluguel
      if (createPropertyDto.rentalPeriods && createPropertyDto.rentalPeriods.length > 0) {
        await prisma.propertyRentalPeriod.createMany({
          data: createPropertyDto.rentalPeriods.map(period => ({
            idProperty: property.id,
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
            startHour: period.startHour || '00:00',
            endHour: period.endHour || '23:59',
            sunday: period.sunday || 'Y',
            monday: period.monday || 'Y',
            tuesday: period.tuesday || 'Y',
            wednesday: period.wednesday || 'Y',
            thursday: period.thursday || 'Y',
            friday: period.friday || 'Y',
            saturday: period.saturday || 'Y',
          })),
        });
      }

      // 6. Retornar a propriedade criada com todos os relacionamentos
      return prisma.property.findUnique({
        where: { id: property.id },
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
          propertyRentalPeriods: true,
        },
      });
    });
  }

  async findAll() {
    const properties = await this.prisma.didere.property.findMany({
      include: {
        locator: true,
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        propertyFeatures: {
          include: {
            feature: true,
          },
        },
        propertyTypeActivities: {
          include: {
            typeActivity: true,
          },
        },
        propertyRentalPeriods: true,
      },
    });

    // Buscar photos e files para cada propriedade
    const propertiesWithFiles = await Promise.all(
      properties.map(async (property) => {
        let propertyPhotos = [];
        let propertyFiles = [];

        try {
          // Buscar photos da propriedade
          propertyPhotos = await this.prisma.files.propertyPhoto.findMany({
            where: { idProperty: property.id },
            include: { file: true },
          });

          // Buscar files da propriedade
          propertyFiles = await this.prisma.files.propertyFile.findMany({
            where: { idProperty: property.id },
            include: { file: true },
          });
        } catch (error) {
          // Se houver erro ao acessar o banco files, continuar sem photos/files
          console.warn(`Erro ao buscar files para propriedade ${property.id}:`, error.message);
        }

        return {
          ...property,
          propertyPhotos,
          propertyFiles,
        };
      })
    );

    return propertiesWithFiles;
  }

  async findOne(id: number) {
    const property = await this.prisma.didere.property.findUnique({
      where: { id },
      include: {
        locator: true,
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        propertyFeatures: {
          include: {
            feature: true,
          },
        },
        propertyTypeActivities: {
          include: {
            typeActivity: true,
          },
        },
        propertyRentalPeriods: true,
      },
    });

    if (!property) {
      return null;
    }

    // Buscar photos e files da propriedade
    let propertyPhotos = [];
    let propertyFiles = [];

    try {
      // Buscar photos da propriedade
      propertyPhotos = await this.prisma.files.propertyPhoto.findMany({
        where: { idProperty: id },
        include: { file: true },
      });

      // Buscar files da propriedade
      propertyFiles = await this.prisma.files.propertyFile.findMany({
        where: { idProperty: id },
        include: { file: true },
      });
    } catch (error) {
      // Se houver erro ao acessar o banco files, continuar sem photos/files
      console.warn(`Erro ao buscar files para propriedade ${id}:`, error.message);
    }

    return {
      ...property,
      propertyPhotos,
      propertyFiles,
    };
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Verificar se a propriedade existe
      const existingProperty = await prisma.property.findUnique({
        where: { id },
        include: { address: true },
      });

      if (!existingProperty) {
        throw new Error('Property not found');
      }

      // 1. Atualizar o endereço se fornecido
      if (updatePropertyDto.address) {
        await prisma.address.update({
          where: { id: existingProperty.idAddress },
          data: {
            ...(updatePropertyDto.address.zipCode && { zipCode: updatePropertyDto.address.zipCode }),
            ...(updatePropertyDto.address.name && { name: updatePropertyDto.address.name }),
            ...(updatePropertyDto.address.neighborhood && { neighborhood: updatePropertyDto.address.neighborhood }),
            ...(updatePropertyDto.address.number !== undefined && { number: updatePropertyDto.address.number }),
            ...(updatePropertyDto.address.complement !== undefined && { complement: updatePropertyDto.address.complement }),
            ...(updatePropertyDto.address.idCity && { idCity: updatePropertyDto.address.idCity }),
            ...(updatePropertyDto.address.idState && { idState: updatePropertyDto.address.idState }),
          },
        });
      }

      // 2. Atualizar os dados da propriedade
      const propertyUpdateData: any = {};
      if (updatePropertyDto.idLocator !== undefined) propertyUpdateData.idLocator = updatePropertyDto.idLocator;
      if (updatePropertyDto.title !== undefined) propertyUpdateData.title = updatePropertyDto.title;
      if (updatePropertyDto.description !== undefined) propertyUpdateData.description = updatePropertyDto.description;
      if (updatePropertyDto.height !== undefined) propertyUpdateData.height = updatePropertyDto.height;
      if (updatePropertyDto.width !== undefined) propertyUpdateData.width = updatePropertyDto.width;
      if (updatePropertyDto.depth !== undefined) propertyUpdateData.depth = updatePropertyDto.depth;
      if (updatePropertyDto.mainPhoto !== undefined) propertyUpdateData.mainPhoto = updatePropertyDto.mainPhoto;
      if (updatePropertyDto.periodicity !== undefined) propertyUpdateData.periodicity = updatePropertyDto.periodicity;
      if (updatePropertyDto.value !== undefined) propertyUpdateData.value = updatePropertyDto.value;
      if (updatePropertyDto.urlMaps !== undefined) propertyUpdateData.urlMaps = updatePropertyDto.urlMaps;

      if (Object.keys(propertyUpdateData).length > 0) {
        await prisma.property.update({
          where: { id },
          data: propertyUpdateData,
        });
      }

      // 3. Atualizar features (excluir e inserir novamente)
      if (updatePropertyDto.featureIds !== undefined) {
        // Excluir features existentes
        await prisma.propertyFeature.deleteMany({
          where: { idProperty: id },
        });

        // Inserir novas features
        if (updatePropertyDto.featureIds.length > 0) {
          await prisma.propertyFeature.createMany({
            data: updatePropertyDto.featureIds.map(featureId => ({
              idProperty: id,
              idFeature: featureId,
            })),
          });
        }
      }

      // 4. Atualizar type activities (excluir e inserir novamente)
      if (updatePropertyDto.typeActivityIds !== undefined) {
        // Excluir type activities existentes
        await prisma.propertyTypeActivity.deleteMany({
          where: { idProperty: id },
        });

        // Inserir novas type activities
        if (updatePropertyDto.typeActivityIds.length > 0) {
          await prisma.propertyTypeActivity.createMany({
            data: updatePropertyDto.typeActivityIds.map(typeActivityId => ({
              idProperty: id,
              idTypeActivity: typeActivityId,
            })),
          });
        }
      }

      // 5. Atualizar rental periods (excluir e inserir novamente)
      if (updatePropertyDto.rentalPeriods !== undefined) {
        // Excluir rental periods existentes
        await prisma.propertyRentalPeriod.deleteMany({
          where: { idProperty: id },
        });

        // Inserir novos rental periods
        if (updatePropertyDto.rentalPeriods.length > 0) {
          await prisma.propertyRentalPeriod.createMany({
            data: updatePropertyDto.rentalPeriods.map(period => ({
              idProperty: id,
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
              startHour: period.startHour || '00:00',
              endHour: period.endHour || '23:59',
              sunday: period.sunday || 'Y',
              monday: period.monday || 'Y',
              tuesday: period.tuesday || 'Y',
              wednesday: period.wednesday || 'Y',
              thursday: period.thursday || 'Y',
              friday: period.friday || 'Y',
              saturday: period.saturday || 'Y',
            })),
          });
        }
      }

      // 6. Retornar a propriedade atualizada com todos os relacionamentos
      return prisma.property.findUnique({
        where: { id },
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
          propertyRentalPeriods: true,
        },
      });
    });
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      // Verificar se a propriedade existe
      const existingProperty = await prisma.property.findUnique({
        where: { id },
        include: { address: true },
      });

      if (!existingProperty) {
        throw new Error('Property not found');
      }

      // 1. Excluir photos da propriedade (se existirem)
      try {
        // Buscar photos relacionadas à propriedade no banco files
        const propertyPhotos = await this.prisma.files.propertyPhoto.findMany({
          where: { idProperty: id },
          include: { file: true },
        });

        // Excluir os registros de PropertyPhoto
        if (propertyPhotos.length > 0) {
          await this.prisma.files.propertyPhoto.deleteMany({
            where: { idProperty: id },
          });

          // Excluir os arquivos de foto
          const photoFileIds = propertyPhotos.map(photo => photo.idFile);
          await this.prisma.files.file.deleteMany({
            where: { id: { in: photoFileIds } },
          });
        }
      } catch (error) {
        // Se houver erro ao acessar o banco files, continuar (pode não existir)
        console.warn('Erro ao excluir photos:', error.message);
      }

      // 2. Excluir files da propriedade (se existirem)
      try {
        // Buscar files relacionados à propriedade no banco files
        const propertyFiles = await this.prisma.files.propertyFile.findMany({
          where: { idProperty: id },
          include: { file: true },
        });

        // Excluir os registros de PropertyFile
        if (propertyFiles.length > 0) {
          await this.prisma.files.propertyFile.deleteMany({
            where: { idProperty: id },
          });

          // Excluir os arquivos
          const fileIds = propertyFiles.map(file => file.idFile);
          await this.prisma.files.file.deleteMany({
            where: { id: { in: fileIds } },
          });
        }
      } catch (error) {
        // Se houver erro ao acessar o banco files, continuar (pode não existir)
        console.warn('Erro ao excluir files:', error.message);
      }

      // 3. Excluir rental periods da propriedade
      await prisma.propertyRentalPeriod.deleteMany({
        where: { idProperty: id },
      });

      // 4. Excluir type activities da propriedade
      await prisma.propertyTypeActivity.deleteMany({
        where: { idProperty: id },
      });

      // 5. Excluir features da propriedade
      await prisma.propertyFeature.deleteMany({
        where: { idProperty: id },
      });

      // 6. Excluir claim forms relacionados à propriedade
      await prisma.claimForm.deleteMany({
        where: { idProperty: id },
      });

      // 7. Excluir a propriedade
      await prisma.property.delete({
        where: { id },
      });

      // 8. Excluir o endereço (se não estiver sendo usado por outras entidades)
      const addressUsage = await Promise.all([
        prisma.property.count({ where: { idAddress: existingProperty.idAddress } }),
        prisma.locator.count({ where: { idAddress: existingProperty.idAddress } }),
        // Verificar se há tenants usando este endereço
        prisma.tenant.count({ where: { idAddress: existingProperty.idAddress } }),
      ]);

      const totalUsage = addressUsage.reduce((sum, count) => sum + count, 0);

      if (totalUsage === 0) {
        await prisma.address.delete({
          where: { id: existingProperty.idAddress },
        });
      }

      return { message: 'Property and related data deleted successfully' };
    });
  }

  async search(filters: any) {
    const where: any = {};

    if (filters.city) {
      where.address = {
        city: {
          name: {
            contains: filters.city,
          },
        },
      };
    }

    if (filters.minValue) {
      where.value = {
        gte: parseFloat(filters.minValue),
      };
    }

    if (filters.maxValue) {
      where.value = {
        ...where.value,
        lte: parseFloat(filters.maxValue),
      };
    }

    if (filters.typeActivity) {
      where.propertyTypeActivities = {
        some: {
          typeActivity: {
            name: {
              contains: filters.typeActivity,
            },
          },
        },
      };
    }

    const properties = await this.prisma.didere.property.findMany({
      where,
      include: {
        locator: true,
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        propertyFeatures: {
          include: {
            feature: true,
          },
        },
        propertyTypeActivities: {
          include: {
            typeActivity: true,
          },
        },
        propertyRentalPeriods: true,
      },
    });

    // Buscar photos e files para cada propriedade
    const propertiesWithFiles = await Promise.all(
      properties.map(async (property) => {
        let propertyPhotos = [];
        let propertyFiles = [];

        try {
          // Buscar photos da propriedade
          propertyPhotos = await this.prisma.files.propertyPhoto.findMany({
            where: { idProperty: property.id },
            include: { file: true },
          });

          // Buscar files da propriedade
          propertyFiles = await this.prisma.files.propertyFile.findMany({
            where: { idProperty: property.id },
            include: { file: true },
          });
        } catch (error) {
          // Se houver erro ao acessar o banco files, continuar sem photos/files
          console.warn(`Erro ao buscar files para propriedade ${property.id}:`, error.message);
        }

        return {
          ...property,
          propertyPhotos,
          propertyFiles,
        };
      })
    );

    return propertiesWithFiles;
  }
}


