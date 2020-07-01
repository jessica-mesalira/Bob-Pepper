// primeira variavel que armazena a configuração do gráfico
var config = {
    type: 'line', //define o tipo do gráfico, nesse caso: Gráfico de linhas
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura',
            backgroundColor: window.chartColors.blue, // cor da bolinha no gráfico
            borderColor: window.chartColors.blue, // cor da linha do gráfico
            data: [],
            fill: false, //define se será ou não preenchida o espaço "vazado" entre as linhas
        }]
    },
    options: {
        responsive: true, //define se será ou não responsivo
        title: {
            display: true,
            text: 'Gráfico de histórico de temperatura' //"título do gráfico"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Horário da Leitura' //titulo do eixo X
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'ºC' //titulo do eixo Y
                }
            }]
        }
    }
};



// esse "sortearTemperatura()" será desnecessário quando usarmos o backend futuramente
function sortearTemperatura() {
    var limiteMin = 5; //define limite minimo de temperatura para ser sorteada
    var limiteMax = 23;// define o limite maximo de temperatura
    var minimoAbsoluto = Math.abs(limiteMin);//retorna o valor absoluto do numero
    return (Math.random() * (minimoAbsoluto + limiteMax) - minimoAbsoluto).toFixed(1); //gera os dados de temperatura
}

function recuperarDadosIniciais() {

    // esse "registros" será recuperado do backend futuramente
    var registros = [
        {
            momento: '01:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '02:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '03:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '04:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '05:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '06:00:00',
            leitura: sortearTemperatura()
        },
        {
            momento: '07:00:00',
            leitura: sortearTemperatura()
        }
    ];

    var contador = 0;

    // registros.length é a quantidade de itens em "registros"
    while (contador < registros.length) {//loop para continuar inserindo novos valores de temperatura

        config.data.labels.push(registros[contador].momento);  // incluir um novo momento
        config.data.datasets[0].data.push(registros[contador].leitura);  // incluir uma nova leitura

        contador++;
    }

}

function receberNovasLeituras() {
    setTimeout(() => {

        // esses "agora" etc até "momentos" serão desnecessários quando usarmos o backend futuramente
        var agora = new Date();
        var dia = agora.getDay();
        var mes = agora.getMonth();
        var ano = agora.getFullYear();
        var hora = agora.getHours();
        var minuto = agora.getMinutes();
        var segundo = agora.getSeconds();
        var momento = `${hora > 9 ? '' : '0'}${hora}:${minuto > 9 ? '' : '0'}${minuto}:${segundo > 9 ? '' : '0'}${segundo}`;

        // esse "novoRegistro" será recuperado do backend futuramente
        var novoRegistro = {
            momento: momento,
            leitura: sortearTemperatura()
        };


        // tirando e colocando valores no gráfico
        config.data.labels.shift(); // apagar o primeiro
        config.data.labels.push(novoRegistro.momento); // incluir um novo momento
        config.data.datasets[0].data.shift();  // apagar o primeiro
        config.data.datasets[0].data.push(novoRegistro.leitura); // incluir uma nova leitura

        textinho.innerHTML = `${novoRegistro.leitura}ºC`;//exibe temperatura que foi gerada

      if(dia < 10){
          dia = `0${dia}`;
      }
      if(mes < 10){
        mes = `0${mes}`;
      }// verifica se o valor do dia ou mês que foi pego do sistema é menor que dez para formatar corretamente no padrão 04 por exemplo

        if(novoRegistro.leitura < 5){//verifica se a temperatura minima foi excedida
            textinho.innerHTML = `<span style='color:blue;'>${novoRegistro.leitura}ºC</span> TEMPERATURA BAIXA!<img src='img/frio.png' width='20px'>`;
            temp_minima_historico.innerHTML = `Última temperatura mínima excedida: <b>${novoRegistro.leitura}ºC</b> <br> Dia ${dia}/${mes}/${ano} às ${momento}`; //mostra formata as informações de quando tal evento ocorreu
        }else if(novoRegistro.leitura > 22){//verifica se a temperatura máxima foi excedida
            textinho.innerHTML = `<span style='color:red;'>${novoRegistro.leitura}ºC</span> TEMPERATURA ALTA! <img src='img/quente.png' width='20px'>`;
            temp_max_historico.innerHTML = `Última temperatura máxima excedida: <b>${novoRegistro.leitura}ºC</b> <br> Dia ${dia}/${mes}/${ano} às ${momento}`;//mostra formata as informações de quando tal evento ocorreu
        }

        

        // Atualiza o gráfico
        window.graficoLinha.update();

        // agendar a chamada da mesma função para daqui a 7 segundos
        receberNovasLeituras();

    }, 3000); // 3000 ms -> 3 segundos
}

function plotarGrafico() {
    // chamar os 7 últimos registros de leitura
    recuperarDadosIniciais();

    // criação do gráfico na página
    var ctx = document.getElementById('c_grafico').getContext('2d');
    window.graficoLinha = new Chart(ctx, config);

    // função que agenda a recuperação da última leitura para daqui a 7 segundos
    receberNovasLeituras();
}

// indicando que a função "plotarGrafico" será invocada assim que a página carregar
window.onload = plotarGrafico;