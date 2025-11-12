// main.js - Script principal para manejo de idiomas

// Variables globales
let currentLanguage = 'es';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar idioma guardado o usar el predeterminado
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    setLanguage(savedLanguage);
    
    // Configurar selector de idioma
    setupLanguageSelector();
    
    // Configurar navegación suave
    setupSmoothScroll();
});

// Función para cambiar el idioma
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error('Idioma no disponible:', lang);
        return;
    }
    
    currentLanguage = lang;
    
    // Actualizar atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Actualizar atributos alt de imágenes
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (translations[lang][key]) {
            element.alt = translations[lang][key];
        }
    });
    
    // Guardar preferencia
    localStorage.setItem('preferredLanguage', lang);
    
    // Actualizar el selector visual
    updateLanguageSelector(lang);
}

// Configurar el selector de idioma
function setupLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLang = document.getElementById('currentLang');
    const currentFlag = document.getElementById('currentFlag');

    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageBtn.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', () => {
        languageBtn.classList.remove('active');
        languageDropdown.classList.remove('active');
    });

    // Seleccionar idioma
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const lang = option.dataset.lang;
            
            // Cambiar el idioma
            setLanguage(lang);
            
            // Cerrar dropdown
            languageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
        });
    });
}

// Actualizar el selector visual
function updateLanguageSelector(lang) {
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLang = document.getElementById('currentLang');
    const currentFlag = document.getElementById('currentFlag');
    
    // Actualizar opciones seleccionadas
    languageOptions.forEach(option => {
        const optionLang = option.dataset.lang;
        const checkIcon = option.querySelector('.check-icon');
        
        if (optionLang === lang) {
            option.classList.add('selected');
            checkIcon.style.opacity = '1';
            
            // Actualizar botón principal
            const flag = option.dataset.flag;
            const langName = option.querySelector('.language-name').textContent;
            currentLang.textContent = langName;
            currentFlag.textContent = flag;
        } else {
            option.classList.remove('selected');
            checkIcon.style.opacity = '0';
        }
    });
}

// Configurar navegación suave
function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Exponer funciones globalmente (opcional)
window.setLanguage = setLanguage;