import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const List = props => {
  const { items } = props;
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);

  const [activeIndex, setActiveIndex] = React.useState(
    parseInt(urlParams.get('selected') || 0)
  );

  const [full, setFull] = React.useState(
    history.action === 'PUSH' ? true : false
  );

  React.useEffect(() => {
    setTimeout(() => {
      setFull(false);
    }, 100);
  }, []);

  const handleClick = (e, slug) => {
    setFull(true);
    e.preventDefault();
    setTimeout(() => {
      history.push(slug);
    }, 600);
  };

  return (
    <div className={`list${full ? ' full' : ''}`}>
      <div className="list-imgs">
        <div className="list-imgs-mask">
          {items.map((item, index) => (
            <img
              src={item.src}
              key={item.name}
              className={activeIndex === index ? 'active' : ''}
            />
          ))}
        </div>
      </div>
      <div className="list-titles">
        {items.map((item, index) => (
          <Link
            key={item.name}
            to={item.slug}
            className={activeIndex === index ? 'active' : ''}
            onMouseOver={() => setActiveIndex(index)}
            onClick={e => handleClick(e, item.slug)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
