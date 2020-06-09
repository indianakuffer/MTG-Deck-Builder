# Project Overview

## Project Name

MTG Deck Builder

## Project Description

MTG Deck Builder is a tool for users to search a database of all the Magic: The Gathering cards and display the results in a grid. Cards can be clicked for more information and stats. Post-MVP, users will be able to add or remove retrieved cards to a deck and display a shuffled sample starting hand of 7 cards.

## API and Data Sample

[Magic: The Gathering API](https://docs.magicthegathering.io/)

```
{
    "cards": [
        {
            "name": "Abundance",
            "manaCost": "{2}{G}{G}",
            "cmc": 4.0,
            "colors": [
                "Green"
            ],
            "colorIdentity": [
                "G"
            ],
            "type": "Enchantment",
            "supertypes": [],
            "types": [
                "Enchantment"
            ],
            "subtypes": [],
            "rarity": "Rare",
            "set": "10E",
            "setName": "Tenth Edition",
            "text": "If you would draw a card, you may instead choose land or nonland and reveal cards from the top of your library until you reveal a card of the chosen kind. Put that card into your hand and put all other cards revealed this way on the bottom of your library in any order.",
            "artist": "Rebecca Guay",
            "number": "249",
            "layout": "normal",
            "multiverseid": 130483,
            "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card",
            "rulings": [
                {
                    "date": "2004-10-04",
                    "text": "This replacement effect replaces the draw, so nothing that triggers on a draw will trigger."
                },
                {
                    "date": "2004-10-04",
                    "text": "If you use this on a multi-card draw, each replaced draw is handled separately. In other words, you reveal and then put on the bottom of the library for the first card, then do the same for the second, and so on. In a multi-card draw you do not have to choose how many of those draws will be replaced before you do any drawing or use of this card."
                },
                {
                    "date": "2004-10-04",
                    "text": "If no card of the chosen type is found before your library empties, you don’t get a card, but you do get to order all the cards in your library any way you choose."
                },
                {
                    "date": "2007-07-15",
                    "text": "If your library is empty, Abundance can prevent you from losing the game for being unable to draw a card. If an effect or turn-based action would cause you to draw a card, you can replace that draw with Abundance’s replacement effect. (It doesn’t matter that you’d be unable to actually draw a card.) Since Abundance’s effect has you put a card into your hand instead of drawing a card, you’ll never be forced to draw a card with an empty library."
                }
            ],
            "foreignNames": [
                {
                    "name": "Überfluss",
                    "text": "Falls du eine Karte ziehen würdest, kannst du stattdessen Land oder Nichtland bestimmen und Karten oben von deiner Bibliothek aufdecken, bis du eine Karte der bestimmten Art aufdeckst. Nimm diese Karte auf deine Hand und lege alle anderen auf diese Weise aufgedeckten Karten in beliebiger Reihenfolge unter deine Bibliothek.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148402&type=card",
                    "language": "German",
                    "multiverseid": 148402
                },
                {
                    "name": "Abundancia",
                    "text": "Si fueras a robar una carta, en vez de eso, puedes elegir tierra o no tierra y mostrar cartas de la parte superior de tu biblioteca hasta que muestres una carta del tipo elegido. Pon esa carta en tu mano y pon todas las otras cartas mostradas de esta manera en la parte inferior de tu biblioteca en cualquier orden.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=150565&type=card",
                    "language": "Spanish",
                    "multiverseid": 150565
                },
                {
                    "name": "Abondance",
                    "text": "Si vous deviez piocher une carte, vous pouvez, à la place, choisir terrain ou non-terrain et révéler des cartes du dessus de votre bibliothèque jusqu'à ce que vous révéliez une carte du type choisi. Mettez cette carte dans votre main, et mettez ensuite toutes les autres cartes révélées de cette manière au-dessous de votre bibliothèque, dans l'ordre de votre choix.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=150182&type=card",
                    "language": "French",
                    "multiverseid": 150182
                },
                {
                    "name": "Abbondanza",
                    "text": "Se stai per pescare una carta, puoi invece scegliere terra o non terra e rivelare carte dalla cima del tuo grimorio fino a che non riveli una carta del tipo scelto. Aggiungi quella carta alla tua mano e metti tutte le altre carte rivelate in questo modo in fondo al tuo grimorio in qualsiasi ordine.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148785&type=card",
                    "language": "Italian",
                    "multiverseid": 148785
                },
                {
                    "name": "豊穣",
                    "text": "あなたがカードを１枚引く場合、代わりにあなたは土地か土地でないかを選んでもよい。そうしたなら、あなたのライブラリーの一番上のカードを、選んだ種類のカードが公開されるまで公開し続ける。 そのカードをあなたの手札に加え、これにより公開された他のすべてのカードを望む順番であなたのライブラリーの一番下に置く。",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148019&type=card",
                    "language": "Japanese",
                    "multiverseid": 148019
                },
                {
                    "name": "Abundância",
                    "text": "Se for comprar um card, em vez disso, você pode escolher se deve ser ou não um terreno, e revelar cards do topo de seu grimório até revelar um card do tipo escolhido. Coloque aquele card em sua mão e coloque todos os outros cards revelados deste modo no fundo de seu grimório em qualquer ordem.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149799&type=card",
                    "language": "Portuguese (Brazil)",
                    "multiverseid": 149799
                },
                {
                    "name": "Изобилие",
                    "text": "Если вы должны взять карту, вместо этого вы можете выбрать \"земля\" или \"неземля\" и показывать карты с верха вашей библиотеки до тех пор, пока вы не покажете карту выбранного вида. Положите ту карту в вашу руку и положите все остальные показанные таким образом карты в низ вашей библиотеки в любом порядке.",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149416&type=card",
                    "language": "Russian",
                    "multiverseid": 149416
                },
                {
                    "name": "丰衣足食",
                    "text": "若你将抓一张牌，则你可以改为选择地牌或非地牌，并从你牌库顶开始展示牌，直到你展示出一张该种类的牌为止。 将该牌置于你手上，然后将以此法展示的其它牌以任意顺序置于你的牌库底。",
                    "flavor": null,
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147636&type=card",
                    "language": "Chinese Simplified",
                    "multiverseid": 147636
                }
            ],
            "printings": [
                "10E",
                "C17",
                "DDR",
                "USG"
            ],
            "originalText": "If you would draw a card, you may instead choose land or nonland and reveal cards from the top of your library until you reveal a card of the chosen kind. Put that card into your hand and put all other cards revealed this way on the bottom of your library in any order.",
            "originalType": "Enchantment",
            "legalities": [
                {
                    "format": "Commander",
                    "legality": "Legal"
                },
                {
                    "format": "Duel",
                    "legality": "Legal"
                },
                {
                    "format": "Legacy",
                    "legality": "Legal"
                },
                {
                    "format": "Modern",
                    "legality": "Legal"
                },
                {
                    "format": "Vintage",
                    "legality": "Legal"
                }
            ],
            "id": "1669af17-d287-5094-b005-4b143441442f"
        },
        {
            "name": "Academy Researchers",
            "manaCost": "{1}{U}{U}",
            "cmc": 3.0,
            "colors": [
                "Blue"
            ],
            "colorIdentity": [
                "U"
            ],
            "type": "Creature — Human Wizard",
            "supertypes": [],
            "types": [
                "Creature"
            ],
            "subtypes": [
                "Human",
                "Wizard"
            ],
            "rarity": "Uncommon",
            "set": "10E",
            "setName": "Tenth Edition",
            "text": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
            "flavor": "They brandish their latest theories as warriors would wield weapons.",
            "artist": "Stephen Daniele",
            "number": "63",
            "power": "2",
            "toughness": "2",
            "layout": "normal",
            "multiverseid": 132072,
            "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
            "rulings": [
                {
                    "date": "2007-07-15",
                    "text": "You can’t put an Aura card from your hand onto the battlefield this way if that Aura can’t legally enchant Academy Researchers. For example, you can’t put an Aura with “enchant land” or “enchant green creature” onto the battlefield attached to Academy Researchers (unless Academy Researchers somehow turned into a land or a green creature before the ability resolved)."
                }
            ],
            "foreignNames": [
                {
                    "name": "Forscher der Akademie",
                    "text": "Wenn der Forscher der Akademie ins Spiel kommt, kannst du eine Aurakarte aus deiner Hand an den Forscher der Akademie angelegt ins Spiel bringen.",
                    "flavor": "Sie werfen mit Theorien um sich wie Meuchler mit Wurfmessern.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148403&type=card",
                    "language": "German",
                    "multiverseid": 148403
                },
                {
                    "name": "Investigadores de la Academia",
                    "text": "Cuando los Investigadores de la Academia entren en juego, puedes poner en juego una carta de aura de tu mano anexada a los Investigadores de la Academia.",
                    "flavor": "Esgrimen sus últimas teorías como los guerreros harían con sus armas.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=150379&type=card",
                    "language": "Spanish",
                    "multiverseid": 150379
                },
                {
                    "name": "Chercheurs de l'académie",
                    "text": "Quand les Chercheurs de l'académie arrivent en jeu, vous pouvez mettre en jeu, attachée aux Chercheurs de l'académie, une carte d'aura de votre main.",
                    "flavor": "Ils agitent leurs nouvelles théories comme des guerriers brandiraient leurs armes.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149996&type=card",
                    "language": "French",
                    "multiverseid": 149996
                },
                {
                    "name": "Ricercatori dell'Accademia",
                    "text": "Quando i Ricercatori dell'Accademia entrano in gioco, puoi mettere in gioco una carta Aura dalla tua mano assegnata ai Ricercatori dell'Accademia.",
                    "flavor": "Brandiscono le loro più recenti teorie come i guerrieri impugnerebbero le armi.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148786&type=card",
                    "language": "Italian",
                    "multiverseid": 148786
                },
                {
                    "name": "アカデミーの研究者",
                    "text": "アカデミーの研究者が場に出たとき、あなたは自分の手札にあるオーラ･カードを１枚、アカデミーの研究者につけられた状態で場に出してもよい。",
                    "flavor": "彼らが最新の学説を振りかざすさまは、まるで戦士の武器のようだ。",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148020&type=card",
                    "language": "Japanese",
                    "multiverseid": 148020
                },
                {
                    "name": "Pesquisadores da Academia",
                    "text": "Quando Pesquisadores da Academia entra em jogo, você pode colocar um card de Aura de sua mão em jogo anexado a Pesquisadores da Academia.",
                    "flavor": "Eles brandiam suas últimas teorias como os guerreiros fariam com suas armas.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149613&type=card",
                    "language": "Portuguese (Brazil)",
                    "multiverseid": 149613
                },
                {
                    "name": "Исследователи из Академии",
                    "text": "Когда Исследователи из Академии входят в игру, вы можете положить карту Ауры из вашей руки в игру прикрепленной к Исследователям из Академии.",
                    "flavor": "Они угрожающее размахивают своими последними теориями, словно воины, потрясающие оружием.",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149230&type=card",
                    "language": "Russian",
                    "multiverseid": 149230
                },
                {
                    "name": "学院研究员",
                    "text": "当学院研究员进场时，你可以将一张灵气牌从你手上放置进场，并结附在学院研究员上。",
                    "flavor": "他们炫耀最新理论的模样有如战士挥舞刀剑。",
                    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147637&type=card",
                    "language": "Chinese Simplified",
                    "multiverseid": 147637
                }
            ],
            "printings": [
                "10E",
                "USG"
            ],
            "originalText": "When Academy Researchers comes into play, you may put an Aura card from your hand into play attached to Academy Researchers.",
            "originalType": "Creature - Human Wizard",
            "legalities": [
                {
                    "format": "Commander",
                    "legality": "Legal"
                },
                {
                    "format": "Duel",
                    "legality": "Legal"
                },
                {
                    "format": "Legacy",
                    "legality": "Legal"
                },
                {
                    "format": "Modern",
                    "legality": "Legal"
                },
                {
                    "format": "Penny",
                    "legality": "Legal"
                },
                {
                    "format": "Vintage",
                    "legality": "Legal"
                }
            ],
            "id": "047d5499-a21c-5f5c-9679-1599fcaf9815"
        }
    ]
}
```

## Wireframes

NEED TO ADD

### MVP/PostMVP

#### MVP 

- Search form pops up, tracks multiple queries
- Form pulls card data from API based on input values
- Render cards on flexbox grid left panel
- Clicking cards shows more details in right panel 
- Mobile friendly arrangement of panels

#### PostMVP  

- Deck view of right panel
- Add to Deck button stores card info in deck object, refreshes deck listing
- Test Hand button shuffles deck and displays sample hand

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|June 8| Project Prompt | Complete
|June 9| Core Application Structure / Build and Test Search Form | Incomplete
|June 10| Card Rendering / Page Buttons / Details Pane Population  | Incomplete
|June 11| Advanced Styling / MVP / [Deck Storage]  | Incomplete
|June 12| [Deck Panel & Rendering] / [Deck Shuffling & Test Hand] | Incomplete
|June 15| Present | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
