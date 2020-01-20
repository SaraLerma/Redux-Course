import { isString } from "util";

const addCounter = (list) => {
    /* modifica el array
    list.push(0);
    return list;*/
    //return list.concat([0]);
    return [...list, 0];
};
const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
}; 

testAddCounter();

const removeCounter = (list, index) => {
    /* modifica el array
    list.splice(index, 1);
    return list;*/
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]

};

const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
}; 

testRemoveCounter();

const incrementCounter = (list, index) => {
    /*mutacion
    list[index]++;
    return list;
    */
   return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
]
}

const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);
    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
}; 

testRemoveCounter();
