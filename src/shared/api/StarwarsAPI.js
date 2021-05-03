import Axios from 'axios'

const StarwarsAPI = Axios.create({
	baseURL: 'https://swapi.dev/api/'
})

export default StarwarsAPI