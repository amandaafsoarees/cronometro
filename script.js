let iniciar = 0;
let tempoDecorrido = 0;
let intervalo;
let correndo = false;

function updateDisplay() {
    let tempoAtual = new Date().getTime() - iniciar;

    
    let horas = Math.floor(tempoAtual / 3600000);
    let minutos = Math.floor((tempoAtual % 3600000) / 60000);
    let segundos = Math.floor((tempoAtual % 60000) / 1000);
    let milissegundos = Math.floor(tempoAtual % 1000);

    horas = String(horas).padStart(2, '0');
    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');
    milissegundos = String(milissegundos).padStart(3, '0');

    
    document.getElementById('display').textContent = `${horas}:${minutos}:${segundos}.${milissegundos}`;
}

function iniciarParar() {
    if (!correndo) {
        iniciar = new Date().getTime() - tempoDecorrido; 
        intervalo = setInterval(updateDisplay, 10);
        document.getElementById('startStop').textContent = 'Parar'; 
    } else {
        clearInterval(intervalo); 
        tempoDecorrido = new Date().getTime() - iniciar;
        document.getElementById('startStop').textContent = 'Iniciar'; 
    }
    correndo = !correndo; 
}

function reset() {
    clearInterval(intervalo);
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('startStop').textContent = 'Iniciar'; 
    correndo = false; 
    tempoDecorrido = 0;
}
// TIMER 
let tempoTotalSegundos = 0;
let intervaloTimer = null; 
let timerCorrendo = false; 


const somAlarme = new Audio('alarme.mp3');
somAlarme.loop = true; 

function iniciarPararTimer() {
  
    let inputHor = document.getElementById('inputHoras');
    let inputMin = document.getElementById('inputMinutos');
    let inputSeg = document.getElementById('inputSegundos');

    if (!timerCorrendo) {
        let horasDigitadas = Number(inputHor.value) || 0;
        let minutosDigitados = Number(inputMin.value) || 0;
        let segundosDigitados = Number(inputSeg.value) || 0;

        if (horasDigitadas > 99) { horasDigitadas = 99; inputHor.value = '99'; }
        if (minutosDigitados > 59) { minutosDigitados = 59; inputMin.value = '59'; }
        if (segundosDigitados > 59) { segundosDigitados = 59; inputSeg.value = '59'; }

     
        if (tempoTotalSegundos <= 0) {
            tempoTotalSegundos = (horasDigitadas * 3600) + (minutosDigitados * 60) + segundosDigitados;
        }

        if (tempoTotalSegundos <= 0) return;

        inputHor.disabled = true;
        inputMin.disabled = true;
        inputSeg.disabled = true;

        intervaloTimer = setInterval(atualizarTimer, 1000);
        document.getElementById('startStopTimer').textContent = 'Parar';
        timerCorrendo = true;
    } else {
        clearInterval(intervaloTimer);
        document.getElementById('startStopTimer').textContent = 'Iniciar';
        timerCorrendo = false;

        somAlarme.pause();
        somAlarme.currentTime = 0;
    }
}

function atualizarTimer() {
    if (tempoTotalSegundos <= 0) {
        clearInterval(intervaloTimer);
        
       
        somAlarme.play(); 

        alert("O tempo acabou!"); 
        resetTimer();
        return;
    }

    tempoTotalSegundos--;

   
    let horasRestantes = Math.floor(tempoTotalSegundos / 3600);
    let minutosRestantes = Math.floor((tempoTotalSegundos % 3600) / 60);
    let segundosRestantes = tempoTotalSegundos % 60;

    document.getElementById('inputHoras').value = String(horasRestantes).padStart(2, '0');
    document.getElementById('inputMinutos').value = String(minutosRestantes).padStart(2, '0');
    document.getElementById('inputSegundos').value = String(segundosRestantes).padStart(2, '0');
}

function resetTimer() {
    clearInterval(intervaloTimer);
    timerCorrendo = false;
    tempoTotalSegundos = 0;
    
    
    somAlarme.pause();
    somAlarme.currentTime = 0;

    document.getElementById('inputHoras').disabled = false;
    document.getElementById('inputMinutos').disabled = false;
    document.getElementById('inputSegundos').disabled = false;
    
    document.getElementById('inputHoras').value = '00';
    document.getElementById('inputMinutos').value = '00';
    document.getElementById('inputSegundos').value = '00';
    document.getElementById('startStopTimer').textContent = 'Iniciar';
}