import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [HttpService]
})
export class CatalogComponent implements OnInit {
  products: Product[]=[];

    constructor(private httpService: HttpService){}

    ngOnInit(){

        this.httpService.getData().subscribe({next: (data: any) => this.products=data["products"]});
    }
}
