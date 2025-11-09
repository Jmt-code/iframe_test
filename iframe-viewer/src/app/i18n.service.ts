import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface I18nData {
  app: {
    title: string;
  };
  ui: {
    enterUrl: string;
    urlPlaceholder: string;
    loadButton: string;
    deviceLabel: string;
    openButton: string;
    portrait: string;
    landscape: string;
  };
  modal: {
    title: string;
  };
  messages: {
    emptyStateTitle: string;
    emptyStateMessage: string;
    errorMessage: string;
  };
  devices: {
    custom: string;
  };
  languages: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly availableLangs = ['en', 'es', 'fr', 'de', 'zh', 'ru', 'pt', 'ja'] as const;
  
  // Signals for reactive state
  private currentLangSignal = signal<string>('en');
  private translationsSignal = signal<I18nData | null>(null);
  
  // Public computed signals
  public readonly currentLang = this.currentLangSignal.asReadonly();
  public readonly translations = this.translationsSignal.asReadonly();
  public readonly isLoaded = computed(() => this.translationsSignal() !== null);
  
  constructor(private readonly http: HttpClient) {
    this.initializeLanguage();
  }
  
  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || 
                       (this.availableLangs.includes(browserLang as any) ? browserLang : 'en');
    
    this.loadTranslations(defaultLang);
  }
  
  public loadTranslations(lang: string): void {
    this.http.get<I18nData>(`i18n/${lang}.json`).subscribe({
      next: (translations) => {
        this.translationsSignal.set(translations);
        this.currentLangSignal.set(lang);
        localStorage.setItem('preferredLanguage', lang);
      },
      error: (err) => {
        console.error('Error loading translations:', err);
        // Fallback to English if translation fails
        if (lang !== 'en') {
          this.loadTranslations('en');
        }
      }
    });
  }
  
  public changeLanguage(lang: string): void {
    if (this.availableLangs.includes(lang as any)) {
      this.loadTranslations(lang);
    }
  }
  
  public getAvailableLanguages(): readonly string[] {
    return this.availableLangs;
  }
}
