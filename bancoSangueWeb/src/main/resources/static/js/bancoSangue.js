$(document).ready(function() {

    var registrosSangue = [
        { id : 1, tipo : 'O Positivo', quantidade : 20 },
        { id : 2, tipo : 'O Negativo', quantidade : 10 },
        { id : 3, tipo : 'A Positivo', quantidade : 50 },
        { id : 4, tipo : 'A Negativo', quantidade : 40 },
        { id : 5, tipo : 'B Positivo', quantidade : 70 },
        { id : 6, tipo : 'B Negativo', quantidade : 60 },
        { id : 7, tipo : 'AB Positivo', quantidade : 90 },
        { id : 8, tipo : 'AB Negativo', quantidade : 80 }
    ];

    function onLoad() {
        atualizaTabelaSangue();
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

        $('#isDoador').click(onClickIsDoador);
        $('#isPaciente').click(onClickIsPaciente);
        $('#insereDoacao').click(cadastrarDoacao);
        $('#alteraDoacao').click(doarPaciente);
    }

    function imprimeNomeUsuario() {
        let nomeUsuario = localStorage.getItem('nomeUsuario');
        if (nomeUsuario) {
            $('#nomeUsuario').text(nomeUsuario + ' (Administrador)');
        }
    }

    function onClickIsDoador() {
        if ($('#isDoador').is(':checked')){
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
            $('#labelTipoSangueDoacao').hide();
            $('#tipoSangueDoacao').hide();
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
            $('#labelTipoSangueDoacao').show();
            $('#tipoSangueDoacao').show();
        }
    }

    function onClickIsPaciente() {
        if ($('#isPaciente').is(':checked')){
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
            $('#labelTipoSanguePaciente').hide();
            $('#tipoSanguePaciente').hide();
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
            $('#labelTipoSanguePaciente').show();
            $('#tipoSanguePaciente').show();
        }
    }

    function atualizaTabelaSangue() {
        let bodyTabelaSangue = $('#tabelaSangue tbody');

        bodyTabelaSangue.html('');
        registrosSangue.forEach(sangue => {
            bodyTabelaSangue.append(
                '<tr>' +
                  '<td>' + sangue.id + '</td>' +
                  '<td>' + sangue.tipo + '</td>' +
                  '<td>' + sangue.quantidade.toFixed(2) + ' ml</td>' +
                '</tr>'
              ); 
        });
    }

    function cadastrarDoacao() {
        if (validaCamposDoacao()) {
            let iQuantidade =  parseFloat(registrosSangue[$('#tipoSangueDoacao').val()].quantidade) + parseFloat($('#quantidadeDoacao').val());
            registrosSangue[$('#tipoSangueDoacao').val()].quantidade = iQuantidade;
            limpaCampos('');
            $('#modalCadastrarDoacao').modal('hide');
            alert('Doação cadastrada com sucesso.');
        }
        atualizaTabelaSangue();
    }

    function validaCamposDoacao() {
        let bRetorno = false,
            oCampoCpf = $('#cpf'),
            oCampoQuantidade = $('#quantidadeDoacao'),
            oCampoNome = $('#nome'),
            oCampoTelefone = $('#telefone'),
            oCampoEmail = $('#email'),
            oCampoEndereco = $('#endereco'), 
            oCampoNascimento = $('#nascimento');

        if ($('#isDoador').is(':checked')) {
            switch (true) {
                case oCampoCpf.val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                case oCampoQuantidade.val() == '':
                    alert('Por favor, preencha o campo Quantidade com a quantidade de sangue doado.');
                    break;
                case !$.isNumeric(oCampoQuantidade.val()):
                    alert('Por favor, valor inválido para o campo Quantidade.');
                    break;
                default:
                    bRetorno = validaCPF(oCampoCpf.val());
                    break;
            }
        } else {
            switch (true) {
                case oCampoNome.val() == '':
                    alert('Por favor, preencha o campo Nome.');
                    break;
                case oCampoCpf.val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                case oCampoNascimento.val() == '':
                    alert('Por favor, preencha o campo Data de Nascimento.');
                    break;
                case oCampoTelefone.val() == '':
                    alert('Por favor, preencha o campo Telefone.');
                    break;
                case !$.isNumeric(oCampoTelefone.val()):
                    alert('Por favor, valor inválido para o campo Telefone.');
                    break;
                case oCampoEmail.val() == '':
                    alert('Por favor, preencha o campo Email.');
                    break;
                case oCampoEndereco.val() == '':
                    alert('Por favor, preencha o campo Endereço.');
                    break;
                case oCampoQuantidade.val() == '':
                    alert('Por favor, preencha o campo Quantidade com a quantidade de sangue doado.');
                    break;
                case !$.isNumeric(oCampoQuantidade.val()):
                    alert('Por favor, valor inválido para o campo Quantidade.');
                    break;
                default:
                    bRetorno = validaCPF(oCampoCpf.val());
                    break;
            } 
        }

        return bRetorno;
    }

    function doarPaciente() {
        if (validaCamposDoarPaciente()) {
            let iQuantidade =  parseFloat(registrosSangue[$('#tipoSanguePaciente').val()].quantidade) - parseFloat($('#quantidadeSanguePaciente').val());
            registrosSangue[$('#tipoSanguePaciente').val()].quantidade = iQuantidade;
            limpaCampos('');
            $('#modalDoarPaciente').modal('hide');
            alert('Doação para paciente efetuada com sucesso.');
        }
        atualizaTabelaSangue();
    }

    function validaCamposDoarPaciente() {
        let bRetorno = false,
            oCampoCpf = $('#cpfPaciente'),
            oCampoQuantidade = $('#quantidadeSanguePaciente'),
            oCampoNome = $('#nomePaciente'),
            oCampoTelefone = $('#telefonePaciente'),
            oCampoEmail = $('#emailPaciente'),
            oCampoEndereco = $('#enderecoPaciente'), 
            oCampoNascimento = $('#nascimentoPaciente');

        if ($('#isPaciente').is(':checked')) {
            switch (true) {
                case oCampoCpf.val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                case oCampoQuantidade.val() == '':
                    alert('Por favor, preencha o campo Quantidade com a quantidade de sangue doado.');
                    break;
                case !$.isNumeric(oCampoQuantidade.val()):
                    alert('Por favor, valor inválido para o campo Quantidade.');
                    break;
                default:
                    bRetorno = validaCPF(oCampoCpf.val());
                    break;
            }
        } else {
            switch (true) {
                case oCampoNome.val() == '':
                    alert('Por favor, preencha o campo Nome.');
                    break;
                case oCampoCpf.val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                case oCampoNascimento.val() == '':
                    alert('Por favor, preencha o campo Data de Nascimento.');
                    break;
                case oCampoTelefone.val() == '':
                    alert('Por favor, preencha o campo Telefone.');
                    break;
                case !$.isNumeric(oCampoTelefone.val()):
                    alert('Por favor, valor inválido para o campo Telefone.');
                    break;
                case oCampoEmail.val() == '':
                    alert('Por favor, preencha o campo Email.');
                    break;
                case oCampoEndereco.val() == '':
                    alert('Por favor, preencha o campo Endereço.');
                    break;
                case oCampoQuantidade.val() == '':
                    alert('Por favor, preencha o campo Quantidade com a quantidade de sangue doado.');
                    break;
                case !$.isNumeric(oCampoQuantidade.val()):
                    alert('Por favor, valor inválido para o campo Quantidade.');
                    break;
                default:
                    bRetorno = validaCPF(oCampoCpf.val());
                    break;
            } 
        }

        return bRetorno;
    }

    function validaCPF(sCpf) {
        let bRetorno = true;
        const cpf = new ValidaCPF(sCpf);
        if (!cpf.valida()) {
          alert('CPF inválido.');
          bRetorno =  false;
        }
        return bRetorno;
    }

    function limpaCampos() {
        $('input').val('');
    }

    onLoad();
});