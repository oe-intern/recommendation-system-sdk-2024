<template lang="pug">
.combo-product
  .title Frequent bought together
  .list-products(v-if="configs.view === 1")
    product1(
      v-for="(product, index) in products" :key="`view1-${product.id}`"
      :id="'p'+index",
      :product="product", 
      :configs="configs",
    )
  .list-products2(v-else-if="configs.view === 2")
    product2(
      v-for="product in products" :key="`view2-${product.id}`"
      :product="product", 
      :configs="configs",
    )
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'
const products = reactive([
  {
    id: 'gid://shopify/Product/8909707706614',
    title: 'Milano Shirt',
    handle: 'milano-shirt',
    category: null,
    vendor: 'Giorgio Armani',
    typeprod: [
      { 
        name: "model1",
      },
      { 
        name: "model2",
      }
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/47508129284342',
      },
      {
        id: 'gid://shopify/ProductVariant/47508129317110',
      },
      {
        id: 'gid://shopify/ProductVariant/47508129349878',
      },
      {
        id: 'gid://shopify/ProductVariant/47508129382646',
      },
    ],
    tags: ['03/20', 'AW15', 'button-ups', 'full moon', 'homecore', 'man', 'newman', 'signature', 'stripesmen', 'tops', 'white'],
    status: 'ACTIVE',
    productType: "men's button-ups",
    totalInventory: 1,
    description:
      'This is a demonstration store. You can purchase products like this from Baby & CompanyThe Milano Shirt is classically tailored as the everyday button up shirt for both casual and more formal wear. Red embroidery cascades the center back seam as a nicely added detail. Covered button placket closure at front. Homecore. Color White. 100% Cotton. Made in Portugal. Jacob is wearing a Medium. Also available in Navy. Shop our collection of Homecore.',
    featuredMedia: {
      id: 'gid://shopify/MediaImage/34574809628918',
      alt: '',
      mediaContentType: 'IMAGE',
      preview: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0731/4558/1814/files/5592345600_2_1_2.jpg?v=1732588532',
        },
      },
    },
    priceRangeV2: {
      maxVariantPrice: {
        amount: '178.0',
        currencyCode: 'VND',
      },
      minVariantPrice: {
        amount: '178.0',
        currencyCode: 'VND',
      },
    },
  },
  {
    id: 'gid://shopify/Product/8909708558582',
    title: 'Sweatshirt with slogan on back',
    handle: 'sweatshirt-with-slogan-on-back',
    category: {
      id: 'gid://shopify/TaxonomyCategory/aa-1-4',
    },
    vendor: 'Mango',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/47508131807478',
      },
      {
        id: 'gid://shopify/ProductVariant/47508131840246',
      },
      {
        id: 'gid://shopify/ProductVariant/47508131873014',
      },
      {
        id: 'gid://shopify/ProductVariant/47508131905782',
      },
      {
        id: 'gid://shopify/ProductVariant/47508131938550',
      },
    ],
    tags: ['2/16', 'blue', 'cooloff', 'dresses', 'lilith', 'ondee', 'SALE', 'ss15', 'visible', 'WEEK08', 'woman'],
    status: 'ACTIVE',
    productType: "women's dresses",
    totalInventory: 3,
    description:
      'The Relax Dress tea-length with a full skirt. Reinvented v-neckline. Capped mesh sleeves. Lilith. Color Ondee. 100% Cotton, Mesh Overlay 100% Polyester. Ashley is wearing an X-Small. Shop our collection of Lilith.',
    featuredMedia: {
      id: 'gid://shopify/MediaImage/34574818279670',
      alt: '',
      mediaContentType: 'IMAGE',
      preview: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0731/4558/1814/files/9593303306_2_1_2.jpg?v=1732588595',
        },
      },
    },
    priceRangeV2: {
      maxVariantPrice: {
        amount: '335.0',
        currencyCode: 'VND',
      },
      minVariantPrice: {
        amount: '335.0',
        currencyCode: 'VND',
      },
    },
  },
  {
    id: 'gid://shopify/Product/8909708689654',
    title: 'No Sleeve Night Top',
    handle: 'no-sleeve-night-top',
    category: {
      id: 'gid://shopify/TaxonomyCategory/aa-1-4',
    },
    vendor: 'ASOS',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/47508132233462',
      },
      {
        id: 'gid://shopify/ProductVariant/47508132266230',
      },
      {
        id: 'gid://shopify/ProductVariant/47508132298998',
      },
      {
        id: 'gid://shopify/ProductVariant/47508132331766',
      },
      {
        id: 'gid://shopify/ProductVariant/47508132364534',
      },
    ],
    tags: ['dress', 'dresses', 'gold', 'just in case', 'SALE', 'Shot 4/19', 'silver', 'SS15', 'white', 'woman', 'womens'],
    status: 'ACTIVE',
    productType: "women's dresses",
    totalInventory: 5,
    description:
      'This is a demonstration store. You can purchase products like this from Baby & CompanyThe softened color palette invokes feelings of a childhood summer, now long lost, but the memories remain. Get your groove on with this beauty from Just in Case. Invisible zip closure at center back. Fully lined. Color Silver. Body 57% Polyester, 29% Acetate, 14% Polyester Metal, Skirt 50% Cotton, 42% Polyester, 8% Polyester Metal, Waist band 100% Polyester, Lining 100% Cotton. Lana is wearing a French 36. Shop our collection of Just in Case',
    featuredMedia: {
      id: 'gid://shopify/MediaImage/34574819164406',
      alt: '',
      mediaContentType: 'IMAGE',
      preview: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0731/4558/1814/files/9472319800_2_1_2.jpg?v=1732588600',
        },
      },
    },
    priceRangeV2: {
      maxVariantPrice: {
        amount: '272.0',
        currencyCode: 'VND',
      },
      minVariantPrice: {
        amount: '272.0',
        currencyCode: 'VND',
      },
    },
  },
  {
    id: 'gid://shopify/Product/8909707837686',
    title: 'Mashmallow Top',
    handle: 'mashmallow-top-in-red',
    category: null,
    vendor: 'Giorgio Armani',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/47508129612022',
      },
      {
        id: 'gid://shopify/ProductVariant/47508129644790',
      },
      {
        id: 'gid://shopify/ProductVariant/47508129677558',
      },
    ],
    tags: ['02/12', 'beige', 'blouses', 'cooloff', 'nautical', 'NICO', 'putty', 'SALE', 'ss15', 'tan', 'tops', 'visible', 'woman'],
    status: 'ACTIVE',
    productType: "women's tops",
    totalInventory: 2,
    description:
      'This is a demonstration store. You can purchase products like this from Baby & CompanyThe Marshmallow is a sweet piece for 2015. Wide scoop neckline. Elastic band at waist. Single button closure at center back neck. Lined. Nicholson & Nicholson. Color Beige. 100% Cotton. Made in Japan. Lana is wearing a French 38. Also available in Blue. Shop our collection of NICO, Nicholson & Nicholson.',
    featuredMedia: {
      id: 'gid://shopify/MediaImage/34574810677494',
      alt: '',
      mediaContentType: 'IMAGE',
      preview: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0731/4558/1814/files/5471372600_2_3_2.jpg?v=1732588540',
        },
      },
    },
    priceRangeV2: {
      maxVariantPrice: {
        amount: '209.0',
        currencyCode: 'VND',
      },
      minVariantPrice: {
        amount: '209.0',
        currencyCode: 'VND',
      },
    },
  },
]);
const configs = reactive({
  view: 2,
});
provide("configs", configs);
console.log('ver10')
// const endpoint = `https://localhost:443/api/sdk/recommendation?product_id=${props.id}`;
import { request } from '../../services/http.ts'
const endpoint = "http://localhost:3001/"
console.log('ver11')
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
};
request(endpoint, options)
  .then(response => {
    console.log('Success:', response);
    products.push(...response.products);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// import axios from 'axios';
// async function configView() {
//   const response = await axios.get('https://localhost:443/api/sdk/recommendation/settings');
//   const config: Config = response.data;
//   console.log(config);
//   }
// configView();
</script>

<style lang="scss" scoped>
.combo-product {
  width: 500px;
  font-family: 'monospace', monospace;

  .title {
    margin-bottom: 55px;
    font: 500 2em Arial, sans-serif;
  }
  
  .list-products {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
 
  .list-products2 {
    display: flex;
    gap: 10px;
  }
}
</style>
