document.addEventListener('deviceready', onDeviceReady, false);
		
var bd;
var usuario = {};
var alimentos = {};

function onDeviceReady() {
	bd = window.openDatabase('bd_nutricao', 1, 'Base de Dados', 2 * 1024 * 1024);
	bd.transaction(popularBD, erroCB, sucessoCB);
}
		
function popularBD(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS TB_USUARIOS ' +
		'(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT, email TEXT, dataNasc TEXT, altura REAL, pesoAtual REAL, pesoDesejado REAL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS TB_ALIMENTOS ' +
		'(id INTEGER PRIMARY KEY AUTOINCREMENT, alimento TEXT, marca TEXT, tamPorcao REAL, numPorcoes REAL, calorias REAL, carbo REAL, prot REAL, gordTot REAL, gordSat REAL, gordPoli REAL, monoinsat REAL, gordTrans REAL, colest REAL, sodio REAL, potassio REAL, fibras REAL, acucar REAL, vitA REAL, vitC REAL, calcio REAL, ferro REAL)');
	//tx.executeSql('INSERT INTO TB_ALIMENTOS (id, alimento) VALUES (10, "Banana")');
	//tx.executeSql('INSERT INTO TB_ALIMENTOS (id, alimento) VALUES (20, "Maça")');
	/*tx.executeSql("DROP TABLE TB_ALIMENTOS",[], 
		function(tx,results){
			console.log("Successfully Dropped")
		},
		function(tx,error){
			console.log("Error droping the table: " + error.message)
		});*/
}
		
function erroCB(err) {
	alert('Erro no BD: ' + err.message + '\nCodigo: ' + err.code);
}
		
function sucessoCB() {
	initBD();
}
		
function initBD() {
	bd.transaction(function(tx) {
		tx.executeSql('SELECT * FROM TB_USUARIOS ORDER BY ID', [], listarUsuariosBD, erroCB);
	});
	bd.transaction(function(tx) {
		tx.executeSql('SELECT * FROM TB_ALIMENTOS ORDER BY ID', [], listarAlimentosBD, erroCB);
	});
	
}
		
function listarUsuariosBD(tx, results1) {
	if (results1.rows.length > 0) {
		for (var i = 0; i < results1.rows.length; i++) {
			usuario.id = results1.rows.item(i).id;
			usuario.nome = results1.rows.item(i).nome;
			usuario.senha = results1.rows.item(i).senha;
			usuario.email = results1.rows.item(i).email;
			usuario.dataNasc = results1.rows.item(i).dataNasc;
			usuario.altura = results1.rows.item(i).altura;
			usuario.pesoAtual = results1.rows.item(i).pesoAtual;
			usuario.pesoDesejado = results1.rows.item(i).pesoDesejado;
		}
	}
}
		
function listarAlimentosBD(tx, results2) {
	alert("entrou");
	/*if (results2.rows.length > 0) {
		for (var i = 0; i < results2.rows.length; i++) {
			alimentos.id = results2.rows.item(i).id;
			alimentos.alimento = results2.rows.item(i).alimento;
			alimentos.marca = results2.rows.item(i).marca;
			alimentos.tamPorcao = results2.rows.item(i).tamPorcao;
			alimentos.numPorcoes = results2.rows.item(i).numPorcoes;
			alimentos.calorias = results2.rows.item(i).calorias;
			alimentos.carbo = results2.rows.item(i).carbo;
			alimentos.prot = results2.rows.item(i).prot;
			alimentos.gordTot = results2.rows.item(i).gordTot;
			alimentos.gordSat = results2.rows.item(i).gordSat;
			alimentos.gordPoli = results2.rows.item(i).gordPoli;
			alimentos.monoinsat = results2.rows.item(i).monoinsat;
			alimentos.gordTrans = results2.rows.item(i).gordTrans;
			alimentos.colest = results2.rows.item(i).colest;
			alimentos.sodio = results2.rows.item(i).sodio;
			alimentos.potassio = results2.rows.item(i).potassio;
			alimentos.fibras = results2.rows.item(i).fibras;
			alimentos.acucar = results2.rows.item(i).acucar;
			alimentos.vitA = results2.rows.item(i).vitA;
			alimentos.vitC = results2.rows.item(i).vitC;
			alimentos.calcio = results2.rows.item(i).calcio;
			alimentos.ferro = results2.rows.item(i).ferro;
		}
	}*/
	var len = results2.rows.length;
	alert("DEMO table: " + len + " rows found.");
    /*for (var i=0; i<len; i++){
        alert("Row = " + i + " ID = " + results2.rows.item(i).alimento);
    }*/
}

