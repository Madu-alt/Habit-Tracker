//Organizing the variables by getting the elements from the HTML
var habitTitle = document.getElementById("habitTitle");
var saveButton = document.getElementById("saveButton");
var resetButton = document.getElementById("resetButton");
var title = document.getElementById("month-title");
var totalDaysDisplay = document.getElementById("totalDays");

//DATE and time info
var date = new Date();
var currentDay = date.getDay();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var currentDate = date.getDate();
const todayDay = new Date().getDate();
var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var chaveStorage = "habitos-" + currentYear + "-" + currentMonth;
var dataSaved = JSON.parse(localStorage.getItem(chaveStorage)) || [];
var savedHabit = localStorage.getItem(chaveStorage + "habitTitle");

// Log the date information to the console for debugging
console.log("O mês atual é: " + currentMonth); // Current month 
console.log("O dia da semana é: " + currentDay); // Day of the week (0-6, where 0 is Sunday and 6 is Saturday)
console.log("O dia do mês é: " + currentDate); // Current day of the month (1-31)
console.log("O ano atual é: " + currentYear); // Current year
console.log("Dados carregados do localStorage:", dataSaved); 


//Set the month title
title.innerHTML = '🌷 ' + months[currentMonth] + ' 🌷' ;


// Update the calendar info 

if (savedHabit && habitTitle) { 
        habitTitle.innerHTML = savedHabit;
    }

if (habitTitle) {
    habitTitle.style.cursor = "pointer";
    habitTitle.contentEditable = true; 
    
    habitTitle.addEventListener('blur', function() {
        let novoHabito = this.innerHTML.trim();
        if (novoHabito !== "") {
            localStorage.setItem(chaveStorage + "habitTitle", novoHabito);
            console.log("Título salvo: " + novoHabito);
        }
    });

    habitTitle.addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
            e.preventDefault(); 
            this.blur(); 
        }
    });


/* Set the total days */
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInThisMonth = daysInTheMonthList[currentMonth];
var days = document.getElementsByClassName("day"); 
var dayCount = 0; 

/* Set up the calendar day */
for (var i = 0; i < days.length; i++) {
    if (dayCount < daysInThisMonth) {
        var numberOfTheDay = dayCount + 1;
        days[i].innerHTML = numberOfTheDay;
        days[i].setAttribute("id", "day" + (dayCount + 1));
        
        if (dataSaved.includes(days[i].innerHTML)) { 
            days[i].classList.add("checked");
        }
        if (numberOfTheDay === todayDay) { 
            days[i].style.border = "3px solid #ff4d4d";
            days[i].classList.remove("dia-bloqueado");
        }
        else {
            days[i].classList.add("dia-bloqueado");
        }
        if (dayCount === currentDate - 1) {
            days[i].style.border = "3px solid black";
            days[i].style.fontWeight = "bold";
        }

        days[i].onclick = function() {
            if (this.classList.contains("dia-bloqueado")) {
                return;
            }

           this.classList.toggle("checked");
            
            // Atualiza o contador toda vez que clica
            let daysCompleted = document.querySelectorAll(".day.checked").length;
            document.getElementById("totalDays").innerHTML = "Total de dias: " + daysCompleted + "/" + daysInThisMonth;
        };


        dayCount++; 
    } else {
        days[i].innerHTML = "";
        days[i].style.backgroundColor = "white";
        days[i].style.border = "none";
    }
}


// Reset Button
var resetButton = document.getElementById("resetButton");
if (resetButton) {
    resetButton.onclick = function() {
        let confirmacao = confirm("Tem certeza que deseja resetar o seu progresso? Esta ação não pode ser desfeita.");
        
        if (confirmacao) {
            daysCompleted = document.querySelectorAll(".day.checked");
            
            for (var i = 0; i < daysCompleted.length; i++) {
                daysCompleted[i].classList.remove("checked");
            }
            
            // Update the total days display
            document.getElementById("totalDays").innerHTML = "Total de dias: 0/" + daysInThisMonth;
            console.log("Calendário resetado com sucesso! 🌸");
        }
    };
}

// Save Button
var saveButton = document.getElementById("saveButton");
saveButton.onclick = function() {  
    var daysToSave = [];
    var checkedDays = document.querySelectorAll(".day.checked");
    console.log("Encontrei " + checkedDays.length + " dias marcados.");
    checkedDays.forEach(function(elemento) { 
        if(elemento.innerHTML !== "") {
            daysToSave.push(elemento.innerHTML); 
        }
    });
    console.log("Lista para salvar:", daysToSave);
    localStorage.setItem(chaveStorage, JSON.stringify(daysToSave));
    // Feedback visual
    var botao = this;
    botao.innerHTML = "Salvo! ✨";
    setTimeout(function() {

        botao.innerHTML = "Salvar Progresso 💾";

    }, 2000);

};
//Uptade the total days display on page load

totalDays = document.querySelectorAll(".day.checked").length;
document.getElementById("totalDays").innerHTML = "Total de dias: " + totalDays + "/" + daysInThisMonth; }