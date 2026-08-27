import { Controller,Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SolicitacoesService } from './solicitacoes.service';

@Controller('solicitacoes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}



  @Roles('gestor', 'auditor')
  @Get(':id')
  buscarPorId(@Param ('id', ParseIntPipe) id: number){
    return this.solicitacoesService.buscarPorId(id);
  }


  @Roles('gestor')
  @Patch(':id/aprovar')
  aprovar(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.aprovar(id);
  }
}
