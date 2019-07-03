import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public dataAtual:String= formatDate(new Date().toLocaleDateString('pt-br') , 'pt-br');
  public menu= [
                  {name: 'Nova Lista', link: '/lista/cadastro/[]',icon:'basket'},
                  {name: 'Minhas Listas', link: '/lista/listagem',icon:'paper'},        
                  {name: 'Novo Produto', link: '/produto/cadastro/[]',icon:'nutrition'},
                  {name: 'Produtos', link: '/produto/listagem',icon:'list-box' },
                  {name: 'Dashboard', link: '/dashboard',icon:'pie' },
                  {name: 'Compras', link: '/compras',icon:'cart' },
                  {name: 'Categorias', link: '/categoria/listagem',icon:'bookmark' },
                  {name: 'QR-Code', link: '#',icon:'qr-scanner' }
                ];

    constructor(public navCtrl: NavController) {

    }

  public redirectPage(link: any) {
    this.navCtrl.navigateForward(link);
  }

}

function formatDate(data, formato) {

  if (formato == 'pt-br') {
    return (data.substr(0, 10).split('-').reverse().join('/'));
  } else {
    return (data.substr(0, 10).split('/').reverse().join('-'));
  }
}
