import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService, Categorias } from 'src/app/service/database.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public produto:any = {};
  categorias: Categorias[] = [];
  
  constructor(private route: ActivatedRoute, 
    private bd : DatabaseService,
    private router: Router, 
    private toast: ToastController) { }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        let proId = params.get('id');
        this.bd.getProduto(proId).then(prod => {
          this.produto = prod;
        });
        this.bd.getCategorias().subscribe(cats => {
          this.categorias = cats;
        })
      });

      
    }
  salvar(){
    if(this.produto['id'] !=null){
      this.updateProduto();
    }else{
      this.addProduto();
    }

  }
  excluir(){
    this.bd.deleteProduto(this.produto['id'])
    .then(async (res)=> {
      let toast = await this.toast.create({
        message: 'Produto Excluido.',
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
    this.produto={};
  }

  addProduto() {
    this.bd.addProduto(this.produto)
    .then(async (res)=> {
      let toast = await this.toast.create({
        message: 'Produto Salvo.',
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

  updateProduto() {
    this.bd.updateProduto(this.produto).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Produto Atualisado.',
        duration: 3000
      });
      toast.present();
    });
  }
}
