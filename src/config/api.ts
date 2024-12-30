export default {
  openURL: import.meta.env.VITE_ANALYTIC_URL,
};

export const endPointEvents = 'https://localhost:443/api/sdk/events';
export const endpointSettings = `https://localhost/api/sdk/shop/settings`;
export const endPointHandles = `https://localhost/api/sdk/products`;
export function getHandlesApi(id: string | undefined): string {
  return `${endPointHandles}/${id}/recommendations`;
}

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