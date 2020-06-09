async function searchAPI(pageSize) {
  let url = `https://api.magicthegathering.io/v1/cards?pageSize=${pageSize}`
  url += buildQueries()
  try {
    const response = await axios.get(url)
    const cardList = response.data.cards
    console.log(cardList)
  } catch (error) {
    console.error(error)
  }
}

function buildQueries() {
  let queryList = []
  let name = document.querySelector('#input-name').value
  name = 'Fireball'
  if (name !== '') {
    name = '&name=' + name
    queryList.push(name)
  }

  let results = queryList.join('')
  console.log('results', results)
  return results
}

searchAPI(4)