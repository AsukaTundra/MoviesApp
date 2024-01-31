import { Input } from 'antd';

import './search.css';

function Search({ search, eventSearch }) {
  const debounce = (fn, debounceTime) => {
    let tme;
    return function func() {
      clearTimeout(tme);
      // eslint-disable-next-line prefer-rest-params
      tme = setTimeout(() => fn.call(this, arguments[0]), debounceTime);
    };
  };

  const reportValueDebounce = debounce(eventSearch, 1500);

  return (
    <div className="search">
      <Input placeholder="Type to search..." value={search} onChange={(e) => reportValueDebounce(e.target.value)} />
    </div>
  );
}

export default Search;
