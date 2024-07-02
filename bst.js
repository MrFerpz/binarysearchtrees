// setting up Nodes: need to hold data and have ref to left child and right child
class Node {
    constructor(data, leftChild = null, rightChild = null) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

// setting up the tree itself
class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    // using the input array and defining two numbers for the start and end
    buildTree(array, start = 0, end = array.length - 1) {

        if (array.length >= 1) {

        // remove dupes
        array = [...new Set(array)];

        // sort into numerical order
        array.sort(function(a, b) {
            return a - b;
        });

        end = array.length - 1;

        // calculate mid point
        let mid = Math.floor((start + end) / 2);

        // split into left and right sides
        let left = array.slice(0, mid);
        let right = array.slice(mid + 1, end + 1);

        // middle number is going to be the root
        let root = new Node(array[mid]);

        // left and right noots (children) are going to be the midpoints of left and right sides
        root.leftChild = this.buildTree(left, 0, left.length - 1);
        root.rightChild = this.buildTree(right, 0, right.length - 1);

        // returns the completed node with data, left child and right child
        return root

    } else return null;
}

// function to set up the initial tree
initialiseTree() {
    this.root = this.buildTree(this.array)
}

insert(value) {
    // alternative method where you rebuild the array
    // this.array.push(value); 
    // this.array = [...new Set(this.array)].sort((a, b) => a - b);
    // return this.buildTree(this.array); 
    
    this.array.push(value);
    let newNode = new Node(value);

    let current = this.root;
    console.log(current.data);

    while(true) {
    if (value < current.data) {
        if (current.leftChild === null) {
            current.leftChild = newNode;
            break
        }
        else {
            current = current.leftChild;
        }
    } else {
        if (current.rightChild === null) {
            current.rightChild = newNode;
            break
        }
        else {
            current = current.rightChild;
         }
     }
    }
}

    deleteItem(value, node = this.root) {
        if (node === null) return node;

        // we're gonna do a recursive function
        if (value < node.data) {
            node.leftChild = this.deleteItem(value, node.leftChild)
        } else if (value > node.data) {
            node.rightChild = this.deleteItem(value, node.rightChild);
        } else {
            // found the node 
            if (node.leftChild === null && node.rightChild === null) {
                return null;
            }
            // case 2 of one child - replace with its child
           if (node.leftChild === null && node.rightChild !== null) {
                return node.rightChild;
           } else if (node.rightChild === null) {
                return node.leftChild;
            }

            // case 3 of two children - replace with next largest (right > left > left > left...)
            if (node.rightChild !== null && node.leftChild !== null) {
                let current = node;
                current = node.rightChild;
                while(current.leftChild !== null) {
                    current = current.leftChild;
                }
                node.data = current.data;
                return node;
            }
    }
}
}

// let test = new Tree([0,1,2,3,4,5,6]);
// test.buildTree(test.array);

let test2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test2.initialiseTree();
test2.insert(6);
console.log(test2);
test2.deleteItem(6);
console.log(test2);