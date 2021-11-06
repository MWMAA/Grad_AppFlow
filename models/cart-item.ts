class CartItem {
  quantity: number;
  productPrice: number;
  productTitle: number;
  sum: number;

  constructor(
    quantity: number,
    productPrice: number,
    productTitle: number,
    sum: number
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
