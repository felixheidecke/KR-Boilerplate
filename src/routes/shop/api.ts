import {
	CartFactory,
	CategoriesFactory,
	InfoFactory,
	OrderFactory,
	ProductsFactory
} from '$lib/boilerplate/libraries/xioni-shop'

import { shopModule } from './config.js'

export const Cart = CartFactory(shopModule)
export const Products = ProductsFactory(shopModule)
export const Categories = CategoriesFactory(shopModule)
export const Info = InfoFactory(shopModule)
export const Order = OrderFactory(shopModule)
