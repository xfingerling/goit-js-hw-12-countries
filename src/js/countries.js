import PNotify from "../../node_modules/pnotify/dist/es/PNotify";
import spinner from "./spinner";

import countriesService from "./fetchCountries";

import countriesListItem from "../templates/countries-list-item.hbs";
import uniqueCountry from "../templates/unique-country.hbs";

const debounce = require("lodash.debounce");

const refs = {
  countryNameInput: document.querySelector("#input-country-nane"),
  countryInfo: document.querySelector("#country-info"),
};

function buildListItems(items) {
  return countriesService.dataLenth === 1
    ? uniqueCountry(items)
    : countriesListItem(items);
}

function insertListItems(items) {
  refs.countryInfo.insertAdjacentHTML("beforeend", buildListItems(items));
}

function clearListItem() {
  refs.countryInfo.innerHTML = "";
}

function searchCountry(e) {
  const inputValue = e.target.value;
  if (inputValue === "") {
    clearListItem();
    PNotify.closeAll();

    return;
  }

  countriesService.serchQuery = inputValue;

  spinner.show();

  countriesService
    .fetchCountries()
    .then((data) => {
      spinner.hide();
      countriesService.dataLenth = data.length;

      if (data.length > 10) {
        clearListItem();
        PNotify.closeAll();

        PNotify.error({
          text: "Too many matches found. Please enter a more specific querry!",
        });
      } else if (data.status === 404) {
        clearListItem();
        PNotify.closeAll();

        PNotify.info({
          text: "The country does not exist. Please try again.",
        });
      } else {
        clearListItem();
        PNotify.closeAll();

        insertListItems(data);
      }
    })
    .catch((error) => console.warn(error));
}

const debounceSearchCountry = debounce(searchCountry, 500);

refs.countryNameInput.addEventListener("input", debounceSearchCountry);
