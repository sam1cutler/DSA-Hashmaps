class HashMap {

    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }
    

    // Add items to the hash map
    set(key, value) {

        // calculate current load ratio (before trying to add new key/value)
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;

        // if exceed max...
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            // need to resize
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        // find appropriate slot for the key
        const index = this._findSlot(key);

        // if this index doesn't exist in the hash table,
        if (!this._hashTable[index]) {
            // extend the length by one
            this.length++;
        }

        // add the content to the table
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    delete(key) {
        // get the appropriate index for the key
        const index = this._findSlot(key);

        // use this index to identify the actual slot in the hash table
        const slot = this._hashTable[index];

        // if trying to delete it, the key (and therefore slot) should exist
        if (slot === undefined) {
            throw new Error('Key error');
        }
        
        // set this slot's DELETED property to be true
        slot.DELETED = true;

        // tick length property down, deleted property up
        this.length--;
        this._deleted++;
    }

    // find appropriate slot for the key
    _findSlot(key) {
        // generate hash of the key
        const hash = HashMap._hashString(key);

        // define the starting index in the table as the remainder when the hash value is divided by the table's current capacity
        const start = hash % this._capacity;

        // walk from start value up to the start value PLUS the current capacity
        for (let i=start ; i < start+this._capacity ; i++) {
            // calculate index in the table
            const index = i % this._capacity;

            // look at the relevant slot in the table
            const slot = this._hashTable[index];

            // if it's empty, or this slot is already used for this same key (and hasn't been deleted),
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }

        }
    }

    // if needed, "resize" = freshly recreate hash map with larger capacity
    _resize(size) {

        // store old table
        const oldSlots = this._hashTable;
        
        // define the new capacity to be the "requested" size
        this._capacity = size;

        // reset length to 0, though it will be extended as table is rebuilt
        this.length = 0;

        // initialize "this" hashTable as an empty array
        this._hashTable = [];

        // walk through all slots from old table
        for (const slot of oldSlots) {
            if (slot !== undefined) {
                this.set(slot.key, slot.value);
            }
        }

    }

    // `djb2` algorithm that hashes a string (string --> number)
    static _hashString(string) {
        let hash = 5381;
        for (let i=0 ; i<string.length ; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

}

module.exports = HashMap;