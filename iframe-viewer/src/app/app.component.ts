import { Component, OnInit, OnDestroy, signal, computed, effect, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { I18nService, I18nData } from './i18n.service';

interface Device {
  name: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Mobile Iframe Viewer';
  
  // Signals for reactive state
  private currentUrlSignal = signal<string>('');
  private inputUrlSignal = signal<string>('');
  private safeUrlSignal = signal<SafeResourceUrl | null>(null);
  private selectedDeviceSignal = signal<Device>({ name: 'iPhone SE', width: 375, height: 667 });
  private isMobileSignal = signal<boolean>(false);
  private showModalSignal = signal<boolean>(false);
  private isLandscapeSignal = signal<boolean>(false);
  
  // Public readonly signals
  readonly currentUrl = this.currentUrlSignal.asReadonly();
  readonly inputUrl = this.inputUrlSignal.asReadonly();
  readonly safeUrl = this.safeUrlSignal.asReadonly();
  readonly selectedDevice = this.selectedDeviceSignal.asReadonly();
  readonly isMobile = this.isMobileSignal.asReadonly();
  readonly showModal = this.showModalSignal.asReadonly();
  readonly isLandscape = this.isLandscapeSignal.asReadonly();
  
  // Device Management
  readonly devices: readonly Device[] = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12/13', width: 390, height: 844 },
    { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
    { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    { name: 'Samsung Galaxy S21+', width: 384, height: 854 },
    { name: 'Google Pixel 5', width: 393, height: 851 },
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Custom', width: 375, height: 667 }
  ];
  
  readonly availableLanguages: readonly string[];
  
  // Translations from service (initialized after constructor)
  readonly t;
  readonly currentLang;
  
  // Computed signals
  readonly isCustomDevice = computed(() => this.selectedDevice().name === 'Custom');
  readonly deviceStyle = computed(() => {
    if (this.isMobile()) {
      return { width: '100%', height: '100%' };
    }
    const device = this.selectedDevice();
    const width = this.isLandscape() ? device.height : device.width;
    const height = this.isLandscape() ? device.width : device.height;
    return {
      width: width + 'px',
      height: height + 'px'
    };
  });
  
  readonly iframeHeight = computed(() => {
    if (this.isMobile()) {
      return '100%';
    }
    const device = this.selectedDevice();
    const height = this.isLandscape() ? device.width : device.height;
    return (height - 60) + 'px';
  });
  
  readonly currentWidth = computed(() => {
    const device = this.selectedDevice();
    return this.isLandscape() ? device.height : device.width;
  });
  
  readonly currentHeight = computed(() => {
    const device = this.selectedDevice();
    return this.isLandscape() ? device.width : device.height;
  });
  
  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly i18nService: I18nService
  ) {
    this.availableLanguages = this.i18nService.getAvailableLanguages();
    this.t = this.i18nService.translations;
    this.currentLang = this.i18nService.currentLang;
    
    // Initialize selected device
    this.selectedDeviceSignal.set(this.devices[0]);
  }
  
  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobileSignal.set(window.innerWidth <= 768);
  }
  
  ngOnInit(): void {
    // Detect if mobile
    this.isMobileSignal.set(window.innerWidth <= 768);
    
    // Get URL from query params
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get('url');
    
    if (urlParam) {
      this.inputUrlSignal.set(urlParam);
      this.loadUrl(urlParam);
    } else {
      // Show modal on mobile, wait for user input on desktop
      if (this.isMobile()) {
        this.showModalSignal.set(true);
      }
    }
  }
  
  ngOnDestroy(): void {
    // Cleanup if needed
  }
  
  loadUrl(url: string): void {
    if (!url) return;
    
    // Add https:// if no protocol specified
    if (!url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
    }
    
    this.currentUrlSignal.set(url);
    this.safeUrlSignal.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    
    // Only close modal if URL was successfully loaded
    if (this.isMobile()) {
      this.showModalSignal.set(false);
    }
  }
  
  onLoadUrlClick(): void {
    const url = this.inputUrl();
    if (url.trim()) {
      this.loadUrl(url);
    }
  }
  
  onDeviceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const index = parseInt(select.value);
    this.selectedDeviceSignal.set(this.devices[index]);
  }
  
  toggleOrientation(): void {
    this.isLandscapeSignal.set(!this.isLandscape());
  }
  
  changeLanguage(lang: string): void {
    this.i18nService.changeLanguage(lang);
  }
  
  getDeviceDisplayName(device: Device): string {
    const translations = this.t();
    if (!translations) return device.name;
    return device.name === 'Custom' ? translations.devices.custom : device.name;
  }
  
  getLanguageName(code: string): string {
    const translations = this.t();
    return translations?.languages[code] || code;
  }
  
  // TrackBy functions for *ngFor optimization
  trackByIndex(index: number): number {
    return index;
  }
  
  trackByLang(index: number, lang: string): string {
    return lang;
  }
  
  // Helper to update input URL (for two-way binding)
  updateInputUrl(value: string): void {
    this.inputUrlSignal.set(value);
  }
  
  // Helper to update current language (for two-way binding)
  updateCurrentLang(value: string): void {
    this.changeLanguage(value);
  }
}
