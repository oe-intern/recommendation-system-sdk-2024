// import type { IProductJson, IProductJs  } from "@/types";
// import { request, getProductJsonUrl, getProductJsUrl } from "@/services";
// import { optionGet } from "@/config";
// import { Ref } from "vue";

// export function getProductJson(handle: string, product: Ref<IProductJson>): boolean {
//   request(getProductJsonUrl(handle), optionGet)
//     .then((response: { product: IProductJson }) => {
//       console.log('json', response);
//       product.value = response.product;
//       console.log('--------------------', product);
//       console.log('--------------------', product.value);
//       return true;
//     })
//     .catch((error: any) => {
//       console.log('json', error);
//     console.log('jsonfalse');
//       return false;
//     });
//   console.log('jsonfalse');
//   return false;
// }

// export function getProductJs(handle: string, productJs: Ref<IProductJs>) {
//   request(getProductJsUrl(handle), optionGet)
//     .then((response: IProductJs ) => {
//       console.log('js', response);
//       // Object.assign(productJs, response)
//       productJs.value = response;
//       console.log('--------------------', productJs);
//       console.log('--------------------', productJs.value);
//     })
//     .catch((error: any) => {
//       console.error('js', error)
//     })
// }