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

export function addToCart(pid: number) {
    console.log('Adding item to cart...');
    // Example form data
    const formData = {
      items: [
        {
          id: pid, 
          quantity: 2, 
        },
      ],
    };

    // Send a POST request to Shopify's cart/add.js endpoint
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Item added to cart:', data);
        // alert('Product added to cart!');
      })
      .catch((error) => {
        console.error('Error:', error);
        // alert('Failed to add product to cart.');
      });
}
export function getCart() {
  console.log('Fetching cart...');
  fetch(window.Shopify.routes.root + 'products/red-rain-coat.js')
    .then(response => response.json())
    .then(product => { console.log(product); return product; });
}