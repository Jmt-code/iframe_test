# i18n Translation Files

This directory contains internationalization (i18n) translation files in JSON format.

## Supported Languages

- `en.json` - English (default)
- `es.json` - Español (Spanish)
- `fr.json` - Français (French)
- `de.json` - Deutsch (German)
- `zh.json` - 中文 (Chinese Simplified)
- `ru.json` - Русский (Russian)
- `pt.json` - Português (Portuguese)
- `ja.json` - 日本語 (Japanese)

## File Structure

All translation files follow this standardized structure:

```json
{
  "app": {
    "title": "Application title"
  },
  "ui": {
    "enterUrl": "Enter URL label",
    "urlPlaceholder": "URL input placeholder text",
    "loadButton": "Load button text",
    "deviceLabel": "Device selector label",
    "cancelButton": "Cancel button text",
    "openButton": "Open button text"
  },
  "modal": {
    "title": "Modal dialog title"
  },
  "messages": {
    "emptyStateTitle": "Empty state heading",
    "emptyStateMessage": "Empty state description",
    "errorMessage": "Error message text"
  },
  "devices": {
    "custom": "Custom device name translation"
  },
  "languages": {
    "en": "English",
    "es": "Español",
    "fr": "Français",
    "de": "Deutsch",
    "zh": "中文",
    "ru": "Русский",
    "pt": "Português",
    "ja": "日本語"
  }
}
```

## How to Add a New Language

1. **Create a new JSON file** named with the language code (e.g., `it.json` for Italian)

2. **Copy the structure** from `en.json`

3. **Translate all values** (keep the keys in English)

4. **Update the service**: Add the language code to `availableLangs` array in `src/app/i18n.service.ts`:
   ```typescript
   private availableLangs = ['en', 'es', 'fr', 'de', 'zh', 'ru', 'pt', 'ja', 'it'];
   ```

5. **Add language name**: Update the `languages` object in ALL JSON files to include the new language:
   ```json
   "languages": {
     "en": "English",
     "es": "Español",
     ...
     "it": "Italiano"
   }
   ```

## Translation Guidelines

- **Keep keys consistent** across all language files
- **Maintain the same JSON structure** in all files
- **Use proper character encoding** (UTF-8)
- **Test the translation** in the application after adding
- **Keep text concise** for UI elements (buttons, labels)
- **Use native script** for language names (e.g., "Español" not "Spanish")

## Notes

- The application automatically detects the browser's language on first visit
- User's language preference is saved in localStorage
- Only the selected language file is loaded (lazy loading for performance)
- Language can be changed via selector in the UI (desktop: top bar, mobile: modal)
