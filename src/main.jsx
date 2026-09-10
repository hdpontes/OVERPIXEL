import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CONFIG = {
  kitCheckoutUrl: 'https://pay.hotmart.com/H107543517N',
  cursoCheckoutUrl: 'https://pay.hotmart.com/H107543517N21',
  studentAreaUrl: 'https://hotmart.com/pt-br/club/comece-nos-personalizados',
  pixelId: '1330495329162779',
  gaMeasurementId: 'G-SJPJS8B9D1',
};

const faq = [
  ['O Kit Comece é só o e-book e a planilha?', 'Não. Além do e-book e da planilha, o cliente recebe acesso aos arquivos, e pode aproveitar as 3 primeiras aulas do curso para conhecer a metodologia antes de entrar no Clube dos Personalizados.'],
  ['Qual a diferença entre o kit e o Clube dos Personalizados?', 'O Kit Comece entrega a base estratégica e os materiais iniciais. Já o Clube dos Personalizados oferece uma aula completa nova toda semana, biblioteca de aulas, materiais, grupo no WhatsApp e ensinamentos práticos para personalizar produtos e vender.'],
  ['O Clube dos Personalizados é mensal?', 'Sim. O acesso ao Clube dos Personalizados custa R$ 29,90 por mês e inclui aulas novas toda semana, biblioteca de aulas e materiais para você continuar evoluindo.'],
  ['O kit custa R$ 27,90?', 'Sim. O produto do Kit Comece nos Personalizados é vendido por R$ 27,90 e oferece os materiais iniciais.'],
  ['O cliente precisa comprar o kit antes do curso?', 'Não. O cliente pode escolher diretamente o produto que melhor atende ao momento dele. O kit é ótimo para começar com a base, e o Clube dos Personalizados é ideal para quem quer aprender em profundidade e ter mais suporte.'],
  ['O Clube inclui arquivos e grupo?', 'Sim. O Clube inclui materiais de apoio, biblioteca de aulas e acesso ao grupo no WhatsApp.'],
  ['Como funcionam as aulas semanais?', 'Toda semana você aprende um produto diferente em uma aula completa, passando por materiais, equipamentos, preparação, arte, produção, acabamento, custo, preço sugerido, margem e como vender.'],
  ['Quais ferramentas serão ensinadas?', 'Você também aprenderá a trabalhar com CorelDRAW, Photoshop e a criar arquivos para DTF, incluindo técnicas como Halftone.'],
];

const benefits = [
  ['01', 'Escolha melhor', 'Descubra quais produtos têm maior potencial, preço e demanda antes de investir.'],
  ['02', 'Comece enxuto', 'Entenda o que comprar agora, o que pode terceirizar e como evitar erros de início.'],
  ['03', 'Precifique certo', 'Aprenda custos, margem, markup, taxa e preço ideal com base real.'],
  ['04', 'Venda de verdade', 'Use Instagram, WhatsApp, alcance local e prospecção para transformar interesse em venda.'],
  ['05', 'Personalize com clareza', 'Entenda como produzir, aplicar e posicionar produtos personalizados com maior chance de vender.'],
  ['06', 'Escale com método', 'Acompanhe aulas, materiais e evolução constante no seu planejamento de negócio.'],
];

const learn = [
  'Como iniciar um negócio de produtos personalizados do zero',
  'Quais tipos de produtos personalizáveis têm mais potencial',
  'Como calcular custo, margem e preço de venda correto',
  'Como escolher materiais, fornecedores e estrutura enxuta',
  'Como personalizar produtos com estratégias práticas',
  'Como vender por WhatsApp, Instagram e atendimento',
  'Como criar ofertas com mais valor percebido',
  'Como usar arquivos e materiais para acelerar a execução',
  'Como acompanhar tendências e escolher produtos certos',
  'Como evoluir com aulas semanais e conteúdo contínuo',
  'Como tomar decisões com base em demanda e lucro',
  'Como usar o grupo e o suporte para tirar dúvidas',
];

const niches = ['Academias', 'Escolas', 'Igrejas', 'Restaurantes', 'Barbearias', 'Salões', 'Pet shops', 'Imobiliárias', 'Empresas', 'Eventos'];

