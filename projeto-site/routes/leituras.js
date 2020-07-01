var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;



/* Recuperar as últimas N leituras */
router.get('/ultimas/:Email', function (req, res, next) {
	const Email = req.params.Email;	
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);

	const instrucaoSql = `select top ${limite_linhas} 
						ID_Evento, 
						FK_Sensor, 
						momento,
						FORMAT(momento,'HH:mm:ss') as momento_grafico,
						Temperatura
						FROM Eventos_Sensor es, Agricultor a, Estufa et, Sensor sen 
						WHERE et.ID_Estufa = sen.FK_estufa 
						AND es.Fk_Sensor = sen.ID_Sensor  AND a.ID_Agricultor = et.Fk_Agricultor
						AND a.Email = '${Email}'`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true
	})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


// tempo real (último valor de cada leitura)
router.get('/tempo-real/:Email', function (req, res, next) {
	const Email = req.params.Email;	
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select  ID_Evento, FK_Sensor, momento, FORMAT(momento,'HH:mm:ss') as momento_grafico, Temperatura FROM Eventos_Sensor es, Agricultor a, Estufa et, Sensor sen 
	WHERE et.ID_Estufa = sen.FK_estufa 
	AND es.Fk_Sensor = sen.ID_Sensor  AND a.ID_Agricultor = et.Fk_Agricultor
	AND a.Email = '${Email}' order by ID_Evento desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


// estatísticas (max, min, média, mediana, quartis etc)
router.get(`/estatisticas/:Email`, function (req, res, next) {
	const Email = req.params.Email;	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media
							FROM Eventos_Sensor es, Agricultor a, Estufa et, Sensor sen 
							WHERE et.ID_Estufa = sen.FK_estufa 
							AND es.Fk_Sensor = sen.ID_Sensor  AND a.ID_Agricultor = et.Fk_Agricultor
							AND a.Email = '${Email}'`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


module.exports = router;
