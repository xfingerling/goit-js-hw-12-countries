const baseUrl = "https://restcountries.eu/rest/v2";

export default {
  _query: "",
  _dataLenth: null,

  fetchCountries() {
    const countryNameRequest = `/name/${this._query}`;

    return fetch(baseUrl + countryNameRequest).then((response) =>
      response.json(),
    );
  },

  get serchQuery() {
    return this._query;
  },
  set serchQuery(str) {
    this._query = str;
  },

  get dataLenth() {
    return this._dataLenth;
  },
  set dataLenth(num) {
    this._dataLenth = num;
  },
};
