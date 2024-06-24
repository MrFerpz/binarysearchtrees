class Node {
    constructor(data, leftChild = null, rightChild = null) {
        this.data = data;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
    }

    buildTree(array, start = 0, end = array.length - 1) {

        if (array.length >= 1) {

        let mid = Math.floor((start + end) / 2);
        let left = array.slice(0, mid);
        console.log(left);
        let right = array.slice(mid + 1, end + 1);
        console.log(right);

        let root = new Node(array[mid]);
        console.log(root);

        root.leftChild = this.buildTree(left, 0, left.length - 1);
        root.rightChild = this.buildTree(right, 0, right.length - 1);

        return root

    } else return null;
}
}

let test = new Tree([0,1,2,3,4,5,6]);
test.buildTree(test.array);

let test2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.buildTree(test2.array);