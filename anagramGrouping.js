const HashMap = require("./HashMap");

const anagrams = function(input) {

    const characterList = input.split('');

    let resultList = []
    
    // base case: list of a single character
    if (characterList.length === 1) {
        resultList.push(characterList[0]);
    } else {
        // if list > 1 character, need to do same operation for
        //   each character in list, treating it as "starter"
        for (let i=0 ; i<characterList.length ; i++) {
            // identify the "starter" character
            const starter = characterList[i];

            // create the "remainder" list = all but "starter" character
            let newList = [];
            for (let j=0 ; j<characterList.length ; j++) {
                if (i !== j) {
                    newList.push(characterList[j])
                }
            }

            // func takes string as input, not list, so make string from list
            const newInput = newList.join('');
            
            // *recursion*: feed input back into anagrams func,
            //    which will return a list of some length
            const nextStep = anagrams(newInput);

            // whatever current state of resultsList, will concat
            //    onto it the results of...
            resultList = resultList.concat(
                // ...iterating over items in anagrams func output list...
                nextStep.map(item => {
                    // ... for each list item, appending the "starter" character
                    return starter+item
                })
            )
        }
    }
    return resultList;
}

const groupAnagrams = function(inpList) {

    const gramHash = new HashMap();
    gramHash.MAX_LOAD_RATIO = 0.5;
    gramHash.SIZE_RATIO = 3;

    // initialize empty result object
    let groupedAnagrams = {};

    // tick through input list elements
    for (let i=0 ; i<inpList.length ; i++) {
        currentString = inpList[i];

        // check for current string in gramHash
        const hashCheck = gramHash.check(currentString);

        // if current string is not present in gramHash,
        if (hashCheck === false) {

            // generate all anagrams of that string
            const anagramsList = anagrams(currentString);
            //console.log(anagramsList);

            // add all anagrams to gramHash, sharing the value of the currentString (to connect them in a group)
            for (let j=0 ; j<anagramsList.length ; j++) {
                //console.log(anagramsList[j]);
                gramHash.set(anagramsList[j], currentString);
            }

            // create a new key:value pair in result object
            groupedAnagrams[currentString] = [currentString];

            //console.log(groupedAnagrams);
            //console.log(groupedAnagrams[currentString]);

        } else if (hashCheck !== false) {
            // if current string CAN be found in gramHash,
            //    need to identify the "anagram group" to which it belongs:
            const currentGramGroup = hashCheck;

            // use this to add to appropriate part of result object
            groupedAnagrams[currentGramGroup].push(currentString);
        }

    }

    let resultArray = [];

    for (const [key, value] of Object.entries(groupedAnagrams)) {
        resultArray.push(value);
    }

    return resultArray;

}

const testList = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
console.log(groupAnagrams(testList));