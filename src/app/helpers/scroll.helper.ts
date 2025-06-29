export class ScrollHelper {
  static scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
