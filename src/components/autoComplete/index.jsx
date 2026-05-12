import { useHistory } from 'react-router';
import { trackGa } from 'utils/analytics';

const AutoComplete = (props) => {
  const { data, classNameInput, placeholderInput, titleInput } = props;
  let { setSuggestions, setSuggestionsActive, value, setValue } = props;
  let newArr = [];
  data.forEach((element) => {
    newArr.push({ _id: element._id, name: element.name });
  });
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      var filterSuggestions = newArr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query) > -1;
      });
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const history = useHistory();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      let queryString = `?q=${value}`;
      trackGa('send', 'pageview', queryString);

      history.push(`/search${queryString}`);
      setSuggestionsActive(false);
    }
  };

  return (
    <div className="autocomplete">
      <input type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} className={classNameInput} placeholder={placeholderInput} title={titleInput} />
    </div>
  );
};

export default AutoComplete;
