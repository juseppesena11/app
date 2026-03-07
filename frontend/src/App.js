import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { 
  Phone, Mail, MapPin, Clock, ChevronDown, X, Menu, 
  Shield, ThermometerSun, Paintbrush, CheckCircle2, 
  Building2, Award, Users, ArrowRight, ExternalLink,
  Calculator, Ruler, Euro, Info, Home, Briefcase, 
  Image, FileText, MessageCircle, ChevronRight,
  Droplets, Hammer, Sparkles, TrendingUp, Zap,
  Star, Check, Play
} from "lucide-react";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// SEO Keywords for Portugal
const SEO_KEYWORDS = {
  capoto: [
    "capoto preço m2", "capoto lisboa", "capoto setubal", "capoto almada",
    "capoto seixal", "capoto barreiro", "capoto montijo", "etics portugal",
    "isolamento termico exterior", "capoto vale a pena", "quanto custa capoto",
    "capoto espessura", "capoto eps", "capoto vantagens", "capoto garantia"
  ],
  microcimento: [
    "microcimento preço m2", "microcimento lisboa", "microcimento casa de banho",
    "microcimento cozinha", "microcimento pavimento", "microcimento setubal",
    "microcimento ou azulejo", "microcimento durabilidade", "microcimento cores",
    "microcimento impermeavel", "microcimento paredes", "microcimento escadas"
  ],
  remodelacoes: [
    "remodelação casa banho preço", "remodelação apartamento lisboa",
    "remodelações setubal", "remodelar cozinha preço", "remodelação completa",
    "quanto custa remodelar casa banho", "empresa remodelações lisboa",
    "remodelação moradia", "obras remodelação", "remodelações almada"
  ]
};

// SEO Page Titles and Descriptions - COMPLETO
const SEO_META = {
  home: {
    title: "Capoto, Microcimento e Remodelações em Lisboa e Setúbal | AUREON",
    description: "Profissionais em capoto, microcimento e remodelações em Lisboa e Setúbal. Orçamento gratuito e atendimento rápido pelo WhatsApp.",
    keywords: "capoto lisboa, microcimento setúbal, remodelações lisboa"
  },
  capoto: {
    title: "Capoto em Lisboa e Setúbal – Preço por m² e Orçamento | AUREON",
    description: "Aplicamos capoto (ETICS) em Lisboa e Setúbal com preços competitivos. Orçamento gratuito e serviço profissional.",
    keywords: "capoto lisboa, capoto setúbal, capoto preço m², isolamento térmico exterior lisboa, orçamento capoto"
  },
  microcimento: {
    title: "Microcimento em Lisboa e Setúbal – Casas de Banho, Cozinhas e Pavimentos | AUREON",
    description: "Microcimento moderno e resistente aplicado em casas de banho, cozinhas e pavimentos. Orçamento gratuito em Lisboa e Setúbal.",
    keywords: "microcimento lisboa, microcimento setúbal, microcimento preço m², microcimento casa de banho, microcimento cozinha"
  },
  remodelacoes: {
    title: "Remodelações de Casas e Apartamentos em Lisboa e Setúbal | AUREON",
    description: "Remodelações completas em Lisboa e Setúbal: casas de banho, cozinhas, apartamentos e moradias. Orçamento gratuito.",
    keywords: "remodelação casa de banho lisboa, remodelação apartamento setúbal, remodelar cozinha preço, obras gerais lisboa"
  },
  portfolio: {
    title: "Trabalhos Realizados – Capoto, Microcimento e Remodelações | AUREON",
    description: "Veja os nossos projetos de capoto, microcimento e remodelações em Lisboa e Setúbal. Inspiração e confiança para o seu projeto.",
    keywords: "capoto lisboa, microcimento setúbal, remodelações lisboa"
  },
  precos: {
    title: "Preços de Capoto, Microcimento e Remodelações em Lisboa e Setúbal | AUREON",
    description: "Consulte preços médios de capoto, microcimento e remodelações em Lisboa e Setúbal. Orçamento gratuito.",
    keywords: "capoto preço m², microcimento preço m², remodelação casa de banho Lisboa"
  },
  calculadora: {
    title: "Calculadora de Orçamento – Capoto, Microcimento e Remodelações | AUREON",
    description: "Estime rapidamente o custo do seu projeto em Lisboa ou Setúbal. Orçamento personalizado e gratuito.",
    keywords: "calculadora capoto, calculadora microcimento, orçamento remodelações Lisboa"
  },
  blog: {
    title: "Blog – Capoto, Microcimento e Remodelações | AUREON",
    description: "Dicas, preços e informações sobre capoto, microcimento e remodelações em Lisboa e Setúbal.",
    keywords: "preço capoto Lisboa, microcimento casa de banho, remodelação apartamento Setúbal"
  },
  contacto: {
    title: "Contacte-nos – Orçamento Grátis | AUREON",
    description: "Entre em contacto com os nossos especialistas em capoto, microcimento e remodelações em Lisboa e Setúbal. Atendimento rápido pelo WhatsApp.",
    keywords: "contacto capoto Lisboa, microcimento Setúbal, orçamento remodelação"
  },
  zonas: {
    title: "Serviços em Lisboa, Setúbal e arredores | AUREON",
    description: "Capoto, microcimento e remodelações em Lisboa, Setúbal, Almada, Seixal, Barreiro e Montijo. Orçamento gratuito.",
    keywords: "capoto Lisboa, microcimento Setúbal, remodelações Almada"
  }
};

// Dynamic SEO Component
const updatePageSEO = (page) => {
  const meta = SEO_META[page] || SEO_META.home;
  document.title = meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', meta.description);
  }
};

