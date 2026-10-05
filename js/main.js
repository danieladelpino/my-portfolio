// ==========================================================
// Inicio (se carga último)
// ==========================================================

// Aplica el idioma guardado una vez que todo el contenido está armado
setLanguage(currentLang);

// fullPage.js: scroll por secciones
new fullpage('#fullpage', {
    anchors: ['inicio', 'proyectos', 'contacto'],
    menu: '#main-nav',
    autoScrolling: true,
    scrollHorizontally: true,
    sectionsColor: ['transparent', 'transparent', 'transparent'],
    scrollOverflow: true,
    scrollOverflowOptions: {
        click: true,
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true
    }
});
