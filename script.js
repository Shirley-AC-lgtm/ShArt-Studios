document.addEventListener('DOMContentLoaded', () => {
    /* 1. PARTÍCULAS SUTILES EN EL FONDO */
    const canvas = document.getElementById('elemental-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, embers = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createEmbers() {
        embers = [];
        const total = Math.min(45, Math.floor((w * h) / 30000));
        for (let i = 0; i < total; i++) {
            embers.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.8 + 0.6,
                vy: -(Math.random() * 0.4 + 0.12),
                vx: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.45 + 0.15
            });
        }
    }

    function renderParticles() {
        ctx.clearRect(0, 0, w, h);
        for (const p of embers) {
            p.y += p.vy;
            p.x += p.vx;
            if (p.y < -10) p.y = h + 10;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#34d399';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        requestAnimationFrame(renderParticles);
    }

    resize();
    createEmbers();
    renderParticles();
    window.addEventListener('resize', () => {
        resize();
        createEmbers();
    });

    /* 2. MENÚ MÓVIL */
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    burgerBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

    /* 3. BASE DE DATOS DE PROYECTOS PARA EL MODAL DETALLADO */
    const projectsData = {
        elementales: {
            kicker: 'VIDEOJUEGO PRINCIPAL • SHĀRT STUDIOS',
            title: 'Elementales: Pueblos en Guerra',
            summary: 'En el corazón de un bosque ancestral, cuatro pueblos se enfrentan en una batalla táctica por rescatar y asegurar a los elementales. Funciona como captura la bandera: el pueblo que logre reunir todos o la mayor cantidad de elementales domina el bosque.',
            hasManga: true,
            mangaPages: [
                {
                    chapter: 'CAPÍTULO I • EL DESPERTAR DEL BOSQUE',
                    title: 'El Equilibrio Roto',
                    text: 'Durante siglos, los cuatro pueblos mantuvieron la paz alrededor del bosque sagrado. Pero cuando los elementales quedaron dispersos entre los territorios, cada pueblo marchó para reclamar su poder.',
                    image: 'Portada.jpg'
                },
                {
                    chapter: 'CAPÍTULO II • LA FURIA DE JASMENTIS',
                    title: 'Dominio de los Cuatro Elementos',
                    text: 'Jasmentis desata la fuerza viva del bosque para someter a quienes intentan desequilibrar la naturaleza: raíces de tierra, mareas desbordadas, llamas y vientos implacables.',
                    image: 'fondo.jpg'
                },
                {
                    chapter: 'CAPÍTULO III • RESCATE EN EL BOSQUE',
                    title: 'La Guerra por los Elementales',
                    text: 'Cada incursión cuenta: infiltrarse en terreno rival, rescatar un elemental y escoltarlo de regreso define qué pueblo alzará la victoria final.',
                    image: 'Portada.jpg'
                }
            ],
            mapTitle: 'Escenario: El Bosque Ancestral de los 4 Pueblos',
            mapDesc: 'Mapa dividido en cuatro dominios elementales conectados por senderos boscosos, claros de rescate y santuarios centrales.',
            mapImage: 'Portada.jpg',
            characters: [
                { name: 'Jasmentis', role: 'Guardiana Suprema del Bosque', img: 'jasmentis_2.jpeg' },
                { name: 'Elemental de Tierra', role: 'Pueblo de la Roca & Raíces', img: 'Elementales.jpeg' },
                { name: 'Elemental de Agua', role: 'Pueblo de las Mareas', img: 'Elementales - copia (2).jpeg' },
                { name: 'Elemental de Fuego', role: 'Pueblo Ígneo', img: 'Elementales - copia (3).jpeg' },
                { name: 'Elemental de Aire', role: 'Pueblo del Viento', img: 'Elementales - copia.jpeg' },
                { name: 'Guardián Alado', role: 'Centinela & Escolta', img: 'Guardianes - copia.jpeg' },
                { name: 'Vigilante del Bosque', role: 'Protector de los Senderos', img: 'Vigilantes del bosque - copia (2).jpeg' }
            ]
        },
        lastline: {
            kicker: 'VIDEOJUEGO • ESTILO VISUAL PROPIO',
            title: 'Last Line',
            summary: 'Título independiente dentro de ShĀrt Studios que conserva su propia dirección artística, atmósfera y mecánicas de supervivencia y defensa estratégica.'
        },
        lockedin: {
            kicker: 'APLICACIÓN WEB DE PRODUCTIVIDAD Y ESTUDIO',
            title: 'Locked In',
            summary: 'Aplicación web diseñada para estudiantes y autodidactas que necesitan concentración máxima, bloques de estudio estructurados, metas diarias y seguimiento de avance.'
        },
        skillbridge: {
            kicker: 'PLATAFORMA WEB DE TALENTO',
            title: 'SkillBridge',
            summary: 'Plataforma web que construye un puente directo entre habilidades comprobadas y oportunidades reales de trabajo o colaboración tecnológica.'
        },
        lookingmoney: {
            kicker: 'PLATAFORMA FINTECH & INVERSIONES',
            title: 'Looking Money',
            summary: 'Sistema web de inversión y estrategias algorítmicas orientado a resultados de alto nivel, disponible mediante membresía mensual para inversionistas.'
        },
        fisioterapia: {
            kicker: 'DESARROLLO WEB PARA CLIENTE',
            title: 'Clínica & Web de Fisioterapia',
            summary: 'Sitio web desarrollado a medida para servicios de fisioterapia y rehabilitación, con presentación clara de tratamientos, confianza profesional y contacto rápido para pacientes.'
        }
    };

    /* 4. APERTURA Y CONTROL DEL MODAL */
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseBg = document.getElementById('modalCloseBg');
    let currentMangaPage = 0;

    function renderMangaView(pages, index) {
        const page = pages[index];
        return `
      <div class="manga-reader">
        <div class="manga-panel">
          <img src="${page.image}" alt="${page.title}" onerror="this.src='Portada.jpg';" />
          <div class="manga-caption-box">
            <span class="manga-chapter">${page.chapter} (${index + 1} / ${pages.length})</span>
            <h4>${page.title}</h4>
            <p>${page.text}</p>
          </div>
        </div>
        <div class="manga-controls">
          <button type="button" class="btn-ghost" id="prevMangaBtn">← Página Anterior</button>
          <button type="button" class="btn-relic" id="nextMangaBtn">Siguiente Viñeta →</button>
        </div>
      </div>
    `;
    }

    function openProjectModal(key) {
        const data = projectsData[key];
        if (!data) return;
        currentMangaPage = 0;

        let html = `
      <div class="modal-header">
        <span class="kicker">${data.kicker}</span>
        <h2>${data.title}</h2>
        <p>${data.summary}</p>
      </div>
    `;

        if (data.hasManga) {
            html += `
        <div class="modal-section">
          <h3>Historia en Formato Manga / Cómic</h3>
          <div id="mangaContainer">${renderMangaView(data.mangaPages, 0)}</div>
        </div>
      `;
        }

        if (data.characters) {
            html += `
        <div class="modal-section">
          <h3>Personajes & Clases</h3>
          <div class="modal-chars-grid">
            ${data.characters.map(c => `
              <div class="modal-char-card">
                <img src="${c.img}" alt="${c.name}" onerror="this.src='Portada.jpg';" />
                <div class="info">
                  <h4>${c.name}</h4>
                  <span>${c.role}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
        }

        if (data.mapImage) {
            html += `
        <div class="modal-section">
          <h3>${data.mapTitle}</h3>
          <p>${data.mapDesc}</p>
          <img src="${data.mapImage}" alt="${data.mapTitle}" class="modal-map-img" />
        </div>
      `;
        }

        modalBody.innerHTML = html;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');

        if (data.hasManga) {
            attachMangaEvents(data.mangaPages);
        }
    }

    function attachMangaEvents(pages) {
        const prevBtn = document.getElementById('prevMangaBtn');
        const nextBtn = document.getElementById('nextMangaBtn');
        const container = document.getElementById('mangaContainer');

        prevBtn.addEventListener('click', () => {
            currentMangaPage = (currentMangaPage - 1 + pages.length) % pages.length;
            container.innerHTML = renderMangaView(pages, currentMangaPage);
            attachMangaEvents(pages);
        });

        nextBtn.addEventListener('click', () => {
            currentMangaPage = (currentMangaPage + 1) % pages.length;
            container.innerHTML = renderMangaView(pages, currentMangaPage);
            attachMangaEvents(pages);
        });
    }

    function closeProjectModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('[data-project]').forEach(card => {
        card.addEventListener('click', () => openProjectModal(card.dataset.project));
    });

    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalCloseBg.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    /* 5. PRE-SELECCIÓN DE PLAN EN EL FORMULARIO */
    const planSelect = document.getElementById('planSelect');
    document.querySelectorAll('[data-plan]').forEach(btn => {
        btn.addEventListener('click', () => {
            planSelect.value = btn.dataset.plan;
        });
    });

    /* 6. FORMULARIO */
    const form = document.getElementById('allianceForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const sender = document.getElementById('nameInput').value.trim();
        status.textContent = `Mensaje enviado por ${sender}. Interés registrado en: ${planSelect.value}.`;
        form.reset();
    });

    /* 7. ANIMACIÓN REVEAL */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});