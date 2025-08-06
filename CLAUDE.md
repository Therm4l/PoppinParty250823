# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static website for the "Poppin' Party Global LIVE 2025 in Shanghai" event organized by SEU Bang Dream Club. The site consists of two main HTML pages with Tailwind CSS styling and vanilla JavaScript functionality.

## Codebase Structure

- `index.html` - Splash/welcome page with background image and entry button
- `main.html` - Main event page with information, gallery, and social links
- `assets/` - Contains images and audio files
  - `images/` - Event visuals, promotional images, and social media assets
  - `audios/` - Background music file (kzn_music.flac)

## Key Features

1. **Bilingual Support** - Toggle between Chinese and English content using JavaScript
2. **Image Carousel** - Interactive image slider in the main content area
3. **Lightbox Gallery** - Click images to view in a modal with download options
4. **Floating Music Player** - Draggable audio player with play/pause and mute controls
5. **Responsive Design** - Mobile-friendly layout using Tailwind CSS

## Development Notes

- Uses CDN-hosted libraries (Tailwind CSS, Font Awesome, Google Fonts)
- All styling is done through Tailwind CSS classes and inline styles
- JavaScript handles all interactive elements (language toggle, carousel, lightbox, music player)
- No build process required - pure static HTML/CSS/JS

## Common Development Tasks

Since this is a simple static site, there are no build, lint, or test commands. Development involves directly editing the HTML files and refreshing the browser to see changes.