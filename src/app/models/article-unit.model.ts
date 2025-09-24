import { Article } from "./article.model";
import { Order } from "./order.model";
import { Price } from "./price.model";
import { Warehouse } from "./warehouse.model";

export interface ArticleUnit{
    unit_id?: number;
    unit_expiration_date: Date;
    unit_serial_number: string;
    unit_batch_number: string;
    unit_manufacture_date: Date;
    unit_cost_price?: number;
    wh_id: number;
    ord_id?: number;

    article?: Article;
    price?: Price;
    order?: Order;
    warehouse?: Warehouse;
}