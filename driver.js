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

// tree structure visualizer
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree(randomArray());

console.log(tree.isBalanced());
