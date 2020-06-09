let previousSearch
let pageSize = 50

async function fetchCards(page = 1) {
  let url = `https://api.magicthegathering.io/v1/cards?pageSize=${pageSize}&page=${page}`
  url += buildQueries()
  // clears card-container on reload
  document.querySelector('#card-container').innerHTML = ''
  try {
    const response = await axios.get(url)
    const cardList = response.data.cards
    console.log(cardList)
    if (cardList.length === 0) { alert('Sorry, that returned no results.') }
    cardList.forEach((card) => {
      renderCard(card)
    })

  } catch (error) {
    console.error(error)
  }
  previousSearch = url
  console.log('Previous Search', previousSearch)
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

  // sets
  let set = document.querySelector('#input-sets').value
  set !== '' ? queryList.push('&setName=' + set) : null

  // types
  let type = document.querySelector('#input-types').value
  type !== '' ? queryList.push('&types=' + type) : null

  // rarity
  let rarity = document.querySelector('#input-rarity').value
  rarity !== '' ? queryList.push('&rarity=' + rarity) : null

  // mana cost
  let manaCost = document.querySelector('#input-mana').value
  manaCost !== '' ? queryList.push('&cmc=' + manaCost) : null

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

async function fillTypes() {
  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/types')
    const dropdown = document.querySelector('#input-types')
    response.data.types.forEach(type => {
      const newOption = document.createElement('option')
      newOption.innerText = type
      newOption.value = type
      dropdown.append(newOption)
    })
  } catch (error) {
    console.error(error)
  }
}

function renderCard(card) {
  // cards with no imageUrls seem to be duplicates, skips over those
  if (!card.imageUrl) { return }

  const cardElement = document.createElement('img')
  cardElement.classList.add('card')
  cardElement.src = card.imageUrl

  document.querySelector('#card-container').append(cardElement)
}

function turnPage(dir) {
  const pageLocation = previousSearch.indexOf('page=')
  let pageString = previousSearch.substring(pageLocation, pageLocation + 6)
  let pageNum = parseInt(pageString[pageString.length - 1])

  // stops page from going below 0
  if (pageNum + dir === 0) {
    console.warn('Page cannot go below 0.')
    return
  }
  fetchCards(pageNum + dir)
}


fillSets()
fillTypes()


document.querySelector('form').addEventListener('submit', () => {
  event.preventDefault()
  fetchCards()
})

document.querySelector('.page-btn.left').addEventListener('click', () => turnPage(-1))
document.querySelector('.page-btn.right').addEventListener('click', () => turnPage(1))