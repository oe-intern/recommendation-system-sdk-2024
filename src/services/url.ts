export function cutProduct(url: string):string {
  return url.replace(/(\/products\/).*/, '$1');
}
export function productUrl():string {
//   let currentUrl = url.value;
    let currentUrl = window.location.href;
    // let currentUrl = 'https://vtzy11.myshopify.com/products/';
//   currentUrl.replace(/(\/products\/).*/, '$1');
    currentUrl = cutProduct(currentUrl);
  return currentUrl;
}

export function jsonUrl(handle: string): string {
    // return 'https://vtzy11.myshopify.com/products/' + handle + '.json';
  return productUrl() + handle + '.json';
}

export function redirect (url : string) {
  window.location.href = url;
}

export function refresh() {
  redirect(window.location.href);
}

import { computed } from 'vue';
function getUrl(hoi: string = ""): string {
    if(hoi == "") hoi = window.location.href;
    return hoi;
    // return window.location.href;
}
const url = computed(() => getUrl());