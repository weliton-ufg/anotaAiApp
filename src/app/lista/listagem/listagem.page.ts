import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  public lista= [
    {name: 'Compra 10/01/2019'},
    {name: 'Compra 11/02/2019'},
    {name: 'Compra 12/03/2019'},
    {name: 'Compra 20/03/2019'},
    {name: 'Compra 09/04/2019'},
    {name: 'Compra 25/04/2019'},
  ]
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  public listaDetalhe(link: any) {
    console.log(link);
    //alert('ola Carol!');
    this.navCtrl.navigateForward(link);
    
  }

  public redirectPage() {
    this.navCtrl.navigateForward('/lista/cadastro/[]');
  }
}
