import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, ItemLista } from 'src/app/service/database.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.page.html',
  styleUrls: ['./execucao.page.scss'],
})
export class ExecucaoPage implements OnInit {
  items : ItemLista[]=[];
  item :any = {};
  lista :any = {};
  campoDeBusca ='';
  total = 0;
  dataCriacao= new Date();

  constructor(private route: ActivatedRoute, 
    private db : DatabaseService,
    private router: Router, 
    private toast: ToastController,
    public loadingController: LoadingController) { }

    /*
     ionViewWillEnter: É acionado ao entrar em uma página antes de se tornar a ativa.
     Use-o para tarefas que você deseja fazer toda vez que entrar na visualização 
     (definindo ouvintes de eventos, atualizando uma tabela, etc.).
     */
  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id!=null){
        this.lista.id=id;
         let clausula='WHERE id = ' +id;
          this.db.getListaCompra(clausula).then(lista => {
            this.lista = lista;
            this.getItems(this.lista.id);
            
         });
      }else{ 
          this.getItems(null);
      }

    });
  } 

  /*ionViewWillLeave:
    Despedido quando você sai de uma página, 
    antes de deixar de ser a ativa. Use-o para coisas que você precisa 
    executar toda vez que estiver saindo de uma página (desative os ouvintes de eventos, etc.).
    */
   ionViewWillLeave(){
     // this.limpar();
   }
   ngOnInit() {

   }



  limpar(){
    this.total=0;
    this.items=[];
    this.campoDeBusca ='';
    this.dataCriacao= new Date();
  }

salvarLista(){
  this.db.addListaCompra(this.lista['name'],this.dataCriacao).then( async (res) => {
    let toast = await this.toast.create({
      message: 'Lista Salva.',
      duration: 3000
    });
    toast.present();
     //AINDA NÃO SEI COMO OBETER O OBJETO INSERIDO COMO RETORNO POR ISSO OBTENHO DESTA FORMA
     //PEGANDO A ULTIMA LISTA INSERIDA PARA VINCULAR OS ITENS 
    let clausulaWhere= ' where id=(select MAX(id) from listaCompra);';
    
    this.db.getListaCompra(clausulaWhere).then(lista => {
      this.lista = lista;
      this.getItems(this.lista.id);
    });

    //this.lista=this.db.getListaCompra(clausulaWhere);
   
  })
   .catch(async (res)=> {
     let toast = await this.toast.create({
       message: 'Erro !.',
       duration: 3000
     });
     toast.present();
   });

}

 getItems(idLista) {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getItems(idLista,true).subscribe(items => {
          this.items = items;
          if(this.items.length >0){
            for (let item of this.items) {
               item.adicionado=false;
             }
          }
          this.getTotalSelecionado();
        })  
      }
    });

   
  }

  onclickItem(item){
    this.item=item;
    if(this.item.id==null){
      item.idListaCompra=this.lista.id;
     // this.db.addItemLista(item);

    }else{
      //item.idListaCompra=null;
     // this.db.deleteItemLista(item.id);
    }

   //this.getItem(this.lista.id,item.idProduto);
  
  }

getItem(idLista, idProduto){
  this.db.getItem(idLista,idProduto).then(item => {
    this.item = item;
    for (let reg of this.items) {
      if(item.idProduto==reg.idProduto){
        this.items.indexOf(item);
        this.getTotalSelecionado();
      }
    }
  });
 
}

  getTotalSelecionado(){
    this.total=0;
    if(this.items.length >0){
     for (let item of this.items) {
        if(item.adicionado){
          this.total++;
        }
      }
    }
  }

}
