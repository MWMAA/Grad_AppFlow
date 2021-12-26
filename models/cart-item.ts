class CartItem {
  quantity: number;
  cost: number;
  name: string;
  sum: number;
  description: string;

  constructor(
    quantity: number,
    cost: number,
    name: string,
    description: string,
    sum: number
  ) {
    this.quantity = quantity;
    this.cost = cost;
    this.name = name;
    this.sum = sum;
    this.description = description;
  }
}

export default CartItem;
