import {load_dex} from './js/dex_data.js'
import {get_actual_region_limits} from './js/tuple.js'

//==============================================================

export let gen_list = ['kanto','johto','hoenn','sinnoh','unova','kalos','alola']

// Carrega o json com a data de TODOS os pokemon

let global_data = load_dex()

// Vai armazenar qual a atual região renderizada no Aside

export let current_gen

// Vai armazenar um objeto com o atual pokemon renderizado na tela

let current_pkm = {

	id:1, // Valor que começa com o ID do bulbassaur mas que muda conforme interage

	update:function(arg){ // Muda o Pkm corrente para outro passando um ID de argumento

		this.id = arg
		this.render()

	},

	render:function(){

		var index = this.id - 1

		// Renderizou o nome da div main-name

		document.getElementById('main-name').innerText = `${global_data[index].id} - ${global_data[index].name.english}`

		// Renderizou a imagem na img-div-img usando o path

		document.getElementById('img-div-img').src = global_data[index].img_path

		// Puxo uma coleção de labels

		var stats_collection = document.getElementsByClassName('sts-label')

	  	// Cada posição desse container recebe um innerText referente aos stats do global_data[index]

		stats_collection[0].innerText = "HP : " 			+ global_data[index].base["HP"]
		stats_collection[1].innerText = "Attack : " 		+ global_data[index].base["Attack"]
		stats_collection[2].innerText = "Defense : " 		+ global_data[index].base["Defense"]
		stats_collection[3].innerText = "Sp. Attack : " 	+ global_data[index].base["Sp. Attack"]
		stats_collection[4].innerText = "Sp. Defense : " 	+ global_data[index].base["Sp. Defense"]
		stats_collection[5].innerText = "Speed : " 			+ global_data[index].base["Speed"]

	  	// LABEL VAZIO vs LABEL COM CONTEUDO

	  	// Puxa 2 tags

		var type_labels = document.getElementsByClassName('type-label')

	  	// Limpar o conteudo das duas labels

		type_labels[1].innerText = ""
		type_labels[0].innerText = ""

	  	// Percorre todos os tipos do pokemon

		for (var x in global_data[index].type) { // x =  0 ou 0-1

			type_labels[x].innerText = global_data[index].type[x]

		}

	},

	next:function(){

		// usa o get_limits pra setar onde começa e onde termina a atual região

		var limits = get_actual_region_limits()

		// Se o ID for o ultimo pokemon, renderize o primeiro pkm
		// Caso o contrario da um update no current pokemon pra ele virar o próximo

		if(this.id == limits[1]) { this.update(limits[0]) } else { this.update(this.id + 1) }

	},

	back:function(){

		// Exatamente o Next só que invertido

		var limits = get_actual_region_limits()

		if(this.id == limits[0]) { this.update(limits[1]) } else { this.update(this.id - 1) }

	}

}

//==============================================================

// Amarrando funções nos botões de navegação para renderizar as regiões no aside

document.getElementById('menu1').addEventListener('click',function(){render_aside(gen_list[0])})
document.getElementById('menu2').addEventListener('click',function(){render_aside(gen_list[1])})
document.getElementById('menu3').addEventListener('click',function(){render_aside(gen_list[2])})
document.getElementById('menu4').addEventListener('click',function(){render_aside(gen_list[3])})
document.getElementById('menu5').addEventListener('click',function(){render_aside(gen_list[4])})
document.getElementById('menu6').addEventListener('click',function(){render_aside(gen_list[5])})

// Amarrando funções nos botões de next e back

document.getElementById('next').addEventListener('click',function(){current_pkm.next()})
document.getElementById('back').addEventListener('click',function(){current_pkm.back()})

// Renderizando Kanto e o Primeiro Pokemon

current_pkm.render()
render_aside(gen_list[0])

//==============================================================

function render_aside(gen){

	// Atualiza a variavel global com a atual região a ser renderizada no aside

	current_gen = gen

	// Usa o get_limits pra setar onde começa e onde termina a atual região

	var limits = get_actual_region_limits()

	// Atualiza o current pokemon pra ser o primeiro da geração corrente

	current_pkm.update(limits[0])

	clear_aside()

	for(var x = limits[0] ; x <= limits[1] ; x++) { // o X percorre de um limite ao outro

		var imgGenerica = document.createElement('img') // Cria Tag IMG

		switch(true){ // Seta certinho um path de imagem

			case x < 10:

				imgGenerica.src = `thumbnails/00${x}.png`

			break
			case x < 100:

				imgGenerica.src = `thumbnails/0${x}.png`

			break
			default:

				imgGenerica.src = `thumbnails/${x}.png`

			break
		}

		// Adiciona a TAG as classes

		imgGenerica.className = 'pkm-icon button'

		// Coloca um ID NA TAG referente ao pokemon que ela se trata

		imgGenerica.id = x // Lembrando q isso vira uma string

		// Adiciona a TAG função de Click

		imgGenerica.addEventListener('click', function(){ current_pkm.update(parseInt(this.id)) })

		// Injeta a TAG gerada no aside

		document.getElementById('aside').appendChild(imgGenerica)

	}		

}

function clear_aside(){

	var aside = document.getElementById('aside')

	while(aside.hasChildNodes()){ // Enquanto o aside tiver childs ele vai deletando uma a uma

		aside.removeChild(aside.firstChild)

	}

}
