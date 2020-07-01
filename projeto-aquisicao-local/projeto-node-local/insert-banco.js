/*
 abrir a pasta deste arquivo via git bash e executar:
 npm i
 npm start
 talvez mostre uma mensagem de erro de placa arduino 
 mas depois vai começar a registrar os dados
*/ 

// se usar 'true' aqui, os dados serão gerados aleatórios e não recebidos da placa arduíno
const gerar_dados_aleatorios = true; 
const intervalo_geracao_aleatoria_segundos = 5; // intervalo, em segundos, no qual os dados aleatórios serão gerados


const banco = require(`./banco`);

// prevenir problemas com muitos recebimentos de dados do Arduino
require('events').EventEmitter.defaultMaxListeners = 15;



const registros_mantidos_tabela_leitura = 40;
let fk_gerada;

// função que recebe valores de temperatura e umidade
// e faz um insert no banco de dados
function registrar_leitura(temperatura) {
    fk_gerada = parseInt(Math.random()*7)+1;
    console.log('\nIniciando inclusão de novo registro...');
    console.log(`temperatura: ${temperatura}`);
    console.log(`fk: ${fk_gerada}`);
    

    banco.conectar().then(() => {

        return banco.sql.query(`
        INSERT into Eventos_Sensor (FK_Sensor, temperatura, momento) 
        values (${fk_gerada},${temperatura}, CONVERT(Datetime, '${agora()}', 120));
        
        delete from eventos_sensor where ID_Evento not in 
        (select top ${registros_mantidos_tabela_leitura} ID_Evento from Eventos_Sensor order by ID_Evento desc);`)
        .then(() => {
            console.log('Registro inserido com sucesso!');
        });
        

    }).catch(erro => {

        console.error(`Erro ao tentar registrar aquisição na base: ${erro}`);

    }).finally(() => {
        banco.sql.close();
    });

}

// função que retorna data e hora atual no formato aaaa-mm-dd HH:mm:ss
function agora() {
	const momento_atual = new Date();
	const retorno = `${momento_atual.toLocaleDateString()} ${momento_atual.toLocaleTimeString()}`;
	console.log(`Data e hora atuais: ${retorno}`);
	return retorno;
}

if (gerar_dados_aleatorios) {
	// dados aleatórios
	setInterval(function() {
		console.log('Gerando valores aleatórios!');
		registrar_leitura(parseInt(Math.random()*33))//temp maxima do grafico
	}, intervalo_geracao_aleatoria_segundos * 1000);
} else {
	// iniciando a "escuta" de dispositivos Arduino.
	console.log('Iniciando obtenção de valores do Arduino!');
	iniciar_escuta();
}

/*
 abrir a pasta deste arquivo via git bash e executar:
 npm i
 npm start
 talvez mostre uma mensagem de erro de placa arduino 
 mas depois vai começar a registrar os dados
*/