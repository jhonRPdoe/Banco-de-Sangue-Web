$(document).ready(function() {
    $("#relatarProblema").click(function() {
        const myModal = new bootstrap.Modal('#meuModal', { }); 
        myModal.show();
    });

    $('#cadastrarFuncionario').click(function() {
        const myModal = new bootstrap.Modal('#modalCadastrarFuncionario', { }); 
        myModal.show();
    });

    $('#alterarFuncionario').click(function() {
        const myModal = new bootstrap.Modal('#modalAlterarFuncionario', { }); 
        myModal.show();
    });
});