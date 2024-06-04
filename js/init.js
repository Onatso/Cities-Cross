if(localStorage.getItem('recordE')===null) document.getElementById('recordE').textContent="Нет информации";
else document.getElementById('recordE').textContent=localStorage.getItem('recordE');
if(localStorage.getItem('recordN')===null) document.getElementById('recordN').textContent="Нет информации";
else document.getElementById('recordN').textContent=localStorage.getItem('recordN');
if(localStorage.getItem('recordH')===null) document.getElementById('recordH').textContent="Нет информации";
else document.getElementById('recordH').textContent=localStorage.getItem('recordH');

let infoButton = document.getElementById('info-button');

infoButton.addEventListener('click', function() {
  Swal.fire({
    title: 'Добро пожаловать в Cities-Cross!',
    text: 'Игра представляет из себя классическую вариацию всеми любимых "городов". Важное замечание: если в базе заканчиваются города на определенную букву, вы можете называть город на предыдущую, компьютер будет делать также.',
    icon: 'info',
    confirmButtonText: 'Закрыть',
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup'
    }
  })
});

document.getElementById("start-game").addEventListener('click', ()=>{
    let countryCode=document.getElementById("country").value;
    let difficulty=document.getElementById("mode").value;
    myStorage = window.localStorage;
    localStorage.setItem("countryCode", countryCode);
    localStorage.setItem("difficulty", difficulty);
    window.open('loading.html', '_self');
});



