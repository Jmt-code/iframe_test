# 📱 Mobile Iframe Viewer

Angular web application to preview websites in an iframe with mobile device simulation.

## 🌐 Live Demo

**[https://jmt-code.github.io/iframe_test/](https://jmt-code.github.io/iframe_test/)**

Try it with a URL parameter: `https://jmt-code.github.io/iframe_test/?url=https://example.com`

## 🚀 Quick Start

```bash
npm install
npm start
```

Open: `http://localhost:4200/?url=https://example.com`

## 🌐 Usage

### With URL parameter (recommended)
```
http://localhost:4200/?url=https://your-site.com
```

### Without URL parameter
- **Desktop**: Enter URL in the top search bar
- **Mobile**: A modal will appear to enter the URL

## 📱 Available Devices

- iPhone SE (375×667)
- iPhone 12/13 (390×844)
- iPhone 14 Pro Max (430×932)
- Samsung Galaxy S21 (360×800)
- Samsung Galaxy S21+ (384×854)
- Google Pixel 5 (393×851)
- iPad Mini (768×1024)
- iPad Pro (1024×1366)
- Custom (resizable - drag bottom-right corner)

## 🔧 Build & Deploy

### Production build
```bash
npm run build:prod
```

### Deploy to GitHub Pages
1. Update `base-href` in `package.json` with your repository name
2. Run:
```bash
npm run deploy
```

Your app will be available at: `https://your-username.github.io/your-repo/`

## 🌐 i18n (Internationalization)

The application supports **8 languages** with standardized JSON files:

- 🇬🇧 **English** (en) - Default
- 🇪🇸 **Español** (es)
- 🇫🇷 **Français** (fr)
- 🇩🇪 **Deutsch** (de)
- 🇨🇳 **中文** (zh)
- 🇷🇺 **Русский** (ru)
- 🇵🇹 **Português** (pt)
- 🇯🇵 **日本語** (ja)

### Translation Files

All translations are located in `public/i18n/*.json` following the standard i18n format:

```json
{
  "app": { "title": "..." },
  "ui": { "loadButton": "...", ... },
  "modal": { "title": "..." },
  "messages": { ... },
  "devices": { "custom": "..." },
  "languages": { ... }
}
```

### How it works

- Auto-detects browser language on first visit
- Language preference saved in localStorage
- Language selector available in UI (desktop: top bar, mobile: modal)
- Lazy-loaded JSON files (only loads selected language)

### Adding a new language

1. Create `public/i18n/[code].json` (e.g., `it.json` for Italian)
2. Copy structure from `en.json` and translate all values
3. Add language code to `I18nService.availableLangs` array in `src/app/i18n.service.ts`
4. Add language name to all `languages` objects in JSON files

## 🔒 Features

✅ Full iframe permissions (camera, microphone, geolocation, etc.)  
✅ Responsive design (fullscreen on mobile, simulator on desktop)  
✅ Multiple predefined mobile devices  
✅ Custom resizable mode  
✅ Multi-language interface (8 languages with i18n JSON files)  
✅ Auto-detect browser language  
✅ LocalStorage language persistence

## ⚠️ Limitations

Some websites block iframe embedding using `X-Frame-Options` header (e.g., Google, Facebook, Twitter). This is a server-side restriction and cannot be bypassed by the application.
