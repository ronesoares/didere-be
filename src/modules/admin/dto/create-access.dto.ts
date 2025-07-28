import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessDto {
  @ApiProperty({ description: 'Insert permission', maxLength: 1, default: 'Y' })
  insert?: string = 'Y';

  @ApiProperty({ description: 'Update permission', maxLength: 1, default: 'Y' })
  update?: string = 'Y';

  @ApiProperty({ description: 'Delete permission', maxLength: 1, default: 'Y' })
  delete?: string = 'Y';

  @ApiProperty({ description: 'Search permission', maxLength: 1, default: 'Y' })
  search?: string = 'Y';

  @ApiProperty({ description: 'Module ID' })
  idModule: number;

  @ApiProperty({ description: 'Profile ID' })
  idProfile: number;
}

