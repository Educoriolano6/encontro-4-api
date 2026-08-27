import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@Module({
  imports: [UsuariosModule, AuthModule, SolicitacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
