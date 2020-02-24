/**
 * Returns the similarity score between 2 given strings
 */
function similarityScore(str1, str2) {
    // score depends on position, doing both ways and return max to get better results
    return Math.max(jaroScore(str1, str2), jaroScore(str2, str1));
}

/**
 * Jaro wrinkler algorithm to get distance between 2 strings.
 * Code from https://github.com/dgendill/Javascript-String-Comparison-Algorithms/blob/master/string-compare.js
 */
function jaroScore(str1, str2) {
    let str1Length = str1.length;
    let str2Length = str2.length;

    let range = Math.floor(Math.max(str1Length, str2Length) / 2) - 1;
    let m = 0;
    let t = 0;
    let l = 0;
    let isLSet = false;
    let lastMatchJ = 0;
    for (let i = 0; i < str1Length; i++) {
      let c1 = str1[i];
      for (let j = i; j < str2Length; j++) {
        if (Math.abs(i - j) > range) continue;
        let c2 = str2[j];
        if (c1 == c2) {
          m++; //characters is the same and within range
          if (i != j) {
            if (lastMatchJ > j) t += 2;
          } else {
            if (!isLSet && l < 4) {
              l++;
            }
          }
          lastMatchJ = j;
          break;
        } else {
          if (i == j) isLSet = true;
        }
      }
    }
    t = 0.5 * t;
    m = Math.min(m, str1Length, str2Length);
    let dj = 0;
    if (m > 0) dj = (m / str1Length + m / str2Length + (m - t) / m) / 3;

    return dj + l * 0.1 * (1 - dj);
}

/**
 * Find similar elements in the collection, given search options
 */
function findSimilarElements(collection, options) {

    /**
     * Returns new array with unique elements only
     */
    function uniqueElements(array) {
        let uniques = [];

        if (typeof array[0] === 'string') {
            // No scores included - names only, can filter directly on element
            array.forEach( element => {
                if (!uniques.includes(element)) {
                    uniques.push(element);
                }
            });
        } else {
            // scores included, name is the first inner elem, filter on that specifically
            const consumed = [];
            array.forEach( pair => {
                if (!consumed.includes(pair[0])) {
                    uniques.push(pair);
                    consumed.push(pair[0]);
                }
            })
        }

        return uniques;
    }

    /**
     * Main search loop. Collection is the db, results array to update (push results to),
     * input = comparison string, innerKey = key to display the value of, once db entry is found.
     * similarity scores are included in results if includeScore = true.
     * matchedKeys (array expected, or null to ignore) will keep track of all the db keys matched during the loop.
     *
     */
    function mainLoop(collection, results, input, threshold, innerKey, includeScore, matchedKeys) {

        let score;

        // Iterate over given collection entries (key value pairs)
        for (let [entryKey, entryValue] of collection.entries()) {

            // compare entry key with the input
            score = similarityScore(entryKey, input);

            if (score > threshold) {
                if (includeScore) {
                    results.push([entryValue[innerKey], score]);
                } else {
                    results.push([entryValue[innerKey]]);
                }

                if (matchedKeys) matchedKeys.push(entryKey);
            }
        }
    }

    // check required options
    for (let name of ['input','threshold', 'innerKey']){
        if (!options[name]) throw new SyntaxError(`Missing required option: ${name}`);
    }

    // retrieve options, set sane defaults
    const userInput = options.input,
        threshold = options.threshold,
        innerKey = options.innerKey,
        includeScore = options.includeScore || false,
        reloop = options.reloop || false;

    let similarElements = [];

    // if initial elements given, pre-populate those in final list
    if (options.initial && options.initial.length) {
        similarElements = [...options.initial];
    }

    const matchedKeys = []; // keep track of matched keys in case reloop necessary
    mainLoop(collection, similarElements, userInput, threshold, innerKey, includeScore, matchedKeys);

    if (reloop) {
        // second loop with each key matched during first run - catches more results as we're 'double guessing'
        for (const key of matchedKeys) {
            mainLoop(collection, similarElements, key, threshold, innerKey, includeScore, null);
        }
    }

    return uniqueElements(similarElements);

}

exports.score = similarityScore;
exports.findAllMatching = findSimilarElements;
