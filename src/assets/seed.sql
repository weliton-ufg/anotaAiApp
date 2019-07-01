CREATE TABLE IF NOT EXISTS categorias(id integer primary key AUTOINCREMENT NOT NULL, name TEXT UNIQUE);
CREATE TABLE IF NOT EXISTS produtos (id integer primary key AUTOINCREMENT NOT NULL,unidade CHAR TEXT,descricao TEXT UNIQUE,valor_unitario MONEY, img blob, categoriaId INTEGER);

CREATE TABLE IF NOT EXISTS listaCompra(id integer primary key AUTOINCREMENT NOT NULL, name TEXT UNIQUE, dataCriacao Date, dataExecucao Date, status integer);
CREATE TABLE IF NOT EXISTS itemListaCompra(id integer primary key AUTOINCREMENT NOT NULL, name TEXT UNIQUE, idListaCompra integer, idProduto integer);


INSERT OR IGNORE INTO categorias (name) values ('Carnes e frios');
INSERT OR IGNORE INTO categorias (name) values ('Bebidas');
INSERT OR IGNORE INTO categorias (name) values ('Frutas e legumes');
INSERT OR IGNORE INTO categorias (name) values ('Produtos em geral');
INSERT OR IGNORE INTO categorias (name) values ('Produtos de higiene e limpeza');
INSERT OR IGNORE INTO categorias (name) values ('Produtos de Padaria');
INSERT OR IGNORE INTO categorias (name) values ('Temperos');
INSERT OR IGNORE INTO categorias (name) values ('Produtos de higiene e uso pessoal');
INSERT OR IGNORE INTO categorias (name) values ('Produtos úteis para o dia a dia');
INSERT OR IGNORE INTO categorias (name) values ('Produtos alimentícios');


INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('PT - Pacote','Café', (select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('CX - Caixa','Caldo de carne',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('CX - Caixa','Caldo de galinha',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Catchup',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Extrato de tomate',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Iogurte de frutas',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Óleo',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Sal',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Adoçante',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Creme de leite',(select id from categorias where name='Produtos alimentícios'));

INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Fermento biológico',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Leite integral',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Maionese',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Molho de tomate',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('DZ - Duzia','Ovos',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Arroz',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Barras de cereal',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Granola',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Leite condensado',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Mostarda',(select id from categorias where name='Temperos'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Sopa',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Biscoito',(select id from categorias where name='Produtos alimentícios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Queijo branco',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Frango',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('kg - Kilograma','Peito de frango',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Empanados',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('kg - Kilograma','Peixe',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('kg - Kilograma','Carne bovina',(select id from categorias where name='Carnes e frios'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Água mineral',(select id from categorias where name='Bebidas'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Refrigerante',(select id from categorias where name='Bebidas'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Suco',(select id from categorias where name='Bebidas'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Cerveja',(select id from categorias where name='Bebidas'));
       
INSERT OR IGNORE INTO produtos (unidade, descricao, categoriaId) 
values('UN - Unidade','Vinho',(select id from categorias where name='Bebidas'));


