import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ERoles } from 'src/common/enum/role';
import { Roles } from 'src/role-guard/roles.decorator';
import { RolesGuard } from 'src/role-guard/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSpecializationDto } from './specializations.dto';
import { SpecializationService } from './specializations.service';

@Controller('specialization')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpecializationsController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Get()
  @Roles(ERoles.ADMIN)
  getListings() {
    return this.specializationService.findAll();
  }

  @Post()
  @Roles(ERoles.ADMIN)
  createSpecialization(@Body() body: CreateSpecializationDto) {
    return this.specializationService.createSpecialization(body);
  }
}