// Navbar Component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", icon: Home },
    { id: "capoto", label: "Capoto", icon: ThermometerSun },
    { id: "microcimento", label: "Microcimento", icon: Paintbrush },
    { id: "remodelacoes", label: "Remodelações", icon: Hammer },
    { id: "portfolio", label: "Portfólio", icon: Image },
    { id: "precos", label: "Preços", icon: Euro },
    { id: "calculadora", label: "Orçamento", icon: Calculator },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "zonas", label: "Zonas", icon: MapPin },
    { id: "contacto", label: "Contacto", icon: MessageCircle }
  ];

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentPage !== 'home' ? 'bg-[#1A1A1A] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}
            data-testid="logo"
            className="flex items-center"
          >
            <span className="text-2xl font-extrabold tracking-tight text-white">
              AUREON
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); window.scrollTo(0,0); }}
                data-testid={`nav-${link.id}`}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap ${
                  currentPage === link.id 
                    ? 'text-[#C8553D]' 
                    : 'text-white/80 hover:text-[#C8553D]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1A1A1A] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); setMobileMenuOpen(false); window.scrollTo(0,0); }}
                className={`block w-full text-left py-3 px-4 text-sm font-medium uppercase tracking-wider transition-colors ${
                  currentPage === link.id 
                    ? 'text-[#C8553D] bg-white/5' 
                    : 'text-white/80 hover:text-[#C8553D]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 text-sm font-bold mt-4"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ==================== HOME PAGE ====================
const HomePage = ({ setCurrentPage }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
            alt="Capoto ETICS em Lisboa e Setúbal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <p className="text-[#C8553D] uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Lisboa • Setúbal • Almada • Seixal • Barreiro
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Construção, Reabilitação, Capoto e Microcimento
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Especialistas em construção civil, reabilitação de edifícios, isolamento térmico (ETICS) e microcimento. 
              Trabalhamos em Lisboa, Setúbal, Almada, Seixal, Barreiro, Montijo e arredores.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                <span>Orçamento gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                <span>Profissionais experientes</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                <span>Garantia de qualidade</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage('calculadora')}
                className="bg-[#C8553D] text-white px-8 py-4 font-bold text-lg hover:bg-[#A04430] transition-colors flex items-center justify-center gap-2"
              >
                Pedir Orçamento
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://wa.me/message/IX2WE2EQUCMMP1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 font-bold text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
              <button
                onClick={() => setCurrentPage('portfolio')}
                className="border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors"
              >
                Ver Trabalhos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-[#8C8C8C] text-lg max-w-2xl mx-auto">
              Soluções completas para melhorar a sua casa ou edifício
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Construção */}
            <div 
              onClick={() => setCurrentPage('calculadora')}
              className="group cursor-pointer bg-[#F9F8F6] p-6 hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[#C8553D]"
            >
              <Building2 className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Construção</h3>
              <p className="text-[#8C8C8C] text-sm mb-3">
                Construção de moradias, apartamentos e edifícios. Projetos chave na mão.
              </p>
              <p className="text-[#C8553D] font-bold mb-3">430€ a 1800€/m²</p>
              <span className="text-[#1A1A1A] font-semibold text-sm flex items-center gap-2 group-hover:text-[#C8553D]">
                Saber mais <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Reabilitação */}
            <div 
              onClick={() => setCurrentPage('remodelacoes')}
              className="group cursor-pointer bg-[#F9F8F6] p-6 hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[#C8553D]"
            >
              <Hammer className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Reabilitação</h3>
              <p className="text-[#8C8C8C] text-sm mb-3">
                Reabilitação de edifícios, remodelações de casas de banho e cozinhas.
              </p>
              <p className="text-[#C8553D] font-bold mb-3">WC: 3000€ a 9000€</p>
              <span className="text-[#1A1A1A] font-semibold text-sm flex items-center gap-2 group-hover:text-[#C8553D]">
                Saber mais <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Capoto */}
            <div 
              onClick={() => setCurrentPage('capoto')}
              className="group cursor-pointer bg-[#F9F8F6] p-6 hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[#C8553D]"
            >
              <ThermometerSun className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Capoto (ETICS)</h3>
              <p className="text-[#8C8C8C] text-sm mb-3">
                Isolamento térmico pelo exterior. Reduz consumo energético até 40%.
              </p>
              <p className="text-[#C8553D] font-bold mb-3">50€ a 90€/m²</p>
              <span className="text-[#1A1A1A] font-semibold text-sm flex items-center gap-2 group-hover:text-[#C8553D]">
                Saber mais <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Microcimento */}
            <div 
              onClick={() => setCurrentPage('microcimento')}
              className="group cursor-pointer bg-[#F9F8F6] p-6 hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[#C8553D]"
            >
              <Paintbrush className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Microcimento</h3>
              <p className="text-[#8C8C8C] text-sm mb-3">
                Revestimento moderno sem juntas para casas de banho e pavimentos.
              </p>
              <p className="text-[#C8553D] font-bold mb-3">60€ a 130€/m²</p>
              <span className="text-[#1A1A1A] font-semibold text-sm flex items-center gap-2 group-hover:text-[#C8553D]">
                Saber mais <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Porquê Escolher a AUREON?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Experiência", desc: "Mais de 15 anos no mercado" },
              { icon: Shield, title: "Garantia", desc: "Garantia de qualidade em todos os trabalhos" },
              { icon: Users, title: "Equipa", desc: "Profissionais certificados e experientes" },
              { icon: Zap, title: "Rapidez", desc: "Cumprimos prazos e orçamentos" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#C8553D] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-20 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              Zonas de Atuação
            </h2>
            <p className="text-[#8C8C8C] text-lg">
              Prestamos serviços em toda a área metropolitana de Lisboa e Setúbal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Lisboa", "Setúbal", "Almada", "Seixal", "Barreiro", "Montijo", "Palmela", "Sesimbra", "Amadora", "Sintra", "Cascais", "Oeiras"].map((zona) => (
              <div key={zona} className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <MapPin className="w-6 h-6 text-[#C8553D] mx-auto mb-2" />
                <p className="font-semibold text-[#1A1A1A]">{zona}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C8553D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Pronto para Transformar a Sua Casa?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Peça já o seu orçamento gratuito e sem compromisso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-white text-[#C8553D] px-8 py-4 font-bold text-lg hover:bg-[#F9F8F6] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// ==================== CAPOTO PAGE ====================
const CapotoPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C8553D] uppercase tracking-wider text-sm font-semibold mb-4">
                Isolamento Térmico Exterior
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Capoto em Lisboa e Setúbal
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Preço por m² e Orçamento Gratuito
              </p>
              <p className="text-white/60 mb-8">
                O sistema capoto (ETICS) é a solução ideal para melhorar o conforto térmico da sua casa, 
                reduzir custos de energia e valorizar o seu imóvel.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('calculadora')}
                  className="bg-[#C8553D] text-white px-6 py-3 font-bold hover:bg-[#A04430] transition-colors"
                >
                  Pedir Orçamento Gratuito
                </button>
                <a
                  href="https://wa.me/message/IX2WE2EQUCMMP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 font-bold hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
                alt="Capoto ETICS Lisboa Setúbal"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O que é capoto */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-6">O que é Capoto?</h2>
              <p className="text-[#8C8C8C] text-lg mb-6">
                O sistema capoto (ETICS - External Thermal Insulation Composite System) é um isolamento térmico 
                aplicado pelo exterior das fachadas. Consiste em placas de isolamento (EPS, XPS ou lã mineral) 
                coladas e fixadas mecanicamente à parede, revestidas com argamassa armada e acabamento final.
              </p>
              <p className="text-[#8C8C8C] text-lg">
                Esta solução melhora significativamente o conforto da casa, elimina pontes térmicas 
                e reduz o consumo de energia em climatização.
              </p>
            </div>
            <div className="bg-[#F9F8F6] p-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Vantagens do Capoto</h3>
              <ul className="space-y-4">
                {[
                  "Isolamento térmico superior",
                  "Redução de 30-40% no consumo de energia",
                  "Eliminação de pontes térmicas",
                  "Redução de humidade e condensações",
                  "Melhoria do conforto acústico",
                  "Valorização do imóvel até 25%",
                  "Proteção estrutural da fachada",
                  "Garantia de 10 anos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A1A1A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preço */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-4">Preço do Capoto por m²</h2>
            <p className="text-[#8C8C8C] text-lg max-w-2xl mx-auto">
              O preço do capoto em Portugal varia normalmente entre 50€ e 90€ por m², 
              dependendo da espessura do isolamento e da complexidade da obra.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 text-center">
              <p className="text-sm text-[#8C8C8C] uppercase tracking-wider mb-2">Económico</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] mb-2">50€ - 65€</p>
              <p className="text-[#8C8C8C]">por m²</p>
              <p className="text-sm text-[#8C8C8C] mt-4">EPS 4-6cm, acabamento acrílico</p>
            </div>
            <div className="bg-[#C8553D] p-8 text-center">
              <p className="text-sm text-white/80 uppercase tracking-wider mb-2">Recomendado</p>
              <p className="text-4xl font-extrabold text-white mb-2">65€ - 80€</p>
              <p className="text-white/80">por m²</p>
              <p className="text-sm text-white/80 mt-4">EPS 8-10cm, acabamento silicone</p>
            </div>
            <div className="bg-white p-8 text-center">
              <p className="text-sm text-[#8C8C8C] uppercase tracking-wider mb-2">Premium</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] mb-2">80€ - 90€</p>
              <p className="text-[#8C8C8C]">por m²</p>
              <p className="text-sm text-[#8C8C8C] mt-4">XPS ou Lã mineral, acabamento mineral</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Calcular Orçamento
            </button>
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-8 text-center">
            Capoto - Zonas de Atuação
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Capoto em Lisboa", "Capoto em Setúbal", "Capoto em Almada",
              "Capoto no Seixal", "Capoto no Barreiro", "Capoto no Montijo",
              "Capoto em Palmela", "Capoto em Sesimbra", "Capoto na Amadora",
              "Capoto em Sintra", "Capoto em Cascais", "Capoto em Oeiras"
            ].map((zona) => (
              <div key={zona} className="bg-[#F9F8F6] p-4 text-center hover:bg-[#C8553D] hover:text-white transition-colors cursor-pointer">
                <p className="font-semibold text-sm">{zona}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Quer Aplicar Capoto na Sua Casa?
          </h2>
          <p className="text-white/70 mb-8">
            Peça já o seu orçamento gratuito e sem compromisso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== MICROCIMENTO PAGE ====================
const MicrocimentoPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C8553D] uppercase tracking-wider text-sm font-semibold mb-4">
                Revestimento Decorativo
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Microcimento em Lisboa e Setúbal
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Casas de Banho, Cozinhas e Pavimentos
              </p>
              <p className="text-white/60 mb-8">
                O microcimento é um revestimento decorativo moderno, sem juntas, 
                ideal para criar ambientes contemporâneos e elegantes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('calculadora')}
                  className="bg-[#C8553D] text-white px-6 py-3 font-bold hover:bg-[#A04430] transition-colors"
                >
                  Pedir Orçamento
                </button>
                <a
                  href="https://wa.me/message/IX2WE2EQUCMMP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 font-bold hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
                alt="Microcimento casa de banho Lisboa"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-6">O que é Microcimento?</h2>
              <p className="text-[#8C8C8C] text-lg mb-6">
                O microcimento é um revestimento decorativo de alta performance composto por cimento, 
                resinas, aditivos e pigmentos. Pode ser aplicado sobre qualquer superfície existente 
                (azulejos, betão, cerâmica) criando um acabamento contínuo sem juntas.
              </p>
              <p className="text-[#8C8C8C] text-lg">
                É ideal para renovações porque não requer demolição do revestimento existente, 
                reduzindo tempo e custos de obra.
              </p>
            </div>
            <div className="bg-[#F9F8F6] p-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Onde Aplicar</h3>
              <ul className="space-y-4">
                {[
                  "Casas de banho (paredes e pavimento)",
                  "Cozinhas e bancadas",
                  "Pavimentos interiores",
                  "Escadas",
                  "Paredes decorativas",
                  "Móveis e tampos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A1A1A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-12 text-center">
            Vantagens do Microcimento
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "Sem Juntas", desc: "Superfície contínua e uniforme" },
              { icon: Droplets, title: "Impermeável", desc: "Resistente à água após selagem" },
              { icon: Shield, title: "Durável", desc: "Alta resistência ao desgaste" },
              { icon: Paintbrush, title: "Moderno", desc: "+50 cores disponíveis" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 text-center">
                <item.icon className="w-10 h-10 text-[#C8553D] mx-auto mb-4" />
                <h3 className="font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8C8C8C]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-4">Preço do Microcimento por m²</h2>
            <p className="text-[#8C8C8C] text-lg">
              O preço varia entre 80€ e 150€ por m², dependendo do tipo de acabamento e aplicação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F9F8F6] p-8 text-center">
              <p className="text-sm text-[#8C8C8C] uppercase mb-2">Pavimentos</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] mb-2">80€ - 120€</p>
              <p className="text-[#8C8C8C]">por m²</p>
            </div>
            <div className="bg-[#C8553D] p-8 text-center">
              <p className="text-sm text-white/80 uppercase mb-2">Casa de Banho</p>
              <p className="text-4xl font-extrabold text-white mb-2">100€ - 150€</p>
              <p className="text-white/80">por m²</p>
            </div>
            <div className="bg-[#F9F8F6] p-8 text-center">
              <p className="text-sm text-[#8C8C8C] uppercase mb-2">Bancadas</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] mb-2">120€ - 150€</p>
              <p className="text-[#8C8C8C]">por m²</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Calcular Orçamento
            </button>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-8 text-center">
            Trabalhos em Microcimento
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
              alt="Microcimento casa de banho"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
              alt="Microcimento moderno"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/98j577ho_IMG_8821.jpeg"
              alt="Casa de banho remodelada"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Quer Aplicar Microcimento?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== REMODELAÇÕES PAGE ====================
const RemodelacoesPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C8553D] uppercase tracking-wider text-sm font-semibold mb-4">
                Renovação Completa
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Remodelações em Lisboa e Setúbal
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Casas de Banho, Cozinhas e Apartamentos
              </p>
              <p className="text-white/60 mb-8">
                Transformamos o seu espaço com remodelações de qualidade. 
                Desde pequenas renovações a obras completas.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('calculadora')}
                  className="bg-[#C8553D] text-white px-6 py-3 font-bold hover:bg-[#A04430] transition-colors"
                >
                  Pedir Orçamento
                </button>
                <a
                  href="https://wa.me/message/IX2WE2EQUCMMP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 font-bold hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
                alt="Remodelação casa de banho Lisboa"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-12 text-center">
            Serviços de Remodelação
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Casa de Banho",
                price: "3.000€ - 9.000€",
                items: ["Substituição de louças", "Novos revestimentos", "Canalização", "Iluminação"]
              },
              {
                title: "Cozinha",
                price: "5.000€ - 15.000€",
                items: ["Móveis por medida", "Bancadas", "Eletrodomésticos", "Revestimentos"]
              },
              {
                title: "Apartamento Completo",
                price: "Sob orçamento",
                items: ["Pavimentos", "Paredes", "Canalização", "Eletricidade"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-[#F9F8F6] p-8">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{service.title}</h3>
                <p className="text-[#C8553D] font-bold mb-4">{service.price}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#8C8C8C]">
                      <Check className="w-4 h-4 text-[#25D366]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-8 text-center">
            Trabalhos Realizados
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
              alt="Casa de banho remodelada"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/98j577ho_IMG_8821.jpeg"
              alt="Remodelação moderna"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
              alt="Acabamento em microcimento"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Pronto para Remodelar?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== PORTFOLIO PAGE ====================
const PortfolioPage = ({ setCurrentPage }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await axios.post(`${API}/seed-portfolio`);
        const response = await axios.get(`${API}/portfolio`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Trabalhos Realizados
          </h1>
          <p className="text-xl text-white/70">
            Veja alguns dos nossos projetos em Capoto, Microcimento e Remodelações
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#F9F8F6] overflow-hidden group">
                <div className="overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#C8553D] uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mt-2 mb-2">{project.title}</h3>
                  <p className="text-[#8C8C8C] text-sm mb-4">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm text-[#8C8C8C]">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#C8553D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Quer um Resultado Como Estes?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-white text-[#C8553D] px-8 py-4 font-bold hover:bg-[#F9F8F6] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== PREÇOS PAGE ====================
const PrecosPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Preços e Tabelas
          </h1>
          <p className="text-xl text-white/70">
            Valores de referência para os nossos serviços em Portugal
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Capoto */}
            <div className="bg-[#F9F8F6] p-8">
              <ThermometerSun className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Capoto</h3>
              <p className="text-3xl font-extrabold text-[#C8553D] mb-2">50€ - 90€</p>
              <p className="text-[#8C8C8C] text-sm">por m²</p>
              <p className="text-[#8C8C8C] text-xs mt-4">
                Varia conforme espessura do isolamento e tipo de acabamento
              </p>
            </div>

            {/* Microcimento */}
            <div className="bg-[#F9F8F6] p-8">
              <Paintbrush className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Microcimento</h3>
              <p className="text-3xl font-extrabold text-[#C8553D] mb-2">80€ - 150€</p>
              <p className="text-[#8C8C8C] text-sm">por m²</p>
              <p className="text-[#8C8C8C] text-xs mt-4">
                Depende do tipo de aplicação e acabamento
              </p>
            </div>

            {/* Remodelação WC */}
            <div className="bg-[#F9F8F6] p-8">
              <Droplets className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Remodelação WC</h3>
              <p className="text-3xl font-extrabold text-[#C8553D] mb-2">3.000€ - 9.000€</p>
              <p className="text-[#8C8C8C] text-sm">completo</p>
              <p className="text-[#8C8C8C] text-xs mt-4">
                Inclui materiais, mão de obra e acabamentos
              </p>
            </div>

            {/* Pintura */}
            <div className="bg-[#F9F8F6] p-8">
              <Sparkles className="w-10 h-10 text-[#C8553D] mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Pintura</h3>
              <p className="text-3xl font-extrabold text-[#C8553D] mb-2">7€ - 16€</p>
              <p className="text-[#8C8C8C] text-sm">por m²</p>
              <p className="text-[#8C8C8C] text-xs mt-4">
                Interior 7-15€ | Exterior 9-16€
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-[#8C8C8C] mb-6">
              Estes valores são indicativos. Para um orçamento preciso, contacte-nos.
            </p>
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-[#C8553D] text-white px-8 py-4 font-bold hover:bg-[#A04430] transition-colors"
            >
              Calcular Orçamento Personalizado
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== CALCULADORA PAGE ====================
const CalculadoraPage = () => {
  const [formData, setFormData] = useState({
    tipoObra: '',
    area: '',
    localizacao: '',
    telefone: '',
    nome: '',
    email: ''
  });
  const [estimate, setEstimate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const precos = {
    capoto: { min: 50, max: 90 },
    microcimento: { min: 80, max: 150 },
    pintura_interior: { min: 7, max: 15 },
    pintura_exterior: { min: 9, max: 16 },
    limpeza_telhado: { min: 5, max: 12 },
    remodelacao_wc: { min: 3000, max: 9000, fixed: true }
  };

  const calcular = () => {
    if (!formData.tipoObra || !formData.area) {
      toast.error('Preencha o tipo de obra e a área');
      return;
    }

    const area = parseFloat(formData.area);
    const preco = precos[formData.tipoObra];
    
    let min, max;
    if (preco.fixed) {
      min = preco.min;
      max = preco.max;
    } else {
      min = preco.min * area;
      max = preco.max * area;
    }

    setEstimate({ min: Math.round(min), max: Math.round(max) });
  };

  const enviarPedido = async () => {
    if (!formData.telefone || !formData.nome) {
      toast.error('Preencha o nome e telefone');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: formData.nome,
        email: formData.email || 'nao@informado.pt',
        phone: formData.telefone,
        service_type: formData.tipoObra,
        message: `Orçamento via calculadora - ${formData.area}m² em ${formData.localizacao}. Estimativa: €${estimate?.min} - €${estimate?.max}`
      });
      toast.success('Pedido enviado! Entraremos em contacto brevemente.');
      setFormData({ tipoObra: '', area: '', localizacao: '', telefone: '', nome: '', email: '' });
      setEstimate(null);
    } catch (error) {
      toast.error('Erro ao enviar. Tente via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Calculadora de Orçamento
          </h1>
          <p className="text-xl text-white/70">
            Obtenha uma estimativa instantânea para o seu projeto
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white p-8 shadow-lg">
            {!estimate ? (
              <>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Calcular Estimativa</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Tipo de Obra *
                    </label>
                    <select
                      value={formData.tipoObra}
                      onChange={(e) => setFormData({...formData, tipoObra: e.target.value})}
                      className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                    >
                      <option value="">Selecione...</option>
                      <option value="capoto">Capoto / ETICS</option>
                      <option value="microcimento">Microcimento</option>
                      <option value="pintura_interior">Pintura Interior</option>
                      <option value="pintura_exterior">Pintura Exterior</option>
                      <option value="limpeza_telhado">Limpeza de Telhado</option>
                      <option value="remodelacao_wc">Remodelação Casa de Banho</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Área em m² *
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      placeholder="Ex: 100"
                      className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Localização
                    </label>
                    <select
                      value={formData.localizacao}
                      onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                      className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                    >
                      <option value="">Selecione...</option>
                      <option value="lisboa">Lisboa</option>
                      <option value="setubal">Setúbal</option>
                      <option value="almada">Almada</option>
                      <option value="seixal">Seixal</option>
                      <option value="barreiro">Barreiro</option>
                      <option value="montijo">Montijo</option>
                      <option value="outro">Outra</option>
                    </select>
                  </div>

                  <button
                    onClick={calcular}
                    className="w-full bg-[#C8553D] text-white py-4 font-bold hover:bg-[#A04430] transition-colors"
                  >
                    Calcular Estimativa
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Estimativa de Preço</h2>
                  <p className="text-5xl font-extrabold text-[#C8553D] mb-2">
                    €{estimate.min.toLocaleString('pt-PT')} - €{estimate.max.toLocaleString('pt-PT')}
                  </p>
                  <p className="text-[#8C8C8C]">*Valores indicativos, sujeitos a vistoria</p>
                </div>

                <div className="border-t border-[#E5E0D8] pt-6 space-y-4">
                  <p className="font-semibold text-[#1A1A1A]">Quer receber um orçamento detalhado?</p>
                  
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Nome *"
                    className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                  />
                  
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    placeholder="Telefone *"
                    className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                  />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email (opcional)"
                    className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none"
                  />

                  <button
                    onClick={enviarPedido}
                    disabled={isSubmitting}
                    className="w-full bg-[#C8553D] text-white py-4 font-bold hover:bg-[#A04430] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'A enviar...' : 'Enviar Pedido de Orçamento'}
                  </button>

                  <a
                    href="https://wa.me/message/IX2WE2EQUCMMP1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] text-white py-4 font-bold text-center hover:bg-[#128C7E] transition-colors"
                  >
                    Ou Falar no WhatsApp
                  </a>

                  <button
                    onClick={() => setEstimate(null)}
                    className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-4 font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Nova Simulação
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== BLOG PAGE - 20 ARTIGOS SEO ====================
const BlogPage = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  const articles = [
    {
      id: 1,
      title: "Quanto custa o capoto por m² em Lisboa e Setúbal",
      excerpt: "Descubra os preços médios do capoto (ETICS) em Lisboa e Setúbal e peça o seu orçamento gratuito.",
      category: "Capoto",
      keywords: "capoto Lisboa, capoto Setúbal, preço capoto m²",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 2,
      title: "Microcimento ou azulejo: qual escolher para casa de banho",
      excerpt: "Saiba qual é a melhor opção para paredes e pavimentos: microcimento ou azulejo em Lisboa e Setúbal.",
      category: "Microcimento",
      keywords: "microcimento Lisboa, microcimento casa de banho, azulejo Lisboa",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 3,
      title: "Remodelação de casas de banho em Lisboa e Setúbal",
      excerpt: "Inspire-se com ideias e preços de remodelações de casas de banho. Orçamento gratuito.",
      category: "Remodelações",
      keywords: "remodelação casa de banho Lisboa, remodelação casa de banho Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
    },
    {
      id: 4,
      title: "Vantagens do capoto para isolamento térmico",
      excerpt: "Conheça como o capoto (ETICS) aumenta o conforto e reduz energia em moradias e apartamentos.",
      category: "Capoto",
      keywords: "capoto Lisboa, isolamento térmico exterior, capoto Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 5,
      title: "Microcimento em pavimentos: moderno e resistente",
      excerpt: "Descubra como aplicar microcimento em pavimentos de casas e apartamentos em Lisboa e Setúbal.",
      category: "Microcimento",
      keywords: "microcimento pavimento Lisboa, microcimento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 6,
      title: "Como remodelar a sua cozinha gastando menos",
      excerpt: "Dicas práticas para remodelar a cozinha em Lisboa e Setúbal sem gastar muito.",
      category: "Remodelações",
      keywords: "remodelação cozinha Lisboa, remodelação cozinha Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/98j577ho_IMG_8821.jpeg"
    },
    {
      id: 7,
      title: "Antes e depois: capoto aplicado em moradias",
      excerpt: "Veja exemplos reais de aplicação de capoto em moradias de Lisboa e Setúbal.",
      category: "Capoto",
      keywords: "capoto moradia Lisboa, capoto Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 8,
      title: "Microcimento em escadas: aplicação e vantagens",
      excerpt: "Saiba como aplicar microcimento em escadas e quais os benefícios em Lisboa e Setúbal.",
      category: "Microcimento",
      keywords: "microcimento escadas Lisboa, microcimento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 9,
      title: "Remodelação completa de apartamentos",
      excerpt: "Tudo o que precisa saber para remodelar apartamentos em Lisboa e Setúbal.",
      category: "Remodelações",
      keywords: "remodelação apartamento Lisboa, remodelação apartamento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
    },
    {
      id: 10,
      title: "Como escolher empresa de capoto confiável",
      excerpt: "Dicas para escolher a melhor empresa de capoto em Lisboa e Setúbal.",
      category: "Capoto",
      keywords: "empresa capoto Lisboa, empresa capoto Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 11,
      title: "Preço do microcimento por m² em Lisboa e Setúbal",
      excerpt: "Descubra o preço médio do microcimento em casas de banho, cozinhas e pavimentos.",
      category: "Microcimento",
      keywords: "microcimento preço m² Lisboa, microcimento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 12,
      title: "Reformas rápidas: microcimento em paredes",
      excerpt: "Saiba como reformar paredes com microcimento em Lisboa e Setúbal de forma prática.",
      category: "Microcimento",
      keywords: "microcimento paredes Lisboa, microcimento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 13,
      title: "Orçamento de remodelações: como calcular",
      excerpt: "Aprenda a calcular o orçamento de remodelações em Lisboa e Setúbal.",
      category: "Remodelações",
      keywords: "orçamento remodelação Lisboa, orçamento remodelação Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/98j577ho_IMG_8821.jpeg"
    },
    {
      id: 14,
      title: "Capoto em apartamentos antigos",
      excerpt: "Veja como o capoto pode melhorar apartamentos antigos em Lisboa e Setúbal.",
      category: "Capoto",
      keywords: "capoto apartamento Lisboa, capoto Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 15,
      title: "Microcimento moderno para cozinhas e casas de banho",
      excerpt: "Transforme ambientes com microcimento em Lisboa e Setúbal.",
      category: "Microcimento",
      keywords: "microcimento Lisboa, microcimento cozinha Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 16,
      title: "Remodelação de apartamentos pequenos",
      excerpt: "Dicas de remodelações eficientes para apartamentos pequenos em Lisboa e Setúbal.",
      category: "Remodelações",
      keywords: "remodelação apartamento Lisboa, remodelação apartamento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
    },
    {
      id: 17,
      title: "Benefícios do isolamento térmico com capoto",
      excerpt: "Entenda os benefícios do capoto na redução de energia e conforto em Lisboa e Setúbal.",
      category: "Capoto",
      keywords: "isolamento térmico exterior Lisboa, capoto Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
    },
    {
      id: 18,
      title: "Microcimento: tendências de decoração 2026",
      excerpt: "Descubra as tendências de microcimento em 2026 para casas em Lisboa e Setúbal.",
      category: "Microcimento",
      keywords: "microcimento moderno Lisboa, microcimento Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/hkb87782_IMG_3102.jpeg"
    },
    {
      id: 19,
      title: "Como preparar a casa para remodelação",
      excerpt: "Guia passo a passo para preparar a sua casa antes da remodelação em Lisboa e Setúbal.",
      category: "Remodelações",
      keywords: "remodelação Lisboa, remodelação Setúbal",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/98j577ho_IMG_8821.jpeg"
    },
    {
      id: 20,
      title: "Trabalhos de capoto, microcimento e remodelações concluídos",
      excerpt: "Inspiração de projetos concluídos para gerar ideias em Lisboa e Setúbal.",
      category: "Portfólio",
      keywords: "capoto Lisboa, microcimento Setúbal, remodelação Lisboa",
      image: "https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/x7j3tbgy_aa16b504-d5ef-40ae-bb80-558385f10c9b.jpeg"
    }
  ];

  const categories = ['todos', 'Capoto', 'Microcimento', 'Remodelações', 'Portfólio'];
  
  const filteredArticles = selectedCategory === 'todos' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Blog – Capoto, Microcimento e Remodelações
          </h1>
          <p className="text-xl text-white/70">
            Dicas, preços e informações sobre capoto, microcimento e remodelações em Lisboa e Setúbal
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 font-medium text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C8553D] text-white'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#C8553D] hover:text-white'
                }`}
              >
                {cat === 'todos' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-[#F9F8F6] overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="overflow-hidden h-40">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#C8553D] uppercase tracking-wider font-semibold">
                    {article.category}
                  </span>
                  <h2 className="text-lg font-bold text-[#1A1A1A] mt-2 mb-2 group-hover:text-[#C8553D] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-[#8C8C8C] text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#C8553D] text-sm font-semibold">
                    Ler mais <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#C8553D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Precisa de Ajuda com o Seu Projeto?
          </h2>
          <p className="text-white/80 mb-8">
            Peça o seu orçamento gratuito agora
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-white text-[#C8553D] px-8 py-4 font-bold hover:bg-[#F9F8F6] transition-colors"
            >
              Peça Orçamento
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== CONTACTO PAGE ====================
const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service_type: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar. Tente via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Contacto
          </h1>
          <p className="text-xl text-white/70">
            Fale connosco para pedir um orçamento gratuito
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">Informações de Contacto</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Telefone</p>
                    <p className="text-[#8C8C8C]">+351 926 378 947</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">WhatsApp</p>
                    <a href="https://wa.me/message/IX2WE2EQUCMMP1" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                      Enviar mensagem
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Email</p>
                    <p className="text-[#8C8C8C]">Juseppesena11@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Zona de Atuação</p>
                    <p className="text-[#8C8C8C]">Lisboa, Setúbal, Almada, Seixal, Barreiro, Montijo</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/message/IX2WE2EQUCMMP1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="bg-[#F9F8F6] p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Enviar Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome *"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none bg-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none bg-white"
                  />
                </div>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                  required
                  className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none bg-white"
                >
                  <option value="">Serviço pretendido *</option>
                  <option value="capoto">Capoto / ETICS</option>
                  <option value="microcimento">Microcimento</option>
                  <option value="remodelacao">Remodelação</option>
                  <option value="pintura">Pintura</option>
                  <option value="outro">Outro</option>
                </select>
                <textarea
                  placeholder="Mensagem *"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={4}
                  className="w-full border border-[#E5E0D8] p-4 focus:border-[#C8553D] outline-none bg-white resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C8553D] text-white py-4 font-bold hover:bg-[#A04430] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== FOOTER ====================
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#1A1A1A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4">AUREON</h3>
            <p className="text-white/60 mb-4">
              Especialistas em Capoto, Microcimento e Remodelações em Lisboa e Setúbal.
            </p>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-sm font-bold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-6">Serviços</h4>
            <ul className="space-y-3">
              {[
                { label: 'Capoto / ETICS', page: 'capoto' },
                { label: 'Microcimento', page: 'microcimento' },
                { label: 'Remodelações', page: 'remodelacoes' },
                { label: 'Pintura', page: 'precos' }
              ].map((item) => (
                <li key={item.page}>
                  <button 
                    onClick={() => { setCurrentPage(item.page); window.scrollTo(0,0); }}
                    className="text-white/60 hover:text-[#C8553D] transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Zonas */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-6">Zonas</h4>
            <ul className="space-y-3">
              {['Lisboa', 'Setúbal', 'Almada', 'Seixal', 'Barreiro'].map((zona) => (
                <li key={zona}>
                  <span className="text-white/60 text-sm">{zona}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm">+351 926 378 947</li>
              <li className="text-white/60 text-sm">Juseppesena11@gmail.com</li>
              <li className="text-white/60 text-sm">Seg-Sex: 9h-18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} AUREON. Capoto, Microcimento e Remodelações em Lisboa e Setúbal.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==================== ZONAS PAGE (SEO LOCAL) ====================
const ZonasPage = ({ setCurrentPage }) => {
  const zonas = [
    {
      nome: "Lisboa",
      servicos: ["Capoto em Lisboa", "Microcimento em Lisboa", "Remodelações em Lisboa"],
      descricao: "Prestamos serviços em toda a cidade de Lisboa e arredores. Capoto, microcimento e remodelações com qualidade garantida."
    },
    {
      nome: "Setúbal",
      servicos: ["Capoto em Setúbal", "Microcimento em Setúbal", "Remodelações em Setúbal"],
      descricao: "Cobrimos toda a região de Setúbal. Especialistas em isolamento térmico e acabamentos modernos."
    },
    {
      nome: "Almada",
      servicos: ["Capoto em Almada", "Microcimento em Almada", "Remodelações em Almada"],
      descricao: "Serviços de capoto, microcimento e remodelações na Margem Sul. Orçamento gratuito."
    },
    {
      nome: "Seixal",
      servicos: ["Capoto no Seixal", "Microcimento no Seixal", "Remodelações no Seixal"],
      descricao: "Atendemos todo o concelho do Seixal com serviços de qualidade em capoto e remodelações."
    },
    {
      nome: "Barreiro",
      servicos: ["Capoto no Barreiro", "Microcimento no Barreiro", "Remodelações no Barreiro"],
      descricao: "Capoto, microcimento e remodelações completas no Barreiro e arredores."
    },
    {
      nome: "Montijo",
      servicos: ["Capoto no Montijo", "Microcimento no Montijo", "Remodelações no Montijo"],
      descricao: "Serviços profissionais de isolamento térmico e remodelações no Montijo."
    },
    {
      nome: "Palmela",
      servicos: ["Capoto em Palmela", "Microcimento em Palmela", "Remodelações em Palmela"],
      descricao: "Cobrimos todo o concelho de Palmela com serviços de capoto e remodelações."
    },
    {
      nome: "Sesimbra",
      servicos: ["Capoto em Sesimbra", "Microcimento em Sesimbra", "Remodelações em Sesimbra"],
      descricao: "Serviços de capoto e microcimento na região de Sesimbra."
    },
    {
      nome: "Amadora",
      servicos: ["Capoto na Amadora", "Microcimento na Amadora", "Remodelações na Amadora"],
      descricao: "Atendemos toda a Amadora com serviços de isolamento térmico e remodelações."
    },
    {
      nome: "Sintra",
      servicos: ["Capoto em Sintra", "Microcimento em Sintra", "Remodelações em Sintra"],
      descricao: "Capoto, microcimento e remodelações em todo o concelho de Sintra."
    },
    {
      nome: "Cascais",
      servicos: ["Capoto em Cascais", "Microcimento em Cascais", "Remodelações em Cascais"],
      descricao: "Serviços premium de capoto e remodelações na linha de Cascais."
    },
    {
      nome: "Oeiras",
      servicos: ["Capoto em Oeiras", "Microcimento em Oeiras", "Remodelações em Oeiras"],
      descricao: "Atendemos todo o concelho de Oeiras com qualidade garantida."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Zonas de Atuação
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Prestamos serviços de capoto, microcimento e remodelações em Lisboa, Setúbal e toda a área metropolitana. 
            Orçamento gratuito em todas as zonas.
          </p>
        </div>
      </section>

      {/* Zonas Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zonas.map((zona) => (
              <div key={zona.nome} className="bg-[#F9F8F6] p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#C8553D] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">{zona.nome}</h2>
                </div>
                <p className="text-[#8C8C8C] text-sm mb-4">{zona.descricao}</p>
                <ul className="space-y-2 mb-4">
                  {zona.servicos.map((servico) => (
                    <li key={servico} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                      <span className="text-[#1A1A1A]">{servico}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentPage('calculadora')}
                  className="text-[#C8553D] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Pedir orçamento <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keywords Section for SEO */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">
            Pesquisas Populares na Nossa Área
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "capoto lisboa", "capoto setubal", "capoto almada", "capoto seixal",
              "microcimento lisboa", "microcimento casa de banho", "microcimento preço m2",
              "remodelação casa banho lisboa", "remodelação apartamento setubal",
              "isolamento termico exterior", "etics portugal", "capoto preço m2",
              "remodelações almada", "remodelações barreiro", "capoto montijo"
            ].map((keyword) => (
              <span 
                key={keyword}
                className="bg-white px-4 py-2 text-sm text-[#8C8C8C] hover:bg-[#C8553D] hover:text-white transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#C8553D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            A Sua Zona Está na Nossa Área de Cobertura?
          </h2>
          <p className="text-white/80 mb-8">
            Contacte-nos para confirmar e pedir um orçamento gratuito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('calculadora')}
              className="bg-white text-[#C8553D] px-8 py-4 font-bold hover:bg-[#F9F8F6] transition-colors"
            >
              Pedir Orçamento Gratuito
            </button>
            <a
              href="https://wa.me/message/IX2WE2EQUCMMP1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== WHATSAPP BUTTON ====================
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/message/IX2WE2EQUCMMP1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

// ==================== MAIN APP ====================
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Update SEO when page changes
  useEffect(() => {
    updatePageSEO(currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'capoto': return <CapotoPage setCurrentPage={setCurrentPage} />;
      case 'microcimento': return <MicrocimentoPage setCurrentPage={setCurrentPage} />;
      case 'remodelacoes': return <RemodelacoesPage setCurrentPage={setCurrentPage} />;
      case 'portfolio': return <PortfolioPage setCurrentPage={setCurrentPage} />;
      case 'precos': return <PrecosPage setCurrentPage={setCurrentPage} />;
      case 'calculadora': return <CalculadoraPage />;
      case 'blog': return <BlogPage setCurrentPage={setCurrentPage} />;
      case 'zonas': return <ZonasPage setCurrentPage={setCurrentPage} />;
      case 'contacto': return <ContactoPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
