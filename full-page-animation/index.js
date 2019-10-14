import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import List from './components/List';
import Detail from './components/Detail';

const items = [
  {
    name: 'La montagne',
    src: 'https://picsum.photos/id/235/1200/1200',
    slug: 'la-montagne',
    index: 0,
    description: `
    Une montagne est une forme topographique de relief positif, à la surface de planètes telluriques, et faisant partie d'un ensemble — une chaîne de montagnes — ou formant un relief isolé. Elle est caractérisée par son altitude et, plus généralement, par sa hauteur relative, voire par sa pente. Il n'existe toutefois pas de définition unique de ce qu'est une montagne, terme apparu entre le xe et le xiie siècle, et de nombreux régionalismes coexistent pour décrire les formes de relief.`,
  },
  {
    name: 'La mer',
    src: 'https://picsum.photos/id/37/1200/1200',
    slug: 'la-mer',
    index: 1,
    description: `
    Le terme générique de mer recouvre plusieurs réalités et peut désigner une grande étendue d’eau salée différente des océans, l'ensemble des espaces d'eau salée en communication libre et naturelle sur toute l'étendue du globe ou encore une grande étendue sombre à la surface de la Lune.`,
  },
  {
    name: 'La campagne',
    src: 'https://picsum.photos/id/19/1200/1200',
    slug: 'la-campagne',
    index: 2,
    description: `
    La campagne, aussi appelée milieu campagnal ou milieu rural, désigne l'ensemble des espaces cultivés habités, elle s'oppose aux concepts de ville, d'agglomération ou de milieu urbain. La campagne est caractérisée par une faible densité par rapport aux pôles urbains environnant, par un paysage à dominante végétale (champs, prairies, forêts et autres espaces naturels ou semi-naturels), par une activité agricole dominante, au moins par les surfaces qu'elle occupe et par une économie structurée plus fortement autour du secteur primaire.`,
  },
];

const App = () => (
  <Router basename="/full-page-animation">
    <Helmet>
      <title>Vacances</title>
    </Helmet>
    <Switch>
      {items.map(item => (
        <Route path={'/' + item.slug} key={item.name}>
          <Detail item={item} />
        </Route>
      ))}
      <Route path="/">
        <List items={items} />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.querySelector('#root'));
