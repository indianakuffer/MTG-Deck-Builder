let previousSearch
let pageSize = 50
let deck = {
  name: 'defaultDeck',
  contents: {},
}

// Kicking things off
initEventListeners()
fillSets()
fillTypes()
fillDeckList()
loadDeck()

// Functions

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

async function fetchCards(page = 1) {
  let url = `https://api.magicthegathering.io/v1/cards?pageSize=${pageSize}&page=${page}`
  url += buildQueries()
  // clears card-container on reload
  document.querySelector('#card-container').innerHTML = ''
  let interval = createLoading()
  try {
    const response = await axios.get(url)
    const cardList = response.data.cards
    removeLoading(interval)
    console.log(cardList)
    if (cardList.length === 0) { alert('Sorry, that returned no results.') }
    cardList.forEach((card) => {
      renderCard(card)
    })

  } catch (error) {
    console.error(error)
  }
  previousSearch = url
}

function renderCard(card) {
  // cards with no imageUrls seem to be duplicates, skips over those
  if (!card.imageUrl) { return }

  const cardElement = document.createElement('img')
  cardElement.classList.add('card')
  cardElement.src = card.imageUrl
  cardElement.addEventListener('click', () => { moreDetails(card) })

  document.querySelector('#card-container').append(cardElement)
}

function turnPage(dir) {
  if (!previousSearch) {
    alert('Make a search first!')
    return
  }
  const pageLocation = previousSearch.indexOf('page=')
  let pageString = previousSearch.substring(pageLocation, pageLocation + 6)
  let pageNum = parseInt(pageString[pageString.length - 1])
  if (pageNum + dir === 0) {
    alert('You\'re at the first page.')
    return
  }

  fetchCards(pageNum + dir)
}

function moreDetails(card) {
  const detailContainer = document.querySelector('#detail-container')

  while (detailContainer.childNodes.length > 2) {
    detailContainer.removeChild(detailContainer.lastChild)
  }
  if (detailContainer.classList.contains('hidden')) {
    toggleDeckView()
  }

  // image
  const image = document.createElement('img')
  image.src = card.imageUrl
  image.classList.add('detail-card')

  // info
  const info = document.createElement('div')
  info.classList.add('info-container')

  // name
  const name = document.createElement('p')
  name.textContent = `Name: ${card.name}`

  // originalType
  const originalType = document.createElement('p')
  originalType.textContent = `Type: ${card.originalType}`

  // originalText
  const originalText = document.createElement('p')
  originalText.textContent = `Text: ${card.originalText}`

  // rarity
  const rarity = document.createElement('p')
  rarity.textContent = `Rarity: ${card.rarity}`

  // setName
  const setName = document.createElement('p')
  setName.textContent = `Set: ${card.setName}`

  // artist
  const artist = document.createElement('p')
  artist.textContent = `Artist: ${card.artist}`

  // button
  const button = document.createElement('button')
  button.textContent = 'Add to Deck'
  button.addEventListener('click', () => { addToDeck(card) })
  button.id = 'add-to-deck-btn'
  button.classList.add('btn')

  detailContainer.append(image)
  detailContainer.append(info)
  info.append(name)
  info.append(originalType)
  info.append(originalText)
  info.append(rarity)
  info.append(setName)
  info.append(artist)
  detailContainer.append(button)
}

function toggleDeckView() {
  const detailContainer = document.querySelector('#detail-container')
  const deckContainer = document.querySelector('#deck-container')
  const iconImage = document.querySelector('#detail-view-btn')

  detailContainer.classList.toggle('hidden')
  deckContainer.classList.toggle('hidden')
  detailContainer.classList.contains('hidden') ? iconImage.style['background-image'] = 'url(./images/card-icon-black.png)' : iconImage.style['background-image'] = 'url(./images/deck-icon-black.png)'
}

function addToDeck(card) {
  if (Object.keys(deck.contents).includes(card.name)) {
    deck.contents[card.name].quantity += 1
  } else {
    deck.contents[card.name] = card
    deck.contents[card.name].quantity = 1
  }
  renderDeckList()
}

