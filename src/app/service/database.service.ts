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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  categorias = new BehaviorSubject([]);
  produtos = new BehaviorSubject([]);
 

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'anotaai.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadCategorias();
          this.loadProdutos();
          this.dbReady.next(true);
        })
        .catch(e =>  alert(e));
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
  getCategorias(): Observable<Categorias[]> {
    return this.categorias.asObservable();
  }

  getProdutos(): Observable<Produtos[]> {
    return this.produtos.asObservable();
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


  loadProdutos() {
    return this.database.executeSql('SELECT pro.id , pro.descricao , pro.unidade , cat.name , pro.img FROM produtos pro LEFT join categorias cat on cat.id=pro.categoriaId', []).then(data => {
      let produtos: Produtos[] = [];
 
      if (data.rows.length > 0) {
      
        for (var i = 0; i < data.rows.length; i++) {
          produtos.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).descricao,
            unidade: data.rows.item(i).unidade,
            categoria: data.rows.item(i).name,
            img: data.rows.item(i).img

           });
        }
      }
      
      this.produtos.next(produtos);
    });
  }


  getCategoria(id): Promise<Categorias> {
    return this.database.executeSql('SELECT * FROM categorias WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
      }
    });
  }

  addCategoria(name: String) {
    let data = [name];
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

}
