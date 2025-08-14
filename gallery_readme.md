```
/your-project-folder
├── gallery.html              // 你的主HTML文件
├── assets/
│   ├── css/
│   │   └── gallery-styles.css  // 页面专属的CSS样式
│   ├── js/
│   │   ├── gallery_3d.js       // 3D相册的核心逻辑
│   │   ├── repo_posts.js       // Repo帖子的核心逻辑
│   │   └── main.js             // 主逻辑，用于初始化和协调
│   └── data/
│       ├── gallery_images/     // 存放3D相册的图片
│       │   ├── 1.jpg
│       │   ├── 2.jpg
│       │   └── ...
│       └── repo_data/
│           ├── posts_db.js     // Repo帖子的数据源文件
│           ├── md/             // 存放Markdown文件
│           │   ├── post1.md
│           │   └── post2.md
│           └── images/         // 存放Repo帖子中的图片
│               ├── repo_img1.jpg
│               └── ...
└── (其他框架文件如 jquery-1.11.1.min.js)
```
