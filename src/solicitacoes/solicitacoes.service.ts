import { Injectable, NotFoundException } from '@nestjs/common';

export type Solicitacao = {
  id: number;
  descricao: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
};

@Injectable()
export class SolicitacoesService {
  private solicitacoes: Solicitacao[] = [
    { id: 1, descricao: 'Solicitação de compra de materiais', status: 'pendente' },
    { id: 2, descricao: 'Solicitação de viagem', status: 'pendente' },
  ];

  buscarPorId(id: number): Solicitacao {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) {
      throw new NotFoundException(`Solicitação com ID ${id} não encontrada`);
    }
    return solicitacao;
  }

  aprovar(id: number): Solicitacao {
    const solicitacao = this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return solicitacao;
  }

  gerarRelatorio() {
    const total = this.solicitacoes.length;
    const porStatus = this.solicitacoes.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, porStatus };
  }
}
