export default {
  openURL: import.meta.env.VITE_ANALYTIC_URL,
};

export const optionGet = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
export function optionPost(formData: any) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }
}

export const endpointSettings = `https://localhost/api/sdk/shop/settings`;
export function getHandlesApi(id: string | undefined): string {
  return `https://localhost/api/sdk/products/${id}/recommendations`;
}
