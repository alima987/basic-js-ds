const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data, left, right) {
    this.data = data || null;
    this.left = left || null;
    this.right = right || null;
  }
  root() {
    return this.data ? this : null;
  }

  add(data) {
    if (!data) return;
    if (this.data === null) {
      this.data = data;
      return;
    }
    let nowNode = this;

    while (nowNode) {
      if (data < nowNode.data) {
        if (nowNode.left === null) {
          nowNode.left = new BinarySearchTree(data);
          return;
        } else {
          nowNode = nowNode.left;
        }
      } else {
        if (nowNode.right === null) {
          nowNode.right = new BinarySearchTree(data);
          return;
        } else {
          nowNode = nowNode.right;
        }
      }
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    if (!this.root()) return null;

    let root = this.root();

    while (root) {
      if (root.data === data) return root;
      if (root.data < data) {
        root = root.right;
        continue;
      }
      if (root.data > data) root = root.left;
    }
    return null;
  }

  removeNode(root, data) {
    if (!root) return root;
    if (root.data < data) {
      root.right = this.removeNode(root.right, data);
    } else if (root.data > data) {
      root.left = this.removeNode(root.left, data);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      root.data = this.findMinNode(root.right);

      root.right = this.removeNode(root.right, root.data);
    }
    return root;
  }

  remove(data) {
    let root = this.root();
    root = this.removeNode(root, data);
  }

  findMinNode(root) {
    while (root.left) {
      root = root.left;
    }

    return root.data;
  }

  min() {
    return this.findMinNode(this.root());
    // let root = this.root();

    // while (root.left) {
    //   root = root.left;
    // }

    // return root.data;

  }

  max() {
    let root = this.root();

    while (root.right) {
      root = root.right;
    }

    return root.data;
  }
}
module.exports = {
  BinarySearchTree
};