class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  includes(value) {
    let node = this.root;
    while (node) {
      if (value === node.data) return true;
      node = value > node.data ? node.right : node.left;
    }
    return false;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let node = this.root;

    while (node) {
      if (value === node.data) return;
      if (value < node.data) {
        if (!node.left) {
          node.left = new Node(value);
          return;
        }
        node = node.left;
      } else {
        if (!node.right) {
          node.right = new Node(value);
          return;
        }
        node = node.right;
      }
    }
  }
}

function buildTree(array, startIndex, endIndex) {
  // calling function with no array is false
  if (!array) return false;

  // on first function call prepare array
  if (startIndex === undefined) {
    // sort array ascending
    array.sort((a, b) => a - b);
    // filter out duplicate numbers
    array = array.filter((number, i, arr) => {
      if (number === arr[i - 1]) return false;
      return true;
    });
  }

  // base case met: no more nodes, return null
  if (startIndex > endIndex) {
    return null;
  }

  // on first function call assign indexes
  startIndex = startIndex === undefined ? 0 : startIndex;
  endIndex = endIndex === undefined ? array.length - 1 : endIndex;
  // calculate mid index
  const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

  const rootNode = new Node(array[midIndex]);

  rootNode.left = buildTree(array, startIndex, midIndex - 1);
  rootNode.right = buildTree(array, midIndex + 1, endIndex);

  return rootNode;
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

// unsorted test array
const arr = [2, 5, 1, 9, 17, 20, 4, 4, 20, 22];

const tree = new Tree(arr);

prettyPrint(tree.root);
