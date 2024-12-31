// import { redirect, } from "@/services";
// import { endPointEvents } from "@/config";
// import { getStoreProductsUrl } from "@/services";
// import axios from 'axios';

// export async function productClick1(id: number, handle: string) {
//   const body = {
//     product_id: id,
//   }
//   try {
//     const response = await axios.post(`${endPointEvents}/click`, body)
//     console.log(response)
//     console.log('click:', getStoreProductsUrl() + handle)
//     redirect(getStoreProductsUrl() + handle)
//   } catch (error) {
//     console.error('Cannot redirect', error)
//     // alert('Cannot redirect to this product')
//   }
// }