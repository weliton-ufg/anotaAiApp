import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, LoadingController} from '@ionic/angular';
import { DatabaseService, Produtos } from 'src/app/service/database.service';



@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  produtos : Produtos[]=[];

  campoDeBusca ='';

  constructor(public navCtrl: NavController,
    private db: DatabaseService,
    public loadingController: LoadingController) {}

  ngOnInit() {
    this.loadingController.create({
      message: 'Aguarde...',
      duration: 1000
    }).then(loading => loading.present());
    this.getAllProducts();
  }
  
  public redirectPage() {
    this.navCtrl.navigateForward('/produto/cadastro/');
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }

  getAllProducts() {
    if(this.campoDeBusca==null){
      this.campoDeBusca='';
    }
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getProdutos(this.campoDeBusca.trim()).subscribe(prods => {
          this.produtos = prods;
        })  
      }
    });
   
  }
}
