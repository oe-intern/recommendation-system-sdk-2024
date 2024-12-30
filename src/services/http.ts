export * from './url';

function convertFetchResponse(response: any) {
  const data = {
    statusCode: response.status,
    ok: response.ok,
  };

  return new Promise(resolve => response.text()
    .then((res: any) => resolve({ ...data, json: response.status === 302 ? {} : parseJSON(res) }))
    .catch((error: any) => resolve({ json: error }))
  );
}

function parseJSON(response: any) {
  let data = {};

  try {
    data = JSON.parse(response && response.responseText || response);
  } catch (error) {
    data = { error };
  }

  return data;
}

export function request(endpoint: string, options?: Record<string, any>, isIgnoreErrors?: boolean): Promise<any> {
  const defaultHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

  return new Promise((resolve, reject) => {
    const optionRequest = { ...options };
    optionRequest.headers = (options && options.headers) || defaultHeaders;

    fetch(endpoint, optionRequest)
      .then(convertFetchResponse)
      .then((response: any) => {
        if (response.ok || isIgnoreErrors) {
          return resolve(response.json);
        }

        return reject(response.json);
      })
      .catch((error: Record<string, any>) => {
        reject(new Error(error.message));
      });
  });
}

import { optionPost } from '@/config';
// export function addToCart(pid: number, quantity: number) {
//   const formData = {
//     items: [
//       {    alert('You are add all available quantity to cart.');
//         id: pid, 
//         quantity: quantity, 
//       },
//     ],
//   };
//   return fetch(window.Shopify.routes.root + 'cart/add.js', optionPost(formData))
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Stop add to cart, this variant is not available');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('Item added to cart:', data);
//       // alert('Product added to cart!');
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert('Failed to add product to cart.');
//     });
// }

export async function addToCart(pid: number | undefined, quantity: number): Promise<boolean> {
  const formData = {
    items: [
      {
        id: pid,
        quantity: quantity,
      },
    ],
  };

  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/add.js', optionPost(formData));

    if (!response.ok) {
      throw new Error('Stop add to cart, this variant is not available');
    }

    const data = await response.json();
    console.log('Item added to cart:', data);
    return true;
    // alert('Product added to cart!');
  } catch (error) {
    console.error('Error:', error);
    alert('You are add all available quantity to cart.');
    return false;
    // alert('Failed to add product to cart.');
  }
}