import * as XioniShop from '$lib/boilerplate/xioni/shop/index.js'
import { shopModule } from './config.js'

export const Cart = XioniShop.useCart(shopModule)
export const Products = XioniShop.useProducts(shopModule)
export const Categories = XioniShop.useCategories(shopModule)
export const Info = XioniShop.useInfo(shopModule)
export const Order = XioniShop.useOrder(shopModule)
