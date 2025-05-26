let placas = [];
let horasEntrada = [];
let horasSaida = [];
let valoresTotais = [];
let velocidades = [];

function gerarTicket() {
    
    let placa = document.getElementById('placa').value;

    let horaEntrada = document.getElementById('horaEntrada').value;
    let horaSaida = document.getElementById('horaSaida').value;
    let ticketResult = document.getElementById('ticketResult');
    ticketResult.style.display = 'block';

    let floatEntrada = timeToDecimal(horaEntrada);
    let floatSaida = timeToDecimal(horaSaida);
    let tempo =  floatSaida - floatEntrada;
    
    const valor = 20;
    const distancia = 120;
    let desconto = 0

    let velocidade = distancia/tempo;

    if (velocidade <= 60) {
        //ate de 60km
        desconto = 0.85;
    } else if(velocidade > 60 && velocidade <= 100) {
        //acima 60km e ate 100km
        desconto = 0.90;
    } else {
        //acima de 100km
        desconto = 1;
    }
    
    let valorTotal = valor*desconto;

    document.getElementById('placaSpan').textContent = placa;
    document.getElementById('horaEntradaSpan').textContent = horaEntrada;
    document.getElementById('horaSaidaSpan').textContent = horaSaida;
    document.getElementById('valorPagar').textContent = valorTotal.toFixed(2);

    placas.push(placa);
    horasEntrada.push(horaEntrada);
    horasSaida.push(horaSaida);
    valoresTotais.push(valorTotal);
    velocidades.push(velocidade);
}

function timeToDecimal(timeStr) {
    let [horas, minutos] = timeStr.split(':');
    horas = parseInt(horas);
    minutos = parseInt(minutos);
    return horas + (minutos / 60);
}

function gerarRelatorio() {
    document.getElementById('relatorioResult').style.display = 'block';
    
    let soma = velocidades.reduce((total, atual) => total + atual, 0);
  
    let menorVelocidade = Math.min(...velocidades);
    let maiorVelocidade = Math.max(...velocidades);
    let mediaVelocidade = soma / velocidades.length;
    let totalValores = valoresTotais.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
    
    let decimalHorasEntrada = horasEntrada.map(timeToDecimal);
    let decimalHorasSaida = horasSaida.map(timeToDecimal);

    let inicioProc = Math.min(...decimalHorasEntrada);
    let fimProc = Math.max(...decimalHorasSaida);

    function decimalParaHora(decimal) {
        let h = Math.floor(decimal);
        let m = Math.round((decimal - h) * 60);
        if (m < 10) m = '0' + m;
        return `${h}:${m}`;
    }

    document.getElementById('menorVLSpan').textContent = menorVelocidade.toFixed(2);
    document.getElementById('maiorVLSpan').textContent = maiorVelocidade.toFixed(2);
    document.getElementById('mediaVlSpan').textContent = mediaVelocidade.toFixed(2);
    document.getElementById('totalVlSpan').textContent = totalValores.toFixed(2);
    document.getElementById('inicioPSpan').textContent = decimalParaHora(inicioProc);
    document.getElementById('finalPSpan').textContent = decimalParaHora(fimProc);
}