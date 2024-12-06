<template lang="pug">
.combo-product
  .title Frequent bought together
  .list-products(v-if="configs.layout !== 'layout2'")
    product1(
      v-for="(product, index) in products" :key="`view1-${product.id}`"
      :id="'p'+index",
      :product="product", 
      :configs="configs",
    )
  .list-products2(v-else)
    product2(
      v-for="product in products" :key="`view2-${product.id}`"
      :product="product", 
      :configs="configs",
    )
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import type { IProduct, IConfig } from '@/types'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'

console.log('ComboProduct.vue');
console.log('version4');
const products = reactive<IProduct[]>([]);
const configs = reactive<IConfig>({} as IConfig);
// const example = [
//     {
//       "id": "gid://shopify/Product/8909706887414",
//       "title": "Nuit Trousers in Black",
//       "handle": "nuit-trousers-black",
//       "category": {
//         "id": "gid://shopify/TaxonomyCategory/aa-1-14"
//       },
//       "vendor": "Zara",
//       "variants": [
//         {
//           "id": "gid://shopify/ProductVariant/47508126761206",
//           "title": "Black / X-Small",
//           "taxCode": "",
//           "price": "228",
//           "image": null
//         },
//         {
//           "id": "gid://shopify/ProductVariant/47508126793974",
//           "title": "Black / Small",
//           "taxCode": "",
//           "price": "228",
//           "image": null
//         },
//         {
//           "id": "gid://shopify/ProductVariant/47508126826742",
//           "title": "Black / Medium",
//           "taxCode": "",
//           "price": "228",
//           "image": null
//         }
//       ],
//       "tags": [
//         "Black",
//         "bottoms",
//         "drawstring",
//         "S14",
//         "Shorts",
//         "visible",
//         "Woman"
//       ],
//       "status": "ACTIVE",
//       "productType": "women's shorts",
//       "totalInventory": 3,
//       "description": "A mid length silk short from a company that understands a woman's right to basics. A nylon grosgrain drawstring at waist with on-seam pockets. Drifter. Color Black. 100% Silk. Made in U.S.A. Lana is wearing a size Small.",
//       "featuredMedia": {
//         "id": "gid://shopify/MediaImage/34574798815478",
//         "alt": "",
//         "mediaContentType": "IMAGE",
//         "preview": {
//           "image": {
//             "url": "https://cdn.shopify.com/s/files/1/0731/4558/1814/files/5681379800_2_1_2.jpg?v=1732588467"
//           }
//         }
//       },
//       "priceRangeV2": {
//         "maxVariantPrice": {
//           "amount": "228.0",
//           "currencyCode": "VND"
//         },
//         "minVariantPrice": {
//           "amount": "228.0",
//           "currencyCode": "VND"
//         }
//       }
//     },
//     {
//       "id": "gid://shopify/Product/8909707280630",
//       "title": "Kasuri Jersey Button-Up",
//       "handle": "kasuri-jersey-button-up",
//       "category": {
//         "id": "gid://shopify/TaxonomyCategory/aa-1-13"
//       },
//       "vendor": "Pull and Bear",
//       "variants": [
//         {
//           "id": "gid://shopify/ProductVariant/47508128039158",
//           "title": "Blue / Medium",
//           "taxCode": "",
//           "price": "88",
//           "image": null
//         },
//         {
//           "id": "gid://shopify/ProductVariant/47508128071926",
//           "title": "Blue / Large",
//           "taxCode": "",
//           "price": "88",
//           "image": null
//         },
//         {
//           "id": "gid://shopify/ProductVariant/47508128104694",
//           "title": "Blue / X-Large",
//           "taxCode": "",
//           "price": "88",
//           "image": null
//         }
//       ],
//       "tags": [
//         "Black",
//         "Button Up",
//         "button ups",
//         "Cotton",
//         "F14",
//         "Ivory",
//         "Jersey",
//         "Man",
//         "Men's",
//         "SALE",
//         "SALE30",
//         "top",
//         "tops",
//         "V:Room",
//         "visible"
//       ],
//       "status": "ACTIVE",
//       "productType": "men's button-ups",
//       "totalInventory": 6,
//       "description": "V:Room takes the classic button up and plays it casual by giving it a contrasting fabric inside. Curved hem with side splits. Color Ivory/Black. 100% Cotton. Matt is wearing a size Large. Matt is 6’2â€_x009d_, Chest 38â€_x009d_, Waist 31â€_x009d_, Inseam 34.5â€_x009d_. Also available in Blue/Grey.",
//       "featuredMedia": {
//         "id": "gid://shopify/MediaImage/34574803599606",
//         "alt": "",
//         "mediaContentType": "IMAGE",
//         "preview": {
//           "image": {
//             "url": "https://cdn.shopify.com/s/files/1/0731/4558/1814/files/5714333400_2_1_2.jpg?v=1732588498"
//           }
//         }
//       },
//       "priceRangeV2": {
//         "maxVariantPrice": {
//           "amount": "88.0",
//           "currencyCode": "VND"
//         },
//         "minVariantPrice": {
//           "amount": "88.0",
//           "currencyCode": "VND"
//         }
//       }
//     },
//     {
//       "id": "gid://shopify/Product/8909707378934",
//       "title": "Hubbard Jacket in Navy",
//       "handle": "hubbard-jacket-navy",
//       "category": {
//         "id": "gid://shopify/TaxonomyCategory/aa-1-10-2"
//       },
//       "vendor": "Mango",
//     //   "variants": [
//     //     {
//     //       "id": "gid://shopify/ProductVariant/47508128334070",
//     //       "title": "Navy / Small",
//     //       "taxCode": "",
//     //       "price": "248",
//     //       "image": null
//     //     },
//     //     {
//     //       "id": "gid://shopify/ProductVariant/47508128366838",
//     //       "title": "Navy / Medium",
//     //       "taxCode": "",
//     //       "price": "248",
//     //       "image": null
//     //     },
//     //     {
//     //       "id": "gid://shopify/ProductVariant/47508128399606",
//     //       "title": "Navy / Large",
//     //       "taxCode": "",
//     //       "price": "248",
//     //       "image": null
//     //     },
//     //     {
//     //       "id": "gid://shopify/ProductVariant/47508128432374",
//     //       "title": "Navy / X-Large",
//     //       "taxCode": "",
//     //       "price": "248",
//     //       "image": null
//     //     },
//     //     {
//     //       "id": "gid://shopify/ProductVariant/47508128465142",
//     //       "title": "Navy / XX-Large",
//     //       "taxCode": "",
//     //       "price": "248",
//     //       "image": null
//     //     }
//     //   ],
//       "tags": [
//         "Esemplare",
//         "F14",
//         "hood",
//         "jacket",
//         "knit",
//         "Man",
//         "navy",
//         "Outerwear",
//         "SALE",
//         "SALE30_4",
//         "sweater",
//         "visible",
//         "zip"
//       ],
//       "status": "ACTIVE",
//       "productType": "men's coats & jackets",
//       "totalInventory": 3,
//       "description": "A warm hooded sweater jacket with zip and button closure. A front breast pocket and side angled pockets for your hands. Esemplare. Color Navy. 100% Wool. Spencer is wearing a size Large. Also available in Dark Green.",
//       "featuredMedia": {
//         "id": "gid://shopify/MediaImage/34574805565686",
//         "alt": "",
//         "mediaContentType": "IMAGE",
//         "preview": {
//           "image": {
//             "url": "https://cdn.shopify.com/s/files/1/0731/4558/1814/files/5714343400_2_2_2.jpg?v=1732588507"
//           }
//         }
//       },
//       "priceRangeV2": {
//         "maxVariantPrice": {
//           "amount": "248.0",
//           "currencyCode": "VND"
//         },
//         "minVariantPrice": {
//           "amount": "248.0",
//           "currencyCode": "VND"
//         }
//       }
//     }
// ];

// example.forEach(element => {
//   products.push(element)
// });
console.log('ComboProduct.vue');
import { request } from '@/services';
// addToCart();
// products.push(getCart());

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
// const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`;
// const endpointRecommend = `${ngrok}/api/sdk/products/8909706821878/recommendations`;
const endpointSettings = `https://localhost/api/sdk/shop/settings`;
// const endpointSettings = `${ngrok}/api/sdk/shop/settings`;

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
};

onMounted(() => {
  request(endpointRecommend, options)
    .then((response: { data: IProduct[] }) => {
      console.log('Products fetched:', response.data);
      products.push(...response.data);
    })
    .catch((error: any) => {
      console.error('Error fetching recommendations:', error);
    });

  request(endpointSettings, options)
    .then((response: { data: IConfig }) => {
      console.log('Config fetched:', response.data);
      Object.assign(configs, response.data);
    })
    .catch((error: any) => {
      console.error('Error fetching settings:', error);
    });
});
</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
