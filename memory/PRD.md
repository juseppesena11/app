# AUREON - PRD (Product Requirements Document)

## Visão Geral
Site institucional/corporativo para empresa de Capoto, Microcimento e serviços de construção em Portugal.

## Data de Criação
Janeiro 2026

## Última Atualização
Janeiro 2026 - Fotos reais de trabalhos executados + Calculadora expandida com 7 serviços

## Problema Original
Criar um site completo para a empresa AUREON especializada em:
- Capoto / ETICS (Sistema de Isolamento Térmico pelo Exterior)
- Microcimento (Acabamentos Decorativos)
- Pintura Interior e Exterior
- Limpeza de Telhados
- Remodelação de Casas de Banho

## User Personas
1. **Proprietários de Imóveis**: Buscam melhorar eficiência energética e estética da casa
2. **Empresas de Construção**: Parceiros para serviços de isolamento
3. **Arquitetos/Engenheiros**: Especificação de materiais e sistemas ETICS
4. **Clientes Comerciais**: Restaurantes, lojas, escritórios

## Requisitos Core (Implementados)
- [x] Hero Section com foto real de obra + CTA "Pedir Orçamento"
- [x] Seção Sobre com estatísticas da empresa
- [x] Serviços em Bento Grid (4 serviços principais com fotos reais)
- [x] **Calculadora de Orçamento Expandida** - 7 serviços
- [x] Portfólio com fotos reais de trabalhos executados
- [x] Área Técnica com accordions
- [x] Formulário de Contacto/Orçamento funcional
- [x] Integração WhatsApp (botão flutuante)
- [x] Footer com links e informações
- [x] Design responsivo

## Calculadora de Orçamento (7 Serviços)
| Serviço | Preço Base | Opções |
|---------|------------|--------|
| Capoto / ETICS | €45-65/m² | Acrílico, Silicone (+€8-12), Mineral (+€5-8) |
| Microcimento | €55-85/m² | Mate, Acetinado (+€5-10), Brilhante (+€10-15) |
| Pintura Interior | €7-15/m² | Complexidade: -10% a +20% |
| Pintura Exterior | €9-16/m² | Complexidade: -10% a +20% |
| Limpeza Telhados | €5-12/m² | Hidrofugante opcional (+€5-12/m²) |
| WC Completa | €235-375/m² | Inclui canalização |
| WC Estética | €165-275/m² | Mantém canalização |

## Fotos Reais Adicionadas
1. **IMG_4369** - Obra de Capoto em moradia (Hero, Sobre, Serviços, Portfólio)
2. **IMG_3102** - Microcimento em Casa de Banho
3. **IMG_8821** - Casa de Banho Remodelada Moderna
4. **IMG_1482** - Limpeza de Telhado
5. **aa16b504** - Casa de Banho Premium com LED

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner
- **Backend**: FastAPI (Python), Motor (MongoDB async)
- **Database**: MongoDB

## O Que Foi Implementado
- **Jan 2026 - MVP**: Site single-page completo
- **Jan 2026 - v1.1**: Calculadora de orçamento (2 serviços)
- **Jan 2026 - v1.2**: Imagens específicas Capoto/Microcimento
- **Jan 2026 - v1.3**: Calculadora expandida (7 serviços)
- **Jan 2026 - v1.4**: Fotos reais de trabalhos executados

## Backlog / Próximos Passos
### P1 (Alta Prioridade)
- [ ] Adicionar mais fotos reais ao portfólio
- [ ] Dashboard admin para pedidos de contacto
- [ ] Google Maps real na seção de contacto

### P2 (Média Prioridade)
- [ ] Galeria before/after de projetos
- [ ] Blog/Artigos técnicos
- [ ] Multi-idioma (PT/EN/ES)

## Métricas de Sucesso
- Taxa de conversão (formulário + calculadora)
- Cliques no WhatsApp
- Uso da calculadora de orçamento por serviço