function renderDeckList() {
  const testHandButton = document.querySelector('#test-hand-btn')
  document.querySelector('#deck').innerHTML = ''
  document.querySelector('#deck-length').textContent = deckLength()
  for (const card in deck.contents) {
    const listing = document.createElement('div')
    listing.classList.add('listing')

    const text = document.createElement('span')
    text.classList.add('listing-name')
    text.textContent = `${deck.contents[card].name} - x${deck.contents[card].quantity}`

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('crement-btn.container')

    const removeButton = document.createElement('button')
    removeButton.textContent = '-'
    removeButton.addEventListener('click', () => crementCard(card, -1))
    removeButton.classList.add('crement-btn')
    removeButton.classList.add('crement-remove')

    const addButton = document.createElement('button')
    addButton.textContent = '+'
    addButton.addEventListener('click', () => crementCard(card, 1))
    addButton.classList.add('crement-btn')
    addButton.classList.add('crement-add')

    const preview = document.createElement('img')
    preview.src = deck.contents[card].imageUrl
    preview.classList.add('card-preview')

    document.querySelector('#deck').append(listing)
    listing.append(text)
    listing.append(buttonContainer)
    buttonContainer.append(removeButton)
    buttonContainer.append(addButton)
    text.append(preview)
  }

  saveDeck(deck.name)

  if (Object.keys(deck.contents).length > 0 && testHandButton.classList.contains('hidden')) {
    testHandButton.classList.remove('hidden')
  } else if (Object.keys(deck).length <= 0) {
    testHandButton.classList.add('hidden')
  }
}

function crementCard(card, amount) {
  deck.contents[card].quantity += amount
  if (deck.contents[card].quantity <= 0) {
    delete deck.contents[card]
  }
  renderDeckList()
}

function deckLength() {
  let length = 0
  for (const card in deck.contents) {
    length += deck.contents[card].quantity
  }
  return length
}

function shuffleDeck() {
  let shuffledDeck = []
  for (const card in deck.contents) {
    let quantity = deck.contents[card].quantity
    while (quantity > 0) {
      shuffledDeck.push(deck.contents[card])
      quantity--
    }
  }
  shuffledDeck.forEach((card, index) => {
    let randomIndex = (Math.floor(Math.random() * shuffledDeck.length))
    let temp = card
    let randomCard = shuffledDeck[randomIndex]
    shuffledDeck[index] = randomCard
    shuffledDeck[randomIndex] = temp
  })

  return shuffledDeck
}

function testHand() {
  const handContainer = document.querySelector('#test-hand')
  handContainer.innerHTML = ''
  const shuffledDeck = shuffleDeck()
  let hand = []
  for (let i = 0; i < shuffledDeck.length; i++) {
    if (i > 6) { continue }
    hand.push(shuffledDeck[i])
  }
  hand.forEach(card => {
    const image = document.createElement('img')
    image.src = card.imageUrl
    handContainer.append(image)
  })
  if (shuffledDeck.length < 7) { alert('Warning: You have less than 7 cards in your deck!') }
  toggleHidden(document.querySelector('#test-hand-container'))
}

function createLoading() {
  const loading = document.createElement('div')
  loading.id = 'loading'
  loading.classList.add('starter-text')
  loading.innerHTML = `loading<span id='loading-dots'.></span>`

  const cardContainer = document.querySelector('#card-container')
  cardContainer.appendChild(loading)

  return loadingDots()
}

function loadingDots() {
  const dots = document.querySelector('#loading-dots')
  let interval = setInterval(() => {
    dots.textContent.length >= 3 ? dots.textContent = '' : null
    dots.textContent += '.'
  }, 500)
  return interval
}

function removeLoading(interval) {
  clearInterval(interval)
  document.querySelector('#loading').remove()
}

async function fillSets() {
  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/sets')
    const dropdown = document.querySelector('#input-sets')
    response.data.sets.forEach(set => {
      const newOption = document.createElement('option')
      newOption.textContent = set.name
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
      newOption.textContent = type
      newOption.value = type
      dropdown.append(newOption)
    })
  } catch (error) {
    console.error(error)
  }
}

