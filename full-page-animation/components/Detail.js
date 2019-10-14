import React from 'react';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { Transition } from 'react-transition-group';

const duration = 600;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Detail = ({ item }) => {
  const [isShown, setIsShown] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 100);
  }, []);

  const handleClick = (e, slug) => {
    e.preventDefault();
    setIsShown(false);
    setTimeout(() => {
      history.push(slug + '?selected=' + item.index);
    }, 600);
  };

  return (
    <div className="detail">
      <Helmet>
        <title>{item.name}</title>
      </Helmet>
      <div className="detail-img">
        <img src={item.src} alt="" />
      </div>
      <Transition in={isShown} appear={true} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className="detail-text"
          >
            <h1>{item.name}</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              accusamus sunt voluptates autem doloribus magni.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              libero minima corrupti at tenetur in cupiditate quia fugiat
              deserunt blanditiis illo commodi eligendi, accusamus veniam
              distinctio deleniti reprehenderit, voluptates officiis. Ullam?
            </p>
          </div>
        )}
      </Transition>
      <Transition in={isShown} appear={true} timeout={duration}>
        {state => (
          <Link
            to="/"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className="detail-back"
            onClick={e => handleClick(e, '/')}
          >
            <svg fill="#000000" width="10" height="16">
              <path d="M10 2.561249694973139 L10 0 L0 8 L10 16 L10 13.438750305026861 L3.201562118716424 8"></path>
            </svg>
          </Link>
        )}
      </Transition>
    </div>
  );
};

export default Detail;
