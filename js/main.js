let currentLanguage = 'es';

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    setLanguage(savedLanguage);
    
    setupLanguageSelector();
    
    setupSmoothScroll();
});

function setLanguage(lang) {
    if (!translations[lang]) {
        console.error('Idioma no disponible:', lang);
        return;
    }
    
    currentLanguage = lang;
    
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (translations[lang][key]) {
            element.alt = translations[lang][key];
        }
    });
    
    localStorage.setItem('preferredLanguage', lang);
    
    updateLanguageSelector(lang);
}

function setupLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLang = document.getElementById('currentLang');
    const currentFlag = document.getElementById('currentFlag');

    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageBtn.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        languageBtn.classList.remove('active');
        languageDropdown.classList.remove('active');
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const lang = option.dataset.lang;
            
            setLanguage(lang);
            
            languageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
        });
    });
}

function updateLanguageSelector(lang) {
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLang = document.getElementById('currentLang');
    const currentFlag = document.getElementById('currentFlag');
    
    languageOptions.forEach(option => {
        const optionLang = option.dataset.lang;
        const checkIcon = option.querySelector('.check-icon');
        
        if (optionLang === lang) {
            option.classList.add('selected');
            checkIcon.style.opacity = '1';
            
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

window.setLanguage = setLanguage;