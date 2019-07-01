import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService, Categorias} from 'src/app/service/database.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage {
  categorias: Categorias[] = [];
  constructor(public navCtrl: NavController,private db: DatabaseService) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getCategorias().subscribe(cats => {
          this.categorias = cats;
        })
        
      }
    });
  }
  
  public redirectPage() {
    this.navCtrl.navigateForward('/categoria/cadastro/[]');
  }
}
