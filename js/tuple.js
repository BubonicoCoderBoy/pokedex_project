
// Função que retorna uma Tupla com os limites de pokemon de cada geração

// exemplo : 	limites_kanto = get_blabla_limits()
// 				limites_kanto >> [1,151]

import {current_gen, gen_list} from '../script_pokedex_08.js'

export function get_actual_region_limits(){

	var kanto_limits = [1,151]
	var johto_limits = [152,251]
	var hoenn_limits = [252,386]
	var sinnoh_limits = [387,493]
	var unova_limits = [494,649]
	var kalos_limits = [650,721]
	var alola_limits = [722,809]

	var limits = []

	switch(current_gen){

		case gen_list[0]: // 'kanto'

			limits[0]=kanto_limits[0]
			limits[1]=kanto_limits[1]
			

		break
		case gen_list[1]: // 'johto'

			limits[0]=johto_limits[0]
			limits[1]=johto_limits[1]
			

		break
		case gen_list[2]: //'hoenn'

			limits[0]=hoenn_limits[0]
			limits[1]=hoenn_limits[1]
			

		break
		case gen_list[3]:

			limits[0]=sinnoh_limits[0]
			limits[1]=sinnoh_limits[1]
			

		break
		case gen_list[4]:

			limits[0]=unova_limits[0]
			limits[1]=unova_limits[1]
			

		break
		case gen_list[5]:

			limits[0]=kalos_limits[0]
			limits[1]=kalos_limits[1]
			

		break
		case gen_list[6]:

			limits[0]=alola_limits[0]
			limits[1]=alola_limits[1]
			

		break

		}

	return limits

}