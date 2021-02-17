const Stack = require('../DSA-Stack-and-Queue/stack');

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

const is_palindrome = function(string) {

    string = string.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    
    // Generate a stack from half of the string --> will be in "reverse" order
    const stackedString = new Stack();


    // define different midpoint indices if string had odd vs. even # of chars
    if (string.length%2 === 0) {
        endStackingHere = string.length/2;
        startComparingHere = string.length/2;
    } else if (string.length%2 === 1) {
        endStackingHere = Math.ceil(string.length/2);
        startComparingHere = Math.floor(string.length/2);
    }
    
    for (let i=0 ; i<endStackingHere ; i++) {
        //console.log(string[i]);
        stackedString.push(string[i]);
    }
    
    //console.log(stackedString);

    // starting at halfway point of string,
    for (let i=startComparingHere ; i<string.length ; i++) {
        // define current character in the string
        const currChar = string[i];

        // compare to the current top element in the stack
        if (currChar === stackedString.top.data) {
            // so far so good; need to pop this char off the stack
            stackedString.pop();
        } else if (currChar !== stackedString.top.data) {
            // evidence string is not a palindrome, so
            return false;
        }
    }

    // if didn't encounter any stack / char mis-matches - it's a palindrome.
    return true;

}

//console.log(anagrams('east'));
//console.log(is_palindrome('madame'));

const anyPermaPalin = function(string) {

    let palindromeStatus = false;

    const anagramsList = anagrams(string);

    for (let i=0 ; i<anagramsList.length ; i++) {
        const palindromeCheck = is_palindrome(anagramsList[i]);
        if (palindromeCheck === true) {
            palindromeStatus = true;
        }
    }

    return palindromeStatus;
}

console.log(anyPermaPalin('mmada'));