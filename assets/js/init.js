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
        zhElements.forEach(el => el.style.display = lang === 'zh' ? 'inline-block' : 'none');
        enElements.forEach(el => el.style.display = lang === 'en' ? 'inline-block' : 'none');
        currentLang = lang;

        // 更新页面标题
        document.title = lang === 'zh' 
            ? '画廊 - 东南大学邦邦同好会' 
            : 'Gallery - SEU BanG Dream Club';

        // 更新搜索框的 placeholder
        if(searchInput) {
            searchInput.placeholder = lang === 'zh' 
                ? searchInput.getAttribute('data-placeholder-zh')
                : searchInput.getAttribute('data-placeholder-en');
        }
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