import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  public detalheProduto(link: any) {
    console.log(link);
    //alert('ola Carol!');
    this.navCtrl.navigateForward(link);
    
  }

}
