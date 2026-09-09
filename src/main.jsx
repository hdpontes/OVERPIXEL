import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const CONFIG = {
  checkoutUrl: 'https://pay.kiwify.com.br/EQxzJ7a',
  pixelId: '1330495329162779',
  gaMeasurementId: 'G-SJPJS8B9D1',
};

const faq = [
  ['É para quem está começando do zero?', 'Sim. O material foi pensado para organizar a jornada desde a escolha dos produtos e equipamentos até preço, divulgação, atendimento e primeira venda.'],
  ['Preciso comprar várias máquinas?', 'Não. A estratégia é começar enxuto, usar a prensa plana para uma família de produtos e terceirizar processos que exigem equipamentos específicos quando isso fizer sentido.'],
  ['A planilha é editável?', 'Sim. Ela foi criada para você organizar produtos e apoiar decisões de preço. Os valores e custos devem ser preenchidos e atualizados de acordo com sua realidade.'],
  ['O e-book fala só de camisetas?', 'Não. Ele aborda camisetas, presentes, kits, produtos corporativos, brindes, decoração, papelaria e outras oportunidades, além de explicar quando produzir e quando terceirizar.'],
  ['Canecas estão incluídas?', 'Sim, como oportunidade de produto. O material diferencia produtos que podem ser feitos com prensa plana daqueles que pedem prensa de caneca ou equipamento específico.'],
  ['É curso em vídeo?', 'Não. É um kit digital prático: e-book + planilha, com exercícios, listas, mensagens e planos de ação.'],
  ['Como recebo o material?', 'A entrega deve ser configurada no seu checkout. Após a confirmação do pagamento, o cliente recebe o acesso conforme a automação do checkout escolhido.'],
  ['Os valores da planilha são definitivos?', 'Não. Custos de materiais, taxas, fretes e equipamentos mudam. O próprio material orienta a conferir valores atuais antes de comprar ou precificar.'],
];

const benefits = [
  ['01', 'Escolha melhor', 'Pare de escolher produtos no escuro. Compare investimento, dificuldade, público e potencial de venda.'],
  ['02', 'Comece enxuto', 'Entenda o que comprar agora, o que pode esperar e o que pode ser terceirizado.'],
  ['03', 'Precifique certo', 'Aprenda custo, margem, markup, taxas e ponto de equilíbrio com exemplos práticos.'],
  ['04', 'Venda de verdade', 'Instagram, WhatsApp, marketplaces, prospecção local, empresas e conteúdo.'],
  ['05', 'Tenha opções', 'Uma matriz com 100 oportunidades para encontrar produtos e nichos que combinam com sua estrutura.'],
  ['06', 'Execute', 'Planos de 7, 30 e 90 dias para transformar leitura em ação.'],
];

const learn = [
  'Como começar usando uma estrutura enxuta',
  'Como escolher os primeiros produtos',
  'Prensa térmica, DTF e sublimação',
  'Como avaliar fornecedores e estoque',
  'Como calcular custo e preço de venda',
  'Margem x markup e ponto de equilíbrio',
  'Como montar kits e ofertas',
  'Como vender pelo Instagram e WhatsApp',
  'Como prospectar empresas e negócios locais',
  'Como criar conteúdo e anúncios',
  'Como organizar pedidos e financeiro',
  'Quando terceirizar e quando comprar máquinas',
];

const niches = ['Academias', 'Escolas', 'Igrejas', 'Restaurantes', 'Barbearias', 'Salões', 'Pet shops', 'Imobiliárias', 'Empresas', 'Eventos'];

