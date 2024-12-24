import { Ref } from 'vue';
import { request } from '@/services';
import type { IConfig, IEntry } from '@/types';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`
const endpointSettings = `https://localhost/api/sdk/shop/settings`
export function getHandles(handles: Ref<string[]>) {
  request(endpointRecommend, options)
    .then((response: { data: IEntry[] }) => {
      console.log('Products fetched:', response.data)
      response.data.forEach(element => {
        handles.value.push(element.handle);
      });
      console.log('handles:', handles);
    })
    .catch((error: any) => {
      console.error('Error fetching recommendations:', error)
    })
}
export function getConfigs(configs: Ref<IConfig>) {
  request(endpointSettings, options)
    .then((response: { data: IConfig }) => {
      console.log('Config fetched:', response.data)
      Object.assign(configs, response.data)
    })
    .catch((error: any) => {
      console.error('Error fetching settings:', error)
    })
}