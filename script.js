let countdown; //assigned as global
const displayTimer = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    // clear any existing timer
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
   countdown = setInterval(() =>{
        const leftSeconds = Math.round((then - Date.now()) / 1000);
        //check if it stop to zero
        if(leftSeconds <=0){
            clearInterval(countdown);
            return;
        }
        //display it 
        displayTimeLeft(leftSeconds);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''} ${remainderSeconds}`;
    document.title = display;

    displayTimer.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustHours = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    const displayEnd = `Be Back At ${adjustHours}: ${minutes < 10 ? '0' : ''} ${minutes}`;
    
    endTime.textContent = displayEnd;
}

function displayButtons(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', displayButtons));

//document.customForm is direct method by selecting names into DOM
document.customForm.addEventListener('submit',function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});