const products = [
  ['Camisetas Personalizadas', 'https://images.unsplash.com/photo-1578346021958-c58829af708b?auto=format&fit=crop&w=900&q=85', 'Camiseta personalizada com estampa'],
  ['Quadros', 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85', 'Quadro decorativo personalizado'],
  ['Chinelos', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85', 'Chinelos e produtos de verão'],
  ['Chaveiros Personalizados', 'https://i.ibb.co/xtKR4pS6/br-11134207-820m7-mqzdcp3cmfid76-resize-w900-nl.webp?auto=format&fit=crop&w=900&q=85', 'Produtos pequenos para brindes'],
  ['Azulejos', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85', 'Peças decorativas personalizadas'],
  ['Canecas', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', 'Canecas personalizadas para presentes'],
];

function Icon({name, size=20}) {
  const common = {width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.8',strokeLinecap:'round',strokeLinejoin:'round'};
  const paths = {
    check: <><path d="m5 12 4 4L19 6"/></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    zap: <><path d="m13 2-9 12h7l-1 8 9-12h-7z"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    chevron: <><path d="m6 9 6 6 6-6"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function track(name, params={}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:name, ...params});
  if (window.fbq) window.fbq('trackCustom', name, params);
  if (window.gtag) window.gtag('event', name, params);
}

function goCheckout(e, source='cta') {
  e?.preventDefault();
  track('InitiateCheckout', {source});
  const url = new URL(CONFIG.checkoutUrl, window.location.origin);
  const qs = new URLSearchParams(window.location.search);
  qs.forEach((v,k)=>url.searchParams.set(k,v));
  url.searchParams.set('utm_content', source);
  window.location.href = url.toString();
}

function App(){
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(()=>{
    track('ViewContent', {product:'kit-comece-nos-personalizados'});
    if(CONFIG.pixelId){
      const s=document.createElement('script');
      s.innerHTML=`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${CONFIG.pixelId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
    if(CONFIG.gaMeasurementId){
      const s=document.createElement('script'); s.async=true; s.src=`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaMeasurementId}`; document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[]; window.gtag=function(){window.dataLayer.push(arguments)}; window.gtag('js',new Date()); window.gtag('config',CONFIG.gaMeasurementId);
    }
  },[]);

  return <div className="page">
    <header className="header">
      <div className="container nav">
        <a href="#top" className="brand" onClick={()=>setMenu(false)}><span>OVERPIXEL</span><b>STORE</b></a>
        <nav className={menu?'navlinks open':'navlinks'}>
          <a href="#conteudo" onClick={()=>setMenu(false)}>O que você recebe</a>
          <a href="#aprenda" onClick={()=>setMenu(false)}>O que vai aprender</a>
          <a href="#oferta" onClick={()=>setMenu(false)}>Oferta</a>
          <a href="#faq" onClick={()=>setMenu(false)}>FAQ</a>
          <a href={CONFIG.checkoutUrl} className="navcta" onClick={(e)=>{setMenu(false);goCheckout(e,'header')}}>Quero começar <Icon name="arrow" size={16}/></a>
        </nav>
        <button className="menubtn" aria-label="Abrir menu" onClick={()=>setMenu(!menu)}><Icon name={menu?'x':'menu'}/></button>
      </div>
    </header>

    <main id="top">
      <section className="hero section">
        <div className="heroGlow glow1"/><div className="heroGlow glow2"/>
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow"><span className="dot"/> KIT DIGITAL • ACESSO IMEDIATO</div>
            <h1>Comece nos <em>Personalizados</em> sem ficar perdido.</h1>
            <p className="lead">Um guia prático para descobrir <strong>o que vender, o que comprar, quanto cobrar e como encontrar clientes</strong> — mesmo começando com uma estrutura enxuta.</p>
            <div className="heroActions">
              <a href="#oferta" className="btn primary big">QUERO O KIT COMPLETO <Icon name="arrow"/></a>
              <a href="#conteudo" className="btn ghost big">Ver o conteúdo</a>
            </div>
            <div className="trustRow"><span><Icon name="check" size={16}/> E-book completo</span><span><Icon name="check" size={16}/> Planilha editável</span><span><Icon name="check" size={16}/> 500+ estampas</span></div>
          </div>
          <div className="heroVisual">
            <div className="floatTag tagTop"><Icon name="zap" size={16}/> Comece com pouco</div>
            <div className="bookMock">
              <div className="bookShadow"/>
              <img src="/assets/ebook-cover.png" alt="Capa do e-book Kit Comece nos Personalizados"/>
            </div>
            <div className="sheetMock">
              <div className="sheetHeader"><span>CALCULADORA</span><b>R$</b></div>
              <img src="/assets/planilha.png" alt="Prévia da planilha calculadora"/>
            </div>
            <div className="floatTag tagBottom"><span className="miniCheck"><Icon name="check" size={13}/></span> 100 produtos + ferramentas práticas</div>
          </div>
        </div>
      </section>

      <section className="proofStrip"><div className="container proof"><span>ESCOLHA</span><i>→</i><span>PRODUZA</span><i>→</i><span>PRECIFIQUE</span><i>→</i><span>VENDA</span><i>→</i><span>REPITA</span></div></section>

      <section className="section sectionDark" id="conteudo">
        <div className="container">
          <div className="sectionHead"><div><div className="kicker">O KIT FOI PENSADO PARA EXECUTAR</div><h2>Não é só informação.<br/><span>É um mapa de decisão.</span></h2></div><p>O e-book organiza o raciocínio e a planilha ajuda você a colocar a estratégia em prática. O objetivo é reduzir tentativa e erro no começo.</p></div>
          <div className="benefitGrid">{benefits.map(([n,t,d])=><article className="benefit" key={n}><div className="number">{n}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
        </div>
      </section>

      <section className="section" id="aprenda">
        <div className="container learnGrid">
          <div><div className="kicker">DO ZERO À PRIMEIRA VENDA</div><h2>O que você vai <span>aprender</span></h2><p className="sectionText">A ideia não é fazer você decorar técnicas. É ensinar você a tomar decisões melhores e montar uma operação que faça sentido para o seu momento.</p><div className="checkList">{learn.map((x)=><div className="checkItem" key={x}><span><Icon name="check" size={15}/></span>{x}</div>)}</div></div>
          <div className="exerciseCard"><div className="exerciseIcon"><Icon name="target" size={26}/></div><div className="kicker">EXERCÍCIOS PRÁTICOS</div><h3>Você não vai apenas ler.</h3><p>Ao longo do material, você vai escolher nichos, pontuar produtos, calcular preços, criar ofertas, organizar leads e montar sua rotina comercial.</p><div className="exerciseQuote">“Escolha seu produto principal. Calcule custo, taxa, preço mínimo e preço recomendado.”</div><div className="smallNote">Teoria + prática + exercícios</div></div>
        </div>
      </section>

      <section className="section productShowcase">
        <div className="container">
          <div className="sectionHead simple"><div><div className="kicker">PRODUTOS PARA COMEÇAR</div><h2>Personalize produtos que <span>as pessoas querem comprar.</span></h2></div><p>Aprenda a avaliar materiais, escolher estampas e montar ofertas para camisetas, decoração, presentes e brindes usando uma estrutura enxuta.</p></div>
          <div className="productGallery">{products.map(([name,image,alt])=><article className="productTile" key={name}><img src={image} alt={alt} loading="lazy"/><div className="productTileLabel"><span>{name}</span><Icon name="arrow" size={16}/></div></article>)}</div>
          <div className="designLibrary"><div className="libraryIcon"><Icon name="zap" size={24}/></div><div><div className="kicker">BÔNUS PARA CRIAR MAIS RÁPIDO</div><h3>Repositório com mais de 500 estampas</h3><p>Tenha referências para camisetas e canecas, encontre ideias por nicho e comece suas primeiras ofertas sem partir do zero.</p></div><div className="libraryCount">500+<small>estampas</small></div></div>
        </div>
      </section>

      <section className="section sectionDark">
        <div className="container productGrid">
          <div className="productCard"><div className="cardLabel">VOCÊ RECEBE</div><h3>E-book completo</h3><p>Um guia estruturado em capítulos, com exemplos, exercícios, planos e materiais para consulta.</p><div className="bookPreview"><img src="/assets/ebook-cover.png" alt="Prévia do e-book"/></div></div>
          <div className="productCard"><div className="cardLabel">FERRAMENTA DE APOIO</div><h3>Planilha interativa</h3><p>Use filtros e listas para analisar produtos e organizar suas decisões de forma mais prática.</p><div className="sheetPreview"><img src="/assets/planilha.png" alt="Prévia da planilha"/></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead simple"><div><div className="kicker">100 OPORTUNIDADES</div><h2>Você não precisa vender de tudo.</h2></div><p>A matriz ajuda a encontrar produtos para diferentes públicos, níveis de investimento e modelos de operação — inclusive terceirizando o que não vale a pena produzir no início.</p></div>
          <div className="pillGrid">{niches.map(n=><div className="pill" key={n}><Icon name="check" size={15}/>{n}</div>)}</div>
          <div className="callout"><div className="calloutIcon"><Icon name="zap"/></div><div><strong>Regra de ouro:</strong> equipamento é consequência de demanda. Antes de comprar uma nova máquina, valide se existe venda suficiente para justificar o investimento.</div></div>
        </div>
      </section>

      <section className="section sectionDark">
        <div className="container steps"><div className="kicker">A ESCADA DOS PERSONALIZADOS</div><h2>Comece pequeno. <span>Amplie com demanda.</span></h2><div className="stepGrid"><div className="step"><b>01</b><h3>Estrutura enxuta</h3><p>Comece com prensa plana e produtos compatíveis, escolhendo um público e poucos itens.</p></div><div className="step"><b>02</b><h3>Terceirização inteligente</h3><p>Use fornecedores para processos que exigiriam máquinas específicas enquanto valida a demanda.</p></div><div className="step"><b>03</b><h3>Profissionalização</h3><p>Quando as vendas justificarem, adicione equipamentos e novas técnicas ao seu catálogo.</p></div></div></div>
      </section>

      <section className="section offerSection" id="oferta">
        <div className="container offerWrap">
          <div className="offerCopy"><div className="eyebrow goldEyebrow"><span className="dot"/> OFERTA DO KIT</div><h2>Seu próximo passo pode começar por <em>R$ 27,90.</em></h2><p>Em vez de passar horas pulando entre vídeos e posts tentando descobrir por onde começar, tenha uma estrutura única para consultar e executar.</p><div className="valueStack"><div><Icon name="check"/><span>E-book completo — 38 capítulos</span></div><div><Icon name="check"/><span>Planilha de produtos e calculadora</span></div><div><Icon name="check"/><span>100 oportunidades de produtos</span></div><div><Icon name="check"/><span>50 mensagens para prospecção</span></div><div><Icon name="check"/><span>50 nichos para explorar</span></div><div><Icon name="check"/><span>30 ideias de posts + 30 Reels</span></div><div><Icon name="check"/><span>Planos de 7, 30 e 90 dias</span></div><div><Icon name="check"/><span>Checklist da primeira venda</span></div></div></div>
          <div className="priceCard"><div className="priceTop">KIT DIGITAL COMPLETO</div><div className="price">R$ <strong>27</strong><sup>,90</sup></div><div className="priceSub">pagamento único</div><div className="divider"/><a href={CONFIG.checkoutUrl} className="btn primary big full" onClick={(e)=>goCheckout(e,'offer')}>QUERO COMEÇAR AGORA <Icon name="arrow"/></a><div className="secure"><Icon name="lock" size={15}/> Compra e entrega conforme o checkout configurado</div><div className="microcopy">Você recebe exatamente os materiais descritos nesta página. Custos e taxas do seu negócio devem ser atualizados por você conforme sua realidade.</div></div>
        </div>
      </section>

      <section className="section finalCTA"><div className="container finalBox"><div><div className="kicker">MENOS CONFUSÃO. MAIS AÇÃO.</div><h2>Escolha seu primeiro produto.<br/><span>Monte sua oferta. Comece.</span></h2></div><a href={CONFIG.checkoutUrl} className="btn primary big" onClick={(e)=>goCheckout(e,'final')}>QUERO O KIT <Icon name="arrow"/></a></div></section>

      <section className="section sectionDark" id="faq"><div className="container faq"><div className="kicker">AINDA TEM DÚVIDA?</div><h2>Perguntas frequentes</h2><div className="faqList">{faq.map(([q,a],i)=><div className={open===i?'faqItem active':'faqItem'} key={q}><button onClick={()=>setOpen(open===i?null:i)}><span>{q}</span><Icon name="chevron" size={19}/></button>{open===i&&<div className="answer">{a}</div>}</div>)}</div></div></section>
    </main>

    <footer className="footer"><div className="container footerInner"><div><a href="#top" className="brand"><span>OVERPIXEL</span><b>STORE</b></a><p>Produtos digitais e soluções para quem quer começar e vender personalizados.</p></div><div className="footerLinks"><a href="#conteudo">Conteúdo</a><a href="#oferta">Oferta</a><a href="#faq">FAQ</a><a href="/privacidade">Privacidade</a><a href="/termos">Termos</a></div><div className="copyright">© 2026 Overpixel Store. Todos os direitos reservados.</div></div></footer>
    <a className="mobileSticky" href={CONFIG.checkoutUrl} onClick={(e)=>goCheckout(e,'sticky')}>QUERO O KIT POR R$ 27,90 <Icon name="arrow" size={18}/></a>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
