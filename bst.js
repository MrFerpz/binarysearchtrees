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
        this.inOrderArray = [];
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
    if (node === null) return node; // Base case: if the node is null, return null

    // Recur down the tree
    if (value < node.data) {
        node.leftChild = this.deleteItem(value, node.leftChild); // Recur to the left subtree
    } else if (value > node.data) {
        node.rightChild = this.deleteItem(value, node.rightChild); // Recur to the right subtree
    } else {
        // Node to be deleted found

        // Case 1: Node has no children (leaf node)
        if (node.leftChild === null && node.rightChild === null) {
            return null; // Simply remove the node by returning null
        }

        // Case 2: Node has one child
        if (node.leftChild === null) {
            return node.rightChild; // Replace node with its right child
        } else if (node.rightChild === null) {
            return node.leftChild; // Replace node with its left child
        }

        // Case 3: Node has two children
        // Find the in-order successor (smallest in the right subtree)
        let successor = this.findMinNode(node.rightChild);
        node.data = successor.data; // Copy the successor's data to the node

        // Delete the in-order successor
        node.rightChild = this.deleteItem(successor.data, node.rightChild);
    }
    return node; // Return the updated node
}

// Helper method to find the minimum value node in a tree
findMinNode(node) {
    let current = node;
    while (current.leftChild !== null) {
        current = current.leftChild; // Move to the leftmost node
    }
    return current;
    }

find(value, node = this.root) {
    if (node === null) {
        return node;
    } else if (value < node) {
        return this.find(value, node.leftChild)
    } else if (value > node) {
        return this.find(value, node.rightChild)
    } else {
    return node
}}

levelOrder(callback) {
    // obv if nothing there then return
    if (this.root === null) {
        return;
    }
    // first item of the queue is gonna be the root node
    let queue = [this.root];

    while (queue.length > 0) {
        // shift removes and returns first element so is ideal to handle queues
        let current = queue.shift();
        
        // do something with the current value like console.log its data
        callback(current);

        if (current.leftChild !== null) {
            queue.push(current.leftChild);
        }
        if (current.rightChild !== null) {
            queue.push(current.rightChild);
        }
     }
    }

inOrder(callback) {
    if (this.root === null) {
        return
    }

    let queue = [];

    function traverse(node) {
        if (node.leftChild) {traverse(node.leftChild)};
        queue.push(node.data);
        callback(node);
        if (node.rightChild) {traverse(node.rightChild)};
    }

    traverse(this.root);
    console.log(queue);
}

preOrder(callback) {
    if (this.root === null) {
        return
    }

    let queue = [];
    
    function traverse(node) {
        queue.push(node.data);
        callback(node);
        if (node.leftChild) {traverse(node.leftChild)};
        if (node.rightChild) {traverse(node.rightChild)};
    }

    traverse(this.root);
    console.log(queue);
}

postOrder(callback) {
    if (this.root === null) {
        return
    }

    let queue = [];

    function traverse(node) {
        if (node.leftChild) {traverse(node.leftChild)};
        if (node.rightChild) {traverse(node.rightChild)};
        queue.push(node.data);
        callback(node);
    }

    traverse(this.root);
    console.log(queue);
}

height(node) {
    // arrive at the node
    let data = this.find(node, this.root);
    
    // initialise height
    let height = 0;

    function stepDown(data) {
        if (data.leftChild) {
            height++;
            stepDown(data.leftChild);

        if (data.rightChild) {
            height++;
            stepDown(data.rightChild)}
        
        console.log(height);
        return height;
    }}

    stepDown(data);
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
test2.levelOrder(node => {console.log(node.data)});
test2.inOrder(node => {console.log(node.data)});
test2.preOrder(node => {console.log(node.data)});
test2.postOrder(node => {console.log(node.data)});
test2.height(3)