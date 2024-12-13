import { addToCart } from "@/services";
import { redirect, jsonUrl, refresh } from "@/services";
import axios from 'axios';

const startPoint = 'https://localhost:443'
export async function clickAddToCart(prod: string | number, id: number) {
  console.log('Add ', prod, "to cart");
  const body = {
    number_of_items: 1,
    product_id: id,
  }
  try {
    addToCart(Number(prod));
    const response = await axios.post(`${startPoint}/api/sdk/events/add-to-cart`, body)
    if (response.status !== 200 || response.data.error) {
      throw new Error(response.data.error || 'Unexpected error occurred');
    }   
    console.log('cart:', response)
    refresh();
  } catch (error) {
    console.error('Error adding to cart, please try again', error);
    alert('Error adding to cart, please try again');
  }
}

export async function productClick(id: number, handle: string) {
  const body = {
    product_id: id,
  }
  const response = await axios.post(`${startPoint}/api/sdk/events/click`, body)
  console.log('click:', response)
  redirect(jsonUrl(handle));
}