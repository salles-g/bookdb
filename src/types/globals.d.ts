declare function $(selector: string): HTMLElement;

declare global {
  interface Window {
    $: typeof $;
  }
  const $: typeof $;
}

export {};
