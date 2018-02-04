var list = [//array com varios obejtos  array -> [      obejetos -> {
    {"desc": "Granola", "quant": "1", "valor": "5.4"},
    {"desc": "Pão", "quant": "12", "valor": "0.47"},
    {"desc": "Maça", "quant": "2", "valor": "13.2"}
]

function getTotal(list) {  //valor total da lista
    var total = 0;

    for (var i in list) {          //for para percorrer toda a array
        total += list[i].quant * list[i].valor;
    }
    document.getElementById("totalValor").innerHTML = formatValor(total);
}

function setList(list) { //tabela html feita no js
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';

    for (var i in list) { //for para mostrar todos os objetos salvos no array
        table += '<tr><td>' + formatDesc(list[i].desc) + '</td><td>' + formatQuant(list[i].quant) + '</td><td>' + formatValor(list[i].valor) + '</td><td><button style="margin: 5px;" onclick="setUpdate(' + i + ')" class="btn btn-warning">Editar</button> <button style="margin: 5px;" onclick="deleteData(' + i + ')" class="btn btn-danger">Excluir</button></td></tr>';
    }

    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;  //troca os valores da listTable pelos dados table ->DOM
    getTotal(list);  //atualiza o valor total
    saveListStorage(list)  //salva no localStorage
}

function formatDesc(desc) {   //formatar descrisao para mostrar 1letra maiusulo
    var str = desc.toLowerCase();  //trasforma toda string em minusculo
    str = str.charAt().toUpperCase() + str.slice(1);  //transforma a primeira letra em maiusculo //charAt pega a primeira letra
    return str;
}

function formatQuant(quant) {
    return parseInt(quant); //formata a quant para um numero inteiro
}

function formatValor(valor) {
    var str = parseFloat(valor).toFixed(2) + "";  //trasformou o valor para float para poder adicionar duas casas decimas  //o "" tranformou novamente para string
    str = str.replace(".", ","); //transforma o . em ,
    str = "R$ " + str;  //concatena o R$ com a string
    return str;
}

function addData() {
    if (!validation()) { //verifica se não ocorreu nenhum erro
        return;  //se ocorreu, para a execução devido ao return
    }
    var desc = document.getElementById("desc").value; //salva o valor do formulario html na variavel js
    var quant = document.getElementById("quant").value;
    var valor = document.getElementById("valor").value;

    list.unshift({"desc": desc, "quant": quant, "valor": valor});   //unshift para adicionar o novo objeto na primeira linha da array
    setList(list);  //chama a funcao para atualizar a lista
}

function setUpdate(id) { //para alterar os dados salvos na lista
    var obj = list[id]; //pode-se fazer assim ou direto com o array

    document.getElementById("desc").value = list[id].desc;       //atualiza o valor do campo desc no html para o valor salvo na lista.desc
    document.getElementById("quant").value = obj.quant;
    document.getElementById("valor").value = list[id].valor;

    document.getElementById("btnUpdate").style.display = "inline-block";  //mostra o span com os botoes de salvar e remover
    document.getElementById("btnAdd").style.display = "none";    //oculta os outros buttons

    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">'; //para pegar o id do objeto
}

function resetForm() { //limpa o formulário
    document.getElementById("desc").value = "";
    document.getElementById("quant").value = "";
    document.getElementById("valor").value = "";


    document.getElementById("btnUpdate").style.display = "none"; //ocula o span com os botoes de salvar e remover
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = ""; //limpa o id do objeto salvo no formulario
    document.getElementById("errors").style.display = "none"; //oculta os error, caso tiver

}

function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value; //salva o id do objeto na var id

    var desc = document.getElementById("desc").value; //salva na variavel os dados do formulario html
    var quant = document.getElementById("quant").value;
    var valor = document.getElementById("valor").value;

    list[id] = { //atualiza o lista do id selecionado com os novos valores do formulario
        "desc": desc,
        "quant": quant,
        "valor": valor
    };
    resetForm(); //limpa o formulario apos atualziar
    setList(list); //atualiza a lista com os novos valores

}

function deleteData(id) {
    if (confirm("Excluir item?")) {
        if (id === (list.length - 1)) {
            list.pop();   //apaga o ultimo objeto do array
        } else if (id === 0) {
            list.shift();  //apaga o primeiro objeto do array
        } else {
            var arrayAuxIni = list.slice(0, id); //cria um array auxiliar para salvar os objetos ate o id para ser excluido
            var arrayAuxFim = list.slice(id + 1); //salva a lista do id para excluir +1 ate o final do array na variavel auxiliar

            list = arrayAuxIni.concat(arrayAuxFim); //contatena as duas arrays em uma e exclui o objeto com id
        }


        setList(list); //atualiza a lista
    }

}

function validation() {
    var desc = document.getElementById("desc").value; //salva os valores do formulario html para variavel js
    var quant = document.getElementById("quant").value;
    var valor = document.getElementById("valor").value;
    var errors = ""; //declara variavel erro como vazia
    document.getElementById("errors").style.display = "none"; //oculta os erros sempre quel alguma função chama essa validaçao


    if (desc === "") {
        errors += '<p>Informe a descrição!</p>';
    }

    if (quant === "") {
        errors += '<p>Informe a quantidade!</p>';
    } else if (quant != parseInt(quant)) {
        errors += '<p>Informe uma quantidade válida!</p>';
    }

    if (valor === "") {
        errors += '<p>Informe o valor!</p>';
    } else if (valor != parseFloat(valor)) {
        errors += '<p>Informe um valor válido!</p>';
    }

    if (errors != "") {
        document.getElementById("errors").innerHTML = "<h3>Error</h3>" + errors;
        document.getElementById("errors").style.display = "block";  //configuração de css com js
        document.getElementById("errors").style.backgroundColor = "#03000080";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.borderRadius = "15px";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        return 0;
    } else {
        return 1;
    }

}

function deleteList() {
    if (confirm("Apagar está lista?")){  //ok para true
        list = [];      //limpa o array
        setList(list); //atualiza a lista
    }
}

function saveListStorage(list) {  //para salvar no localstorage do navegador
    var jsonStr = JSON.stringify(list);  //tranformar o array em string para salvar com json
    localStorage.setItem("list", jsonStr); //cria a tabela list com os dados da array list
}

function initListStorage() {
    var testList = localStorage.getItem("list");  //verifica se a lista ja está salvar
    if (testList) {
        list = JSON.parse(testList); //recupera a lista que foi transformada em string para uma array
    }
    setList(list);//atualiza a lista
}

initListStorage(); //chama a funcao para verificar se tem alguma informaçao no localStorage