// ==========================================================
// Traducciones (ES / EN / IT)
// ==========================================================

// Para traducir un texto nuevo:
//   1. En el HTML: <span data-i18n="miClave">Texto en español</span>
//      (para placeholders: data-i18n-placeholder="miClave")
//   2. Acá: agregá miClave en es, en e it.
// Los textos de cada proyecto se cargan desde projects-data.js.

const translations = {
    es: {
        navAbout: 'Sobre mí',
        navProjects: 'Proyectos',
        navContact: 'Contacto',
        badge: 'Disponible para nuevos proyectos',
        hello: 'Hola',
        iam: 'Soy',
        role: 'Desarrolladora Front End',
        description: 'Apasionada Desarrolladora Front End ubicada en Argentina.',
        contact: 'Contáctame',
        cv: 'Descargar CV',
        pronouns: '· ella',
        thanks: '¡Gracias por pasar y conocer mi portfolio!',
        projectsEyebrow: 'Portfolio',
        projectsTitle: 'Mis Trabajos',
        projectsSubtitle: 'Últimos proyectos realizados con amor',
        projectsCta: 'Ver sitio online',
        contactEyebrow: 'Contacto',
        contactTitle1: '¿Tenés un proyecto?',
        contactTitle2: 'Hablemos.',
        contactCta: 'Escribime',
        copy: 'Copiar',
        copied: '¡Copiado!',
        formTitle: '¡Enviame un mensaje!',
        formSubtitle: 'Te respondo dentro de las 48 horas.',
        formName: 'Nombre',
        formNamePh: '¿Cómo te llamás?',
        formEmail: 'Correo electrónico',
        formEmailPh: 'tu@email.com',
        formMessage: 'Mensaje',
        formMessagePh: 'Contame sobre tu proyecto',
        formSend: 'Enviar mensaje',
        formSending: 'Enviando...',
        formError: 'Algo salió mal. Probá de nuevo o escribime por mail.',
        formSuccess: '¡Mensaje enviado!',
        formSuccessText: 'Gracias por escribirme, te respondo pronto.',
        formAgain: 'Enviar otro',
        footerMade: 'Hecho con código y café'
    },
    en: {
        navAbout: 'About me',
        navProjects: 'Projects',
        navContact: 'Contact',
        badge: 'Available for new projects',
        hello: 'Hi',
        iam: 'I’m',
        role: 'Front End Developer',
        description: 'Passionate Front End Developer based in Argentina.',
        contact: 'Contact me',
        cv: 'Download CV',
        pronouns: '· she/her',
        thanks: 'Thanks for stopping by and checking out my portfolio!',
        projectsEyebrow: 'Portfolio',
        projectsTitle: 'My Work',
        projectsSubtitle: 'Latest projects, made with love',
        projectsCta: 'View live site',
        contactEyebrow: 'Contact',
        contactTitle1: 'Got a project?',
        contactTitle2: 'Let’s talk.',
        contactCta: 'Write to me',
        copy: 'Copy',
        copied: 'Copied!',
        formTitle: 'Send me a message!',
        formSubtitle: 'I’ll get back to you within 48 hours.',
        formName: 'Name',
        formNamePh: 'What’s your name?',
        formEmail: 'Email',
        formEmailPh: 'you@email.com',
        formMessage: 'Message',
        formMessagePh: 'Tell me about your project',
        formSend: 'Send message',
        formSending: 'Sending...',
        formError: 'Something went wrong. Try again or email me directly.',
        formSuccess: 'Message sent!',
        formSuccessText: 'Thanks for reaching out, I’ll reply soon.',
        formAgain: 'Send another',
        footerMade: 'Made with code and coffee'
    },
    it: {
        navAbout: 'Chi sono',
        navProjects: 'Progetti',
        navContact: 'Contatti',
        badge: 'Disponibile per nuovi progetti',
        hello: 'Ciao',
        iam: 'Sono',
        role: 'Sviluppatrice Front End',
        description: 'Appassionata Sviluppatrice Front End con base in Argentina.',
        contact: 'Contattami',
        cv: 'Scarica CV',
        pronouns: '· lei',
        thanks: 'Grazie per essere passato a vedere il mio portfolio!',
        projectsEyebrow: 'Portfolio',
        projectsTitle: 'I miei lavori',
        projectsSubtitle: 'Ultimi progetti realizzati con amore',
        projectsCta: 'Vedi sito online',
        contactEyebrow: 'Contatti',
        contactTitle1: 'Hai un progetto?',
        contactTitle2: 'Parliamone.',
        contactCta: 'Scrivimi',
        copy: 'Copia',
        copied: 'Copiato!',
        formTitle: 'Inviami un messaggio!',
        formSubtitle: 'Ti rispondo entro 48 ore.',
        formName: 'Nome',
        formNamePh: 'Come ti chiami?',
        formEmail: 'Email',
        formEmailPh: 'tu@email.com',
        formMessage: 'Messaggio',
        formMessagePh: 'Raccontami del tuo progetto',
        formSend: 'Invia messaggio',
        formSending: 'Invio in corso...',
        formError: 'Qualcosa è andato storto. Riprova o scrivimi via email.',
        formSuccess: 'Messaggio inviato!',
        formSuccessText: 'Grazie per avermi scritto, ti risponderò presto.',
        formAgain: 'Invia un altro',
        footerMade: 'Fatto con codice e caffè'
    }
};

let currentLang = storage.get('lang') || 'es';
if (!translations[currentLang]) currentLang = 'es';

// ---------- Cambiar idioma ----------
// (swapText, typeLoop y firstLoad vienen de animations.js)

const setLanguage = (lang) => {
    if (lang === currentLang && !firstLoad) return;
    currentLang = lang;
    const dict = translations[lang];

    let order = 0;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.dataset.i18n;
        if (typeof dict[key] === 'string' && el.textContent !== dict[key]) {
            swapText(el, dict[key], Math.min(order++ * 35, 420));   // efecto en cascada
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (dict[key]) el.placeholder = dict[key];
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    document.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
    storage.set('lang', lang);

    // El título que se escribe solo también entra desde abajo
    const title = document.querySelector('.hero-title');
    if (!firstLoad && !reduceMotion) {
        title.classList.remove('lang-switching');
        void title.offsetWidth;
        title.classList.add('lang-switching');
    }
    typeLoop(dict.role);
    firstLoad = false;
};


document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
