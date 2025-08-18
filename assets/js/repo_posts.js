// Repo Posts Module
const RepoPosts = (function() {

    let swiperInstance;
    let allPosts = [];

    function init() {
        allPosts = REPO_POSTS_DATA; // 从 posts_db.js 获取数据
        
        generateRepoCards(allPosts);
        initializeSwiper();
        setupEventListeners();
    }
    
    function generateRepoCards(posts) {
        const wrapper = document.getElementById('repo-swiper-wrapper');
        wrapper.innerHTML = ''; // 清空

        posts.forEach((post, index) => {
            const cardHTML = `
                <div class="swiper-slide repo-card" data-index="${index}">
                    <img src="${post.previewImage}" alt="${post.title}">
                    <div class="repo-card-content">
                        <h4 class="text-lg font-bold truncate">${post.title}</h4>
                        <p class="text-sm text-gray-600">by ${post.author}</p>
                    </div>
                </div>
            `;
            wrapper.innerHTML += cardHTML;
        });
    }

    function initializeSwiper() {
        swiperInstance = new Swiper('.repo-slider', {
            slidesPerView: 1.2,
            spaceBetween: 15,
            centeredSlides: true,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // 【新增】启用鼠标滚轮控制
            mousewheel: true,
            breakpoints: {
                // PC端显示更多
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    function setupEventListeners() {
        const wrapper = document.getElementById('repo-swiper-wrapper');
        let lastClickTime = 0;
        
        // --- 帖子双击事件 ---
        wrapper.addEventListener('click', function(e) {
            const card = e.target.closest('.repo-card');
            if (card) {
                const now = new Date().getTime();
                if (now - lastClickTime < 300) { // 双击
                    const postIndex = card.getAttribute('data-index');
                    showPostDetail(allPosts[postIndex]);
                }
                lastClickTime = now;
            }
        });

        // --- 搜索功能 ---
        const searchInput = document.getElementById('repo-search-input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (!searchTerm) {
                document.getElementById('search-results-container').classList.add('hidden');
                return;
            }

            const results = allPosts.filter(post => post.author.toLowerCase().includes(searchTerm));
            displaySearchResults(results, searchTerm);
        });
    }
    
    function displaySearchResults(results, term) {
        const resultsContainer = document.getElementById('search-results-container');
        if (results.length === 0) {
            resultsContainer.innerHTML = `<p class="text-gray-500">未找到作者 "${term}"</p>`;
        } else {
            resultsContainer.innerHTML = results.map((post, index) => `
                <div class="p-2 hover:bg-gray-100 cursor-pointer rounded search-result-item" data-index="${allPosts.indexOf(post)}">
                    <p class="font-semibold">${post.title}</p>
                    <p class="text-sm text-gray-600">作者: ${post.author}</p>
                </div>
            `).join('');
            
            // 为搜索结果添加点击事件
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const postIndex = this.getAttribute('data-index');
                    showPostDetail(allPosts[postIndex]);
                    document.getElementById('search-results-container').classList.add('hidden');
                    document.getElementById('repo-search-input').value = '';
                });
            });
        }
        resultsContainer.classList.remove('hidden');
    }

    async function showPostDetail(post) {
        const modal = document.getElementById('repo-modal');
        const titleEl = document.getElementById('repo-modal-title');
        const contentEl = document.getElementById('repo-modal-content');
        const authorEl = document.getElementById('repo-modal-author');

        titleEl.textContent = post.title;
        authorEl.textContent = post.author;
        contentEl.innerHTML = '<p>加载中...</p>'; // 提示加载
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        try {
            const response = await fetch(post.markdownFile);
            if (!response.ok) throw new Error('Markdown 文件加载失败');
            const markdownText = await response.text();
            
            // 解析Markdown并替换图片路径
            let htmlContent = marked.parse(markdownText);
            
            // 将帖子中的所有图片添加到内容末尾
            post.images.forEach(imgSrc => {
                htmlContent += `<img src="${imgSrc}" class="mt-4 rounded-lg shadow-md w-full object-contain">`;
            });
            
            contentEl.innerHTML = htmlContent;
        } catch (error) {
            contentEl.innerHTML = `<p class="text-red-500">内容加载失败: ${error.message}</p>`;
        }
    }

    return {
        init: init
    };
})();