import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  

  products:Product[] = []; 
  dataloaded=false;
  filterText="";


  constructor(
    private productService:ProductService, 
    private activetedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) { } //sepete eklemek için kullanacağız

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
    
  }

  getProducts(){ 
    this.productService.getProducts().subscribe(responnse=>{
      this.products=responnse.data
      this.dataloaded=true;
    })     

  }
  getProductsByCategory(categoryId:number){ 
    this.productService.getProductsByCategory(categoryId).subscribe(responnse=>{
      this.products=responnse.data
      this.dataloaded=true;
    })  

  }

  addToCart(product:Product){
    this.toastrService.success("Sepete eklendi",product.productName)
    this.cartService.addToCart(product);
  }

}

