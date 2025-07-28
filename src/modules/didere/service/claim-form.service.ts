import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateClaimFormDto } from '../dto/create-claim-form.dto';

@Injectable()
export class ClaimFormService {
  constructor(private prisma: PrismaService) {}

  async create(createClaimFormDto: CreateClaimFormDto) {
    return this.prisma.didere.claimForm.create({
      data: {
        name: createClaimFormDto.name,
        phoneNumber: createClaimFormDto.phoneNumber,
        email: createClaimFormDto.email,
        messageDetail: createClaimFormDto.messageDetail,
        source: createClaimFormDto.source || 'WEBSITE',
        creationDate: new Date(),
        property: createClaimFormDto.idProperty ? {
          connect: { id: createClaimFormDto.idProperty }
        } : undefined,
      },
      include: {
        property: {
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
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.didere.claimForm.findMany({
      include: {
        property: {
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
          },
        },
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.claimForm.findUnique({
      where: { id },
      include: {
        property: {
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
          },
        },
      },
    });
  }

  async findByProperty(idProperty: number) {
    return this.prisma.didere.claimForm.findMany({
      where: { idProperty },
      include: {
        property: {
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
          },
        },
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async remove(id: number) {
    return this.prisma.didere.claimForm.delete({
      where: { id },
    });
  }
}


