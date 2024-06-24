class Node {
    constructor(data, leftChild = null, rightChild = null) {
        this.data = data;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
    }

    buildTree(array) {
        let start = 0;
        let end = array.length - 1;
        let mid = (start + end) / 2;

        if (start > end) {
            return null
        }

        let root = new Node(array[mid]);
        root.leftChild = buildTree(this.left);
        root.rightChild = buildTree(this.right);

        console.log(root);
        return root
    }
}

let test = new Tree([0,1,2,3,4,5]);
test.buildTree(test);