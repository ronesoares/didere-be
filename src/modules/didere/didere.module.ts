import { Module } from '@nestjs/common';

// Controllers
import { PropertyController } from './controller/property.controller';
import { ClaimFormController } from './controller/claim-form.controller';
import { StateController } from './controller/state.controller';
import { CityController } from './controller/city.controller';
import { AddressController } from './controller/address.controller';
import { TenantController } from './controller/tenant.controller';
import { FeatureController } from './controller/feature.controller';
import { TypeActivityController } from './controller/type-activity.controller';

// Services
import { PropertyService } from './service/property.service';
import { ClaimFormService } from './service/claim-form.service';
import { LocatorService } from './service/locator.service';
import { PropertyRentalPeriodService } from './service/property-rental-period.service';
import { PropertyFeatureService } from './service/property-feature.service';
import { PropertyTypeActivityService } from './service/property-type-activity.service';
import { FeatureService } from './service/feature.service';
import { TypeActivityService } from './service/type-activity.service';
import { StateService } from './service/state.service';
import { CityService } from './service/city.service';
import { AddressService } from './service/address.service';
import { TenantService } from './service/tenant.service';
import { PrismaService } from '../../common/service/prisma.service';

@Module({
  controllers: [
    PropertyController,
    ClaimFormController,
    StateController,
    CityController,
    AddressController,
    TenantController,
    FeatureController,
    TypeActivityController,
  ],
  providers: [
    PropertyService,
    ClaimFormService,
    LocatorService,
    PropertyRentalPeriodService,
    PropertyFeatureService,
    PropertyTypeActivityService,
    FeatureService,
    TypeActivityService,
    StateService,
    CityService,
    AddressService,
    TenantService,
    PrismaService,
  ],
  exports: [
    PropertyService,
    ClaimFormService,
    LocatorService,
    PropertyRentalPeriodService,
    PropertyFeatureService,
    PropertyTypeActivityService,
    FeatureService,
    TypeActivityService,
    StateService,
    CityService,
    AddressService,
    TenantService,
  ],
})
export class DidereModule {}