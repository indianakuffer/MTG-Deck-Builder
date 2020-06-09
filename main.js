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
  name !== '' ? queryList.push('&name=' + name) : null

  // colors
  let colors = ''
  let colorList = document.querySelectorAll('.input-color')
  colorList.forEach(color => {
    color.checked ? colors += color.value : null
  })
  colors ? queryList.push('&colors=' + colors) : null

  // set
  let set = document.querySelector('#input-sets').value
  set !== '' ? queryList.push('&setName=' + set) : null

  // return parsed queries
  let parsedQueries = queryList.join('')
  return parsedQueries
}


async function fillSets() {
  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/sets')
    const dropdown = document.querySelector('#input-sets')
    response.data.sets.forEach(set => {
      const newOption = document.createElement('option')
      newOption.innerText = set.name
      newOption.value = set.name
      dropdown.append(newOption)
    })
  } catch (error) {
    console.error(error)
  }
}

fillSets()

// Test search
document.querySelector('#search-bar').addEventListener('click', () => searchAPI(12))