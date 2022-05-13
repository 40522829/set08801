const selectedCat = [];
let idx=0;
const btnCat1 = document.querySelector('#category1');
const btnCat2 = document.querySelector('#category2');
const categoryMap = '{"British TV" : "britishTV", "Geography" : "geography", "History" : "history", "Science" : "science", "Sports" : "sports", "Technology" : "technology"}';
const categoryJson = JSON.parse(categoryMap);

sessionStorage.setItem("categoryOne","");
sessionStorage.setItem("categoryTwo","");

function selectCategory(cat) {
    addCategory(cat);    
    setIndex();
}

function setIndex() {
    if (idx < 1) {
        idx=1;
    } else {
        idx=0;
    }
}

function addCategory(category) {  
    let allowAdd = 1;
    for (let i = 0; i < selectedCat.length; i++) {
        if (selectedCat[i] == category) {
            allowAdd = 0;
            idx=1;
            setIndex();
        }
    }
    if (allowAdd == 1) {
        selectedCat[idx]=category;
    }
    showCategories();
}

function showCategories() {
    let cat1Text = selectedCat[0] == "" ? "Empty" : selectedCat[0];
    btnCat1.textContent = cat1Text;
    let cat2Text = selectedCat[1] == "" ? "Empty" : selectedCat[1];
    btnCat2.textContent = cat2Text;
}

function checkCategories(e) {    
    let catOne = sessionStorage.getItem("categoryOne");
    let catTwp = sessionStorage.getItem("categoryTwo");
    if (sessionStorage.getItem("categoryOne") == undefined || sessionStorage.getItem("categoryTwo") == undefined) {
        alert("Need selected two categories before starting the game")
    } else {
        useCategories();
    }
}

function useCategories() {
    sessionStorage.setItem("categoryOne", categoryJson[selectedCat[0]]);
    sessionStorage.setItem("categoryTwo", categoryJson[selectedCat[1]]);    
    console.log("Selected categories set!");
}