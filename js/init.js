document.getElementById("start-game").addEventListener('click', ()=>{
    let countryCode=document.getElementById("country").value;
    let difficulty=document.getElementById("mode").value;
    myStorage = window.localStorage;
    localStorage.setItem("countryCode", countryCode);
    localStorage.setItem("difficulty", difficulty);
    window.open('loading.html', '_self');
});

