var db;
// 1
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

const cat1 = sessionStorage.getItem('categoryOne');
const cat2 = sessionStorage.getItem('categoryTwo');

window.onload = initialiseDB;

function initialiseDB(e) {
    // 2
    const request = window.indexedDB.open("QuizDB", 1);

    request.onerror = function (event) {
        console.error("An error occurred with QuizDB");
        console.error(event);
    };

    request.onupgradeneeded = function () {
        
        const dbObject = request.result;

        const objectStore1 = dbObject.createObjectStore('britishTV', { keyPath: ['question'] });
        objectStore1.createIndex('question','question', { unique: false });
        objectStore1.createIndex('tv_question',['question'], { unique: false });
        objectStore1.createIndex('answer1','answer1', { unique: false });
        objectStore1.createIndex('answer2','answer2', { unique: false });
        objectStore1.createIndex('answer3','answer3', { unique: false });

        const objectStore2 = dbObject.createObjectStore('geography', { keyPath: ['question'] });
        objectStore2.createIndex('question','question', { unique: false });
        objectStore2.createIndex('geo_question',['question'], { unique: false });
        objectStore2.createIndex('answer1','answer1', { unique: false });
        objectStore2.createIndex('answer2','answer2', { unique: false });
        objectStore2.createIndex('answer3','answer3', { unique: false });


        const objectStore3 = dbObject.createObjectStore('history', { keyPath: ['question'] });
        objectStore3.createIndex('question','geoquestion', { unique: false });
        objectStore3.createIndex('hist_question',['question'], { unique: false });
        objectStore3.createIndex('answer1','answer1', { unique: false });
        objectStore3.createIndex('answer2','answer2', { unique: false });
        objectStore3.createIndex('answer3','answer3', { unique: false });

        const objectStore4 = dbObject.createObjectStore('science', { keyPath: ['question'] });
        objectStore4.createIndex('question','question', { unique: false });
        objectStore4.createIndex('sci_question',['question'], { unique: false });
        objectStore4.createIndex('answer1','answer1', { unique: false });
        objectStore4.createIndex('answer2','answer2', { unique: false });
        objectStore4.createIndex('answer3','answer3', { unique: false });

        const objectStore5 = dbObject.createObjectStore('sports', { keyPath: ['question'] });
        objectStore5.createIndex('question','question', { unique: false });
        objectStore5.createIndex('sports_question',['question'], { unique: false });
        objectStore5.createIndex('answer1','answer1', { unique: false });
        objectStore5.createIndex('answer2','answer2', { unique: false });
        objectStore5.createIndex('answer3','answer3', { unique: false });


        const objectStore6 = dbObject.createObjectStore('technology', { keyPath: ['question'] });
        objectStore6.createIndex('question','question', { unique: false });
        objectStore6.createIndex('tech_question',['question'], { unique: false });
        objectStore6.createIndex('answer1','answer1', { unique: false });
        objectStore6.createIndex('answer2','answer2', { unique: false });
        objectStore6.createIndex('answer3','answer3', { unique: false });

        console.log('Quiz database setup complete');

    };

    request.onsuccess = function () {            

        //Display the categories questions
        db = request.result;
        initialiseData();

    };

    function initialiseData() {

        // Initialise britishTV store
        async function getBritishTvData() {
            const response = await fetch("./data/britishTV.json");
            const data = await response.json();
            //fetch('./data/britishTV.json')
            //.then(response => response.json())
            //.then(data => {  
                //console.log(Object.values(data).length);
                //console.log(data.britishTV.length);
                for(let i=0; i<data.britishTV.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("britishTV", "readwrite");
                    let catQuestion = {question: data.britishTV[i].question, 
                        answer1: data.britishTV[i].answer1[0], 
                        answer2: data.britishTV[i].answer2[0], 
                        answer3: data.britishTV[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("britishTV").add(catQuestion);
                }
                //console.log("Data has been fetched and inserted for the British TV category");
            //});
        };        
        getBritishTvData();

        // Initialise geography store
        async function getGeographyData() {
            const response = await fetch("./data/geography.json");
            const data = await response.json();
            for(let i=0; i<data.geography.length; i++) {
                let dbRequest = request.result;
                let transaction = dbRequest.transaction("geography", "readwrite");
                let catQuestion = {question: data.geography[i].question, 
                    answer1: data.geography[i].answer1[0], 
                    answer2: data.geography[i].answer2[0], 
                    answer3: data.geography[i].answer3[0]};
                let addCatQuestion = transaction.objectStore("geography").add(catQuestion);
            };
        };
        getGeographyData();
        
/*
        // Initialise geography store
        fetch('./data/geography.json')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.geography.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("geography", "readwrite");
                    let catQuestion = {question: data.geography[i].question, 
                        answer1: data.geography[i].answer1[0], 
                        answer2: data.geography[i].answer2[0], 
                        answer3: data.geography[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("geography").add(catQuestion);
                }
            });

        // Initialise history store
        fetch('./data/history.json')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.history.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("history", "readwrite");
                    let catQuestion = {question: data.history[i].question, 
                        answer1: data.history[i].answer1[0], 
                        answer2: data.history[i].answer2[0], 
                        answer3: data.history[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("history").add(catQuestion);
                }
            });
        
        // Initialise science store
        fetch('./data/science.json')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.science.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("science", "readwrite");
                    let catQuestion = {question: data.science[i].question, 
                        answer1: data.science[i].answer1[0], 
                        answer2: data.science[i].answer2[0], 
                        answer3: data.science[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("science").add(catQuestion);
                }
            });
        
        // Initialise sports store
        fetch('./data/sports.json')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.sports.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("sports", "readwrite");
                    let catQuestion = {question: data.sports[i].question, 
                        answer1: data.sports[i].answer1[0], 
                        answer2: data.sports[i].answer2[0], 
                        answer3: data.sports[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("sports").add(catQuestion);
                }
            });

        // Initialise technology store
        fetch('./data/technology.json')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.technology.length; i++) {
                    let dbRequest = request.result;
                    let transaction = dbRequest.transaction("technology", "readwrite");
                    let catQuestion = {question: data.technology[i].question, 
                        answer1: data.technology[i].answer1[0], 
                        answer2: data.technology[i].answer2[0], 
                        answer3: data.technology[i].answer3[0]};
                    let addCatQuestion = transaction.objectStore("technology").add(catQuestion);
                }
            });*/        
        
        displayQuestions();

    }

    function displayQuestions() {
        
        // Create object store which will add data from the db into our cursor below
        let transaction = db.transaction(cat1, "readonly");
        let cat1Store = transaction.objectStore(cat1);

        // Populate cursor with db data
        cat1Store.openCursor().onsuccess = function(e) {

            // Define cursor with the results of the event
            let cat1Cursor = e.target.result;

            if (cat1Cursor) {
                console.log(cat1Cursor.value.question);
                console.log(cat1Cursor.value.answer1);
                console.log(cat1Cursor.value.answer2);
                console.log(cat1Cursor.value.answer3);
                cat1Cursor.continue();
            } else {
                console.log("Category 1 data displayed");
            }

        }
        
        let transaction2 = db.transaction(cat2, "readonly");
        const cat2Store = transaction2.objectStore(cat2);

        // Populate cursor with db data
        cat2Store.openCursor().onsuccess = function(e) {
            
            // Define cursor with the results of the event
            let cat2Cursor = e.target.result;

            if (cat2Cursor) {
                console.log(cat2Cursor.value.question);
                console.log(cat2Cursor.value.answer1);
                console.log(cat2Cursor.value.answer2);
                console.log(cat2Cursor.value.answer3);
                cat2Cursor.continue();
            } else {
                console.log("Category 2 data displayed");
            }

        }

    }

}