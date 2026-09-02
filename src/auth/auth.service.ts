import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string) {
    const usuarioCompleto = this.usuariosService.buscarPorEmailComSenha(email);

    if (!usuarioCompleto || !usuarioCompleto.ativo) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuarioCompleto.senhaHash);

    if (!senhaValida) {
      return null;
    }

    const { senhaHash: _senhaHash, ...principal } = usuarioCompleto;
    return principal;
  }

  login(usuario: any) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
      ativo: usuario.ativo,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}