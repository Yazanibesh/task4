import http from '../StarwarsAPI'

const getStarwarsCharacter = (number) => {
	return http.get(`people/${number}`)
}

export default {
	getStarwarsCharacter
}