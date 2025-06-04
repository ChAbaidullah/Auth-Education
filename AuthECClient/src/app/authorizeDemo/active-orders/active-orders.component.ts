import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ShopifyService } from '../../shared/services/shopify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-orders',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './active-orders.component.html',
  styles: ``
})
export class ActiveOrdersComponent {
 allOrders: any[] = []; // Store ALL original orders
  orderList: any[] = []; // Display filtered orders (this is what your template uses)

  fromDate: string = '';
  toDate: string = '';
  input: any = [];
    constructor(private userService: UserService, private shopifyService: ShopifyService) {}
    ngOnInit() {
    this.getorder();

  }
  getorder() {

    this.userService.getData().subscribe((res: any) => {
      this.allOrders = res;
      this.orderList = res;
      console.log(this.allOrders)
  //  window.location.reload();
    });
  }
  inactive(Id:any){
this.input={
  id: Id
}
    this.userService.ChangeStatus(this.input).subscribe(
    )
   window.location.reload();
  }
}
