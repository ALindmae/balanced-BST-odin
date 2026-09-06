import { Tree } from "./bst.js";

function randomArray() {
  const array = [];
  let length = Math.floor(Math.random() * (50 - 5 + 1) + 5);

  while (length !== 0) {
    array.push(Math.floor(Math.random() * (99 - 1 + 1) + 1));
    length--;
  }

  return array;
}

const tree = new Tree(randomArray());

console.log(tree.isBalanced());

console.log("print preOrderForEach values:");
tree.preOrderForEach(console.log);

console.log("print levelOrderForEach values:");
tree.levelOrderForEachRec(console.log);

console.log("print inOrderForEach values:");
tree.inOrderForEach(console.log);

console.log("print postOrderForEach values:");
tree.postOrderForEach(console.log);

tree.insert(102);
tree.insert(110);
tree.insert(120);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log("print preOrderForEach values:");
tree.preOrderForEach(console.log);

console.log("print levelOrderForEach values:");
tree.levelOrderForEachRec(console.log);

console.log("print inOrderForEach values:");
tree.inOrderForEach(console.log);

console.log("print postOrderForEach values:");
tree.postOrderForEach(console.log);