const products = [
  ['Camisetas Personalizadas', 'https://images.unsplash.com/photo-1578346021958-c58829af708b?auto=format&fit=crop&w=900&q=85', 'Camiseta personalizada com estampa'],
  ['Quadros', 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85', 'Quadro decorativo personalizado'],
  ['Chinelos', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85', 'Chinelos e produtos de verão'],
  ['Chaveiros Personalizados', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', 'Produtos pequenos para brindes'],
  ['Azulejos', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85', 'Peças decorativas personalizadas'],
  ['Canecas', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', 'Canecas personalizadas para presentes'],
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    zap: <path d="m13 2-9 12h7l-1 8 9-12h-7z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function track(name, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (window.fbq) window.fbq('trackCustom', name, params);
  if (window.gtag) window.gtag('event', name, params);
}

function goCheckout(e, url, source = 'cta') {
  e?.preventDefault();
  track('InitiateCheckout', { source, product: source });
  if (!url) return;
  const finalUrl = new URL(url, window.location.origin);
  const qs = new URLSearchParams(window.location.search);
  qs.forEach((value, key) => finalUrl.searchParams.set(key, value));
  finalUrl.searchParams.set('utm_content', source);
  window.location.href = finalUrl.toString();
}

function App() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    track('ViewContent', { product: 'kit-comece-e-curso-personalizados' });

    if (CONFIG.pixelId) {
      const s = document.createElement('script');
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${CONFIG.pixelId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }

    if (CONFIG.gaMeasurementId) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaMeasurementId}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.gaMeasurementId);
    }
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="container nav">
          <a href="#top" className="brand" onClick={() => setMenu(false)}>
            <span>OVERPIXEL</span>
            <b>STORE</b>
          </a>

          <nav className={menu ? 'navlinks open' : 'navlinks'}>
            <a href="#conteudo" onClick={() => setMenu(false)}>O que você recebe</a>
            <a href="#aprenda" onClick={() => setMenu(false)}>Aprender</a>
            <a href="#oferta" onClick={() => setMenu(false)}>Oferta</a>
            <a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
            <a href={CONFIG.kitCheckoutUrl} className="navcta" onClick={(e) => { setMenu(false); goCheckout(e, CONFIG.kitCheckoutUrl, 'header'); }}>
              Quero começar
              <Icon name="arrow" size={16} />
            </a>
            <a href={CONFIG.studentAreaUrl} className="studentLink" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>
              Sou aluno
            </a>
          </nav>

          <button className="menubtn" aria-label="Abrir menu" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? 'x' : 'menu'} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="heroGlow glow1" />
          <div className="heroGlow glow2" />

          <div className="container heroGrid">
            <div className="heroCopy">
              <div className="eyebrow">
                <span className="dot" />
                KIT + CURSO • ACESSO IMEDIATO
              </div>

              <h1>
                Comece no negócio de <em>produtos personalizados</em> com estrutura real.
              </h1>

              <p className="lead">
                Descubra <strong>como iniciar, como escolher produtos, como precificar e como vender</strong> sem perder tempo testando no escuro.
              </p>

              <div className="heroActions">
                <a href={CONFIG.kitCheckoutUrl} className="btn primary big" onClick={(e) => goCheckout(e, CONFIG.kitCheckoutUrl, 'hero_kit')}>
                  COMPRAR KIT
                  <Icon name="arrow" />
                </a>
                <a href={CONFIG.cursoCheckoutUrl} className="btn secondary big" onClick={(e) => goCheckout(e, CONFIG.cursoCheckoutUrl, 'hero_curso')}>
                  CLUBE DOS PERSONALIZADOS
                </a>
              </div>

              <div className="trustRow">
                <span><Icon name="check" size={16} /> E-book</span>
                <span><Icon name="check" size={16} /> Planilha</span>
                <span><Icon name="check" size={16} /> Aula nova toda semana</span>
              </div>
            </div>

            <div className="heroVisual">
              <div className="floatTag tagTop"><Icon name="zap" size={16} /> Comece com pouco</div>

              <div className="bookMock">
                <div className="bookShadow" />
                <img src="/assets/ebook-cover.png" alt="Capa do e-book Kit Comece nos Personalizados" />
              </div>

              <div className="sheetMock">
                <div className="sheetHeader">
                  <span>CALCULADORA</span>
                  <b>R$</b>
                </div>
                <img src="/assets/planilha.png" alt="Prévia da planilha calculadora" />
              </div>

              <div className="floatTag tagBottom">
                <span className="miniCheck"><Icon name="check" size={13} /></span>
                Aulas + materiais + grupo
              </div>
            </div>
          </div>
        </section>

        <section className="proofStrip">
          <div className="container proof">
            <span>ESCOLHA</span>
            <i>→</i>
            <span>PERSONALIZE</span>
            <i>→</i>
            <span>PRECIFIQUE</span>
            <i>→</i>
            <span>VENDA</span>
            <i>→</i>
            <span>REPITA</span>
          </div>
        </section>

        <section className="section sectionDark" id="conteudo">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="kicker">O QUE VOCÊ RECEBE</div>
                <h2>
                  Não é só informação.<br />
                  <span>É um mapa de decisão.</span>
                </h2>
              </div>
              <p>
                O Kit Comece entrega a base e a clareza para você entender o mercado. O Clube dos Personalizados transforma essa base em prática contínua, com um produto diferente ensinado em profundidade toda semana.
              </p>
            </div>

            <div className="benefitGrid">
              {benefits.map(([n, title, desc]) => (
                <article className="benefit" key={n}>
                  <div className="number">{n}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="aprenda">
          <div className="container learnGrid">
            <div>
              <div className="kicker">DO ZERO À PRIMEIRA VENDA</div>
              <h2>
                O que você vai <span>aprender</span>
              </h2>
              <p className="sectionText">
                A ideia não é te sobrecarregar com teoria vazia. É te ensinar a tomar decisões melhores, montar passos estratégicos e aplicar na prática em seu negócio.
              </p>
              <div className="checkList">
                {learn.map((item) => (
                  <div className="checkItem" key={item}>
                    <span><Icon name="check" size={15} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="exerciseCard">
              <div className="exerciseIcon"><Icon name="target" size={26} /></div>
              <div className="kicker">EXERCÍCIOS PRÁTICOS</div>
              <h3>Você não vai apenas ler.</h3>
              <p>
                Você vai analisar nichos, escolher produtos, validar preços e entender como montar uma operação que tenha mais chance de vender.
              </p>
              <div className="exerciseQuote">
                “Escolha o produto ideal, entenda o custo e defina o valor com base no mercado.”
              </div>
              <div className="smallNote">Estratégia + prática + execução</div>
            </div>
          </div>
        </section>

        <section className="section productShowcase">
          <div className="container">
            <div className="sectionHead simple">
              <div>
                <div className="kicker">PRODUTOS PARA COMEÇAR</div>
                <h2>
                  Personalize produtos que <span>as pessoas querem comprar.</span>
                </h2>
              </div>
              <p>
                Veja oportunidades para trabalhar com opções de alta procura, estrutura enxuta e potencial real de lucratividade.
              </p>
            </div>

            <div className="productGallery">
              {products.map(([name, image, alt]) => (
                <article className="productTile" key={name}>
                  <img src={image} alt={alt} loading="lazy" />
                  <div className="productTileLabel">
                    <span>{name}</span>
                    <Icon name="arrow" size={16} />
                  </div>
                </article>
              ))}
            </div>

            <div className="designLibrary">
              <div className="libraryIcon"><Icon name="zap" size={24} /></div>
              <div>
                <div className="kicker">BÔNUS E REFERÊNCIAS</div>
                <h3>Mais de 500 ideias para começar com mais rapidez</h3>
                <p>Tenha referências para canecas, camisetas e outros itens para produzir com mais clareza e menos improviso.</p>
              </div>
              <div className="libraryCount">500+<small>ideias</small></div>
            </div>
          </div>
        </section>

        <section className="section offerSection" id="oferta">
          <div className="container offerWrap">
            <div className="offerCopy">
              <div className="eyebrow goldEyebrow">
                <span className="dot" />
                OFERTA DOS PRODUTOS
              </div>

              <h2>Escolha o ponto de partida certo para o seu negócio.</h2>
              <p>
                Se você quer começar com a base e entender o mercado, o Kit Comece é perfeito. Se você quer aprender fazendo, com um produto diferente por semana, materiais, biblioteca de aulas e novas técnicas, o Clube dos Personalizados oferece evolução contínua.
              </p>

              <div className="valueStack">
                <div><Icon name="check" /><span>Kit Comece: e-book + planilha + arquivos + 3 primeiras aulas</span></div>
                <div><Icon name="check" /><span>Clube dos Personalizados: R$ 29,90/mês</span></div>
                <div><Icon name="check" /><span>1 produto → 1 aula completa toda semana</span></div>
              </div>
            </div>

            <div className="priceCard">
              <div className="priceTop">KIT COMECE NOS PERSONALIZADOS</div>
              <div className="price">
                R$ <strong>27</strong><sup>,90</sup>
              </div>
              <div className="priceSub">pagamento único</div>
              <div className="divider" />

              <a href={CONFIG.kitCheckoutUrl} className="btn primary big full" onClick={(e) => goCheckout(e, CONFIG.kitCheckoutUrl, 'kit_card')}>
                COMPRAR SOMENTE O KIT
                <Icon name="arrow" />
              </a>

              <div className="secure"><Icon name="lock" size={15} /> Inclui os arquivos e as 3 primeiras aulas</div>
              <div className="microcopy">Ideal para quem quer começar com a base e entender melhor o mercado.</div>
            </div>
          </div>
        </section>

        <section className="section compareSection">
          <div className="container compareWrap">
            <div className="compareIntro">
              <div className="eyebrow goldEyebrow">
                <span className="dot" />
                CLUBE DOS PERSONALIZADOS
              </div>
              <h2>
                Aprenda um produto novo <span>toda semana.</span>
              </h2>
              <p>
                O Clube dos Personalizados foi criado para quem quer aprender fazendo e construir repertório de produção. Toda semana, você acompanha uma aula completa de um produto diferente, do material à venda.
              </p>
            </div>

            <div className="compareGrid">
              <article className="compareCard kitCard">
                <span className="tag">KIT COMECE</span>
                <h3>R$ 27,90</h3>
                <ul>
                  <li><Icon name="check" size={15} /> E-book completo</li>
                  <li><Icon name="check" size={15} /> Planilha de produtos</li>
                  <li><Icon name="check" size={15} /> Arquivos</li>
                  <li><Icon name="check" size={15} /> 3 primeiras aulas</li>
                </ul>
                <a href={CONFIG.kitCheckoutUrl} className="btn ghost full" onClick={(e) => goCheckout(e, CONFIG.kitCheckoutUrl, 'kit_compare')}>
                  Comprar kit
                </a>
              </article>

              <article className="compareCard courseCard highlight">
                <span className="tag">CLUBE DOS PERSONALIZADOS</span>
                <h3>R$ 29,90 <small>/mês</small></h3>
                <ul>
                  <li><Icon name="check" size={15} /> Aula completa de um produto diferente toda semana</li>
                  <li><Icon name="check" size={15} /> Biblioteca de aulas e materiais</li>
                  <li><Icon name="check" size={15} /> Grupo no WhatsApp</li>
                  <li><Icon name="check" size={15} /> CorelDRAW, Photoshop e arquivos para DTF</li>
                  <li><Icon name="check" size={15} /> Custos, margem, preço sugerido e vendas</li>
                </ul>
                <a href={CONFIG.cursoCheckoutUrl} className="btn primary full" onClick={(e) => goCheckout(e, CONFIG.cursoCheckoutUrl, 'curso_compare')}>
                  Quero entrar no Clube
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section sectionDark courseDetails">
          <div className="container detailsWrap">
            <div className="detailsCopy">
              <div className="kicker">CLUBE DOS PERSONALIZADOS</div>
              <h2>Uma aula completa, um produto diferente, toda semana.</h2>
              <p>
                Por R$ 29,90/mês, você aprende a personalizar produtos na prática, seguindo o conteúdo do e-book e avançando com uma nova aula completa toda semana. Tenha acesso à biblioteca de aulas, materiais e ao grupo no WhatsApp.
              </p>

              <div className="featureList">
                <div><Icon name="check" size={16} /> 1 produto → 1 aula completa toda semana</div>
                <div><Icon name="check" size={16} /> Materiais, equipamentos, preparação e arte</div>
                <div><Icon name="check" size={16} /> Produção, acabamento, custo, margem e preço</div>
                <div><Icon name="check" size={16} /> Como vender e criar arquivos para DTF</div>
                <div><Icon name="check" size={16} /> CorelDRAW, Photoshop e técnica Halftone</div>
              </div>
            </div>

            <div className="detailStack">
              <div className="miniCard">
                <span>01</span>
                <strong>Do material à produção</strong>
                <p>Veja os materiais, equipamentos, preparação, arte, produção e acabamento de cada produto.</p>
              </div>
              <div className="miniCard">
                <span>02</span>
                <strong>Custo e preço de venda</strong>
                <p>Aprenda a calcular custo, margem e preço sugerido para tomar decisões melhores.</p>
              </div>
              <div className="miniCard">
                <span>03</span>
                <strong>Ferramentas profissionais</strong>
                <p>Aprenda CorelDRAW, Photoshop e a criar arquivos para DTF, incluindo técnicas como Halftone.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section seoSection">
          <div className="container seoWrap">
            <div className="seoContent">
              <div className="kicker">SEO + CONVERSÃO</div>
              <h2>
                Conteúdo pensado para quem busca <span>como iniciar um negócio de produtos personalizados</span>.
              </h2>
              <p>
                Essa landing page foi estruturada para atrair pessoas interessadas em produtos personalizados, curso de personalização, kit para começar, curso para iniciar um negócio e como vender personalizados com mais inteligência e estratégia.
              </p>
            </div>

            <div className="keywordBox">
              <span>produtos personalizados</span>
              <span>curso de personalizados</span>
              <span>kit para começar</span>
              <span>negócio de personalizados</span>
              <span>como vender personalizados</span>
              <span>personalização de produtos</span>
              <span>iniciar negócio</span>
              <span>curso para personalizar produtos</span>
            </div>
          </div>
        </section>

        <section className="section finalCTA">
          <div className="container finalBox">
            <div>
              <div className="kicker">COMECE COM SEGURANÇA</div>
              <h2>
                Escolha sua compra:<br />
                <span>Kit Comece</span> ou <span>Clube dos Personalizados</span>.
              </h2>
            </div>

            <div className="finalButtons">
              <a href={CONFIG.kitCheckoutUrl} className="btn primary big" onClick={(e) => goCheckout(e, CONFIG.kitCheckoutUrl, 'final_kit')}>COMPRAR KIT</a>
              <a href={CONFIG.cursoCheckoutUrl} className="btn secondary big" onClick={(e) => goCheckout(e, CONFIG.cursoCheckoutUrl, 'final_curso')}>CLUBE DOS PERSONALIZADOS</a>
            </div>
          </div>
        </section>

        <section className="section sectionDark" id="faq">
          <div className="container faq">
            <div className="kicker">AINDA TEM DÚVIDA?</div>
            <h2>Perguntas frequentes</h2>
            <div className="faqList">
              {faq.map(([question, answer], i) => (
                <div className={open === i ? 'faqItem active' : 'faqItem'} key={question}>
                  <button onClick={() => setOpen(open === i ? null : i)}>
                    <span>{question}</span>
                    <Icon name="chevron" size={19} />
                  </button>
                  {open === i && <div className="answer">{answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div>
            <a href="#top" className="brand">
              <span>OVERPIXEL</span>
              <b>STORE</b>
            </a>
            <p>Produtos digitais para quem quer começar e crescer no mercado de produtos personalizados.</p>
          </div>

          <div className="footerLinks">
            <a href="#conteudo">Conteúdo</a>
            <a href="#oferta">Oferta</a>
            <a href="#faq">FAQ</a>
            <a href="/privacidade">Privacidade</a>
            <a href="/termos">Termos</a>
          </div>

          <div className="copyright">© 2026 Overpixel Store. Todos os direitos reservados.</div>
        </div>
      </footer>

      <a className="mobileSticky" href={CONFIG.kitCheckoutUrl} onClick={(e) => goCheckout(e, CONFIG.kitCheckoutUrl, 'mobile_kit')}>
        COMPRAR KIT POR R$ 27,90
        <Icon name="arrow" size={18} />
      </a>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
