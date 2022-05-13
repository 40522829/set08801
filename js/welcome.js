const host = "http://127.0.0.1:5500/"

function openPage(page) {
    window.location.href = host+page+".html";
}

// Get the modal
const modal = document.getElementById('id01');
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}