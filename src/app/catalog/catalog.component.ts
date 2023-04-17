import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [HttpService],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private httpService: HttpService,
    private localStore: LocalService
  ) {}

  ngOnInit() {
    this.httpService.getData().subscribe({
      next: (data: any) => {
        this.products = data['products'];
        this.initFromStore();
      },
    });
  }

  public key = this.localStore.length;
  public items = [];

  initFromStore() {
    const length = this.localStore.length();
    for (let i = 0; i < length; i++) {
      this.products[i].order = +this.get(i)!;
    }
  }

  get(id: number) {
    return this.localStore.getData(String(id));
  }

  buy(id: number) {
    this.products[id]!.order = 1;
    this.localStore.saveData(String(id), String(this.products[id]!.order));
  }

  setToLocal(id: number) {
    if (this.products[id]!.stock > this.products[id]!.order) {
      this.products[id]!.order = 5;
      this.localStore.saveData(String(id), String(this.products[id]!.order));
    }
  }

  increase(id: number) {
    if (this.products[id]!.stock > this.products[id]!.order) {
      this.products[id]!.order += 1;
      this.localStore.saveData(String(id), String(this.products[id]!.order));
    }
  }

  decrease(id: number) {
    this.products[id]!.order -= 1;
    this.localStore.saveData(String(id), String(this.products[id]!.order));
    if (!this.products[id]!.order) {
      this.localStore.removeData(String(id));
    }
  }
}
