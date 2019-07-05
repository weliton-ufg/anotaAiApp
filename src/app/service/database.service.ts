import { Produtos } from 'src/app/service/database.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Categorias {
  id: number,
  name: string
}

export interface Produtos {
  id: number,
  name: string,
  img: String,
  unidade: String,
  categoria : String
}

export interface ItemLista {
  id: number,
  adicionado : Boolean,
  idListaCompra : Number,
  idProduto: number,
  nomeProduto : String
}

export interface Lista {
  id: number,
  name : String,
  dataCriacao : Date;
  status : number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  categorias = new BehaviorSubject([]);
  produtos = new BehaviorSubject([]);
  items = new BehaviorSubject([]);
  listaCompra = new BehaviorSubject([]);

  
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'anotaai.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.loadListaCompras();
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.dbReady.next(true);
        })
        .catch(e =>  console.log(e));
    });
  }


  /*addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      //this.loadDevelopers();
    });
  }*/
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  /*
    CATEGORIAS
  */
 getCategorias(): Observable<Categorias[]> {
   this.loadCategorias();
   return this.categorias.asObservable();
 }

 loadCategorias() {
  return this.database.executeSql('SELECT * FROM categorias', []).then(data => {
    let categorias: Categorias[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          categorias.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name
          });
        }
      }
      this.categorias.next(categorias);
    });
  }

  getCategoria(clausula): Promise<Categorias> {
    return this.database.executeSql('SELECT * FROM categorias '+clausula, []).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
      }
    });
  }

  addCategoria(name: String) {
    return this.database.executeSql('INSERT INTO categorias (name) VALUES (?)', [name]).then(_ => {
      this.loadCategorias();
    });
  }
  updateCategoria(id,name) {
    let data = [name];
    return this.database.executeSql(`UPDATE categorias SET name = ? WHERE id = ${id}`, data).then(data => {
      this.loadCategorias();
    })
  }

  deleteCategoria(id) {
    return this.database.executeSql('DELETE FROM categorias WHERE id = ?', [id]).then(_ => {
      this.loadCategorias();
    });
  }


  /*
    PRODUTOS
  */
  getProdutos(query): Observable<Produtos[]> {
    this.loadProdutos(query);
    return this.produtos.asObservable();
  }

  loadProdutos(query) {
    let clausula='';
    if(query!=null && query!=''){
      clausula  = "WHERE pro.descricao like '%"+query+"%'";
    }
  
    return this.database.executeSql('SELECT pro.id , pro.descricao , pro.unidade , cat.name , pro.img FROM produtos pro LEFT join categorias cat on cat.id=pro.categoriaId '+clausula, []).then(data => {
      let produtos: Produtos[] = [];

      if (data.rows.length > 0) {
      
        for (var i = 0; i < data.rows.length; i++) {
          produtos.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).descricao,
            unidade: data.rows.item(i).unidade,
            categoria: data.rows.item(i).name,
            img: data.rows.item(i).img,
          });
        }
      }
      
      this.produtos.next(produtos);
    });

  }

 getProduto(id): Promise<Produtos> {
  return this.database.executeSql('SELECT id , descricao , unidade , categoriaId , img FROM produtos WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).descricao,
        unidade: data.rows.item(0).unidade,
        categoria: data.rows.item(0).categoriaId,
        img: data.rows.item(0).img,
        check : false
      }
    });
  }

  addProduto(prod: Produtos) {
    let data = [prod.name, prod.categoria, prod.unidade];
   
    return this.database.executeSql('INSERT INTO produtos (descricao, categoriaId, unidade) VALUES (?, ?, ?)', data).then(_ => {
      this.loadProdutos('');
    });
  }
  updateProduto(prod: Produtos) {
    let data = [prod.name, prod.categoria, prod.unidade];
    return this.database.executeSql(`UPDATE produtos SET descricao = ?, categoriaId = ?, unidade = ? WHERE id = ${prod.id}`, data).then(data => {
      this.loadProdutos('');
    })
  }
  deleteProduto(id) {
    return this.database.executeSql('DELETE FROM produtos WHERE id = ?', [id]).then(_ => {
      this.loadProdutos('');
    });
  }

 /*
    ITEMS LISTA DE COMPRAS
  */

 getItems(idLista,flagSomenteSalvos): Observable<ItemLista[]> {
    this.loadItems(idLista,flagSomenteSalvos);
    return this.items.asObservable();
  }

 getItem(idLista,idProduto): Promise<ItemLista> {

    let sqlInserte = '';
    sqlInserte += ' insert into itemDaListaTemp (id , idproduto , idlistacompra) \n';
    sqlInserte += '  Select ';
    sqlInserte += '  item.id , ';
    sqlInserte += '  item.idproduto , ';
    sqlInserte += '  item.idlistacompra ';
    sqlInserte += '  from itemListaCompra item ';
    sqlInserte += '  Where item.idListaCompra = '+idLista+' ; '; 
    sqlInserte += '  AND item.idProduto  = '+idProduto+' ; '; 
       
     let select = '';
     select += '  SELECT distinct  ';
     select += '  item.id , ';
     select += '  pro.descricao , ';
     select += '  item.idListaCompra , ';
     select += '  pro.id as idProduto  ';
     select += '  from produtos pro  ';
     select += '  left join itemDaListaTemp item on item.idproduto=pro.id ';
     select += '  ORDER by item.id  DESC , ';
     select += '  pro.descricao ASC ; '; 
     
     this.database.executeSql('DROP TABLE IF EXISTS itemDaListaTemp ;', []);
     this.database.executeSql('CREATE TEMPORARY TABLE itemDaListaTemp (id integer, idproduto integer, idlistacompra integer);', []);
     this.database.executeSql(sqlInserte.toString(), []);



    return this.database.executeSql(select.toString(), []).then(data => {
      return {
        id: data.rows.item(0).id,
          idListaCompra: data.rows.item(0).idListaCompra,
          adicionado : data.rows.item(0).id==null ? false : true,
          idProduto: data.rows.item(0).idProduto,
          nomeProduto : data.rows.item(0).descricao
      }
    });
  }

  addItemLista(item: ItemLista) {
    let data = [item.idProduto, item.idListaCompra];
     return this.database.executeSql('INSERT INTO itemListaCompra (idProduto, idListaCompra) VALUES (?, ?)', data).then(_ => {
    });
  }

  deleteItemLista(id) {
    return this.database.executeSql('DELETE FROM itemListaCompra WHERE id = ?', [id]).then(_ => {
    });
  }

 loadItems(idLista,flagSomenteSalvos) {
   
   let sqlInserte = '';
   sqlInserte += ' insert into itemDaListaTemp (id , idproduto , idlistacompra) \n';
   
   sqlInserte += '  Select ';
   sqlInserte += '  item.id , ';
   sqlInserte += '  item.idproduto , ';
   sqlInserte += '  item.idlistacompra ';
   sqlInserte += '  from itemListaCompra item ';
   sqlInserte += '  Where item.idListaCompra = '+idLista+' ; ';  
      
    let select = '';
    select += '  SELECT distinct  ';
    select += '  item.id , ';
    select += '  pro.descricao , ';
    select += '  item.idListaCompra , ';
    select += '  pro.id as idProduto  ';
    select += '  from produtos pro  ';
  
    if(flagSomenteSalvos){
      select += '  Inner join itemDaListaTemp item on item.idproduto=pro.id ';
    }else{
      select += '  left join itemDaListaTemp item on item.idproduto=pro.id ';
    }
    
    select += '  ORDER by item.id  DESC , ';
    select += '  pro.descricao ASC ; '; 
    
    this.database.executeSql('DROP TABLE IF EXISTS itemDaListaTemp ;', []);
    this.database.executeSql('CREATE TEMPORARY TABLE itemDaListaTemp (id integer, idproduto integer, idlistacompra integer);', []);
    this.database.executeSql(sqlInserte.toString(), []);
  
    
  return this.database.executeSql(select.toString(), []).then(data => {
   
    let items: ItemLista[] = [];
    if (data.rows.length > 0) {
     
      for (var i = 0; i < data.rows.length; i++) {
        items.push({ 
          id: data.rows.item(i).id,
          idListaCompra: data.rows.item(i).idListaCompra,
          adicionado : data.rows.item(i).id==null ? false : true,
          idProduto: data.rows.item(i).idProduto,
          nomeProduto : data.rows.item(i).descricao
         });
      }
    }
    
    this.items.next(items);
  }).catch(async (res)=> {
  // alert(res);
  });

}
  /*
  LISTA DE COMPRAS
  */

 getListaCompras(): Observable<Lista[]> {
  this.loadListaCompras();
  return this.listaCompra.asObservable();
 }

 addListaCompra(name, dataCriacao) {
  let data = [name,dataCriacao,0];
    return this.database.executeSql('INSERT INTO listaCompra (name , dataCriacao , status) VALUES (? , ? , ?)', data).then(_ => {
      this.loadListaCompras();
    });
  }


  getListaCompra(clausula): Promise<Lista> {
    return this.database.executeSql('SELECT id , name, dataCriacao, status FROM listaCompra '+clausula, []).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).descricao,
        dataCriacao :data.rows.item(0).dataCriacao,
        status : data.rows.item(0).dataCriacao
      }
    });
  }


  loadListaCompras() {
    return this.database.executeSql('SELECT id , name, dataCriacao , status FROM listaCompra ', []).then(data => {
      let listaCompra: Lista[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          listaCompra.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            dataCriacao :data.rows.item(i).dataCriacao,
            status :data.rows.item(i).status
           });
        }
      }
      
      this.listaCompra.next(listaCompra);
    });
  
  }
  
}
