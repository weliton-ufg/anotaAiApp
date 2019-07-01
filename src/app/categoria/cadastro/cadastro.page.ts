import { DatabaseService } from '../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage implements OnInit {
 public categoria:any = {};
 
  constructor(private route: ActivatedRoute, 
    private bd : DatabaseService,
    private router: Router, 
    private toast: ToastController) { }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    let catId = params.get('id');

    this.bd.getCategoria(catId).then(cats => {
      this.categoria = cats;
     
    });
  });

 }

  salvar() {
    if(this.categoria['id'] !=null){
      this.updateCategoria();
    }else{
      this.addCategoria();
    }
  }
  excluir(){
    this.bd.deleteCategoria(this.categoria['id'])
    .then(async (res)=> {
    this.categoria=null;
      let toast = await this.toast.create({
        message: 'Categoria Excluida.',
        duration: 3000
      });
      toast.present();
    })
    .catch(async (res)=> {
      let toast = await this.toast.create({
        message: 'Erro !.',
        duration: 3000
      });
      toast.present();
    });
  
  }


  addCategoria() {
    this.bd.addCategoria(this.categoria['name'])
    .then(async (res)=> {
      let toast = await this.toast.create({
        message: 'Categoria Salva.',
        duration: 3000
      });
      toast.present();
      this.categoria=null;
    })
    .catch(async (res)=> {
      let toast = await this.toast.create({
        message: 'Erro !.',
        duration: 3000
      });
      toast.present();
    });
  }

  updateCategoria() {
    this.bd.updateCategoria(this.categoria['id'],this.categoria['name']).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Categoria Atualisada.',
        duration: 3000
      });
      toast.present();
    });
  }

}
