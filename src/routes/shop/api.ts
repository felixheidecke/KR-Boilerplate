import * as XioniShop from '$lib/boilerplate/xioni/shop-api/'
import { shopModule } from './config.js'

export const Cart = XioniShop.CartFactory(shopModule)
export const Products = XioniShop.ProductsFactory(shopModule)
export const Categories = XioniShop.CategoriesFactory(shopModule)
export const Info = XioniShop.InfoFactory(shopModule)
export const Order = XioniShop.OrderFactory(shopModule)
