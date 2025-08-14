document.addEventListener('DOMContentLoaded', function() {

    // --- DOM 元素 ---
    const gallerySection = document.getElementById('gallery-section');
    const repoSection = document.getElementById('repo-section');
    const scrollSwitcher = document.getElementById('scroll-switcher');
    const switcherIcon = scrollSwitcher.querySelector('i');

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    const repoModal = document.getElementById('repo-modal');
    const repoModalClose = document.getElementById('repo-modal-close');
    // 【新增】获取 Swiper 按钮的引用
    const swiperNextBtn = document.querySelector('.swiper-button-next');
    const swiperPrevBtn = document.querySelector('.swiper-button-prev');

    let isAtGallery = true;

    // --- 初始化模块 ---
    Gallery3D.init();
    RepoPosts.init();

    // --- 页面切换逻辑 ---
        // 【修改】用这个新版本完全替换旧的 scrollToSection 函数
    function scrollToSection(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    scrollSwitcher.addEventListener('click', () => {
        isAtGallery = !isAtGallery;
        scrollToSection(isAtGallery ? gallerySection : repoSection);
    });

    // --- 监听滚动来更新UI ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'gallery-section' && entry.isIntersecting) {
                isAtGallery = true;
                switcherIcon.className = 'fa-solid fa-chevron-down';
                Gallery3D.setActive(true);
                
                // 【修改】当图库区可见时，隐藏 Swiper 按钮
                if (swiperNextBtn && swiperPrevBtn) {
                    swiperNextBtn.classList.add('opacity-0', 'pointer-events-none');
                    swiperPrevBtn.classList.add('opacity-0', 'pointer-events-none');
                }

            } else if (entry.target.id === 'repo-section' && entry.isIntersecting) {
                isAtGallery = false;
                switcherIcon.className = 'fa-solid fa-chevron-up';
                Gallery3D.setActive(false);
                
                // 【修改】当 Repo 区可见时，显示 Swiper 按钮
                if (swiperNextBtn && swiperPrevBtn) {
                    swiperNextBtn.classList.remove('opacity-0', 'pointer-events-none');
                    swiperPrevBtn.classList.remove('opacity-0', 'pointer-events-none');
                }
            }
        });
    }, { threshold: 0.5 }); // 超过50%可视时触发

    observer.observe(gallerySection);
    observer.observe(repoSection);

    // --- Lightbox (大图) 模态框逻辑 ---
    document.addEventListener('galleryImageDoubleClick', function(e) {
        lightboxImage.src = e.detail.src;
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
    });

    function closeLightbox() {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
        lightboxImage.src = "";
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) { // 点击背景关闭
            closeLightbox();
        }
    });

    // --- Repo 详情模态框关闭逻辑 ---
    function closeRepoModal() {
        repoModal.classList.add('hidden');
        repoModal.classList.remove('flex');
    }

    repoModalClose.addEventListener('click', closeRepoModal);
    repoModal.addEventListener('click', (e) => {
        if (e.target === repoModal) { // 点击背景关闭
            closeRepoModal();
        }
    });

    // --- 键盘事件监听 ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            closeRepoModal();
        }
    });
});