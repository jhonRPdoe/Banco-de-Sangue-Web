$(document).ready(function() {
    $("#relatarProblema").click(function() {
        const myModal = new bootstrap.Modal('#meuModal', { }); 
        myModal.show();
    });
});