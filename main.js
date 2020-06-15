const pageSize = 50
let previousSearch
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

async function fetchCards(page = 1) {
  // Gets card information, then renders to page.
  // Creates/removes the loading indicator, hides/shows appropriate pagination buttons, stores the api url

  let url = `https://api.magicthegathering.io/v1/cards?pageSize=${pageSize}&page=${page}`
  url += buildQueries()

  document.querySelector('#card-container').innerHTML = ''

  let interval = createLoading()

  try {
    const response = await axios.get(url)
    const cardList = response.data.cards
    removeLoading(interval)
    paginationHiding(cardList, page)
    if (cardList.length === 0) {
      alert('Sorry, that returned no results.')
      return
    }
    cardList.forEach((card) => {
      renderCard(card)
    })
  } catch (error) {
    console.error(error)
  }
  previousSearch = url
}

function buildQueries() {
  // Checks the form values and returns queries as one string to append to the API get request
  // Called in fetchCards()

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

function renderCard(card) {
  // Creates an element for the card and appends to the card-container, skipping over those with no images
  // Gives each card an event listener for the moreDetails() function
  // Called in fetchCards() in forEach loop

  if (!card.imageUrl) { return }

  const cardElement = document.createElement('img')
  cardElement.classList.add('card')
  cardElement.src = card.imageUrl
  cardElement.addEventListener('click', () => { moreDetails(card) })

  document.querySelector('#card-container').append(cardElement)
}

function paginationHiding(cardList, page) {
  // Hides pagination buttons based on the page of the previous search or the number of cards returned
  // Called in fetchCards()

  const pageBtnContainer = document.querySelector('#page-btn-container')
  const pageBtnLeft = document.querySelector('.page-btn.left')
  const pageBtnRight = document.querySelector('.page-btn.right')
  if (cardList.length === 0) {
    pageBtnContainer.classList.add('hidden')
  } else {
    pageBtnContainer.classList.remove('hidden')
  }
  if (cardList.length < pageSize) {
    pageBtnRight.classList.add('hidden')
  } else {
    pageBtnRight.classList.remove('hidden')
  }
  if (page <= 1) {
    pageBtnLeft.classList.add('hidden')
  } else {
    pageBtnLeft.classList.remove('hidden')
  }
}

function turnPage(dir) {
  // Gets the current page number from the previousSearch, then searches again based on the direction
  // Added with eventListener to pagination buttons

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
  // Creates card information elements and Add to Deck button, appends them to detail-container
  // Clears innerHTML except for first child (header)
  // Added with eventListener to rendered cards, adds the card

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
  name.innerHTML = `<strong>Name:</strong> ${card.name}`

  // originalType
  const originalType = document.createElement('p')
  originalType.innerHTML = `<strong>Type:</strong> ${card.originalType}`

  // originalText
  const originalText = document.createElement('p')
  originalText.innerHTML = `<strong>Text:</strong> ${card.originalText}`

  // rarity
  const rarity = document.createElement('p')
  rarity.innerHTML = `<strong>Rarity:</strong> ${card.rarity}`

  // setName
  const setName = document.createElement('p')
  setName.innerHTML = `<strong>Set:</strong> ${card.setName}`

  // artist
  const artist = document.createElement('p')
  artist.innerHTML = `<strong>Artist:</strong> ${card.artist}`

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
  // Shows/hides detail-container vs deck-container within the detail-panel
  // Added with eventListener for detail-view-btn, called elsewhere

  const detailContainer = document.querySelector('#detail-container')
  const deckContainer = document.querySelector('#deck-container')
  const iconImage = document.querySelector('#detail-view-btn')

  detailContainer.classList.toggle('hidden')
  deckContainer.classList.toggle('hidden')
  detailContainer.classList.contains('hidden') ? iconImage.style['background-image'] = 'url(./images/card-icon-black.png)' : iconImage.style['background-image'] = 'url(./images/deck-icon-black.png)'
}

function addToDeck(card) {
  // Adds the card to the deck, if already present increments the quantity
  // Added with eventListener to Add to Deck button

  if (Object.keys(deck.contents).includes(card.name)) {
    deck.contents[card.name].quantity += 1
  } else {
    deck.contents[card.name] = card
    deck.contents[card.name].quantity = 1
  }
  renderDeckList()
}

function renderDeckList() {
  // Renders the deck's cards to the deck list
  // Appends add and subtract buttons
  // Saves the deck after every rendering (after every change)
  // Hides the Test Hand button if deck has no cards

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
  } else if (Object.keys(deck.contents).length <= 0) {
    testHandButton.classList.add('hidden')
  }
}

function crementCard(card, amount) {
  // Changes the card's quantity by the amount, removes card if amount is less than 0
  // Added with eventListener to deck list add and subtract buttons

  deck.contents[card].quantity += amount
  if (deck.contents[card].quantity <= 0) {
    delete deck.contents[card]
  }
  renderDeckList()
}

