import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { 
  Phone, Mail, MapPin, Clock, ChevronDown, X, Menu, 
  Shield, ThermometerSun, Paintbrush, CheckCircle2, 
  Building2, Award, Users, ArrowRight, ExternalLink,
  Calculator, Ruler, Euro, Info
} from "lucide-react";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navbar Component
const Navbar = ({ activeSection }) => {
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
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#contacto", label: "Contacto" }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F9F8F6]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}
            data-testid="logo"
            className="flex items-center"
          >
            <span className={`text-2xl font-extrabold tracking-tight transition-colors ${
              isScrolled ? 'text-[#1A1A1A]' : 'text-white'
            }`}>
              AUREON
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                data-testid={`nav-${link.href.replace('#', '')}`}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-[#C8553D] whitespace-nowrap ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E0D8] shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="block py-2 text-sm font-medium uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8553D]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      data-testid="hero-section"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
          alt="Obra AUREON - Aplicação de Capoto em moradia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <p className="text-[#C8553D] uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-fade-in-up">
            Especialistas em Isolamento
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up delay-100">
            Excelência em
            <br />
            <span className="text-[#E5E0D8]">Capoto</span> e
            <br />
            <span className="text-[#C8553D]">Microcimento</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl animate-fade-in-up delay-200">
            Soluções profissionais de isolamento térmico e acabamentos de alta qualidade para residências e edifícios em Portugal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button
              data-testid="hero-cta-quote"
              onClick={scrollToContact}
              className="btn-accent inline-flex items-center justify-center gap-2"
            >
              Pedir Orçamento
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#servicos"
              onClick={(e) => { e.preventDefault(); document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' }); }}
              data-testid="hero-cta-services"
              className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-[#1A1A1A] inline-flex items-center justify-center gap-2"
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const stats = [
    { icon: Building2, value: "500+", label: "Projetos Concluídos" },
    { icon: Users, value: "15+", label: "Anos de Experiência" },
    { icon: Award, value: "100%", label: "Garantia de Qualidade" }
  ];

  return (
    <section id="sobre" data-testid="about-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="img-hover-zoom">
              <img
                src="https://customer-assets.emergentagent.com/job_38bf4d03-1170-491a-92fb-0378dbac25b3/artifacts/wihtnnfo_IMG_4369.jpeg"
                alt="Obra AUREON - Aplicação de Capoto"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#C8553D] text-white p-8 hidden lg:block">
              <p className="text-4xl font-extrabold">15+</p>
              <p className="text-sm uppercase tracking-wider">Anos de Excelência</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Sobre a AUREON
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-6">
              Compromisso com a Qualidade e Eficiência Energética
            </h2>
            <p className="text-[#8C8C8C] text-lg mb-6 leading-relaxed">
              A AUREON é uma empresa portuguesa especializada em soluções de isolamento térmico (Capoto/ETICS) e acabamentos em microcimento. Com mais de 15 anos de experiência, transformamos espaços com excelência técnica e compromisso com a sustentabilidade.
            </p>
            <p className="text-[#8C8C8C] text-lg mb-8 leading-relaxed">
              Trabalhamos com os melhores materiais do mercado europeu, seguindo rigorosamente as normas técnicas e padrões de qualidade para garantir resultados duradouros e eficiência energética superior.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 border border-[#E5E0D8]">
                  <stat.icon className="w-8 h-8 text-[#C8553D] mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-xs text-[#8C8C8C] uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section (Bento Grid)
const ServicesSection = () => {
  const services = [
    {
      id: "capoto",
      title: "Capoto / ETICS",
      subtitle: "Sistema de Isolamento Térmico pelo Exterior",
      description: "Aplicação profissional do sistema ETICS com placas de EPS, XPS ou lã mineral. Melhore a eficiência energética da sua casa em até 40%.",
      image: "https://images.unsplash.com/photo-1589572394490-771aa22db633?auto=format&fit=crop&w=600&q=80",
      features: ["Isolamento Térmico", "Impermeabilização", "Acabamento Estético"],
      large: true
    },
    {
      id: "microcimento",
      title: "Microcimento",
      subtitle: "Acabamentos Decorativos de Alta Performance",
      description: "Revestimento contínuo para pavimentos, paredes e mobiliário. Estética moderna com alta resistência e fácil manutenção.",
      image: "https://images.unsplash.com/photo-1762803842055-de1e5fb14477?auto=format&fit=crop&w=600&q=80",
      features: ["Pavimentos", "Paredes", "Bancadas"],
      large: true
    },
    {
      id: "reabilitacao",
      title: "Reabilitação de Fachadas",
      subtitle: "Renovação Completa",
      description: "Recuperação e melhoria de fachadas existentes com tratamento de fissuras e patologias.",
      image: "https://images.unsplash.com/photo-1667893185343-9e869ae6e1bd?auto=format&fit=crop&w=400&q=80",
      features: ["Diagnóstico", "Reparação", "Proteção"],
      large: false
    },
    {
      id: "consultoria",
      title: "Consultoria Técnica",
      subtitle: "Apoio Especializado",
      description: "Análise térmica, certificação energética e consultoria para projetos de eficiência energética.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
      features: ["Análise", "Projeto", "Certificação"],
      large: false
    }
  ];

  return (
    <section id="servicos" data-testid="services-section" className="py-24 bg-[#F9F8F6] texture-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Os Nossos Serviços
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
            Soluções Profissionais para o Seu Projeto
          </h2>
          <p className="text-[#8C8C8C] text-lg max-w-2xl mx-auto">
            Oferecemos serviços completos de isolamento térmico e acabamentos decorativos com a mais alta qualidade.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`service-card group cursor-pointer ${
                service.large ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`img-hover-zoom mb-6 ${service.large ? 'h-64' : 'h-40'}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#C8553D] uppercase tracking-wider mb-2">{service.subtitle}</p>
              <h3 className={`font-bold text-[#1A1A1A] mb-3 ${service.large ? 'text-2xl' : 'text-xl'}`}>
                {service.title}
              </h3>
              <p className="text-[#8C8C8C] mb-4 text-sm leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-[#E5E0D8] text-[#1A1A1A]">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Budget Calculator Section
const BudgetCalculator = () => {
  const [serviceType, setServiceType] = useState('');
  const [area, setArea] = useState('');
  const [finishType, setFinishType] = useState('');
  const [complexity, setComplexity] = useState('normal');
  const [includeHidrofugante, setIncludeHidrofugante] = useState(false);
  const [bathroomType, setBathroomType] = useState('');
  const [estimate, setEstimate] = useState(null);

  // Service definitions with pricing
  const services = {
    capoto: {
      name: 'Capoto / ETICS',
      description: 'Isolamento térmico pelo exterior',
      icon: 'thermometer',
      base: { min: 45, max: 65 },
      hasFinishes: true,
      finishes: {
        acrilico: { name: 'Acrílico', min: 0, max: 0 },
        silicone: { name: 'Silicone', min: 8, max: 12 },
        mineral: { name: 'Mineral', min: 5, max: 8 }
      },
      useComplexity: true
    },
    microcimento: {
      name: 'Microcimento',
      description: 'Acabamento decorativo contínuo',
      icon: 'paintbrush',
      base: { min: 55, max: 85 },
      hasFinishes: true,
      finishes: {
        mate: { name: 'Mate', min: 0, max: 0 },
        acetinado: { name: 'Acetinado', min: 5, max: 10 },
        brilhante: { name: 'Brilhante', min: 10, max: 15 }
      },
      useComplexity: true
    },
    pintura_interior: {
      name: 'Pintura Interior',
      description: 'Acabamento profissional com tintas premium',
      icon: 'paint',
      base: { min: 7, max: 15 },
      hasFinishes: false,
      useComplexity: true,
      detailedDescription: 'Acabamento profissional com tintas de qualidade premium. Preparação adequada de superfícies, primário + 2 demãos. Resultado impecável e duradouro.'
    },
    pintura_exterior: {
      name: 'Pintura Exterior',
      description: 'Proteção total contra intempéries',
      icon: 'paint',
      base: { min: 9, max: 16 },
      hasFinishes: false,
      useComplexity: true,
      detailedDescription: 'Proteção completa contra intempéries com tintas de alta performance. Inclui limpeza, reparação de fissuras, primário + 2 demãos. Resistente a UV e humidade.'
    },
    limpeza_telhados: {
      name: 'Limpeza de Telhados',
      description: 'Remoção profunda de musgos e líquenes',
      icon: 'roof',
      base: { min: 5, max: 12 },
      hasFinishes: false,
      hasHidrofugante: true,
      hidrofugantePrice: { min: 5, max: 12 },
      useComplexity: false,
      detailedDescription: 'Limpeza profissional profunda removendo musgos, líquenes e sujidade. Opção de tratamento hidrofugante para proteção prolongada contra infiltrações e degradação.'
    },
    remodelacao_wc: {
      name: 'Remodelação Casa de Banho',
      description: 'Renovação completa ou estética',
      icon: 'bathroom',
      hasSubTypes: true,
      subTypes: {
        completa: {
          name: 'Completa',
          description: 'Inclui substituição de canalização',
          base: { min: 235, max: 375 },
          detailedDescription: 'Renovação total incluindo substituição de canalização (água quente/fria), esgotos, pavimento, paredes, louças sanitárias e acabamentos. Com projeto técnico e garantia de qualidade.'
        },
        estetica: {
          name: 'Estética',
          description: 'Mantém canalização existente',
          base: { min: 165, max: 275 },
          detailedDescription: 'Renovação visual com novo pavimento, revestimento de paredes, louças sanitárias e acabamentos. Mantém canalização existente. Transformação rápida e eficiente.'
        }
      },
      useComplexity: false
    }
  };

  const complexityMultiplier = {
    simples: 0.9,
    normal: 1,
    complexo: 1.2
  };

  const getServiceIcon = (iconType, isSelected) => {
    const className = `w-6 h-6 mb-2 ${isSelected ? 'text-[#C8553D]' : 'text-[#8C8C8C]'}`;
    switch (iconType) {
      case 'thermometer': return <ThermometerSun className={className} />;
      case 'paintbrush': return <Paintbrush className={className} />;
      case 'paint': return <Paintbrush className={className} />;
      case 'roof': return <Building2 className={className} />;
      case 'bathroom': return <Shield className={className} />;
      default: return <CheckCircle2 className={className} />;
    }
  };

  const calculateEstimate = () => {
    const areaNum = parseFloat(area);
    
    if (!serviceType || !area || areaNum <= 0) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const service = services[serviceType];
    let minPrice = 0;
    let maxPrice = 0;
    let serviceName = service.name;

    // Handle bathroom remodeling
    if (service.hasSubTypes) {
      if (!bathroomType) {
        toast.error('Por favor, selecione o tipo de remodelação.');
        return;
      }
      const subType = service.subTypes[bathroomType];
      minPrice = subType.base.min * areaNum;
      maxPrice = subType.base.max * areaNum;
      serviceName = `${service.name} - ${subType.name}`;
    } else {
      // Standard service calculation
      minPrice = service.base.min * areaNum;
      maxPrice = service.base.max * areaNum;

      // Add finish pricing if applicable
      if (service.hasFinishes && finishType) {
        const finish = service.finishes[finishType];
        minPrice += finish.min * areaNum;
        maxPrice += finish.max * areaNum;
      } else if (service.hasFinishes && !finishType) {
        toast.error('Por favor, selecione o tipo de acabamento.');
        return;
      }

      // Add hidrofugante if selected
      if (service.hasHidrofugante && includeHidrofugante) {
        minPrice += service.hidrofugantePrice.min * areaNum;
        maxPrice += service.hidrofugantePrice.max * areaNum;
        serviceName += ' + Hidrofugante';
      }

      // Apply complexity multiplier if applicable
      if (service.useComplexity) {
        const multiplier = complexityMultiplier[complexity];
        minPrice *= multiplier;
        maxPrice *= multiplier;
      }
    }

    setEstimate({
      min: Math.round(minPrice),
      max: Math.round(maxPrice),
      area: areaNum,
      service: serviceName
    });
  };

  const resetCalculator = () => {
    setServiceType('');
    setArea('');
    setFinishType('');
    setComplexity('normal');
    setIncludeHidrofugante(false);
    setBathroomType('');
    setEstimate(null);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedService = serviceType ? services[serviceType] : null;

  return (
    <section id="calculadora" data-testid="calculator-section" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Calculadora de Orçamento
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Obtenha uma Estimativa Instantânea
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Use a nossa calculadora para obter uma estimativa de custos para o seu projeto. 
              Os valores apresentados são indicativos e podem variar conforme as especificidades da obra.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Cálculo Rápido</h4>
                  <p className="text-white/60 text-sm">Resultado em segundos baseado na área e tipo de serviço</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                  <Euro className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Preços Competitivos</h4>
                  <p className="text-white/60 text-sm">Valores atualizados com o mercado português</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C8553D] flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Sem Compromisso</h4>
                  <p className="text-white/60 text-sm">Estimativa gratuita para planear o seu investimento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-white p-8 max-h-[80vh] overflow-y-auto">
            {!estimate ? (
              <>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#C8553D]" />
                  Simular Orçamento
                </h3>

                <div className="space-y-6">
                  {/* Service Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                      Tipo de Serviço
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(services).map(([key, service]) => (
                        <button
                          key={key}
                          type="button"
                          data-testid={`calc-service-${key}`}
                          onClick={() => { 
                            setServiceType(key); 
                            setFinishType(''); 
                            setBathroomType('');
                            setIncludeHidrofugante(false);
                          }}
                          className={`p-3 border-2 text-left transition-all ${
                            serviceType === key 
                              ? 'border-[#C8553D] bg-[#C8553D]/5' 
                              : 'border-[#E5E0D8] hover:border-[#C8553D]/50'
                          }`}
                        >
                          {getServiceIcon(service.icon, serviceType === key)}
                          <p className="font-bold text-[#1A1A1A] text-sm">{service.name}</p>
                          <p className="text-xs text-[#8C8C8C]">{service.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Description */}
                  {selectedService && (selectedService.detailedDescription || selectedService.hasSubTypes) && (
                    <div className="bg-[#F9F8F6] p-4 border-l-4 border-[#C8553D]">
                      <p className="text-sm text-[#8C8C8C]">
                        {selectedService.hasSubTypes 
                          ? 'Selecione o tipo de remodelação abaixo para ver os detalhes.'
                          : selectedService.detailedDescription}
                      </p>
                    </div>
                  )}

                  {/* Bathroom Sub-Types */}
                  {selectedService?.hasSubTypes && (
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                        Tipo de Remodelação
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedService.subTypes).map(([key, subType]) => (
                          <button
                            key={key}
                            type="button"
                            data-testid={`calc-bathroom-${key}`}
                            onClick={() => setBathroomType(key)}
                            className={`p-4 border-2 text-left transition-all ${
                              bathroomType === key 
                                ? 'border-[#C8553D] bg-[#C8553D]/5' 
                                : 'border-[#E5E0D8] hover:border-[#C8553D]/50'
                            }`}
                          >
                            <p className="font-bold text-[#1A1A1A]">{subType.name}</p>
                            <p className="text-xs text-[#8C8C8C] mb-2">{subType.description}</p>
                            <p className="text-sm font-semibold text-[#C8553D]">€{subType.base.min}-{subType.base.max}/m²</p>
                          </button>
                        ))}
                      </div>
                      {bathroomType && (
                        <div className="mt-3 bg-[#F9F8F6] p-3 text-xs text-[#8C8C8C]">
                          {selectedService.subTypes[bathroomType].detailedDescription}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Area Input */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Área Total de Parede/Superfície (m²)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        data-testid="calc-area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Ex: 100"
                        min="1"
                        className="input-underline pl-10"
                      />
                      <Ruler className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C8C8C]" />
                    </div>
                    <p className="text-xs text-[#8C8C8C] mt-1">
                      {serviceType === 'remodelacao_wc' 
                        ? 'Dica: WC de 2m×3m×2.35m altura ≈ 29.5m² de parede'
                        : 'Insira a área total a intervencionar'}
                    </p>
                  </div>

                  {/* Finish Type for Capoto/Microcimento */}
                  {selectedService?.hasFinishes && (
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                        Tipo de Acabamento
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(selectedService.finishes).map(([key, finish]) => (
                          <button
                            key={key}
                            type="button"
                            data-testid={`calc-finish-${key}`}
                            onClick={() => setFinishType(key)}
                            className={`p-3 border text-center text-sm transition-all ${
                              finishType === key 
                                ? 'border-[#C8553D] bg-[#C8553D] text-white' 
                                : 'border-[#E5E0D8] hover:border-[#C8553D]'
                            }`}
                          >
                            {finish.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hidrofugante Option for Roof Cleaning */}
                  {selectedService?.hasHidrofugante && (
                    <div className="bg-[#F9F8F6] p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          data-testid="calc-hidrofugante"
                          checked={includeHidrofugante}
                          onChange={(e) => setIncludeHidrofugante(e.target.checked)}
                          className="mt-1 w-5 h-5 accent-[#C8553D]"
                        />
                        <div>
                          <p className="font-bold text-[#1A1A1A]">Adicionar Hidrofugante</p>
                          <p className="text-xs text-[#8C8C8C]">
                            Tratamento impermeabilizante após limpeza (+€{selectedService.hidrofugantePrice.min}-{selectedService.hidrofugantePrice.max}/m²)
                          </p>
                          <p className="text-xs text-[#C8553D] mt-1">Recomendado para proteção prolongada</p>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Complexity - only for applicable services */}
                  {selectedService?.useComplexity && (
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                        Complexidade do Projeto
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'simples', label: 'Simples', desc: '-10%' },
                          { id: 'normal', label: 'Normal', desc: 'Base' },
                          { id: 'complexo', label: 'Complexo', desc: '+20%' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            data-testid={`calc-complexity-${opt.id}`}
                            onClick={() => setComplexity(opt.id)}
                            className={`p-3 border text-center transition-all ${
                              complexity === opt.id 
                                ? 'border-[#C8553D] bg-[#C8553D] text-white' 
                                : 'border-[#E5E0D8] hover:border-[#C8553D]'
                            }`}
                          >
                            <p className="text-sm font-medium">{opt.label}</p>
                            <p className={`text-xs ${complexity === opt.id ? 'text-white/70' : 'text-[#8C8C8C]'}`}>{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Calculate Button */}
                  <button
                    type="button"
                    data-testid="calc-submit"
                    onClick={calculateEstimate}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Estimativa
                  </button>
                </div>
              </>
            ) : (
              /* Results */
              <div data-testid="calc-result" className="text-center">
                <div className="w-16 h-16 bg-[#C8553D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#C8553D]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Estimativa Calculada</h3>
                <p className="text-[#8C8C8C] mb-6">{estimate.service} • {estimate.area} m²</p>
                
                <div className="bg-[#F9F8F6] p-6 mb-6">
                  <p className="text-sm text-[#8C8C8C] uppercase tracking-wider mb-2">Valor Estimado</p>
                  <p className="text-4xl font-extrabold text-[#1A1A1A]">
                    €{estimate.min.toLocaleString('pt-PT')} - €{estimate.max.toLocaleString('pt-PT')}
                  </p>
                  <p className="text-xs text-[#8C8C8C] mt-2">*Valores indicativos, sujeitos a vistoria técnica</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#E5E0D8]/30 p-4">
                    <p className="text-2xl font-bold text-[#1A1A1A]">€{Math.round(estimate.min / estimate.area)}</p>
                    <p className="text-xs text-[#8C8C8C]">Mín. por m²</p>
                  </div>
                  <div className="bg-[#E5E0D8]/30 p-4">
                    <p className="text-2xl font-bold text-[#1A1A1A]">€{Math.round(estimate.max / estimate.area)}</p>
                    <p className="text-xs text-[#8C8C8C]">Máx. por m²</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    data-testid="calc-contact"
                    onClick={scrollToContact}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    Pedir Orçamento Detalhado
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    data-testid="calc-reset"
                    onClick={resetCalculator}
                    className="btn-secondary w-full"
                  >
                    Nova Simulação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = ({ projects, onProjectClick }) => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" data-testid="portfolio-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Portfólio
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
            Os Nossos Projetos
          </h2>
          <p className="text-[#8C8C8C] text-lg max-w-2xl mx-auto mb-8">
            Conheça alguns dos nossos trabalhos mais recentes em Capoto e Microcimento.
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-4 flex-wrap">
            {['all', 'capoto', 'microcimento'].map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat}`}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm uppercase tracking-wider font-medium transition-all ${
                  filter === cat 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'bg-[#E5E0D8] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat === 'capoto' ? 'Capoto' : 'Microcimento'}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-testid={`portfolio-item-${index}`}
              onClick={() => onProjectClick(project)}
              className={`img-hover-zoom cursor-pointer group relative ${
                index % 4 === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <img
                src={project.image_url}
                alt={project.title}
                className={`w-full object-cover ${index % 4 === 0 ? 'h-[500px]' : 'h-[240px]'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs text-[#C8553D] uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Technical Section (Accordions)
const TechnicalSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const technicalContent = [
    {
      id: "vantagens",
      title: "Vantagens do Sistema ETICS (Capoto)",
      content: [
        "Redução de até 40% nos custos de climatização",
        "Eliminação de pontes térmicas e condensações",
        "Aumento do conforto térmico e acústico",
        "Proteção estrutural contra variações de temperatura",
        "Valorização do imóvel em até 25%",
        "Contribuição para a sustentabilidade ambiental"
      ]
    },
    {
      id: "processo",
      title: "Processo de Aplicação",
      content: [
        "1. Diagnóstico e análise do suporte existente",
        "2. Preparação e limpeza da superfície",
        "3. Aplicação da argamassa de colagem",
        "4. Fixação das placas de isolamento (EPS/XPS/Lã Mineral)",
        "5. Reforço com rede de fibra de vidro",
        "6. Aplicação do reboco de acabamento",
        "7. Acabamento final (acrílico, silicone ou mineral)"
      ]
    },
    {
      id: "normas",
      title: "Normas Europeias e Certificações",
      content: [
        "EN 13499 - Sistemas ETICS com EPS",
        "EN 13500 - Sistemas ETICS com lã mineral",
        "ETAG 004 - Aprovação Técnica Europeia",
        "Certificação CE para todos os componentes",
        "Conformidade com regulamentos térmicos portugueses",
        "Garantia de 10 anos em todos os sistemas aplicados"
      ]
    },
    {
      id: "microcimento-tecnico",
      title: "Especificações do Microcimento",
      content: [
        "Espessura de aplicação: 2-3mm",
        "Resistência à compressão: >40 MPa",
        "Resistência à abrasão: Alta",
        "Aplicável sobre: betão, cerâmica, madeira, metal",
        "Cores disponíveis: +50 tonalidades",
        "Acabamentos: mate, acetinado, brilhante"
      ]
    }
  ];

  return (
    <section id="tecnico" data-testid="technical-section" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Área Técnica
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Conhecimento Técnico Especializado
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              A AUREON investe continuamente na formação técnica e no conhecimento das melhores práticas do mercado europeu. Conheça os detalhes técnicos dos nossos serviços.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="technical-card">
                <ThermometerSun className="w-8 h-8 text-[#C8553D] mb-3" />
                <p className="font-bold text-[#1A1A1A]">Eficiência A+</p>
                <p className="text-sm text-[#8C8C8C]">Classe energética</p>
              </div>
              <div className="technical-card">
                <Shield className="w-8 h-8 text-[#C8553D] mb-3" />
                <p className="font-bold text-[#1A1A1A]">10 Anos</p>
                <p className="text-sm text-[#8C8C8C]">Garantia total</p>
              </div>
              <div className="technical-card">
                <Paintbrush className="w-8 h-8 text-[#C8553D] mb-3" />
                <p className="font-bold text-[#1A1A1A]">Premium</p>
                <p className="text-sm text-[#8C8C8C]">Materiais certificados</p>
              </div>
              <div className="technical-card">
                <Award className="w-8 h-8 text-[#C8553D] mb-3" />
                <p className="font-bold text-[#1A1A1A]">Certificado</p>
                <p className="text-sm text-[#8C8C8C]">Normas europeias</p>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            {technicalContent.map((item) => (
              <div 
                key={item.id}
                data-testid={`accordion-${item.id}`}
                className="border border-white/20"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-white">{item.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#C8553D] transition-transform ${
                      openAccordion === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === item.id && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3">
                      {item.content.map((line, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-[#C8553D] flex-shrink-0 mt-0.5" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Mensagem enviada com sucesso! Entraremos em contacto brevemente.');
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, label: "Telefone", value: "+351 912 345 678" },
    { icon: Mail, label: "Email", value: "info@aureon.pt" },
    { icon: MapPin, label: "Localização", value: "Lisboa, Portugal" },
    { icon: Clock, label: "Horário", value: "Seg-Sex: 9h-18h" }
  ];

  return (
    <section id="contacto" data-testid="contact-section" className="py-24 bg-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C8553D] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Contacto
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
            Peça o Seu Orçamento Gratuito
          </h2>
          <p className="text-[#8C8C8C] text-lg max-w-2xl mx-auto">
            Entre em contacto connosco para discutir o seu projeto. Respondemos em até 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white p-8 mb-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Informações de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F9F8F6] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#C8553D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8C8C8C] uppercase tracking-wider">{item.label}</p>
                      <p className="font-medium text-[#1A1A1A]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#1A1A1A] h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#C8553D] mx-auto mb-4" />
                <p className="text-white font-medium">Lisboa, Portugal</p>
                <p className="text-white/50 text-sm">Serviços em todo o país</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Envie a Sua Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  data-testid="contact-name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-underline"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  data-testid="contact-email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-underline"
                />
                <input
                  type="tel"
                  name="phone"
                  data-testid="contact-phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-underline"
                />
              </div>
              <div>
                <select
                  name="service_type"
                  data-testid="contact-service"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                  className="input-underline appearance-none cursor-pointer"
                >
                  <option value="">Selecione o serviço</option>
                  <option value="capoto">Capoto / ETICS</option>
                  <option value="microcimento">Microcimento</option>
                  <option value="reabilitacao">Reabilitação de Fachadas</option>
                  <option value="consultoria">Consultoria Técnica</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  data-testid="contact-message"
                  placeholder="Descreva o seu projeto..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-underline resize-none"
                />
              </div>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="btn-accent w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-[#1A1A1A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold text-white mb-4">AUREON</h3>
            <p className="text-white/60 mb-6 max-w-md">
              Especialistas em soluções de isolamento térmico e acabamentos em microcimento. Qualidade, durabilidade e eficiência energética em cada projeto.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#C8553D] transition-colors">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#C8553D] transition-colors">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#C8553D] transition-colors">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Início', 'Sobre', 'Serviços', 'Portfólio', 'Contacto'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-[#C8553D] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-6">Serviços</h4>
            <ul className="space-y-3">
              {['Capoto / ETICS', 'Microcimento', 'Reabilitação', 'Consultoria'].map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} AUREON. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Termos de Utilização</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Button
const WhatsAppButton = () => {
  const phoneNumber = "351912345678";
  const message = "Olá! Gostaria de saber mais sobre os vossos serviços.";
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      data-testid="whatsapp-button"
      onClick={handleClick}
      className="whatsapp-float animate-pulse-gentle"
      aria-label="Contactar via WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </button>
  );
};

// Lightbox Component
const Lightbox = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      data-testid="lightbox"
      className="lightbox-overlay" 
      onClick={onClose}
    >
      <button
        data-testid="lightbox-close"
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div 
        className="max-w-4xl w-full mx-4 bg-white" 
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-8">
          <span className="text-xs text-[#C8553D] uppercase tracking-wider">{project.category}</span>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-2 mb-4">{project.title}</h3>
          <p className="text-[#8C8C8C] mb-4">{project.description}</p>
          <div className="flex items-center gap-6 text-sm text-[#8C8C8C]">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const initData = async () => {
      try {
        // Seed portfolio data
        await axios.post(`${API}/seed-portfolio`);
        // Fetch projects
        const response = await axios.get(`${API}/portfolio`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    };
    initData();
  }, []);

  return (
    <div className="App" data-testid="app-root">
      <Toaster position="top-right" richColors />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BudgetCalculator />
      <PortfolioSection 
        projects={projects} 
        onProjectClick={setSelectedProject}
      />
      <TechnicalSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <Lightbox 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}

export default App;
