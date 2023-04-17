export class Product {
  constructor(
    public img: string,
    public title: string,
    public category: string,
    public price: number,
    public currency: string,
    public stock: number,
    public uom: string,
    public warehouse: string
  ) {}
}
