document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal al Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Barra de Progreso
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + "%";
    });

    // 3. Modo Oscuro
    const modoBtn = document.getElementById('modoBtn');
    modoBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = modoBtn.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // 4. Typewriter
    const typeElements = document.querySelectorAll('.typewrite');
    typeElements.forEach(el => {
        const toRotate = JSON.parse(el.getAttribute('data-type'));
        let loopNum = 0, txt = '', isDeleting = false;
        const tick = () => {
            let i = loopNum % toRotate.length;
            let fullTxt = toRotate[i];
            txt = isDeleting ? fullTxt.substring(0, txt.length - 1) : fullTxt.substring(0, txt.length + 1);
            el.innerHTML = `<span class="wrap">${txt}</span>`;
            let delta = isDeleting ? 100 : 200;
            if (!isDeleting && txt === fullTxt) { delta = 2000; isDeleting = true; }
            else if (isDeleting && txt === '') { isDeleting = false; loopNum++; delta = 500; }
            setTimeout(tick, delta);
        };
        tick();
    });

    // 5. Filtro de Proyectos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});

function copyEmail() {
    const email = document.getElementById('emailText').innerText;
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.querySelector('.tooltip');
        tooltip.innerText = "¡Copiado!";
        tooltip.style.opacity = "1";
        
        setTimeout(() => {
            tooltip.innerText = "¡Copiar!";
            tooltip.style.opacity = "0";
        }, 2000);
    });
}