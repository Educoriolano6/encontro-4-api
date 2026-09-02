import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type Papel = 'solicitante' | 'gestor' | 'auditor';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  papel: Papel;
  ativo: boolean;
};

export type UsuarioAutenticado = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [];

  constructor() {
    this.inicializarUsuarios();
  }

  private async inicializarUsuarios() {
    const primeiroNome = 'Eduardo';
    const ultimoSobrenome = 'Nunes';
    const matricula = '20251038060020';
    const matriculaInvertida = '02006083015202';
    
    const senhaPadraoHash = await bcrypt.hash('senha123', 10);
    const senhaGestorHash = await bcrypt.hash(matricula, 10);
    console.log('Usuários criados:', this.usuarios.map(u => u.email));
    const senhaAuditorHash = await bcrypt.hash(matriculaInvertida, 10);

    this.usuarios.push(
      {
        id: 1,
        nome: 'Ana Lima',
        email: 'ana@empresa.com',
        senhaHash: senhaPadraoHash,
        papel: 'gestor',
        ativo: true,
      },
      {
        id: 2,
        nome: 'Bruno Silva',
        email: 'bruno@empresa.com',
        senhaHash: senhaPadraoHash,
        papel: 'solicitante',
        ativo: true,
      },
      {
        id: 3,
        nome: 'Carla',
        email: 'carla@empresa.com',
        senhaHash: senhaPadraoHash,
        papel: 'auditor',
        ativo: true,
      },
      {
        id: 4,
        nome: primeiroNome,
        email: `${primeiroNome.toLowerCase()}@empresa.com`,
        senhaHash: senhaGestorHash,
        papel: 'gestor',
        ativo: true,
      },
      {
        id: 5,
        nome: ultimoSobrenome,
        email: `${ultimoSobrenome.toLowerCase()}@empresa.com`,
        senhaHash: senhaAuditorHash,
        papel: 'auditor',
        ativo: true,
      }
    );
  }

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}
