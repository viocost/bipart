
# Bipart
A minimalistic one-to-one bi-directional map written in typescript

## Basic usage

``` typescript

import { Bipart } from "bipart"

// Initializing
const mapAny = new Bipart()

const mapTyped = new Bipart<KeyType, ValueType>()

const mapFromObject = new Bipart({
   "a": 1,
   "b": 2
})

// this will result in map 
// "a" <-> 1
// "b" <-> 2
// "c" <-> 3
// "d" <-> 4
const mapFromArrays = Bipart.fromArrays(["a", "b", "c", "d"], [1, 2, 3, 4])

// Access
mapFromArrays.get("a") // => 1
mapFromArrays.getKey(1) // => "a"

// Set
mapAny.set("x", 2)

// Delete
mapFromArrays.delete("a")// => true
mapFromArrays.deleteValue(2) //=> true
mapFromArrays.set("c", undfined) // this deletes key "c" and its value
mapFromArrays.set(undefined, 4) // this deletes key "d" and its value

// Complex objects as keys
const a = {x: 1, y:2}
const b = {bar: "x", foo: "y"}
const map = new Bipart()
map.set(a, b)
map.get(a) // => b

// Traversing
for(const [key, val] of mapFromObject){
    console.log(`${key} => ${val}`)
}

// Has
mapFromObject.has("a") // true
mapFromObject.hasValue(2) // true
mapFromObject.hasValue(999) // false


// Keys, Values 
mapFromObject.keys() //=> keys iterator
mapFromObject.values() //=> values iterator

// Size
mapAny.size // =>  1

// Clear 
mapAny.clear()




```
