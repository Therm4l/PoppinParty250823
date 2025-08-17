document.addEventListener('DOMContentLoaded', function() {

    // --- DOM 元素 ---
    const gallerySection = document.getElementById('gallery-section');
    const repoSection = document.getElementById('repo-section');
    
    // 【修改】获取新的侧边栏元素
    const pageNavSidebar = document.getElementById('page-nav-sidebar');
    const navToGalleryBtn = document.getElementById('nav-to-gallery');
    const navToRepoBtn = document.getElementById('nav-to-repo');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    const repoModal = document.getElementById('repo-modal');
    const repoModalClose = document.getElementById('repo-modal-close');
    const swiperNextBtn = document.querySelector('.swiper-button-next');
    const swiperPrevBtn = document.querySelector('.swiper-button-prev');

    let isAtGallery = true;

    // --- 初始化模块 ---
    Gallery3D.init();
    RepoPosts.init();

    // --- 页面切换逻辑 ---
    function scrollToSection(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 【新增】为新的侧边栏按钮添加事件监听
    navToGalleryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(gallerySection);
    });

    navToRepoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(repoSection);
    });

    // 【新增】移动端侧边栏展开/收起逻辑
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            pageNavSidebar.classList.toggle('open');
        });
    }

    // --- 监听滚动来更新UI ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'gallery-section' && entry.isIntersecting) {
                isAtGallery = true;
                // 【修改】更新新侧边栏的激活状态
                navToGalleryBtn.classList.add('active');
                navToRepoBtn.classList.remove('active');
                Gallery3D.setActive(true);
                
                if (swiperNextBtn && swiperPrevBtn) {
                    swiperNextBtn.classList.add('opacity-0', 'pointer-events-none');
                    swiperPrevBtn.classList.add('opacity-0', 'pointer-events-none');
                }

            } else if (entry.target.id === 'repo-section' && entry.isIntersecting) {
                isAtGallery = false;
                // 【修改】更新新侧边栏的激活状态
                navToGalleryBtn.classList.remove('active');
                navToRepoBtn.classList.add('active');
                Gallery3D.setActive(false);
                
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
        if (e.target === lightboxModal) {
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
        if (e.target === repoModal) {
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