var quizDB;

function deselectOthers(selected) {
    switch (selected) {
        case 1:
            document.getElementById("#question2").classList.remove("ul li.checked");
            document.getElementById("#question3").classList.remove("ul li.checked");
            /*document.getElementById("#question3").classList.remove("checked");*/
    }
}

/*
window.onload = function() {
    window.scrollTo(0, 0);

    let DBOpenRequest = window.indexedDB.open("QuizDB", 1);

    DBOpenRequest.onerror = function (event) {
        console.error("An error occurred with QuizDB");
        console.error(event);
    };

    DBOpenRequest.onupgradeneeded = function(e) {};

    DBOpenRequest.onsuccess = function() {
        
    }

}*/