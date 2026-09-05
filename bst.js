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

  deleteItem(value) {
    function getSuccessor(curr) {
      curr = curr.right;
      while (curr?.left) {
        curr = curr.left;
      }
      return curr;
    }

    function deleteNode(root, targetValue) {
      if (root === null) return root;
      if (targetValue < root.data) {
        root.left = deleteNode(root.left, targetValue);
      }
      if (targetValue > root.data) {
        root.right = deleteNode(root.right, targetValue);
      } else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }

        const successor = getSuccessor(root);
        root.data = successor.data;
        root.right = deleteNode(root.right, successor.data);
      }
      return root;
    }
    this.root = deleteNode(this.root, value);
  }

  // levelOrderForEach iterative implementation
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callbackfunction is required");
    }
    const queue = [];

    queue.push(this.root);
    while (queue.length !== 0) {
      let current = queue[0];
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      queue.shift();
    }
  }

  // levelOrderForEach recursive implementation
  levelOrderForEachRec(callback, queue = [this.root]) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (!this.root || queue.length === 0) return;

    let current = queue[0];
    callback(current.data);
    queue.shift();

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);

    this.levelOrderForEachRec(callback, queue);
  }

  inOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (root === null) return null;

    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (root === null) return null;

    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (root === null) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  height(value) {
    function getHeightInEdges(root) {
      if (root === null) return -1;

      let left = getHeightInEdges(root.left) + 1;
      let right = getHeightInEdges(root.right) + 1;

      if (left < right) return right;
      else return left;
    }

    let current = this.root;

    while (current) {
      if (value === current.data) {
        return getHeightInEdges(current);
      }
      if (value < current.data) {
        current = current.left;
      } else current = current.right;
    }
    return undefined;
  }

  depth(value, root = this.root) {
    if (root === null) return undefined;
    if (root.data === value) return 0;
    const depth =
      value < root.data
        ? this.depth(value, root.left)
        : this.depth(value, root.right);

    return depth === undefined ? undefined : depth + 1;
  }

  isBalanced(root = this.root) {
    if (root === null) return { height: -1, balanced: true };

    const left = this.isBalanced(root.left);
    const right = this.isBalanced(root.right);

    const leftHeight = left.height + 1;
    const rightHeight = right.height + 1;

    // The tree is balanced if both subtrees are balanced
    // and their heights differ by no more than 1.
    const balanced =
      left.balanced &&
      right.balanced &&
      Math.abs(leftHeight - rightHeight) <= 1;

    return {
      height: Math.max(leftHeight, rightHeight),
      balanced: balanced,
    };
  }

  reBalance() {
    const values = [];
    this.inOrderForEach((value) => {
      values.push(value);
    });

    this.root = buildTree(values);
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
const arr = [2, 5, 1, 9, 17, 20, 4, 4, 20, 22, 23, 30, 3, 14, 50];

const tree = new Tree(arr);
