create database BobPepper;

use BoBPepper;

create table Especie_Pimenta (
ID_Especie int primary key auto_increment,
Nome_Pimenta varchar(20),
Grupo varchar(20),
Temp_min numeric,
Temp_max numeric
);

create table Agricultor(
ID_Agricultor int primary key auto_increment,
Nome varchar(50),
Sexo enum('m','f'),
Telefone_fixo numeric(10),
Celular numeric(11),
CPF varchar(11),
Email varchar(40),
Senha varchar(40),
CEP varchar(8),
Numero numeric(5),
Bairro varchar(40),
Logradouro varchar(50),
Cidade varchar(40),
Complemento varchar(40),
Estado varchar(2)
);

create table Estufa (
ID_Estufa int primary key auto_increment,
Fk_Agricultor int,
foreign key(Fk_Agricultor) references Agricultor(ID_Agricultor),
Fk_Especie int,
foreign key(Fk_Especie) references Especie_pimenta(ID_Especie)
);

create table Setor (
ID_Setor int primary key auto_increment,
Fk_Estufa int,
foreign key (Fk_Estufa) references Estufa(ID_Estufa),
Data_plantio date
);
 
create table Sensor (
ID_Sensor int primary key auto_increment,
FK_Setor int,
foreign key (FK_Setor) references Setor(ID_Setor),
Nome varchar(20)
);

create table Eventos_Sensor (
ID_Evento int primary key auto_increment,
Fk_Sensor int,
foreign key (Fk_Sensor) references Sensor(ID_Sensor),
evento_tempo datetime,
Temperatura numeric
);

insert into Especie_Pimenta values 
(null, 'Jalapeno' , 'Capsicum Annuum','21','30'),
(null, 'Páprica' , 'Capsicum Annuum','21','30'),
(null, 'Bode' , 'Capsicum Chinense','21','30'),
(null, 'Biquinho' , 'Capsicum Chinense','21','30'),
(null, 'Cumari-do-Pará' , 'Capsicum Chinense','21','30'),
(null, 'Habareno' , 'Capsicum Chinense','21','30'),
(null, 'Murupi' , 'Capsicum Chinense','21','30'),
(null, 'Dedo-de-Moça' , 'Capsicum Baccatum','18','35'),
(null, 'Cambuci' , 'Capsicum Baccatum','18','35'),
(null, 'Cumari Verdadeira' , 'Capsicum Baccatum','18','35'),
(null, 'Malagueta' , 'Capsicum Frutescens','21','30'),
(null, 'Tabasco' , 'Capsicum Frutescens','21','30');

select * from Especie_pimenta;

insert into Agricultor values
(null,'Eduardo Silva','m','1142007859','11963214558','12236985235','agricultor@hotmail.com','123456789','05611230','85','Bela Vista','Avenida Paulista','São Paulo','Masp','SP'),
(null,'Luiz Gustavo','m','1136857859','11952369587','21364598631','luizgustavo@gmail.com','senha123','52369587','1002','Guarulhos','Rua Caju','São Paulo','Hospital','SP'),
(null,'Gabriel Santos','m','1135659632','11985369512','45632155512','gabrielsantos@outlook.com','gabriel123','15263894','852','Alphaville','Rua Final','São Paulo','Estádio','SP'),
(null,'Giovanna Souza','f','1140012356','11987459632','96523150123','giovannasouza@bandtec.com','giovanna123','85463259','561','Osasco','Rua Rio','São Paulo','Campo','SP'),
(null,'Matheus Jesus','m','1135869532','11975412569','45682135687','omatheusjesus@gmail.com','matheus123','02563256','1235','Aricanduva','Rua 7','São Paulo','Poste','SP'),
(null,'Maria Aparecida','f','1136918804','11989562314','96325415689','mariaaparecida@uol.com','maria123','95135784','5521','Interlago','Rua Sargentos','São Paulo','Batalhão','SP'),
(null,'Guilherme Jesus','m','1135212355','11918259623','02135896341','Guilhermejesus@hotmail.com','guilherme123','96325874','1','Campo Limpo','Rua Cuevas','São Paulo','Sargentos','SP');

select * from agricultor;

insert into Estufa values
(null , 1,8),
(null , 2,3),
(null , 3,6),
(null , 4,12),
(null , 5,8),
(null , 6,1),
(null , 7,2);

select * from estufa;

insert into Setor values
(null,1,'2001-11-25'),
(null,2,'2015-04-11'),
(null,3,'1996-10-02'),
(null,4,'2003-05-19'),
(null,5,'1999-12-05'),
(null,6,'1990-04-01'),
(null,7,'1998-01-22');

select * from setor;

insert into sensor values
(null,1,'A1'),
(null,2,'A2'),
(null,3,'A3'),
(null,4,'A4'),
(null,5,'A5'),
(null,6,'A6'),
(null,7,'A7');

select * from sensor;

insert into Eventos_sensor values
(null,1,'2000-02-23','23:05:12',25);

insert into Eventos_sensor values
(null,2,'2001-12-15','05:15:55',16),
(null,3,'2012-10-05','12:57:45',30),
(null,4,'2013-03-02','16:45:51',20),
(null,5,'1999-11-17','20:13:15',15),
(null,6,'2002-01-28','17:56:05',11),
(null,7,'2018-02-20','02:24:23',30),
(null,2,'2020-12-23','18:45:13',22),
(null,3,'2019-09-19','17:36:17',09),
(null,4,'2019-08-18','03:50:35',26),
(null,5,'2019-05-27','04:45:13',22),
(null,6,'2000-12-30','15:35:52',12),
(null,7,'1998-10-07','12:07:46',28),
(null,2,'1993-07-01','11:25:48',08),
(null,3,'2012-12-12','08:13:50',13),
(null,4,'2013-01-14','20:36:14',18),
(null,5,'2004-03-16','17:57:00',16),
(null,6,'2005-07-03','15:12:12',18),
(null,7,'2008-06-02','09:00:18',35);

select * from eventos_sensor;

select * from Agricultor as a, estufa as d, especie_pimenta as e
where a.id_agricultor = d.fk_agricultor and e.id_especie = d.fk_especie;

select * from sensor as s, eventos_sensor as e
where s.id_sensor = e.fk_sensor;

select * from eventos_sensor;

select * from estufa as e, setor as s
where e.id_estufa = s.fk_estufa;