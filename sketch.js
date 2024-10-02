// variáveis do círculo
let xCirculo = 300;
let yCirculo = 200;
let dCirculo = 15;
let raioCirculo = dCirculo / 2;
let velocidadeXCirculo = 8;
let velocidadeYCirculo = 8;

// variáveis do retângulo
let xRetangulo = 10;
let yRetangulo = 150;
let larguraRetangulo = 10;
let alturaRetangulo = 100;

// variáveis do retângulo do oponente
let xRetanguloOponente = 580;
let yRetanguloOponente = 150;
let velocidadeRetanguloOponente;

// pontuação do jogo
let pontosRetangulo = 0;
let pontosOponente = 0;

// som do jogo
let raquete;
let placar;
let trilhaSonora;

function preload() {
  trilhaSonora = loadSound("trilha.mp3");
  raquete = loadSound("raquetada.mp3");
  placar = loadSound("ponto.mp3");
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  //trilhaSonora.loop();
}

function draw() {
  background('rgb(17,6,17)');
  mostrarCirculo();
  moverCirculo();
  verificarCirculo();
  mostrarRetangulo(xRetangulo, yRetangulo);
  mostrarRetangulo(xRetanguloOponente, yRetanguloOponente);
  moverRetangulo();
  moverRetanguloOponente();
  verificarColisao(xRetanguloOponente, yRetanguloOponente);
  verificarColisao(xRetangulo, yRetangulo);
  marcarPontos();
  exibirPlacar();
}

function mostrarCirculo() {
  circle(xCirculo, yCirculo, dCirculo);
}

function moverCirculo() {
  xCirculo += velocidadeXCirculo;
  yCirculo += velocidadeYCirculo;
}

function verificarCirculo() {
  if (xCirculo + raioCirculo > width || xCirculo - raioCirculo < 0) {
    velocidadeXCirculo *= -1;
  }
  
  if (yCirculo + raioCirculo > height || yCirculo - raioCirculo < 0) {
    velocidadeYCirculo *= -1;
  }
}

function mostrarRetangulo(x, y) {
  rect(x, y, larguraRetangulo, alturaRetangulo);
}

function moverRetangulo() {
  if (keyIsDown(UP_ARROW)) {
    yRetangulo -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRetangulo += 10;
  }
}

function moverRetanguloOponente() {
  if (keyIsDown(87)) {
    yRetanguloOponente -= 10;
  }
  
  if (keyIsDown(83)) {
    yRetanguloOponente += 10;
  }
}

function verificarColisao(x, y) {
  colidiu = collideRectCircle(x, y, larguraRetangulo, alturaRetangulo, xCirculo, yCirculo, raioCirculo);
  if (colidiu) {
    velocidadeXCirculo *= -1;
    raquete.play();
  }
}

function marcarPontos() {
  textAlign(CENTER);
  textSize(20);
  stroke(255);
  fill(color(255,69,0));
  rect(230, 5, 40, 20);
  rect(330, 5, 40, 20);
  
  fill(255);
  text(pontosRetangulo, 250, 23);
  text(pontosOponente, 350, 23);
}

function exibirPlacar() {
  if (xCirculo > 590) {
    pontosRetangulo += 1;
    placar.play();
  } 
  if (xCirculo < 10) {
    pontosOponente += 1;
    placar.play();
  }
}
