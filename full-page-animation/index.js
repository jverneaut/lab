import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import List from './components/List';
import Detail from './components/Detail';

const items = [
  {
    name: 'La mer',
    src: 'https://picsum.photos/id/37/1200/1200',
    slug: 'la-mer',
    index: 0,
  },
  {
    name: 'La montagne',
    src: 'https://picsum.photos/id/235/1200/1200',
    slug: 'la-montagne',
    index: 1,
  },
];

const App = () => (
  <Router>
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