var db;
const list = document.querySelector('#top10list');

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

window.onload = function() {
    
    let top10request = window.indexedDB.open("TopTenDB", 1);

    top10request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    top10request.onupgradeneeded = function () {
        
        const top10dbObject = top10request.result;

        const objectStoreTop10 = top10dbObject.createObjectStore('top10', { keyPath: ['points','player','date','time'] });
        objectStoreTop10.createIndex('player_points',['player','points'], { unique: false });
        objectStoreTop10.createIndex('points','points', { unique: false });
        objectStoreTop10.createIndex('date','date', { unique: false });
        objectStoreTop10.createIndex('time','time', { unique: false });

        console.log('Top10 Database setup complete');

    };

    top10request.onsuccess = function () {
    
        // Populate the top 10 list
        db = top10request.result;
        populateTop10();

    }

    function populateTop10() {

        console.log("Populating QuizDB...");
        async function getData() {
            const response = await fetch("./data/top10.json");
            const data = await response.json();
            for(let i=0; i<data.top10.length; i++) {
                const dbRequest = top10request.result;
                const transaction = dbRequest.transaction("top10", "readwrite");
                playerPoints = {player: data.top10[i].player, 
                                points: data.top10[i].points, 
                                date: data.top10[i].date, 
                                time: data.top10[i].time};  
                const addPlayerPoints = transaction.objectStore("top10").add(playerPoints);
            }            
            displayTop10();
            console.log("Data has been fetched and inserted");
        };        
        getData();
        console.log("QuizDB populated!");
        
    }

    function displayTop10() {
        
        let current_side = "right";
        let next_side = "left"

        // remove existing top 10 div
        console.log("Removing current top 10 list");

        // Create object store which will add data from the db into our cursor below
        const transaction = db.transaction("top10", "readonly");
        const pointsStore = transaction.objectStore("top10");

        // Populate cursor with db data and start from the end til the beginning of the store
        // Reverse order is guaranteed by the 2nd property "prev" here below
        pointsStore.openCursor(null, "prev").onsuccess = function(e) {

            // Define cursor with the results of the event
            let top10cursor = e.target.result;

            if (top10cursor) {

                // Create HTML elements to contain DB data for display in the HTML document
                const container = document.createElement('div');
                const content = document.createElement('div');
                const points = document.createElement('h2');
                const player = document.createElement('h3');

                // Identify which container side we are using on each iteration
                if (current_side == "left") {
                    current_side = "right";
                    console.log(current_side);
                } else {
                    current_side = "left";
                    console.log(current_side);
                }

                // Add text on the points and player elements
                points.textContent="Total points: " + top10cursor.value.points;
                player.textContent="Obtianed on " + top10cursor.value.date + " at " + top10cursor.value.time + " by " + top10cursor.value.player;
                
                // Add the elements and "content" class to the content div
                content.appendChild(points);
                content.appendChild(player);
                content.classList.add("content");

                // Add the content element and "timeline_container" class to the container div
                container.appendChild(content);
                container.classList.add("timeline_container");
                container.classList.add(current_side);              // Set which side is used for this iteration
                list.appendChild(container);

                // Iterate through the store (check "prev" property when opening the cursor)
                top10cursor.continue();

                // Log that contacts db data have been added to the DOM
                //console.log('Top 10 list displayed');

            } else {               

                console.log("All data has been displayed");
                
            }
        };

    };

}