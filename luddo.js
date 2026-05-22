let i = document.getElementById('i');
let targ = document.getElementById('T');
let but=document.getElementById('start')
 let h1=document.getElementById('player')
let piece=document.querySelectorAll('.piece')
let h2=document.getElementById('dice')
let roll=document.getElementById('rolldice')
let currentplayer=0;
function handle() 
{
   
  targ.appendChild(i);
   piece.forEach(p => {
      p.classList.remove('blink');
    });
  
  
}
 let totalplayer=4;
function startgame()
{
   h1.innerText="player 1 turn  " ;
   currentplayer=1;
   
   
}

i.addEventListener('click', handle);
roll.addEventListener('click', player1);
but.addEventListener('click',startgame)

function player1()
{
    let diceRoll = Math.floor(Math.random() * 6) + 1;
      h2.innerText=diceRoll;
             
   if(diceRoll==6)
   {  
     piece.forEach(p => {
      p.classList.add('blink');
    });
  } else {
    
    piece.forEach(p => {
      p.classList.remove('blink');
    });
  }


}
