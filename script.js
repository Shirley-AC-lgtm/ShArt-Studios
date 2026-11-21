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
                    text: 'Hace mucho tiempo, en el corazón de un bosque ancestral, vivía Yasméntis, una antigua guardiana que protegía el equilibrio de la naturaleza y los cuatro elementos: agua, fuego, tierra y viento. Un día, cuatro jóvenes llegaron al bosque.Sin comprender la importancia de aquel lugar, comenzaron a explorar sus alrededores y, por descuido, cometieron varios actos que alteraron su equilibrio: uno destruyó una pequeña criatura del bosque, otro rompió una antigua piedra sagrada, otro contaminó la tierra y el último tomó un tesoro elemental que no le pertenecía.',
                    image: 'Capitulo1.png'
                },
                {
                    chapter: 'CAPÍTULO II • LA FURIA DE JASMENTIS',
                    title: 'Dominio de los Cuatro Elementos',
                    text: 'Aquellas acciones despertaron a Yasméntis, quien apareció ante ellos llena de tristeza e ira. Cegada por su dolor, decidió castigarlos utilizando el poder de los cuatro elementos. Sin embargo, su poder se descontroló.En un intento por detener la destrucción que ella misma había provocado, Yasméntis sacrificó su propia esencia.Su cuerpo se convirtió en piedra y su espíritu se fragmentó, dejando una parte de su poder dentro de cada uno de los cuatro jóvenes. Los jóvenes sobrevivieron, pero desde entonces cada uno lleva en su interior un fragmento elemental. Con el paso del tiempo nació una leyenda: aquel que consiga llevar a los cuatro elementales hasta el altar de Yasméntis recibirá una recompensa inconmensurable y un poder capaz de cambiar el destino de su pueblo.',
                    image: 'Capitulo2.png'
                },
                {
                    chapter: 'CAPÍTULO III • RESCATE EN EL BOSQUE',
                    title: 'La Guerra por los Elementales',
                    text: 'Al escuchar esta promesa, los diferentes pueblos comenzaron a perseguir a los cuatro jóvenes. Cada uno quería ser el primero en encontrarlos y llevarlos ante la guardiana. La ambición por conseguir aquel poder provocó enfrentamientos entre los pueblos.Lo que comenzó como una búsqueda de una recompensa terminó convirtiéndose en una guerra. Pero existe un secreto que pocos conocen: llevar a los elementales ante Yasméntis no significa obtener su poder. Para despertar a la guardiana, los cuatro jóvenes deberán reunirse y liberar voluntariamente los fragmentos que llevan dentro. Cuando eso suceda, Yasméntis podrá recuperar su forma y devolver el equilibrio al bosque.Los cuatro jóvenes, por su parte, perderán los poderes que los mantenían unidos a ella y sus almas regresarán a su destino original. Así comienza la historia de cuatro jóvenes perseguidos por pueblos que desean su poder, sin saber que el verdadero destino de los elementales podría ser mucho más importante que cualquier recompensa.',
                    image: 'Capitulo3.png'
                }
            ],
            mapTitle: 'Escenario: El Bosque Ancestral de los 4 Pueblos',
            mapDesc: 'Mapa dividido en cuatro dominios elementales conectados por senderos boscosos, claros de rescate y santuarios centrales.',
            mapImage: 'Portada.jpg',
            characterGroups: [
                {
                    category: 'Jasmentis',
                    items: [
                        { name: 'Jasmentis', role: 'Guardiana Suprema del Bosque', img: 'jasmentis.jpeg' }
                    ]
                },
                {
                    category: 'Elementales',
                    items: [
                        { name: 'Elemental de Tierra', role: 'Pueblo de la Roca & Raíces', img: 'Elementales.jpeg' },
                        { name: 'Elemental de Agua', role: 'Pueblo de las Mareas', img: 'Elementales - copia (2).jpeg' },
                        { name: 'Elemental de Fuego', role: 'Pueblo Ígneo', img: 'Elementales - copia (3).jpeg' },
                        { name: 'Elemental de Aire', role: 'Pueblo del Viento', img: 'Elementales - copia.jpeg' }
                    ]
                },
                {
                    category: 'Guardianes',
                    items: [
                        { name: 'Guardián Alado', role: 'Centinela & Escolta', img: 'Guardianes - copia.jpeg' }
                    ]
                },
                {
                    category: 'Seres del Bosque',
                    items: [
                        { name: 'Vigilante del Bosque', role: 'Protector de los Senderos', img: 'Vigilantes del bosque - copia (2).jpeg' }
                    ]
                },
                {
                    category: 'Pueblo Fuego',
                    items: []
                },
                {
                    category: 'Pueblo Aire',
                    items: []
                },
                {
                    category: 'Pueblo Tierra',
                    items: []
                },
                {
                    category: 'Pueblo Agua',
                    items: []
                }
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
            title: 'Salud en Movimiento • Clínica & Web de Fisioterapia',
            summary: 'Sitio web desarrollado a medida para servicios de fisioterapia y rehabilitación, con presentación clara de tratamientos, confianza profesional y agendamiento rápido por WhatsApp para pacientes.',
            liveUrl: 'https://salud-en-movimiento.onrender.com'
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
        ${data.liveUrl ? `
          <div class="modal-actions" style="margin-top: 16px;">
            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-relic">
              Visitar sitio en vivo ↗
            </a>
          </div>
        ` : ''}
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

        if (data.characterGroups) {
            html += `
        <div class="modal-section">
          <h3>Personajes & Clases</h3>
          ${data.characterGroups
                    .filter(group => Array.isArray(group.items) && group.items.length > 0)
                    .map(group => `
                <div class="roster-category">
                  <h4 class="roster-category-title">${group.category}</h4>
                  <div class="modal-chars-grid">
                    ${group.items.map(c => `
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
              `).join('')}
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