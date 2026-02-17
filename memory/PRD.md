# AUREON - PRD (Product Requirements Document)

## Visão Geral
Site institucional/corporativo para empresa de Capoto e Microcimento em Portugal.

## Data de Criação
Janeiro 2026

## Última Atualização
Janeiro 2026 - Adicionada calculadora de orçamento e novas imagens

## Problema Original
Criar um site completo para a empresa AUREON especializada em:
- Capoto / ETICS (Sistema de Isolamento Térmico pelo Exterior)
- Microcimento (Acabamentos Decorativos)
- Serviços de construção civil em Portugal

## User Personas
1. **Proprietários de Imóveis**: Buscam melhorar eficiência energética e estética da casa
2. **Empresas de Construção**: Parceiros para serviços de isolamento
3. **Arquitetos/Engenheiros**: Especificação de materiais e sistemas ETICS
4. **Clientes Comerciais**: Restaurantes, lojas, escritórios

## Requisitos Core (Implementados)
- [x] Hero Section com CTA "Pedir Orçamento"
- [x] Seção Sobre com estatísticas da empresa
- [x] Serviços em Bento Grid (Capoto, Microcimento, Reabilitação, Consultoria)
- [x] **NOVO: Calculadora de Orçamento** - Estimativa instantânea por m²
- [x] Portfólio com filtros por categoria e lightbox
- [x] Área Técnica com accordions (Vantagens, Processo, Normas, Especificações)
- [x] Formulário de Contacto/Orçamento funcional
- [x] Integração WhatsApp (botão flutuante)
- [x] Footer com links e informações
- [x] Navegação suave entre seções
- [x] Design responsivo
- [x] **NOVO: Imagens específicas** de Capoto e Microcimento

## Calculadora de Orçamento (Nova Funcionalidade)
- **Capoto/ETICS**: €45-65/m² base + acabamentos
  - Acrílico: sem custo adicional
  - Silicone: +€8-12/m²
  - Mineral: +€5-8/m²
- **Microcimento**: €55-85/m² base + acabamentos
  - Mate: sem custo adicional
  - Acetinado: +€5-10/m²
  - Brilhante: +€10-15/m²
- Multiplicadores de complexidade: Simples (-10%), Normal (base), Complexo (+20%)

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner (toasts)
- **Backend**: FastAPI (Python), Motor (MongoDB async)
- **Database**: MongoDB
- **Estilo**: Corporativo/Profissional
- **Cores**: Obsidian (#1A1A1A), Microcement Beige (#E5E0D8), Thermal Terracotta (#C8553D)
- **Fontes**: Manrope (headings), DM Sans (body)

## APIs Implementadas
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| /api/ | GET | Root message |
| /api/health | GET | Health check |
| /api/contact | POST | Criar pedido de contacto |
| /api/contact | GET | Listar pedidos |
| /api/portfolio | GET | Listar projetos (filtros: category, featured) |
| /api/portfolio/{id} | GET | Detalhe do projeto |
| /api/seed-portfolio | POST | Popular dados iniciais |

## O Que Foi Implementado
- **Jan 2026 - MVP**: Site single-page com 6 seções principais
- **Jan 2026 - v1.1**: Calculadora de orçamento por m²
- **Jan 2026 - v1.2**: Imagens específicas de Capoto e Microcimento
  - Capoto: edifícios com isolamento EPS, andaimes, trabalhadores
  - Microcimento: interiores modernos, casa de banho, pavimentos

## Backlog / Melhorias Futuras
### P0 (Crítico)
- Nenhum item pendente

### P1 (Alta Prioridade)
- [ ] Integração com Google Maps real (substituir placeholder)
- [ ] Dashboard admin para gerenciar pedidos de contacto
- [ ] Sistema de upload de imagens para portfólio

### P2 (Média Prioridade)
- [ ] Blog/Artigos técnicos
- [ ] Integração com CRM
- [ ] Multi-idioma (PT/EN/ES)
- [ ] Galeria before/after de projetos

### P3 (Baixa Prioridade)
- [ ] Depoimentos de clientes
- [ ] Vídeos de demonstração
- [ ] FAQ expandido
- [ ] Newsletter

## Próximas Ações
1. Substituir dados de contacto fictícios pelos reais
2. Adicionar Google Maps real
3. Configurar domínio personalizado
4. SEO optimization

## Métricas de Sucesso
- Taxa de conversão de visitante para lead (formulário + calculadora)
- Tempo médio na página
- Cliques no WhatsApp
- Uso da calculadora de orçamento
- Projetos do portfólio mais visualizados
