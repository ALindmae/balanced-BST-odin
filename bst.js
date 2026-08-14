class Node {
  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}
