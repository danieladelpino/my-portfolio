const PROJECTS = [
    {
        name: 'OTG Global',
        url: 'https://otg.global/',
        image: './img/otg-site.webp',
        type: {
            es: 'Sitio institucional',
            en: 'Institutional site',
            it: 'Sito istituzionale'
        },
        description: {
            es: 'Asociación sin fines de lucro creada por afiliados de Nu Skin en todo el mundo, para ayudarte a construir y desarrollar tu negocio.',
            en: 'Non-profit association created by Nu Skin affiliates worldwide to help you build and grow your business.',
            it: 'Associazione senza scopo di lucro creata da affiliati Nu Skin in tutto il mondo per aiutarti a costruire e far crescere il tuo business.'
        },
        stack: ['HTML5', 'CSS3', 'PHP', 'WordPress']
    },
    {
        name: 'Cloudhesive',
        url: 'https://www.cloudhesive.com/',
        image: './img/cloudhesive-site.webp',
        type: {
            es: 'Sitio corporativo',
            en: 'Corporate site',
            it: 'Sito aziendale'
        },
        description: {
            es: 'Servicios, soporte y software innovadores para ayudar a sus clientes a construir y operar sistemas críticos en la nube.',
            en: 'Innovative services, support and software that help clients build and run mission-critical systems in the cloud.',
            it: 'Servizi, supporto e software innovativi per aiutare i clienti a costruire e gestire sistemi critici nel cloud.'
        },
        stack: ['WordPress', 'Elementor', 'PHP']
    },
    {
        name: 'Clafil S.A.',
        url: 'https://www.clafil.com.ar/',
        image: './img/clafil-site.webp',
        type: {
            es: 'Sitio corporativo',
            en: 'Corporate site',
            it: 'Sito aziendale'
        },
        description: {
            es: 'Diseña y fabrica sistemas de filtración y aspiración industrial para diversos sectores.',
            en: 'Designs and manufactures industrial filtration and dust extraction systems for many sectors.',
            it: 'Progetta e produce sistemi di filtrazione e aspirazione industriale per diversi settori.'
        },
        stack: ['HTML5', 'CSS3', 'React']
    },
    {
        name: 'Grupo Lucci',
        url: 'https://grupolucci.com.ar/',
        image: './img/grupolucci-site.webp',
        type: {
            es: 'Sitio corporativo',
            en: 'Corporate site',
            it: 'Sito aziendale'
        },
        description: {
            es: 'Empresa agroindustrial que produce y comercializa productos agrícolas y pecuarios.',
            en: 'Agro-industrial company that produces and sells agricultural and livestock products.',
            it: 'Azienda agroindustriale che produce e commercializza prodotti agricoli e zootecnici.'
        },
        stack: ['HTML5', 'CSS3', 'WordPress']
    },
    {
        name: 'AZMED',
        url: 'https://www.azmed.com.ar/inicio/areas-terapeuticas/epof.html',
        image: './img/epof-site.webp',
        type: {
            es: 'Portal científico',
            en: 'Scientific portal',
            it: 'Portale scientifico'
        },
        description: {
            es: 'Portal científico de AstraZeneca con información sobre enfermedades poco frecuentes (EPOF) para profesionales de la salud.',
            en: 'AstraZeneca scientific portal with information on rare diseases for healthcare professionals.',
            it: 'Portale scientifico di AstraZeneca con informazioni sulle malattie rare per i professionisti sanitari.'
        },
        stack: ['HTML5', 'CSS3', 'AEM', 'JavaScript']
    },
    {
        name: 'AZAcademy',
        url: 'https://azacademy.com.ar/',
        image: './img/azacademy-site.png',
        type: {
            es: 'Plataforma educativa',
            en: 'E-learning platform',
            it: 'Piattaforma educativa'
        },
        description: {
            es: 'Iniciativa educativa que busca reforzar los conocimientos científicos en la comunidad médica.',
            en: 'Educational initiative aimed at strengthening scientific knowledge in the medical community.',
            it: 'Iniziativa educativa che mira a rafforzare le conoscenze scientifiche nella comunità medica.'
        },
        stack: ['HTML5', 'CSS3', 'Moodle']
    }
];

// Color del puntito de cada tecnología (si no está, usa violeta)
const TECH_COLORS = {
    'HTML5': '#f97316',
    'CSS3': '#3b82f6',
    'JavaScript': '#facc15',
    'React': '#22d3ee',
    'PHP': '#8b5cf6',
    'WordPress': '#38bdf8',
    'Elementor': '#ec4899',
    'AEM': '#ef4444',
    'Moodle': '#f59e0b'
};
