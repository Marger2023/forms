document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('userForm');
    var cepInput = document.getElementById('cep');
    var consultarCepButton = document.getElementById('consultarCep');

    form.addEventListener('submit', function (event) {

        if (!form.checkValidity()) {
            event.preventDefault(); 
            event.stopPropagation();
        } else {
            event.preventDefault(); 

            // Cria uma instância de XMLHttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);

           
            xhr.onload = function () {
                if (xhr.status === 200) {
                        window.location.href = 'registros.php';
                }
            };

            // Cria um FormData com os dados do formulário e envia a requisição
            var formData = new FormData(form);
            xhr.send(formData);
        }

        // Adiciona a classe de validação ao formulário
        form.classList.add('was-validated');
    });

    // Adiciona um ouvinte de evento para o botão "Consultar" do CEP
    consultarCepButton.addEventListener('click', function () {
        var cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`, true);

            // Quando a resposta é recebida
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);

                    // Se não houver erro no CEP consultado
                    if (!data.erro) {
                        // Preenche os campos com os dados retornados pela API
                        document.getElementById('logradouro').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado');
                        clearAddressFields();
                    }
                } else {
                    alert('Erro ao consultar o CEP');
                }
            };

            xhr.send();
        } else {
            alert('CEP inválido');
            clearAddressFields();
        }
    });

    // Função para limpar os campos de endereço
    function clearAddressFields() {
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }
});
