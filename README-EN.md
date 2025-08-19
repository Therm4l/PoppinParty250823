# SEU BangBang PPP Shanghai LIVE Memorial Website

[中文版](README.md)

## Introduction

[Visit online](therm4l.github.io/PoppinParty250823/)

This project is a purely static front-end website created to commemorate **Poppin' Party 2025 Global LIVE Shanghai**, serving as part of the event’s free memorabilia. Built with HTML, CSS, and JavaScript, the site is hosted on GitHub Pages.

If you enjoy this project, please consider giving us a ⭐ or forking it—your support means a lot! If you reuse or promote the project, be sure to credit the original source.

## Updates

- **2025.08.23**: First version released.

## Features

### Splash Screen

- Pulsing launch screen in the official support color; swipe to enter the main site.

### Main Page

- Top navigation bar for quick access to other pages.
- Bilingual support (Chinese / English) via JavaScript language toggle.
- Sidebar for fast navigation within the main page.
- Image lightbox with click-to-enlarge functionality.
- Paginated message board with search.
- Quick email links for certain names in the credits list.
- External link preview and redirection.

### Playlist Page

- Full-featured music player.
- Background dynamically tinted with album colors.

### Gallery

- 3-D carousel that can be dragged, rotated, and zoomed.
- Click any image to open it in a larger view.

### Submissions

- Swipe-enabled pagination.
- Search submissions by author name.
- Markdown-formatted posts supported.

## Development Notes

- All third-party libraries (Tailwind CSS, Font Awesome, Google Fonts) are loaded via CDN.
- Styling is done entirely with Tailwind utility classes and inline styles.
- JavaScript handles all interactivity: language switching, carousels, lightbox, music player, etc.
- **No build step required**—the site is plain HTML/CSS/JS.

## Project Structure

```
PoppinParty250823
│  .gitignore
│  excel2json.py      // Converts original Excel to message-board JSON
│  foot.html          // Footer / legal notice
│  gallery.html       // 3-D gallery
│  head.html          // Top navigation bar
│  index.html         // Splash screen
│  LICENCE
│  main.html          // Main page
│  player.html        // Playlist player
│  README-EN.md
│  README.md
│  repo.html          // Submission page
│  robots.txt
│
└─assets
    ├─audios          // Background music for the main page
    │   kzn_music.mp3
    │
    ├─css             // Page-specific stylesheets
    │   gallery.css
    │   repo.css
    │   Sidebar.css   // Main-page sidebar styles
    │
    ├─data            // Message board & credits
    │   credits.json
    │   message_board.json
    │   popipa上海公演神秘企划（收集结果）.xlsx
    │
    ├─gallery_images  // Gallery images
    │   ...
    │
    ├─repo_data       // Submission-related files
    │   posts_db.js
    │   └─images
    │   │   repo_img1.jpg
    │   │   ...
    │   └─md
    │       post1.md
    │
    ├─images          // Splash & main page assets
    │   启动页.png
    │   总图.jpg
    │   ...
    │
    └─player          // Playlist page assets
    │   album_cover_player.png
    │   ...
    │
    └─js              // JavaScript modules
    │   gallery_3d.js
    │   index.js
    │   init.js
    │   jquery-1.11.1.min.js
    │   lyric.js
    │   player.js
    │   progress.js
    │   repo_posts.js
    │
    └─source          // Music-list & audio files
        musiclist.json
        Returns.jpg
        Returns.mp3
        Returns.txt
        ...
```

## Support

- If you find any bugs, please open an issue on [GitHub Issues](https://github.com/Therm4l/PoppinParty250823/issues).Provide as much detail as possible: device, network status (VPN usage), and exact steps to reproduce the problem so we can fix it quickly.
- For messages or submissions, email us via the quick link in **Main Page → Credits → Website**.

## Acknowledgement

Special thanks to the three developers who built the site and to the testers for their diligent checks (see **Main Page → Credits → Website** for the full list).

## License

This project is released under the MIT License—see the [LICENCE](LICENCE) file for details.