function deckLength() {
  // Returns the number of cards in the deck (taking into accoutn quantity), not just the length of the object
  // Called in renderDeckList() to update the header information

  let length = 0
  for (const card in deck.contents) {
    length += deck.contents[card].quantity
  }
  return length
}

function shuffleDeck() {
  // Returns an array of all the cards in the deck, shuffled
  // Called in testHand()

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
  // Creates the test hand of 7 random cards from the deck, appends to and unhides test-hand-container

  const handContainer = document.querySelector('#test-hand')
  const shuffledDeck = shuffleDeck()
  let hand = []
  handContainer.innerHTML = ''

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
  // Creates loading signifier
  // Called in fetchCards()
  // Returns interval to be cleared later

  const loading = document.createElement('div')
  loading.id = 'loading'
  loading.classList.add('starter-text')
  loading.innerHTML = `loading<span id='loading-dots'.></span>`

  const cardContainer = document.querySelector('#card-container')
  cardContainer.appendChild(loading)

  return loadingDots()
}

function loadingDots() {
  // Loading dot animation, adds dots until limit is reached
  // Returns interval to be cleared later

  const dots = document.querySelector('#loading-dots')

  let interval = setInterval(() => {
    dots.textContent.length >= 3 ? dots.textContent = '' : null
    dots.textContent += '.'
  }, 500)

  return interval
}

function removeLoading(interval) {
  // Removes loading signifier interval
  // Called in fetchCards()

  clearInterval(interval)
  document.querySelector('#loading').remove()
}

async function fillSets() {
  // Fetches set list from api and fills dropdown

  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/sets')
    const dropdown = document.querySelector('#input-sets')
    dropdown.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.textContent = '--'
    defaultOption.value = ''
    dropdown.append(defaultOption)

    response.data.sets.forEach(set => {
      const newOption = document.createElement('option')
      newOption.textContent = set.name
      newOption.value = set.name
      dropdown.append(newOption)
    })
  } catch (error) {
    return
  }
}

async function fillTypes() {
  // Fetches type list from api and fills dropdown

  try {
    const response = await axios.get('https://api.magicthegathering.io/v1/types')
    const dropdown = document.querySelector('#input-types')
    dropdown.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.textContent = '--'
    defaultOption.value = ''
    dropdown.append(defaultOption)

    response.data.types.forEach(type => {
      const newOption = document.createElement('option')
      newOption.textContent = type
      newOption.value = type
      dropdown.append(newOption)
    })
  } catch (error) {
    return
  }
}

function toggleHidden(element) {
  // Helper function
  element.classList.toggle('hidden')
}

function initEventListeners() {
  // Adds starter event listeners

  const searchFormContainer = document.querySelector('#search-form-container')
  const testHandContainer = document.querySelector('#test-hand-container')
  const deckListContainer = document.querySelector('#deck-list-container')

  // form group
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

  // test hand container group
  testHandContainer.addEventListener('click', () => toggleHidden(testHandContainer))
  document.querySelector('#test-hand').addEventListener('click', () => {
    event.stopPropagation()
  })

  // deck list container group
  deckListContainer.addEventListener('click', () => toggleHidden(deckListContainer))
  document.querySelector('#deck-list').addEventListener('click', () => {
    event.stopPropagation()
  })

  // pagination group
  document.querySelector('.page-btn.left').addEventListener('click', () => turnPage(-1))
  document.querySelector('.page-btn.right').addEventListener('click', () => turnPage(1))

  // button group
  document.querySelector('#detail-view-btn').addEventListener('click', toggleDeckView)
  document.querySelector('#test-hand-btn').addEventListener('click', testHand)
  document.querySelector('#deck-swap-btn').addEventListener('click', () => {
    fillDeckList()
    toggleHidden(deckListContainer)
  })
}

function fillDeckList() {
  // Renders all decks from localStorage to the deck list
  // Adds remove deck button and functionality

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
  // Deletes the designated deck, loading defaultDeck is the currently loaded deck was deleted
  // Added with eventListener to remove-deck-btn
  // Re-renders deck list

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
  // Saves current deck, then loads the specified deck from localStorage

  try {
    Object.keys(deck.contents).length > 0 ? saveDeck() : null
    const loadedDeck = JSON.parse(localStorage[deckName])
    deck.contents = loadedDeck
    deck.name = deckName
    renderDeckList()
  } catch (error) {
    deck.name = 'defaultDeck'
    deck.contents = {}
    saveDeck()
    return
  }
}

function saveDeck(deckName = deck.name) {
  // Saves current deck to localStorage
  localStorage.setItem(deckName, JSON.stringify(deck.contents))
}

function newDeck() {
  // Saves the current deck, then creates a new one named by user input
  // Loads new deck automatically, and switches detail panel to deck view

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