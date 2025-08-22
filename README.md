# SEU邦邦同好会PPP上海LIVE纪念网站

[English Ver.](README-EN.md)

## 简介

[在线访问](https://therm4l.github.io/PoppinParty250823/)

本项目是为纪念 **Poppin' Party 2025 Global LIVE Shanghai** 活动而制作的纯静态前端网站，作为活动纪念品（无料）的一部分。网站基于 HTML/CSS/JS 构建，并部署于 GitHub Pages。

如果您喜欢这个项目，请不吝点亮一个 Star⭐ 或进行 Fork，这对我们是莫大的鼓励！如需复用或宣传本项目，请务必注明出处。

## 更新

- 2025.08.23：发布第一个版本。

## 功能

### 启动页面

- 应援色的脉冲启动页，通过滑动进入主页面。

### 主页面

- 顶端导航栏，支持不同页面跳转。
- 双语支持，通过JavaScript进行中英文切换。
- 主页面侧边栏，支持主页面的快捷跳转。
- 图片灯箱，支持点击查看大图。
- 留言板检索，支持翻页浏览。
- 致谢名单中，部分人员支持快捷邮箱跳转。
- 外部链接查看与跳转

### 播放歌单页面

- 正常播放器的功能实现。
- 背景为专辑色。

### 画廊

- 3D效果实现，支持拖拽旋转及缩放。
- 点击查看大图效果。

### 投稿

- 滑动翻页。
- 通过作者名称进行稿件检索。
- 支持 `markdown`格式的稿件。

## 开发说明

* 使用通过 CDN 托管的库（Tailwind CSS, Font Awesome, Google Fonts）。
* 所有样式均通过 Tailwind CSS 类和内联样式完成。
* JavaScript 负责处理所有交互元素（语言切换、轮播、灯箱、音乐播放器）。
* **无需构建过程** - 纯静态的 HTML/CSS/JS。

## 项目目录结构

```
 PoppinParty250823
│  .gitignore 
│  excel2json.py	// 转换原始excel到留言板的json
│  foot.html		// 协议展示
│  gallery.html		// 3D画廊
│  head.html		// 顶部导航栏
│  index.html		// 启动页面
│  LICENCE
│  main.html		// 主页面
│  player.html		// 歌单页面
│  README-EN.md
│  README.md
│  repo.html		// 投稿页面
│  robots.txt
│  
└─assets
    ├─audios		// 主页面背景音乐
    │      kzn_music.mp3
    │  
    ├─css		// 不同页面的css文件
    │      gallery.css
    │      repo.css
    │      Sidebar.css	// 主页面的侧边栏
    │  
    ├─data		// 留言板与致谢的名单
    │  │  credits.json
    │  │  message_board.json
    │  │  popipa上海公演神秘企划（收集结果）.xlsx
    │  │  
    │  ├─gallery_images	// 画廊的图片
    │  │      ...
    │  │  
    │  └─repo_data	// 投稿相关文件
    │      │  posts_db.js
    │      │  
    │      ├─images
    │      │      repo_img1.jpg
    │      │      ...
    │      │  
    │      └─md
    │              post1.md
    │  
    ├─images		// 启动页与主界面相关图片
    │  │  启动页.png
    │  │  总图.jpg
    │  │  ...
    │  │  
    │  └─player		// 播放歌单页面相关图片
    │          album_cover_player.png
    │          ...
    │  
    ├─js		// 功能实现js文件
    │      gallery_3d.js
    │      index.js
    │      init.js
    │      jquery-1.11.1.min.js
    │      lyric.js
    │      player.js
    │      progress.js
    │      repo_posts.js
    │  
    └─source		// 歌单相关文件
            musiclist.json
            Returns.jpg
            Returns.mp3
            Returns.txt
            ...
```

## 支持

- 若发现任何 Bug，请优先在 [GitHub Issues](https://github.com/Therm4l/PoppinParty250823/issues) 中提交，我们将会尽快处理。提交时，请尽可能详细地描述问题，包括您使用的 **设备**、**网络情况（是否使用VPN）** 以及 **具体的 Bug 复现步骤**，以便我们快速定位并修复。
- 如果想要留言/投稿，请联系我们的邮箱。点击网页的**主界面-致谢-网页**编写快速发送。

## 致谢

网页的实现感谢3位开发人员的辛勤工作，也感谢测试人员的认真检查（详见**主页面-致谢-网页**）。

## 许可

本项目采用 MIT 和 CC BY-NC-ND 许可，详情请参阅 [LICENSE-MIT](LICENSE) 和 [LICENSE-CC](assets/LICENSE)。
