import { Lista } from './../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Categorias, DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  lista: Lista[] = [];

  constructor(public navCtrl: NavController,private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getListaCompras().subscribe(lista => {
          this.lista = lista;
        })
        
      }
    });
  }

  public listaDetalhe(link: any) {
    console.log(link);
    this.navCtrl.navigateForward(link);
    
  }

  public redirectPage() {
    this.navCtrl.navigateForward('/lista/cadastro/');
  }
}
