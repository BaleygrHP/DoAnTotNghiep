import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Autocomplete from 'components/autoComplete';
import { trackGa } from 'utils/analytics';
import './style.css';

function Search(props) {
  const { data } = props;
  const history = useHistory();
  const dataProductList = useSelector((state) => state.productList.search);
  const [suggestions, setSuggestions] = useState();
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');

  const handleOnClick = (keyword) => {
    const query = keyword || value;
    const queryString = `?q=${query}`;
    trackGa('send', 'pageview', queryString);
    history.push(`/search${queryString}`);
  };

  const handleResetSuggestions = () => {
    setSuggestions([]);
    setValue('');
    setSuggestionsActive(false);
  };

  const noResult = value !== '' && suggestions?.length === 0;

  const renderPrimary = () => {
    if (noResult) {
      return (
        <div className="web-search-panel__message search-results-container no-results">
          <div className="search-header">
            <h1>Xin lỗi, chúng tôi không tìm thấy kết quả cho "{value}"</h1>
          </div>
          <div className="noresults-top">
            <div>
              <p>Kiểm tra lại chính tả</p>
              <p>Sử dụng quá ít từ</p>
              <p>Từ tìm kiếm không khớp</p>
            </div>
          </div>
        </div>
      );
    }

    if (suggestionsActive) {
      return (
        <ul className="web-search-panel__suggestions suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion._id}>
              <a className="web-search-panel__result minicart-product-name cursor" href={`/productinf/${suggestion._id}`} title={suggestion.name} onClick={handleResetSuggestions}>
                {suggestion.name}
              </a>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="web-search-panel__trending suggestions">
        <h2>Tìm kiếm nhiều nhất</h2>
        <ul>
          {(data?.listTrending || []).slice(0, 10).map((suggestion, index) => (
            <li key={index}>
              <a
                className="web-search-panel__result minicart-product-name cursor"
                href="/#"
                title={suggestion.key}
                onClick={(event) => {
                  event.preventDefault();
                  handleOnClick(suggestion.key);
                }}
              >
                {suggestion.key}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="web-search-panel">
      <div className="web-search-panel__form form-row-search placeholder">
        <div className="form-field-wrapper">
          <div className="form-field">
            <Autocomplete
              data={dataProductList}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              setSuggestionsActive={setSuggestionsActive}
              setValue={setValue}
              value={value}
              classNameInput="web-search-panel__input form-input topSearch-field"
              placeholderInput="Search by keyword, style etc"
              titleInput="Enter search words"
            />
          </div>
        </div>
        <button className="web-search-panel__submit btn btn-link" type="button" onClick={() => handleOnClick()} disabled={noResult}>
          search
        </button>
      </div>

      <div className="web-search-panel__results results">
        <div className="results-area">
          <div id="search-suggestions">
            <div className="primary-content">{renderPrimary()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
