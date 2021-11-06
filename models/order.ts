import moment from "moment";
import { number } from "yup/lib/locale";

class Order {
  id: string;
  items: [];
  totalAmount: number;
  date: Date;

  constructor(id: string, items: [], totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
