import { OrderItem } from "./OrderItem"

export type Order = {
  items: OrderItem[]
  status: 'completed' | 'active'
}