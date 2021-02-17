const HashMap = require('./HashMap');

const main = function() {

    const lotr = new HashMap();
    //console.log(lotr);

    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;
    console.log(lotr);

    lotr.set('Hobbit', 'Bilbo');
    lotr.set('Hobbit', 'Frodo');
    lotr.set('Wizard', 'Gandalf');
    lotr.set('Human', 'Aragorn');
    //console.log(lotr);
    //console.log(lotr._hashTable[6]);
    lotr.set('Elf', 'Legolas');
    lotr.set('Maiar', 'The Necromancer');
    lotr.set('Maiar', 'Sauron');
    lotr.set('RingBearer', 'Gollum');
    lotr.set('LadyOfLight', 'Galadriel');
    lotr.set('HalfElven', 'Arwen');
    lotr.set('Ent', 'Treebeard');
    //console.log(lotr);
    console.log(lotr._hashTable);

    console.log(lotr.get('Hobbit'));

}

// main();

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

// WhatDoesThisDo();

const removeDuplicates = function(string) {

    let trimmedString = '';

    const stringHashMap = new HashMap();

    for (let i=0 ; i<string.length ; i++) {
        if (stringHashMap.get(string[i]) !== 'present') {
            //console.log('empty')
            trimmedString += string[i]
            stringHashMap.set(string[i], 'present')
        } 
    }

    return trimmedString;

}

const duplicatesRemoved = removeDuplicates('google all that you think can think of');
console.log(duplicatesRemoved);