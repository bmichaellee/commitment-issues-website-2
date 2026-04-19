# Commitment Issues — Band Website

A single-page website for **Commitment Issues**, a band.

## Overview

This is a static single-page site featuring:

- Hero section with band name and tagline
- About / bio section
- Shows / upcoming dates
- Music / discography links
- Contact / booking info
- Social media links

## Tech

Plain HTML, CSS, and JavaScript — no build step required. Display strings are centralized in JSON config files grouped by page section for easy content updates.

## Structure

```
commitment-issues-website-2/
├── index.html
├── content/          # JSON config files for display strings
│   ├── hero.json
│   ├── about.json
│   ├── shows.json
│   ├── music.json
│   └── contact.json
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Updating Content

Edit the JSON files in `content/` to update any text, links, or show dates without touching the HTML or CSS.