function toggleHidden(element) {
  element.classList.toggle('hidden')
}

function initEventListeners() {
  const searchFormContainer = document.querySelector('#search-form-container')
  const testHandContainer = document.querySelector('#test-hand-container')
  const deckListContainer = document.querySelector('#deck-list-container')

  document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault()
    fetchCards()
    toggleHidden(searchFormContainer)
  })
  document.querySelector('#search-bar').addEventListener('click', () => { toggleHidden(searchFormContainer) })
  searchFormContainer.addEventListener('click', () => { toggleHidden(searchFormContainer) })
  document.querySelector('#search-form').addEventListener('click', () => {
    event.stopPropagation()
  })
  testHandContainer.addEventListener('click', () => toggleHidden(testHandContainer))
  document.querySelector('#test-hand').addEventListener('click', () => {
    event.stopPropagation()
  })
  deckListContainer.addEventListener('click', () => toggleHidden(deckListContainer))
  document.querySelector('#deck-list').addEventListener('click', () => {
    event.stopPropagation()
  })
  document.querySelector('.page-btn.left').addEventListener('click', () => turnPage(-1))
  document.querySelector('.page-btn.right').addEventListener('click', () => turnPage(1))
  document.querySelector('#detail-view-btn').addEventListener('click', toggleDeckView)
  document.querySelector('#test-hand-btn').addEventListener('click', testHand)
}

function fillDeckList() {
  const localKeys = Object.keys(localStorage)
  const deckListContainer = document.querySelector('#deck-list-container')
  const deckList = document.querySelector('#deck-list')
  deckList.innerHTML = ''
  const newDeckButton = document.createElement('button')
  newDeckButton.classList.add('btn')
  newDeckButton.textContent = '+Add Deck'
  newDeckButton.addEventListener('click', newDeck)
  deckList.append(newDeckButton)

  localKeys.forEach(key => {
    const deckListingContainer = document.createElement('div')
    deckListingContainer.classList.add('deck-listing-container')

    const deckListing = document.createElement('div')
    deckListing.classList.add('deck-listing', 'btn')
    deckListing.textContent = key
    deckListing.addEventListener('click', () => {
      loadDeck(key)
      deckListContainer.classList.contains('hidden') ? null : toggleHidden(deckListContainer)
    })

    const removeButton = document.createElement('button')
    removeButton.textContent = '-'
    removeButton.classList.add('remove-deck-btn')
    removeButton.addEventListener('click', () => { removeDeck(key) })

    deckList.append(deckListingContainer)
    deckListingContainer.append(deckListing)
    deckListingContainer.append(removeButton)
  })
}

function removeDeck(key) {
  delete localStorage[key]
  if (deck.name === key) {
    deck.contents = {}
    loadDeck('defaultDeck')
    alert('Deleted currently loaded deck, loading \'defaultDeck\'')
  }
  fillDeckList()
  renderDeckList()
}

function loadDeck(deckName = 'defaultDeck') {
  try {
    Object.keys(deck.contents).length > 0 ? saveDeck() : null
    const loadedDeck = JSON.parse(localStorage[deckName])
    deck.contents = loadedDeck
    deck.name = deckName
    console.log(`Loaded deck '${deck.name}'`)
    renderDeckList()
  } catch (error) {
    console.warn(`localStorage deck '${deckName}' not found. Using deck '${deck.name}'`)
    deck.name = 'defaultDeck'
    deck.contents = {}
    saveDeck()
    return
  }
}

function saveDeck(deckName = deck.name) {
  localStorage.setItem(deckName, JSON.stringify(deck.contents))
}

function newDeck() {
  saveDeck()
  deck.name = window.prompt('Enter the new deck\'s name')
  deck.contents = {}
  saveDeck()
  loadDeck(deck.name)
  fillDeckList()
  if (document.querySelector('#deck-container').classList.contains('hidden')) {
    toggleDeckView()
  }
}