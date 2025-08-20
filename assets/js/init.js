function initPage() {
    const htmlEl = document.documentElement;
    let currentLang = 'zh';
    const zhElements = document.querySelectorAll('.lang-zh');
    const enElements = document.querySelectorAll('.lang-en');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const langSwitchBtnDesktop = document.getElementById('lang-switch-btn-desktop');
    const langSwitchBtnMobile = document.getElementById('lang-switch-btn-mobile');
    
    // 新增：需要动态改变 placeholder 的元素
    const searchInput = document.getElementById('repo-search-input');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    function setLanguage(lang) {
        htmlEl.lang = lang === 'zh' ? 'zh-CN' : 'en';
        currentLang = lang;

        zhElements.forEach(el => el.style.display = lang === 'zh' ? 'inline-block' : 'none');
        enElements.forEach(el => el.style.display = lang === 'en' ? 'inline-block' : 'none');
        
        // 切换 <title>
        const titleEl = document.querySelector('title');
        if (titleEl) {
            const titleText = lang === 'zh'
                ? titleEl.getAttribute('data-title-zh')
                : titleEl.getAttribute('data-title-en');
            if (titleText) {
                document.title = titleText;
            }
        }

        document.querySelectorAll('input[data-placeholder-zh]').forEach(input => {
            const placeholder = lang === 'zh'
                ? input.getAttribute('data-placeholder-zh')
                : input.getAttribute('data-placeholder-en');
            if (placeholder) input.placeholder = placeholder;
        });
    }

    function toggleLanguage() {
        setLanguage(currentLang === 'zh' ? 'en' : 'zh');
    }

    if (langSwitchBtnMobile || langSwitchBtnDesktop){
        langSwitchBtnMobile.addEventListener('click', toggleLanguage);
        langSwitchBtnDesktop.addEventListener('click', toggleLanguage);

        window.addEventListener('click', (event) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        setLanguage(currentLang); // 初始化页面语言
    }
}