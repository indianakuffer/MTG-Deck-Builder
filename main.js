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
  console.log(url)
}


function buildQueries() {
  let queryList = []

  // name
  let name = document.querySelector('#input-name').value
  if (name !== '') {
    queryList.push('&name=' + name)
  }

  // colors
  let colors = ''
  let colorList = document.querySelectorAll('.input-color')
  colorList.forEach(color => {
    color.checked ? colors += color.value : null
  })
  colors ? queryList.push('&colors=' + colors) : null


  let parsedQueries = queryList.join('')
  return parsedQueries
}



document.querySelector('#search-bar').addEventListener('click', () => searchAPI(12))