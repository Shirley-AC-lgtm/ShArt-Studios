document.addEventListener('DOMContentLoaded', () => {
    /* 1. PARTÍCULAS ELEMENTALES EN EL FONDO */
    const canvas = document.getElementById('elemental-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, embers = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createEmbers() {
        embers = [];
        const total = Math.min(55, Math.floor((w * h) / 26000));
        for (let i = 0; i < total; i++) {
            embers.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 0.7,
                vy: -(Math.random() * 0.45 + 0.15),
                vx: (Math.random() - 0.5) * 0.35,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }

    function getAccentColor() {
        return getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#34d399';
    }

    function renderParticles() {
        ctx.clearRect(0, 0, w, h);
        const color = getAccentColor();

        for (const p of embers) {
            p.y += p.vy;
            p.x += p.vx;
            if (p.y < -10) p.y = h + 10;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = color;
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

    /* 3. SELECTOR DE PERSONAJES Y AMBIENTE ELEMENTAL */
    const thumbs = document.querySelectorAll('.char-thumb');
    const activeImg = document.getElementById('activeCharImg');
    const activeName = document.getElementById('activeCharName');
    const activeFaction = document.getElementById('activeCharFaction');
    const activeDesc = document.getElementById('activeCharDesc');
    const activeTags = document.getElementById('activeCharTags');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            document.body.className = thumb.dataset.theme;
            activeImg.src = thumb.dataset.img;
            activeImg.alt = thumb.dataset.name;
            activeName.textContent = thumb.dataset.name;
            activeFaction.textContent = thumb.dataset.faction;
            activeDesc.textContent = thumb.dataset.desc;

            activeTags.innerHTML = thumb.dataset.tags
                .split('|')
                .map(tag => `<span>${tag}</span>`)
                .join('');
        });
    });

    /* 4. SELECCIÓN DE MEMBRESÍA HACIA EL FORMULARIO */
    const planSelect = document.getElementById('planSelect');
    document.querySelectorAll('[data-plan]').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.plan;
            const exists = Array.from(planSelect.options).some(opt => opt.value === value);
            if (exists) planSelect.value = value;
        });
    });

    /* 5. FORMULARIO */
    const form = document.getElementById('allianceForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const sender = document.getElementById('nameInput').value.trim();
        status.textContent = `Señal recibida de ${sender}. Registro listo para ${planSelect.value}.`;
        form.reset();
    });

    /* 6. REVEAL AL HACER SCROLL */
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