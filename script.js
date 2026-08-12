let iniciar = 0;
let tempoDecorrido = 0;
let intervalo;
let correndo = false;

function updateDisplay() {
    let tempoAtual = new Date().getTime() - iniciar;

    // Transforma o tempo real em horas, minutos, segundos e milissegundos
    let horas = Math.floor(tempoAtual / 3600000);
    let minutos = Math.floor((tempoAtual % 3600000) / 60000);
    let segundos = Math.floor((tempoAtual % 60000) / 1000);
    let milissegundos = Math.floor(tempoAtual % 1000);

    // Garante que tenham sempre dois dígitos (ou 3 nos milissegundos)
    horas = String(horas).padStart(2, '0');
    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');
    milissegundos = String(milissegundos).padStart(3, '0');

    // CORRIGIDO AQUI: Mudamos para minutos e segundos (em português) para bater com as variáveis acima!
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
