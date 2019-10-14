import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import List from './components/List';
import Detail from './components/Detail';

const items = [
  {
    name: 'La montagne',
    src: 'https://picsum.photos/id/235/1200/1200',
    slug: 'la-montagne',
    index: 0,
  },
  {
    name: 'La mer',
    src: 'https://picsum.photos/id/37/1200/1200',
    slug: 'la-mer',
    index: 1,
  },
  {
    name: 'La campagne',
    src: 'https://picsum.photos/id/19/1200/1200',
    slug: 'la-campagne',
    index: 2,
  },
];

const App = () => (
  <Router basename="/full-page-animation">
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
