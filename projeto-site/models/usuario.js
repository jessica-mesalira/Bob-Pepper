'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'ID_Agricultor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'Nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		sobrenome: {
			field: 'Sobrenome',
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf: {
			field: 'CPF',
			type: DataTypes.STRING,
			allowNull: false
		},
		sexo: {
			field: 'Sexo',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'Telefone_fixo',
			type: DataTypes.STRING,
			allowNull: true
		},
		celular: {
			field: 'Celular',
			type: DataTypes.STRING,
			allowNull: true
		},
		dtnasc: {
			field: 'Dt_nasc',
			type: DataTypes.DATE,
			allowNull: false
		},
		cep: {
			field: 'CEP',
			type: DataTypes.STRING,
			allowNull: false
		},
		numero: {
			field: 'Numero',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairro: {
			field: 'Bairro',
			type: DataTypes.STRING,
			allowNull: false
		},
		logradouro: {
			field: 'Logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
		cidade: {
			field: 'Cidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		complemento: {
			field: 'Complemento',
			type: DataTypes.STRING,
			allowNull: true
		},
		estado: {
			field: 'Estado',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'Agricultor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};