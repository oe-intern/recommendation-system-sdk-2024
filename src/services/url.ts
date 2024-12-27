export function cutStoreProductsUrl(url: string):string {
  return url.replace(/(\/products\/).*/, '$1');
}

export function getStoreProductsUrl():string {
  let currentUrl = window.location.href;
  currentUrl = cutStoreProductsUrl(currentUrl);
  return currentUrl;
}

export function getHandleUrl(handle: string): string {
  return getStoreProductsUrl() + handle;
}

export function getDataUrl(handle: string): string {
  return getHandleUrl(handle) + '.json';
}

export function redirect (url : string) {
  window.location.href = url;
}

export function refresh() {
  window.location.href = window.location.href;
}