$(document).ready(function() {

    function onLoad() {
        imprimeNomeUsuario();
        onClickIsDoador();
        onClickIsPaciente();

        $("#relatarProblema").click(function() {
            const myModal = new bootstrap.Modal('#meuModal', { }); 
            myModal.show();
        });

        $('#cadastrarDoacao').click(function() {
            const myModal = new bootstrap.Modal('#modalCadastrarDoacao', { }); 
            myModal.show();
        });

        $('#doarPaciente').click(function() {
            const myModal = new bootstrap.Modal('#modalDoarPaciente', { }); 
            myModal.show();
        });

    }

    function imprimeNomeUsuario() {
        let nomeUsuario = localStorage.getItem('nomeUsuario');
        if (nomeUsuario) {
            $('#nomeUsuario').text(nomeUsuario + ' (Administrador)');
        }
    }

    function onClickIsDoador() {
        let isDoador = $('#isDoador');
        isDoador.click(function() {
            if (isDoador.is(':checked')){
                $('#labelNome').hide();
                $('#nome').hide();
                $('#labelNascimento').hide();
                $('#nascimento').hide();
                $('#labelTelefone').hide();
                $('#telefone').hide();
                $('#labelEmail').hide();
                $('#email').hide();
                $('#labelEndereco').hide();
                $('#endereco').hide();
                $('#labelSangue').hide();
                $('#sangue').hide();
            } else {
                $('#labelNome').show();
                $('#nome').show();
                $('#labelNascimento').show();
                $('#nascimento').show();
                $('#labelTelefone').show();
                $('#telefone').show();
                $('#labelEmail').show();
                $('#email').show();
                $('#labelEndereco').show();
                $('#endereco').show();
                $('#labelSangue').show();
                $('#sangue').show();
            }
        });
    }

    function onClickIsPaciente() {
        let isPaciente = $('#isPaciente');
        isPaciente.click(function() {
            if (isPaciente.is(':checked')){
                $('#labelNomePaciente').hide();
                $('#nomePaciente').hide();
                $('#labelNascimentoPaciente').hide();
                $('#nascimentoPaciente').hide();
                $('#labelTelefonePaciente').hide();
                $('#telefonePaciente').hide();
                $('#labelEmailPaciente').hide();
                $('#emailPaciente').hide();
                $('#labelEnderecoPaciente').hide();
                $('#enderecoPaciente').hide();
                $('#labelSanguePaciente').hide();
                $('#sanguePaciente').hide();
            } else {
                $('#labelNomePaciente').show();
                $('#nomePaciente').show();
                $('#labelNascimentoPaciente').show();
                $('#nascimentoPaciente').show();
                $('#labelTelefonePaciente').show();
                $('#telefonePaciente').show();
                $('#labelEmailPaciente').show();
                $('#emailPaciente').show();
                $('#labelEnderecoPaciente').show();
                $('#enderecoPaciente').show();
                $('#labelSanguePaciente').show();
                $('#sanguePaciente').show();
            }
        });
    }

    onLoad();
});