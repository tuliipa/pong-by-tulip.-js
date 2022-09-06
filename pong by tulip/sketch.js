//Variáveis da Bolinha
  let xBolinha = 300 ;
  let yBolinha = 200 ;
  let diametro = 15
  let raio = diametro / 2 ;

  //velocidade da bolinha
  let velocidadeX = 6 ; 
  let velocidadeY = 6 ;
  
//varivaveis raquete
let xRaquete = 5 ; 
let yRaquete = 150 ;
let raqueteComprimento = 10 ;
let raqueteAltura = 90 ;


//Variáveis Raquete oponente
let xRaqueteOponente = 585 ;
let yRaqueteOponente = 150 ;
let velocidadeYOponente ;

let colidiu = false ;

let chanceDeErrar = 0;

//Fundo
function setup() { 
  createCanvas(600, 400) ;
  trilha.loop();
}
//placar do jogo
let meusPontos = 0
let pontosOponente = 0

//Sons do Jogo
let Raquetada;
let Trilha;
let Ponto;

function preload(){
  trilha = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
}

//loop de fundo
function draw() {
  background(0);
  mostraBolinha() ;
  movimentaBolinha() ;
  verificaColisaoBorda() ; 
  mostraRaquete(xRaquete, yRaquete) ;
  movimentaMinhaRaquete() ;
  verificaColisaoRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente) ;
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPontos() ;
  movimentaRaqueteOponente();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro) ;
 }

function movimentaBolinha() {
  xBolinha += velocidadeX ;
  yBolinha += velocidadeY ;
  }

function verificaColisaoBorda() {
   if (xBolinha + raio> width ||
       xBolinha - raio< 0 ) {
     velocidadeX *= -1 ;
   }
  
  if (yBolinha + raio> height ||
     yBolinha - raio < 0 ){
    velocidadeY *= -1 ;
  }
}

function mostraRaquete(x,y){
rect(x, y, raqueteComprimento, raqueteAltura) ;

}
 

function movimentaMinhaRaquete(){
 if (keyIsDown(UP_ARROW)){
  yRaquete-= 10
}
 

if (keyIsDown(DOWN_ARROW)){
  yRaquete += 10 ;
}
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
function calculaChanceDeErrar(){
  if(pontosOponente >= meusPontos){
    chanceDeErrar += 1
  if (chanceDeErrar >= 39){
    chanceDeErrar = 40
  } 
  
} else {
  chanceDeErrar -=1
  if (chanceDeErrar <= 35){
    chanceDeErrar = 35
  }
}

/*function movimentaRaqueteOponente(){ 
  if (keyIsDown(87)){
   yRaqueteOponente -= 10
}

if (keyIsDown(83)){
  yRaqueteOponente += 10 ;
} */
}

function colisaodaMinhaRaquete(){

  if (xBolinha - raio < xRaquete + raquetecomprimento &&
     yBolinha - raio > yRaquete + raquetealtura && yBolinha +  raio > yRaquete){
    velocidadeX *= -1
  raquetada.play();
  }
} 

function verificaColisaoRaquete(x, y){
  colidiu = 
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeX *= -1;
  raquetada.play();
  }
}


function incluiPlacar(){
  stroke(225)
  textAlign(CENTER);
  textSize(18);
  fill(color(255,228,225))
  rect(150, 10, 40, 20)
  fill(color(0,0,0))
  text(meusPontos, 170, 26);
  fill(color(255,228,225))
  rect(450, 10, 40, 20)
  fill(color(0,0,0))
  text(pontosOponente, 470, 26) ;
}
function marcaPontos(){
  if (xBolinha + raio > width){
  meusPontos += 1;
  ponto.play();
  }
  if (xBolinha - raio < 0){
  pontosOponente += 1; 
  ponto.play();
  }
}
function bolinhaNaoFicaPresa(){
  if ( xBolinha - raio < 0) {
    xBolinha = 23
  }
}