function criarNovoUsuario() {
	var nome = $('#nome').val();
	var senha = $('#senha').val();
	var email = $('#email').val();
	var dataNasc = $('#dataNasc').val();
	var altura = $('#altura').val();
	var pesoAtual = $('#pesoAtual').val();
	var pesoDesejado = $('#pesoDesejado').val();
	//if ((nome != null) || (senha != null) || (email != null) || (dataNasc != null) || (altura != null) || (pesoAtual != null) || (pesoDesejado != null)){
		if (nome.trim() == '') {
			alert("Preencha o campo nome");
		}else if(senha.trim() == ''){
			alert("Preencha o campo senha");
		}else if(email.trim() == ''){
			alert("Preencha o campo e-mail");
		}else if(dataNasc.trim() == ''){
			alert("Preencha o campo data nascimento");
		}else if(altura.trim() == ''){
			alert("Preencha o campo altura");
		}else if(pesoAtual.trim() == ''){
			alert("Preencha o campo peso atual");
		}else if(pesoDesejado.trim() == ''){
			alert("Preencha o campo peso desejado");
		}else{
			usuario = {id: 0, nome: nome, senha: senha, email: email, dataNasc: dataNasc, altura: altura, pesoAtual: pesoAtual, pesoDesejado: pesoDesejado};
			addItemListaBD(usuario);
		}
	//}		
}	
					
function addItemListaBD(usuario) {
	bd.transaction(function(tx) {
		tx.executeSql('INSERT INTO TB_USUARIOS(nome, senha, email, dataNasc, altura, pesoAtual, pesoDesejado) VALUES (?, ?, ?, ?, ?, ?, ?)', 
			[usuario.nome, usuario.senha, usuario.email, usuario.dataNasc, usuario.altura, usuario.pesoAtual, usuario.pesoDesejado], function(tx, results1) {
				novoId = results1.insertId;
				alert("Usuário cadastrado com sucesso!");
				window.location.href = 'login.html';
		});
	});
}

$('#enviarAlimento').click(function (e) {

		alimentos = { 
			id: 0,
			alimento:	$('#alimento').val(),
			marca:		$('#marca').val(),
			tamPorcao:  $('#tamPorcao').val(),
			numPorcoes: $('#numPorcoes').val(),
			calorias: 	$('#calorias').val(),
			carbo: 		$('#carbo').val(),
			prot: 		$('#prot').val(),
			gordTot: 	$('#gordTot').val(),
			gordSat: 	$('#gordSat').val(),
			gordPoli: 	$('#gordPoli').val(),
			monoinsat: 	$('#monoinsat').val(),
			gordTrans: 	$('#gordTrans').val(),
			colest: 	$('#colest').val(),
			sodio: 		$('#sodio').val(),
			potassio: 	$('#potassio').val(),
			fibras: 	$('#fibras').val(),
			acucar: 	$('#acucar').val(),
			vitA: 		$('#vitA').val(),
			vitC: 		$('#vitC').val(),
			calcio: 	$('#calcio').val(),
			ferro: 		$('#ferro').val()
		};

		addAlimentoBD(alimentos);
});

function addAlimentoBD(alimentos) {
	bd.transaction(function(tx) {
		tx.executeSql('INSERT INTO TB_ALIMENTOS(alimento, marca, tamPorcao, numPorcoes, calorias, carbo, prot, gordTot, gordSat, gordPoli, monoinsat, gordTrans, colest, sodio, potassio, fibras, acucar, vitA, vitC, calcio, ferro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
			[alimentos.alimento, alimentos.marca, alimentos.tamPorcao, alimentos.numPorcoes, alimentos.calorias, alimentos.carbo, alimentos.prot, alimentos.gordTot, alimentos.gordSat, alimentos.gordPoli, alimentos.monoinsat, alimentos.gordTrans, alimentos.colest, alimentos.sodio, alimentos.potassio, alimentos.fibras, alimentos.acucar, alimentos.vitA, alimentos.vitC, alimentos.calcio, alimentos.ferro], function(tx, results2) {
				//novoId2 = results2.insertId;
				alert("Alimento cadastrado com sucesso!");
				window.location.href = 'painelControle.html';
		});
	});
}

function addItemTela() {
	bd.transaction(function(tx) {
		tx.executeSql('SELECT * FROM TB_ALIMENTOS', [], function (tx, results2) { 
			var n = results2.rows.length;

			for(var i = 0;i < n;i++) {
				var listaAlimentos = results2.rows.item(i);
				var clone = $('#item-lista li#listaAlimento').clone().appendTo('#item-lista ul').show();
				clone.find('#tipoAlimento').text(listaAlimentos.alimento);
				clone.find('#qtdAlimento').text(listaAlimentos.tamPorcao + 'porção');
				clone.find('#caloriasAlimento').text(listaAlimentos.calorias + 'calorias');
			}
		});
	});
}

/*var testeLeitura = function(){
	alert("entrou");
	db.transaction(function (tx) { 
		tx.executeSql('SELECT * FROM TB_ALIMENTOS', [], function (tx, results2) { 
			alert("entrou no select");
			var len = results2.rows.length, i; 
			var results3 = [];
			if(results2.rows.length > 0){}
				for (i = 0; i < len; i++) { 
					console.log(results2.rows.item(i).alimento);
				} 
				alert("mais de uma linha");
			}else{
				alert("Não há registros no banco.");
			}
		});
	});
}*/


/*function limparCampos() {
	$('#nome').val('').focus();
	$('#senha').val('');
	$('#email').val('');
	$('#dataNasc').val('');
	$('#altura').val('');
	$('#pesoAtual').val('');
	$('#pesoDesejado').val('');
	$('form input')
}*/