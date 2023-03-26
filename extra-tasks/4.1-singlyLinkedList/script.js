class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor(value) {
    this.root = new Node(value);
  }

  get size() {
    let count = 0;
    let node = this.root;

    while (node) {
      count++;
      node = node.next;
    }

    return count;
  }

  addNode(value, i = this.size - 1) {
    if (!value || i > this.size - 1 || i < 0) {
      return false;
    }

    let count = 0;
    let prev = null;
    let current = this.root;
    const newNode = new Node(value);

    while (count <= i && current) {
      prev = current;
      current = current.next;
      count++;
    }

    if (prev) {
      prev.next = newNode;
      newNode.next = current;
    }

    return true;
  }

  removeNode(i = this.size - 1) {
    if (i > this.size - 1 || this.size === 1 || i < 0) {
      return false;
    }

    if (i === 0) {
      this.root = this.root.next;
      return true;
    }

    let current = this.root;

    for (let j = 0; current != null && j < i - 1; j++) {
      current = current.next;
    }

    const next = current.next.next;
    current.next = next;

    return true;
  }

  print() {
    let node = this.root;
    const result = [];

    while (node != null) {
      result.push(node.value);
      node = node.next;
    }

    console.log(result.join(', '));
  }
}

// // test-cases

// const list = new List('root node value');

// console.log(list.addNode());
// console.log(list.addNode('will be after root', 0));
// console.log(list.addNode('invalid index', 2));
// console.log(list.addNode('invalid index', -1));
// console.log(list.addNode('without index will be last node'));
// console.log(list.addNode('insert between second and third', 1));
// console.log(list.print());

// console.log(list.removeNode(42));
// console.log(list.removeNode(-42));
// console.log(list.removeNode(0));
// console.log(list.removeNode());
// console.log(list.print());
