// 数据驱动：所有的Repo帖子都在这里定义
const REPO_POSTS_DATA = [
    {
        author: "Taki",
        title: "我的第一次 LIVE 体验！",
        markdownFile: "assets/data/repo_data/md/post1.md", // 指向 .md 文件
        images: [
            "assets/data/repo_data/images/repo_img1.jpg",
            "assets/data/repo_data/images/repo_img2.jpg"
        ],
        previewImage: "assets/data/repo_data/images/repo_img1.jpg" // 预览图
    },
    {
        author: "Anon",
        title: "关于灯宝和祥子的一些猜想",
        markdownFile: "assets/data/repo_data/md/post2.md",
        images: [
            "assets/data/repo_data/images/repo_img3.jpg"
        ],
        previewImage: "assets/data/repo_data/images/repo_img3.jpg"
    },
    {
        author: "Soyo",
        title: "春日影！一生之敌！",
        markdownFile: "assets/data/repo_data/md/post1.md", // 可以复用md文件
        images: [
            "assets/data/repo_data/images/repo_img4.jpg"
        ],
        previewImage: "assets/data/repo_data/images/repo_img4.jpg"
    }
    // ... 在这里添加更多帖子
];