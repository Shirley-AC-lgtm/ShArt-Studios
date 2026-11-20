document.addEventListener('DOMContentLoaded', () => {
    /* 1. FONDO INTERACTIVO DE RED NEURONAL */
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function initParticles() {
        particles = [];
        const count = Math.min(65, Math.floor((width * height) / 22000));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.6 + 0.6
            });
        }
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(226, 232, 240, 0.35)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 135) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist / 135) * 0.14})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateNetwork);
    }

    resizeCanvas();
    initParticles();
    animateNetwork();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    /* 2. MENÚ MÓVIL */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    /* 3. FILTRO DE PROYECTOS */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* 4. MODAL DE INSPECCIÓN DE PROYECTOS */
    const modal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalCta = document.getElementById('modalCta');

    document.querySelectorAll('.btn-inspect').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            modalCategory.textContent = card.dataset.catLabel;
            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.desc;
            modalTech.textContent = `Arquitectura & Stack: ${card.dataset.tech}`;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    function hideModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    closeModal.addEventListener('click', hideModal);
    modalCta.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    /* 5. CONMUTADOR DE MEMBRESÍAS (ANUAL / MULTI-AÑO) */
    const billingSwitch = document.getElementById('billingSwitch');
    const labelAnnual = document.getElementById('labelAnnual');
    const labelMulti = document.getElementById('labelMulti');
    const amounts = document.querySelectorAll('.amount');
    let isMultiYear = false;

    billingSwitch.addEventListener('click', () => {
        isMultiYear = !isMultiYear;
        billingSwitch.classList.toggle('multi', isMultiYear);
        labelAnnual.classList.toggle('active', !isMultiYear);
        labelMulti.classList.toggle('active', isMultiYear);

        amounts.forEach(el => {
            el.textContent = isMultiYear ? el.dataset.multi : el.dataset.annual;
        });
    });

    /* 6. SELECCIÓN DIRECTA DE MEMBRESÍA HACIA EL FORMULARIO */
    const projectTypeSelect = document.getElementById('projectType');
    document.querySelectorAll('.select-tier').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.dataset.plan;
            projectTypeSelect.value = plan;
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* 7. ENVÍO DEL FORMULARIO EJECUTIVO */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('clientName').value.trim();
        const plan = projectTypeSelect.value;
        formFeedback.textContent = `Solicitud registrada para ${name} (${plan}). Un director ejecutivo de ShĀrt Studios responderá a la brevedad.`;
        contactForm.reset();
    });

    /* 8. ANIMACIONES AL HACER SCROLL */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});