// Repo Posts Module
/**
 * 根据当前环境获取正确的资源根路径
 * @returns {string} - 返回路径前缀，例如在本地是 ""，在 GitHub Pages 上是 "/your-repo-name"
 */
function getBasePath() {
    // window.location.hostname 是当前页面的域名
    // 如果域名包含 'github.io'，我们就认为是在线上环境
    if (window.location.hostname.includes('github.io')) {
        // 在这里填入你的 GitHub 仓库名！
        // 比如，如果你的仓库是 "my-website"，就返回 "/my-website"
        // 注意：前后都有斜杠，但前面那个更重要
        return '/PoppinParty250823'; 
    } else {
        // 否则，我们认为是在本地环境，不需要任何前缀
        return '';
    }
}

// 立即计算并存储根路径，避免重复计算
const basePath = getBasePath();

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

    // async function showPostDetail(post) {
    //     const modal = document.getElementById('repo-modal');
    //     const titleEl = document.getElementById('repo-modal-title');
    //     const contentEl = document.getElementById('repo-modal-content');
    //     const authorEl = document.getElementById('repo-modal-author');

    //     titleEl.textContent = post.title;
    //     authorEl.textContent = post.author;
    //     contentEl.innerHTML = '<p>加载中...</p>'; // 提示加载
    //     modal.classList.remove('hidden');
    //     modal.classList.add('flex');

    //     try {
    //         const response = await fetch(post.markdownFile);
    //         if (!response.ok) throw new Error('Markdown 文件加载失败');
    //         const markdownText = await response.text();
            
    //         // 解析Markdown并替换图片路径
    //         let htmlContent = marked.parse(markdownText);
            
    //         // 将帖子中的所有图片添加到内容末尾
    //         post.images.forEach(imgSrc => {
    //             htmlContent += `<img src="${imgSrc}" class="mt-4 rounded-lg shadow-md w-full object-contain">`;
    //         });
            
    //         contentEl.innerHTML = htmlContent;
    //     } catch (error) {
    //         contentEl.innerHTML = `<p class="text-red-500">内容加载失败: ${error.message}</p>`;
    //     }
    // }
    
    // 这是一个辅助函数，用于手动移除 YAML Front Matter
    function stripYamlFrontMatter(text) {
        // 正则表达式匹配以 '---' 开始和结束的 Front Matter 部分
        // \s*     - 匹配任意空白符（包括换行）
        // ---     - 匹配字面上的 '---'
        // ([\s\S]*?) - 非贪婪匹配任意字符，这是 Front Matter 的内容
        // a.s. -- 确保可以跨行匹配
        const yamlRegex = /^---\s*[\r\n]([\s\S]*?)[\r\n]---\s*[\r\n]/;
        
        // 使用 replace 方法，将匹配到的 Front Matter 部分替换为空字符串
        // 这样就只剩下后面的 Markdown 内容了
        const content = text.replace(yamlRegex, '');
        
        return content;
    }

    async function showPostDetail(post) {
        // --- 新增代码：在这里初始化 markdown-it ---
        const md = window.markdownit({
            html: true,         // 允许 Markdown 源文件中的 HTML 标签
            breaks: true,       // 将单个换行符 (\n) 转换为 <br>，解决你的换行问题
            linkify: true,      // 自动将 URL 文本转换为链接
            typographer: true,  // 启用智能排版，比如将 (c) 转换为 ©
        }).use(window.markdownitFootnote); // 启用脚注插件

        const modal = document.getElementById('repo-modal');
        const titleEl = document.getElementById('repo-modal-title');
        const contentEl = document.getElementById('repo-modal-content');
        const authorEl = document.getElementById('repo-modal-author');

        titleEl.textContent = post.title;
        authorEl.textContent = `by ${post.author}`;
        contentEl.innerHTML = '<div class="flex justify-center items-center h-32"><p class="text-gray-500">加载中...</p></div>';
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        try {
            const response = await fetch(post.markdownFile);
            if (!response.ok) throw new Error(`文件加载失败 (状态: ${response.status})`);
            
            const rawMarkdownText = await response.text();
            
            // --- 核心修改在这里 ---
            // 1. 调用我们自己的函数来剥离 YAML Front Matter
            const content = stripYamlFrontMatter(rawMarkdownText);

            // 2. 使用 markdown-it 实例来渲染剥离后的正文
            let htmlContent = md.render(content);
            // --- 修改结束 ---
            
            // 将帖子对象中定义的图片添加到内容末尾
            if (post.images && post.images.length > 0) {
                post.images.forEach(imgSrc => {
                    htmlContent += `<img src="${imgSrc}" class="mt-4 rounded-lg shadow-md w-full object-contain">`;
                });
            }
            
            contentEl.innerHTML = htmlContent;
        } catch (error) {
            console.error("加载帖子详情时出错:", error);
            contentEl.innerHTML = `<p class="text-red-500">内容加载失败: ${error.message}</p>`;
        }
    }


    return {
        init: init
    };
})();