// A class for searching and filtering movie data
export default class Search {
  constructor(options) {
    this._storageNeeded = options.storageNeeded;
  }

  // Helper function to filter movies based on a search key.
  _filter(obj, objKey, searchKey) {
    // Check if the searchKey is found (case-insensitive) in obj[objKey].
    return obj[objKey].toString().toLowerCase().includes(searchKey.toString().toLowerCase());
  }

  //  Stores the last search in local storage if enabled
  _storeLastSearch(searchKey, searchResults, shortMoviesOnly) {
    if (this._storageNeeded) {
      // Store the last search with its key, results, and filter state in local storage.
      localStorage.setItem('lastSearch', JSON.stringify({ searchKey, searchResults, shortMoviesOnly }));
    }
  }

  // Filter and search for movies in an array.
  searchFilter(arr, searchKey, shortMoviesOnly) {
    const searchResults = arr.filter((item) => {
      if (shortMoviesOnly) {
        return Object.keys(item).some(
          (key) => this._filter(item, key, searchKey) && item.duration <= 40,
        );
      }

      return Object.keys(item).some((key) => this._filter(item, key, searchKey));
    });

    // Store the last search in local storage if needed.
    this._storeLastSearch(searchKey, searchResults, shortMoviesOnly);

    return searchResults;
  }
}
