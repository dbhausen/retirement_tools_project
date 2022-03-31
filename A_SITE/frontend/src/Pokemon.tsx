import React, { useState } from 'react'
import Button from '@mui/material/Button'

import { Box } from '@mui/material'

const axios = require('axios').default

const formatDate = (date: Date) =>
	`${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
		date.getSeconds()
	).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

interface PokemonData {
	id: string
	number: string
	name: string
	image: string
	fetchedAt: string

	attacks: {
		special: Array<{
			name: string
			type: string
			damage: number
		}>
	}
}

function PokemonApp() {
	const [pokemon, setPokemon] = useState<PokemonData>()

	const handlePingClickAxios = () => {
		const name = 'Charmeleon'
		const url = 'https://graphql-pokemon2.vercel.app/'
		const pokemonQuery = `
        query PokemonInfo($name: String) {
          pokemon(name: $name) {
            id
            number
            name
            image
            attacks {
              special {
                name
                type
                damage
              }
            }
          }
        }
      `

		type AxiosResponse = {
			data?: {
				data?: {
					pokemon: Omit<PokemonData, 'fetchedAt'>
				}
			}
			errors?: Array<{ message: string }>
		}

		axios
			.get(url, {
				params: {
					query: pokemonQuery,
					variables: { name: name.toLowerCase() },
				},
			})
			.then((response: AxiosResponse) => {
				const poke = response.data?.data?.pokemon
				if (!poke) {
					throw new Error(`No Pokemon named: ${name}`)
				} else {
					const pokemonWithDate = Object.assign(poke, {
						fetchedAt: formatDate(new Date()),
					})

					setPokemon(pokemonWithDate)
				}
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}
	return (
		<Box sx={{ marginTop: '70px' }}>
			<Button onClick={handlePingClickAxios}>Axios</Button>
			{pokemon?.name}
			<img src={pokemon?.image} alt='' />
		</Box>
	)
}

export default PokemonApp
