document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const modules = document.querySelectorAll(".module-card");

    searchBox.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        modules.forEach((module) => {
            const title = module.querySelector(".module-title").textContent.toLowerCase();
            const description = module.querySelector(".module-description").textContent.toLowerCase();

            const matches = title.includes(query) || description.includes(query);
            module.style.display = matches ? "block" : "none";
        });
    });
});

// Comprehensive module data
const modules = [
    {
        id: 1,
        title: "Java Fundamentals & OOP",
        icon: "☕",
        difficulty: "beginner",
        description: "Master the core Java concepts essential for data structures and algorithms implementation.",
        subsections: [
            {
                title: "Object-Oriented Programming Principles",
                description: "Classes, objects, inheritance, encapsulation, polymorphism, and abstraction in Java context."
            },
            {
                title: "Java Memory Management",
                description: "Understanding heap vs stack, garbage collection, and memory allocation for efficient programming."
            },
            {
                title: "Generics and Collections Framework",
                description: "Type safety, generic classes, methods, and Java's built-in collections hierarchy."
            },
            {
                title: "Exception Handling",
                description: "Try-catch blocks, custom exceptions, and error handling in data structure operations."
            }
        ],
        keywords: ["Class", "Object", "Inheritance", "Polymorphism", "Encapsulation", "Generics", "Exception", "Memory", "Heap", "Stack"],
        resources: [
            "Oracle Java Documentation: https://docs.oracle.com/javase/tutorial/",
            "Java OOP Concepts: https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
            "Java Memory Management: https://www.baeldung.com/java-memory-management",
            "Generics Tutorial: https://docs.oracle.com/javase/tutorial/java/generics/"
        ]
    },
    {
        id: 2,
        title: "Big O Notation & Complexity Analysis",
        icon: "📊",
        difficulty: "beginner",
        description: "Learn to analyze and compare algorithm efficiency using mathematical notation and complexity theory.",
        subsections: [
            {
                title: "Time Complexity Fundamentals",
                description: "Understanding O(1), O(log n), O(n), O(n log n), O(n²), and O(2^n) with real examples."
            },
            {
                title: "Space Complexity Analysis",
                description: "Memory usage analysis, auxiliary space vs input space, and space-time tradeoffs."
            },
            {
                title: "Best, Average, and Worst Case",
                description: "Scenario analysis for different input conditions and their impact on performance."
            },
            {
                title: "Asymptotic Analysis",
                description: "Big O, Big Omega, and Big Theta notations for comprehensive algorithm comparison."
            }
        ],
        keywords: ["Big O", "Time Complexity", "Space Complexity", "Asymptotic", "Best Case", "Worst Case", "Average Case", "Logarithmic", "Linear", "Quadratic"],
        resources: [
            "Big O Cheat Sheet: https://www.bigocheatsheet.com/",
            "Complexity Analysis Guide: https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
            "Interactive Big O: https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation",
            "Time Complexity Examples: https://www.programiz.com/dsa/asymptotic-notations"
        ]
    },
    {
        id: 3,
        title: "Arrays & Dynamic Arrays",
        icon: "📋",
        difficulty: "beginner",
        description: "Master static arrays, dynamic arrays (ArrayList), and fundamental array operations with optimization techniques.",
        subsections: [
            {
                title: "Array Fundamentals",
                description: "Declaration, initialization, indexing, and memory layout of arrays in Java."
            },
            {
                title: "ArrayList Implementation",
                description: "Dynamic resizing, capacity management, and internal workings of ArrayList class."
            },
            {
                title: "Array Algorithms",
                description: "Searching, sorting, rotating, and manipulation algorithms for array data structures."
            },
            {
                title: "Multi-dimensional Arrays",
                description: "2D arrays, matrix operations, and advanced array structures for complex data representation."
            }
        ],
        keywords: ["Array", "ArrayList", "Index", "Dynamic", "Resize", "Capacity", "2D Array", "Matrix", "Iteration", "Random Access"],
        resources: [
            "Java Arrays Tutorial: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html",
            "ArrayList Documentation: https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html",
            "Array Algorithms: https://www.geeksforgeeks.org/array-data-structure/",
            "Dynamic Arrays Explained: https://www.programiz.com/dsa/dynamic-array"
        ]
    },
    {
        id: 4,
        title: "Linked Lists",
        icon: "🔗",
        difficulty: "intermediate",
        description: "Implement and master singly, doubly, and circular linked lists with advanced manipulation techniques.",
        subsections: [
            {
                title: "Singly Linked Lists",
                description: "Node structure, insertion, deletion, and traversal operations with pointer manipulation."
            },
            {
                title: "Doubly Linked Lists",
                description: "Bidirectional traversal, prev/next pointers, and efficient insertion/deletion at any position."
            },
            {
                title: "Circular Linked Lists",
                description: "Circular connections, detecting cycles, and specialized applications in scheduling algorithms."
            },
            {
                title: "Advanced List Operations",
                description: "Merging, splitting, reversing, and detecting loops in linked list structures."
            }
        ],
        keywords: ["Node", "Pointer", "Singly", "Doubly", "Circular", "Traversal", "Insertion", "Deletion", "Head", "Tail", "Next", "Previous"],
        resources: [
            "Linked Lists Visualization: https://visualgo.net/en/list",
            "LinkedList Implementation: https://www.geeksforgeeks.org/linked-list-set-1-introduction/",
            "Doubly Linked List: https://www.programiz.com/dsa/doubly-linked-list",
            "Circular Linked List: https://www.geeksforgeeks.org/circular-linked-list/"
        ]
    },
    {
        id: 5,
        title: "Stacks & Queues",
        icon: "📚",
        difficulty: "intermediate",
        description: "Master LIFO and FIFO data structures with practical applications in expression evaluation and scheduling.",
        subsections: [
            {
                title: "Stack Implementation",
                description: "Array-based and linked list-based stack implementations with push, pop, and peek operations."
            },
            {
                title: "Queue Implementation",
                description: "Array-based and linked list-based queue implementations with enqueue and dequeue operations."
            },
            {
                title: "Specialized Queues",
                description: "Circular queues, deques (double-ended queues), and priority queues with implementation details."
            },
            {
                title: "Applications",
                description: "Expression evaluation, balanced parentheses, function calls, and breadth-first search applications."
            }
        ],
        keywords: ["Stack", "Queue", "LIFO", "FIFO", "Push", "Pop", "Enqueue", "Dequeue", "Peek", "Circular Queue", "Deque", "Priority Queue"],
        resources: [
            "Stack Visualization: https://visualgo.net/en/list",
            "Java Stack Class: https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html",
            "Queue Interface: https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html",
            "Stack vs Queue: https://www.geeksforgeeks.org/difference-between-stack-and-queue-data-structures/"
        ]
    },
    {
        id: 6,
        title: "Trees & Binary Trees",
        icon: "🌳",
        difficulty: "intermediate",
        description: "Understand hierarchical data structures, binary trees, and tree traversal algorithms with practical implementations.",
        subsections: [
            {
                title: "Tree Fundamentals",
                description: "Tree terminology, properties, types, and basic operations on tree structures."
            },
            {
                title: "Binary Tree Implementation",
                description: "Node structure, insertion, deletion, and representation using arrays and linked structures."
            },
            {
                title: "Tree Traversal Algorithms",
                description: "Inorder, preorder, postorder, and level-order traversal with recursive and iterative approaches."
            },
            {
                title: "Binary Search Trees",
                description: "BST properties, search, insertion, deletion, and maintaining the BST invariant."
            }
        ],
        keywords: ["Tree", "Binary Tree", "Node", "Root", "Leaf", "Parent", "Child", "Traversal", "Inorder", "Preorder", "Postorder", "BST"],
        resources: [
            "Tree Visualization: https://visualgo.net/en/bst",
            "Binary Trees: https://www.geeksforgeeks.org/binary-tree-data-structure/",
            "Tree Traversals: https://www.programiz.com/dsa/tree-traversal",
            "Binary Search Trees: https://www.geeksforgeeks.org/binary-search-tree-data-structure/"
        ]
    },
    {
        id: 7,
        title: "Heaps & Priority Queues",
        icon: "⛰️",
        difficulty: "intermediate",
        description: "Master heap data structure, priority queues, and heap sort algorithm with real-world applications.",
        subsections: [
            {
                title: "Heap Properties",
                description: "Min-heap and max-heap properties, complete binary tree structure, and heap representation."
            },
            {
                title: "Heap Operations",
                description: "Insertion, deletion, heapify operations, and maintaining heap properties efficiently."
            },
            {
                title: "Priority Queue Implementation",
                description: "Using heaps for priority queues, comparison functions, and custom priority schemes."
            },
            {
                title: "Heap Sort Algorithm",
                description: "In-place sorting using heap structure, build-heap process, and time complexity analysis."
            }
        ],
        keywords: ["Heap", "Priority Queue", "Min Heap", "Max Heap", "Heapify", "Complete Binary Tree", "Heap Sort", "Priority", "Extract Max", "Insert"],
        resources: [
            "Heap Visualization: https://visualgo.net/en/heap",
            "Java PriorityQueue: https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html",
            "Heap Data Structure: https://www.geeksforgeeks.org/heap-data-structure/",
            "Heap Sort: https://www.programiz.com/dsa/heap-sort"
        ]
    },
    {
        id: 8,
        title: "Hash Tables & Hash Maps",
        icon: "🗂️",
        difficulty: "intermediate",
        description: "Implement efficient key-value storage using hash functions, collision resolution, and load factor management.",
        subsections: [
            {
                title: "Hash Function Design",
                description: "Creating effective hash functions, uniform distribution, and minimizing collisions."
            },
            {
                title: "Collision Resolution",
                description: "Chaining, open addressing, linear probing, and quadratic probing techniques."
            },
            {
                title: "HashMap Implementation",
                description: "Internal structure of Java HashMap, buckets, and dynamic resizing strategies."
            },
            {
                title: "Performance Analysis",
                description: "Load factor, rehashing, and time complexity analysis for hash table operations."
            }
        ],
        keywords: ["Hash Table", "Hash Map", "Hash Function", "Collision", "Chaining", "Open Addressing", "Load Factor", "Bucket", "Rehashing", "Key-Value"],
        resources: [
            "Hash Table Visualization: https://visualgo.net/en/hashtable",
            "Java HashMap: https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html",
            "Hash Tables: https://www.geeksforgeeks.org/hashing-data-structure/",
            "Collision Resolution: https://www.programiz.com/dsa/hash-table"
        ]
    },
    {
        id: 9,
        title: "Graphs & Graph Algorithms",
        icon: "🕸️",
        difficulty: "advanced",
        description: "Master graph representations, traversal algorithms, and solve complex problems using graph theory.",
        subsections: [
            {
                title: "Graph Representations",
                description: "Adjacency matrix, adjacency list, and edge list representations with trade-offs analysis."
            },
            {
                title: "Graph Traversal",
                description: "Depth-First Search (DFS) and Breadth-First Search (BFS) with applications and implementations."
            },
            {
                title: "Shortest Path Algorithms",
                description: "Dijkstra's algorithm, Bellman-Ford algorithm, and Floyd-Warshall for shortest path problems."
            },
            {
                title: "Advanced Graph Algorithms",
                description: "Topological sorting, minimum spanning trees, and strongly connected components."
            }
        ],
        keywords: ["Graph", "Vertex", "Edge", "Adjacency Matrix", "Adjacency List", "DFS", "BFS", "Dijkstra", "Shortest Path", "MST", "Topological Sort"],
        resources: [
            "Graph Visualization: https://visualgo.net/en/graphds",
            "Graph Algorithms: https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
            "DFS and BFS: https://www.programiz.com/dsa/graph-dfs",
            "Dijkstra's Algorithm: https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
        ]
    },
    {
        id: 10,
        title: "Sorting Algorithms",
        icon: "🔢",
        difficulty: "intermediate",
        description: "Master fundamental and advanced sorting algorithms with complexity analysis and optimization techniques.",
        subsections: [
            {
                title: "Elementary Sorting",
                description: "Bubble sort, selection sort, and insertion sort with step-by-step analysis."
            },
            {
                title: "Efficient Sorting",
                description: "Merge sort, quick sort, and heap sort with divide-and-conquer strategies."
            },
            {
                title: "Linear Time Sorting",
                description: "Counting sort, radix sort, and bucket sort for special cases and constraints."
            },
            {
                title: "Sorting Analysis",
                description: "Stability, in-place sorting, and choosing the right algorithm for different scenarios."
            }
        ],
        keywords: ["Sorting", "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Counting Sort", "Radix Sort", "Stability"],
        resources: [
            "Sorting Visualization: https://visualgo.net/en/sorting",
            "Sorting Algorithms: https://www.geeksforgeeks.org/sorting-algorithms/",
            "Java Arrays.sort(): https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#sort-int:A-",
            "Sorting Comparison: https://www.programiz.com/dsa/sorting-algorithm"
        ]
    },
    {
        id: 11,
        title: "Searching Algorithms",
        icon: "🔍",
        difficulty: "beginner",
        description: "Learn efficient searching techniques for sorted and unsorted data with optimization strategies.",
        subsections: [
            {
                title: "Linear Search",
                description: "Sequential search through data structures with variants for different data types."
            },
            {
                title: "Binary Search",
                description: "Divide-and-conquer search for sorted arrays with recursive and iterative implementations."
            },
            {
                title: "Search in Data Structures",
                description: "Searching in trees, graphs, and hash tables with specialized algorithms."
            },
            {
                title: "Advanced Search Techniques",
                description: "Interpolation search, exponential search, and search optimization methods."
            }
        ],
        keywords: ["Linear Search", "Binary Search", "Sequential Search", "Divide and Conquer", "Interpolation Search", "Exponential Search", "Search Key", "Sorted Array"],
        resources: [
            "Search Visualization: https://visualgo.net/en/bst",
            "Binary Search: https://www.geeksforgeeks.org/binary-search/",
            "Search Algorithms: https://www.programiz.com/dsa/linear-search",
            "Java Collections.binarySearch(): https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#binarySearch-java.util.List-T-"
        ]
    },
    {
        id: 12,
        title: "Recursion & Dynamic Programming",
        icon: "🔄",
        difficulty: "advanced",
        description: "Master recursive thinking, memoization, and dynamic programming for solving complex optimization problems.",
        subsections: [
            {
                title: "Recursion Fundamentals",
                description: "Base cases, recursive cases, and stack frame analysis for recursive algorithms."
            },
            {
                title: "Memoization",
                description: "Top-down approach to optimization using caching for overlapping subproblems."
            },
            {
                title: "Dynamic Programming",
                description: "Bottom-up approach, optimal substructure, and tabulation for efficiency."
            },
            {
                title: "Classic DP Problems",
                description: "Fibonacci, knapsack, longest common subsequence, and edit distance problems."
            }
        ],
        keywords: ["Recursion", "Base Case", "Recursive Case", "Memoization", "Dynamic Programming", "Optimal Substructure", "Overlapping Subproblems", "Tabulation", "Knapsack", "LCS"],
        resources: [
            "Recursion Visualization: https://visualgo.net/en/recursion",
            "Dynamic Programming: https://www.geeksforgeeks.org/dynamic-programming/",
            "Memoization vs Tabulation: https://www.programiz.com/dsa/dynamic-programming",
            "DP Practice Problems: https://leetcode.com/tag/dynamic-programming/"
        ]
    },
    {
        id: 13,
        title: "Advanced Tree Structures",
        icon: "🌲",
        difficulty: "advanced",
        description: "Explore self-balancing trees, B-trees, and specialized tree structures for efficient data management.",
        subsections: [
            {
                title: "AVL Trees",
                description: "Self-balancing binary search trees with rotation operations and height balance factors."
            },
            {
                title: "Red-Black Trees",
                description: "Balanced binary search trees with color properties and insertion/deletion algorithms."
            },
            {
                title: "B-Trees and B+ Trees",
                description: "Multi-way search trees for database systems and file system implementations."
            },
            {
                title: "Specialized Trees",
                description: "Trie (prefix trees), segment trees, and Fenwick trees for specific applications."
            }
        ],
        keywords: ["AVL Tree", "Red-Black Tree", "B-Tree", "B+ Tree", "Trie", "Segment Tree", "Fenwick Tree", "Rotation", "Balance Factor", "Self-Balancing"],
        resources: [
            "AVL Tree Visualization: https://visualgo.net/en/bst",
            "Red-Black Trees: https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/",
            "B-Trees: https://www.programiz.com/dsa/b-tree",
            "Trie Data Structure: https://www.geeksforgeeks.org/trie-insert-and-search/"
        ]
    },
    {
        id: 14,
        title: "String Algorithms",
        icon: "📝",
        difficulty: "intermediate",
        description: "Master string manipulation, pattern matching, and text processing algorithms with practical applications.",
        subsections: [
            {
                title: "String Basics",
                description: "String representation, immutability in Java, and StringBuilder for efficient string operations."
            },
            {
                title: "Pattern Matching",
                description: "Naive pattern matching, KMP algorithm, and Rabin-Karp algorithm for string searching."
            },
            {
                title: "String Processing",
                description: "Substring algorithms, string comparison, and lexicographic ordering techniques."
            },
            {
                title: "Advanced String Algorithms",
                description: "Longest common subsequence, edit distance, and string compression algorithms."
            }
        ],
        keywords: ["String", "Pattern Matching", "KMP", "Rabin-Karp", "Substring", "LCS", "Edit Distance", "StringBuilder", "Immutable", "Lexicographic"],
        resources: [
            "String Algorithms: https://www.geeksforgeeks.org/string-data-structure/",
            "KMP Algorithm: https://www.programiz.com/dsa/kmp-algorithm",
            "Java String Class: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html",
            "Pattern Matching: https://visualgo.net/en/suffixarray"
        ]
    },
    {
        id: 15,
        title: "Algorithm Design Techniques",
        icon: "🎨",
        difficulty: "advanced",
        description: "Learn fundamental algorithm design paradigms and problem-solving strategies for competitive programming.",
        subsections: [
            {
                title: "Divide and Conquer",
                description: "Breaking problems into smaller subproblems with merge sort, quick sort, and binary search examples."
            },
            {
                title: "Greedy Algorithms",
                description: "Making locally optimal choices with activity selection, Huffman coding, and minimum spanning trees."
            },
            {
                title: "Backtracking",
                description: "Systematic trial-and-error approach with N-Queens, Sudoku solver, and permutation generation."
            },
            {
                title: "Branch and Bound",
                description: "Optimization technique for finding optimal solutions in search spaces with pruning strategies."
            }
        ],
        keywords: ["Divide and Conquer", "Greedy", "Backtracking", "Branch and Bound", "Optimization", "Pruning", "Subproblem", "Locally Optimal"],
        resources: [
            "Algorithm Design: https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
            "Greedy Algorithms: https://www.programiz.com/dsa/greedy-algorithm",
            "Backtracking: https://www.geeksforgeeks.org/backtracking-algorithms/",
            "Algorithm Paradigms: https://visualgo.net/en"
        ]
    }
];

// Keyword definitions for popup
const keywordDefinitions = {
    "Class": "A blueprint or template for creating objects that defines attributes and methods",
    "Object": "An instance of a class containing data and methods to manipulate that data",
    "Big O": "Mathematical notation describing the upper bound of algorithm complexity",
    "Array": "A collection of elements stored in contiguous memory locations",
    "Node": "A basic unit of a data structure containing data and references to other nodes",
    "Stack": "A Last-In-First-Out (LIFO) data structure with push and pop operations",
    "Queue": "A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations",
    "Tree": "A hierarchical data structure with nodes connected by edges",
    "Heap": "A complete binary tree where parent nodes satisfy a specific ordering property",
    "Graph": "A collection of vertices connected by edges representing relationships",
    "Recursion": "A programming technique where a function calls itself to solve smaller instances",
    "Hash Table": "A data structure that maps keys to values using a hash function",
    "Binary Search": "An efficient searching algorithm for sorted arrays using divide-and-conquer",
    "Dynamic Programming": "An optimization technique that solves complex problems by breaking them down into simpler subproblems"
};

let currentFilter = 'all';
let completedModules = new Set();

function renderModules() {




    const grid = document.getElementById('modulesGrid');
    grid.innerHTML = '';

    const filteredModules = modules.filter(module => {
        const matchesFilter = currentFilter === 'all' || module.difficulty === currentFilter;
        const searchTerm = document.getElementById('searchBox').value.toLowerCase();
        const matchesSearch = !searchTerm ||
            module.title.toLowerCase().includes(searchTerm) ||
            module.description.toLowerCase().includes(searchTerm) ||
            module.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));

        return matchesFilter && matchesSearch;
    });
    filteredModules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';

        // Remove the old onClick for full modal view
        // We'll keep everything visible on the homepage instead

        const isCompleted = completedModules.has(module.id);

        moduleCard.innerHTML = `
        <div class="module-header">
            <span class="module-icon">${module.icon}</span>
            <div class="module-title">${module.title} ${isCompleted ? '✅' : ''}</div>
        </div>
        <div class="difficulty-badge difficulty-${module.difficulty}">
            ${module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
        </div>
        <div class="module-description">${module.description}</div>
        <div class="subsections">
            ${module.subsections.map(sub => `
                <div class="subsection">
                    <div class="subsection-title">${sub.title}</div>
                    <div class="subsection-description">${sub.description}</div>
                </div>
            `).join('')}
        </div>
        <div class="keywords">
            ${module.keywords.map(keyword => `
                <span class="keyword-tag" onmouseover="showDefinition(event, '${keyword}')" onmouseout="hideDefinition()">${keyword}</span>
            `).join('')}
        </div>
        <div class="resources">
            <strong>Learning Resources:</strong>
            ${module.resources.map(resource => {
            const [title, url] = resource.split(': ');
            return `<a href="${url}" target="_blank" class="resource-link">${title}</a>`;
        }).join('')}
        </div>

        <!-- ✅ Code Toggle Section -->
        <div class="toggle-code-btn">Show Code</div>
<div class="code-example-wrapper" style="display: none;">
    <div class="fullscreen-toggle">🔳 Fullscreen</div>
    <pre class="code-example">${getCodeExample(module.id)}</pre>
</div>

    `;

        grid.appendChild(moduleCard);
    });
}




function openModal(module) {
    const modal = document.getElementById('moduleModal');
    const modalContent = document.getElementById('modalContent');

    // DEBUG: Check what ID is actually being passed
    const moduleId = Number(module.id);
    console.log("🧠 Module ID passed:", moduleId);

    const codeOutput = getCodeExample(moduleId);

    modalContent.innerHTML = `
        <h2>${module.icon} ${module.title}</h2>
        <div class="difficulty-badge difficulty-${module.difficulty}">
            ${module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
        </div>
        <p><strong>Description:</strong> ${module.description}</p>
        
        <h3>📚 Detailed Subsections</h3>
        ${module.subsections.map(sub => `
            <div class="subsection">
                <div class="subsection-title">${sub.title}</div>
                <div class="subsection-description">${sub.description}</div>
            </div>
        `).join('')}
        
        <h3>💡 Key Concepts</h3>
        <div class="keywords">
            ${module.keywords.map(keyword => `
                <span class="keyword-tag" onmouseover="showDefinition(event, '${keyword}')" onmouseout="hideDefinition()">${keyword}</span>
            `).join('')}
        </div>
        
        <h3>📖 Learning Resources</h3>
        <div class="resources">
    <strong>Learning Resources:</strong>
    ${module.resources.map(resource => {
        const [title, url] = resource.split(': ');
        return `<a href="${url}" target="_blank" class="resource-link">${title}</a>`;
    }).join('')}
</div>

<!-- ✅ NEW: Code Toggle Button & Code -->
<button class="toggle-code-btn">Show Code</button>
<div class="code-example" style="display: none;">
    ${getCodeExample(module.id)}
</div>

        
        <h3>💻 Code Example</h3>
        <div class="code-example">
            <pre><code>${codeOutput}</code></pre>
        </div>

        <button onclick="markAsCompleted(${moduleId})" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 20px;">
            ${completedModules.has(moduleId) ? '✅ Completed' : 'Mark as Completed'}
        </button>
    `;

    modal.style.display = 'block';
}


function getCodeExample(moduleId) {
    const examples = {
        1: `// --- Java OOP Example ---
// A simple class representing a Student object

public class Student {

    // --- Fields (Instance Variables) ---
    // These are private to enforce encapsulation
    private String name;
    private int age;

    // --- Constructor ---
    // Called when a new Student object is created
    public Student(String name, int age) {
        this.name = name;  // Set the student's name
        this.age = age;    // Set the student's age
    }

    // --- Getter Methods ---
    // Allow controlled access to the private fields

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    // --- Custom Method ---
    // Displays the student's information
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }

    // --- Main Method for Testing ---
    public static void main(String[] args) {
        // Create a new Student object
        Student student1 = new Student("Eddy", 19);

        // Print the student's details using the display method
        student1.displayInfo();  // Output: Name: Eddy, Age: 19
    }
}
`,
        2: `// --- Big O Analysis Example ---
// Demonstrates different time complexities in Java

public class ComplexityExample {

    // --- O(1) - Constant Time ---
    // This method always takes the same amount of time regardless of array size
    public int getFirstElement(int[] arr) {
        return arr[0];  // Accessing by index is constant time
    }

    // --- O(n) - Linear Time ---
    // Searches for a target value by checking each element
    public int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Found the target, return index
            }
        }
        return -1;  // Target not found
    }

    // --- O(log n) - Logarithmic Time ---
    // Performs binary search on a sorted array
    public int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;  // Avoids integer overflow

            if (arr[mid] == target) {
                return mid;  // Target found
            } else if (arr[mid] < target) {
                left = mid + 1;  // Discard left half
            } else {
                right = mid - 1; // Discard right half
            }
        }

        return -1;  // Target not found
    }

    // --- Main Method for Testing ---
    public static void main(String[] args) {
        ComplexityExample ce = new ComplexityExample();

        int[] nums = {2, 4, 6, 8, 10, 12};

        // O(1) Example
        System.out.println("First element: " + ce.getFirstElement(nums));

        // O(n) Example
        int target1 = 8;
        int index1 = ce.linearSearch(nums, target1);
        System.out.println("Linear search index for " + target1 + ": " + index1);

        // O(log n) Example
        int target2 = 10;
        int index2 = ce.binarySearch(nums, target2);
        System.out.println("Binary search index for " + target2 + ": " + index2);
    }
}
`,
        3: `// --- Arrays and ArrayList Example ---
// Demonstrates static arrays and dynamic arrays in Java

import java.util.ArrayList;

public class ArrayExample {

    public static void main(String[] args) {

        // --- Static Array ---
        // Fixed size, defined at creation
        int[] staticArray = {1, 2, 3, 4, 5};

        // Accessing elements
        System.out.println("Static Array Elements:");
        for (int i = 0; i < staticArray.length; i++) {
            System.out.print(staticArray[i] + " ");
        }
        System.out.println();  // Newline

        // --- Dynamic Array (ArrayList) ---
        // Can grow or shrink during runtime
        ArrayList<Integer> dynamicArray = new ArrayList<>();

        // Adding elements
        dynamicArray.add(10);
        dynamicArray.add(20);
        dynamicArray.add(30);

        // Insert at specific index
        dynamicArray.add(1, 15);  // Insert 15 at index 1

        // Removing an element
        dynamicArray.remove(2);  // Removes the element at index 2 (was 20)

        // Accessing elements
        System.out.println("Dynamic Array Elements (ArrayList):");
        for (int value : dynamicArray) {
            System.out.print(value + " ");
        }
        System.out.println();

        // --- Info ---
        System.out.println("Static array length: " + staticArray.length);
        System.out.println("Dynamic array size: " + dynamicArray.size());

        // --- Multi-dimensional Array ---
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.println("Matrix Elements:");
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.print(matrix[row][col] + " ");
            }
            System.out.println();  // New row
        }
    }
}
`,
        4: `// --- Singly Linked List Implementation ---
// Demonstrates insertion and traversal operations

public class LinkedList {

    // --- Node Class ---
    // Represents each element in the linked list
    private class Node {
        int data;      // Data value stored in the node
        Node next;     // Reference to the next node

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    // Head of the linked list (start node)
    private Node head;

    // --- Insert at Beginning ---
    // Adds a new node to the start of the list
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data); // Create new node
        newNode.next = head;           // Link new node to current head
        head = newNode;                // Update head to the new node
    }

    // --- Insert at End ---
    // Adds a new node to the end of the list
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);

        // If list is empty, set new node as head
        if (head == null) {
            head = newNode;
            return;
        }

        // Traverse to the last node
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }

        // Link the last node to the new node
        current.next = newNode;
    }

    // --- Display the Linked List ---
    // Traverses and prints all elements
    public void display() {
        Node current = head;

        System.out.print("Linked List: ");
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;  // Move to next node
        }
        System.out.println("null");  // End of list
    }

    // --- Main Method for Testing ---
    public static void main(String[] args) {
        LinkedList list = new LinkedList();

        // Insert elements
        list.insertAtBeginning(30);
        list.insertAtBeginning(20);
        list.insertAtEnd(40);
        list.insertAtBeginning(10);

        // Display result
        list.display();  // Expected: 10 -> 20 -> 30 -> 40 -> null
    }
}
`,
        5: `// --- Stack and Queue Example ---
// Demonstrates basic LIFO (stack) and FIFO (queue) operations

import java.util.Stack;
import java.util.Queue;
import java.util.LinkedList;

public class StackQueueExample {

    public static void main(String[] args) {

        // ==========================
        //        STACK SECTION
        // ==========================

        // --- Stack Declaration ---
        // Stack uses Last-In-First-Out (LIFO) order
        Stack<Integer> stack = new Stack<>();

        // --- Push elements onto the stack ---
        stack.push(100);
        stack.push(200);
        stack.push(300);

        // --- Peek at the top element ---
        System.out.println("Top of stack (peek): " + stack.peek());  // 300

        // --- Pop removes the top element ---
        System.out.println("Stack pop: " + stack.pop());  // 300 removed

        // --- Remaining Stack Elements ---
        System.out.println("Current stack: " + stack);  // [100, 200]


        // ==========================
        //        QUEUE SECTION
        // ==========================

        // --- Queue Declaration ---
        // Queue uses First-In-First-Out (FIFO) order
        Queue<String> queue = new LinkedList<>();

        // --- Enqueue elements ---
        queue.offer("Apple");
        queue.offer("Banana");
        queue.offer("Cherry");

        // --- Peek at the front element ---
        System.out.println("\nFront of queue (peek): " + queue.peek());  // Apple

        // --- Dequeue removes the front element ---
        System.out.println("Queue poll: " + queue.poll());  // Apple removed

        // --- Remaining Queue Elements ---
        System.out.println("Current queue: " + queue);  // [Banana, Cherry]
    }
}
`,
        6: `// --- Binary Tree Implementation ---
// Includes insertion and inorder traversal

public class BinaryTree {

    // --- Node Class ---
    // Represents each node in the tree
    private class Node {
        int data;       // Value of the node
        Node left;      // Left child
        Node right;     // Right child

        Node(int data) {
            this.data = data;
            left = null;
            right = null;
        }
    }

    // --- Root of the Tree ---
    private Node root;

    // --- Public Insert Method ---
    public void insert(int data) {
        root = insertRec(root, data);  // Call recursive helper
    }

    // --- Recursive Insert Helper ---
    private Node insertRec(Node current, int data) {
        // If tree/subtree is empty, create new node
        if (current == null) {
            return new Node(data);
        }

        // Go left or right depending on value
        if (data < current.data) {
            current.left = insertRec(current.left, data);
        } else if (data > current.data) {
            current.right = insertRec(current.right, data);
        }
        // Duplicate values are ignored

        return current;
    }

    // --- Inorder Traversal ---
    // Left -> Root -> Right
    public void inorderTraversal() {
        System.out.print("Inorder Traversal: ");
        inorderHelper(root);
        System.out.println();  // Newline
    }

    // --- Recursive Inorder Helper ---
    private void inorderHelper(Node node) {
        if (node != null) {
            inorderHelper(node.left);
            System.out.print(node.data + " ");
            inorderHelper(node.right);
        }
    }

    // --- Main Method for Testing ---
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();

        // Insert nodes
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);

        // Display tree with inorder traversal
        tree.inorderTraversal();  // Output: 20 30 40 50 60 70 80
    }
}
`,
        7: `// --- Min Heap Using Java's PriorityQueue ---
// Demonstrates basic heap operations (min-heap by default)

import java.util.PriorityQueue;

public class HeapExample {

    public static void main(String[] args) {

        // --- Declare a Min Heap ---
        // Java's PriorityQueue is a min-heap by default (smallest element at the top)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        // --- Insert Elements ---
        // The heap will automatically reorder elements to maintain heap property
        minHeap.offer(25);
        minHeap.offer(10);
        minHeap.offer(40);
        minHeap.offer(5);
        minHeap.offer(30);

        // --- Display the Min Element ---
        System.out.println("Top of Min Heap (peek): " + minHeap.peek());  // Should be 5

        // --- Poll Elements in Order ---
        // Polling removes elements in ascending order
        System.out.println("\nPolling all elements (ascending order):");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " ");  // Output: 5 10 25 30 40
        }
        System.out.println();  // Newline
    }
}
`,
        8: `// --- HashMap Example in Java ---
// Demonstrates key-value storage using a hash table

import java.util.HashMap;

public class HashMapExample {

    public static void main(String[] args) {

        // --- Create a HashMap ---
        // Maps a String key to an Integer value
        HashMap<String, Integer> fruitMap = new HashMap<>();

        // --- Insert Key-Value Pairs ---
        fruitMap.put("Apple", 10);
        fruitMap.put("Banana", 20);
        fruitMap.put("Cherry", 15);
        fruitMap.put("Date", 12);

        // --- Retrieve a Value by Key ---
        System.out.println("Apple count: " + fruitMap.get("Apple"));  // 10

        // --- Check for a Key's Existence ---
        if (fruitMap.containsKey("Banana")) {
            System.out.println("Banana is in the map.");
        }

        // --- Remove a Key ---
        fruitMap.remove("Date");  // Removes "Date" from the map

        // --- Iterate Over Entries ---
        System.out.println("\nAll Fruits in Map:");
        for (String key : fruitMap.keySet()) {
            int value = fruitMap.get(key);
            System.out.println(key + " → " + value);
        }

        // --- HashMap Size ---
        System.out.println("\nTotal entries: " + fruitMap.size());  // Should be 3
    }
}
`,
        9: `// --- Graph Representation and BFS Traversal ---
// This example uses an adjacency list and performs Breadth-First Search

import java.util.*;

public class Graph {

    // --- Graph Data Structure ---
    // Maps a node to a list of its neighbors
    private Map<Integer, List<Integer>> adjList;

    // --- Constructor ---
    public Graph() {
        adjList = new HashMap<>();
    }

    // --- Add Edge (Undirected) ---
    public void addEdge(int u, int v) {
        // Connect u → v
        adjList.computeIfAbsent(u, k -> new ArrayList<>()).add(v);

        // Connect v → u (undirected)
        adjList.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    // --- BFS Traversal ---
    // Uses a queue to explore neighbors level-by-level
    public void bfs(int start) {
        System.out.println("BFS Traversal starting at node " + start + ":");

        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();

        visited.add(start);
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.print(current + " ");

            for (int neighbor : adjList.getOrDefault(current, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }

        System.out.println();  // Newline
    }

    // --- Main Method ---
    public static void main(String[] args) {
        Graph graph = new Graph();

        // Add edges (undirected)
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        // Perform BFS starting from node 0
        graph.bfs(0);  // Expected: 0 1 2 3 4
    }
}`,
        10: `
                // --- Sorting Algorithms in Java ---
// This example includes Bubble Sort and Quick Sort with comments

public class SortingExample {

    // --- Bubble Sort ---
    // Simple O(n^2) sorting algorithm for learning purposes
    public static void bubbleSort(int[] arr) {
        int n = arr.length;

        // Repeat n-1 passes
        for (int i = 0; i < n - 1; i++) {

            // Compare adjacent elements and swap if out of order
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // --- Quick Sort ---
    // Efficient divide-and-conquer algorithm, average time: O(n log n)
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);

            // Recursively sort left and right parts
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    // --- Partition Function ---
    // Rearranges elements around a pivot
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];  // Choose last element as pivot
        int i = low - 1;        // i points to the smaller element

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Swap pivot to correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    // --- Utility Method ---
    // Print array elements
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();  // Newline
    }

    // --- Main Method ---
    public static void main(String[] args) {
        int[] arr1 = {5, 3, 8, 4, 2};
        int[] arr2 = {7, 1, 9, 6, 3};

        // --- Bubble Sort Demo ---
        System.out.println("Original Array (Bubble Sort):");
        printArray(arr1);

        bubbleSort(arr1);
        System.out.println("Sorted (Bubble Sort):");
        printArray(arr1);

        // --- Quick Sort Demo ---
        System.out.println("\nOriginal Array (Quick Sort):");
        printArray(arr2);

        quickSort(arr2, 0, arr2.length - 1);
        System.out.println("Sorted (Quick Sort):");
        printArray(arr2);
    }
}


`,
        11: `
// --- Searching Algorithms in Java ---
// Demonstrates Linear Search and Binary Search

public class SearchExample {

    // --- Linear Search ---
    // O(n) time complexity — checks each element one by one
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Return index if target is found
            }
        }
        return -1;  // Target not found
    }

    // --- Binary Search ---
    // O(log n) time complexity — only works on sorted arrays
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;  // Target found
            } else if (arr[mid] < target) {
                left = mid + 1;  // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }

        return -1;  // Target not found
    }

    // --- Print Result Helper Method ---
    public static void printSearchResult(int resultIndex, String method) {
        if (resultIndex != -1) {
            System.out.println(method + ": Target found at index " + resultIndex);
        } else {
            System.out.println(method + ": Target not found.");
        }
    }

    // --- Main Method ---
    public static void main(String[] args) {

        int[] unsorted = {8, 3, 1, 9, 5};
        int[] sorted = {1, 3, 5, 7, 9};

        int target = 5;

        // --- Linear Search Test (works on unsorted) ---
        int result1 = linearSearch(unsorted, target);
        printSearchResult(result1, "Linear Search");

        // --- Binary Search Test (only on sorted arrays) ---
        int result2 = binarySearch(sorted, target);
        printSearchResult(result2, "Binary Search");
    }
}


                `,


        12: `// --- Fibonacci Examples ---
// Demonstrates recursion, memoization, and dynamic programming (tabulation)

public class DynamicProgramming {

    // --- 1. Recursive Approach ---
    // Exponential time complexity: O(2^n)
    public int fibRecursive(int n) {
        if (n <= 1) {
            return n;  // Base case
        }
        // Recursive calls
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }

    // --- 2. Memoization Approach (Top-Down DP) ---
    // Time complexity: O(n), stores results in an array
    public int fibMemo(int n, int[] memo) {
        if (n <= 1) {
            return n;
        }

        // Return already computed value
        if (memo[n] != 0) {
            return memo[n];
        }

        // Compute and store in memo
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        return memo[n];
    }

    // --- 3. Tabulation Approach (Bottom-Up DP) ---
    // Iterative version, avoids recursion
    public int fibDP(int n) {
        if (n <= 1) {
            return n;
        }

        int[] dp = new int[n + 1];  // Create table
        dp[0] = 0;
        dp[1] = 1;

        // Build up from base cases
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];  // Final result
    }

    // --- Main Method for Testing ---
    public static void main(String[] args) {
        DynamicProgramming dp = new DynamicProgramming();
        int n = 10;

        // --- Recursive Version ---
        System.out.println("Fibonacci (Recursive): " + dp.fibRecursive(n));

        // --- Memoization Version ---
        int[] memo = new int[n + 1];
        System.out.println("Fibonacci (Memoization): " + dp.fibMemo(n, memo));

        // --- Tabulation Version ---
        System.out.println("Fibonacci (Tabulation): " + dp.fibDP(n));
    }
}
`,

    };

    console.log("💡 All example keys:", Object.keys(examples));

    return examples[moduleId] || "⚠️ No example available for this module.";

}

//✅ Dark Mode Toggle Script

const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});



const settingsToggle = document.getElementById("settingsToggle");
const themeCustomizer = document.getElementById("themeCustomizer");

settingsToggle.addEventListener("click", () => {
    const isVisible = themeCustomizer.style.display === "block";
    themeCustomizer.style.display = isVisible ? "none" : "block";
});

function applyThemeColors() {
    document.documentElement.style.setProperty('--light-bg', document.getElementById('lightBG').value);
    document.documentElement.style.setProperty('--light-card', document.getElementById('lightCard').value);
    document.documentElement.style.setProperty('--dark-bg', document.getElementById('darkBG').value);
    document.documentElement.style.setProperty('--dark-card', document.getElementById('darkCard').value);
}

function closeModal() {
    document.getElementById('moduleModal').style.display = 'none';
}

function markAsCompleted(moduleId) {
    if (completedModules.has(moduleId)) {
        completedModules.delete(moduleId);
    } else {
        completedModules.add(moduleId);
    }

    updateProgress();
    renderModules();
    closeModal();
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = (completedModules.size / modules.length) * 100;
    progressFill.style.width = progress + '%';
}

function showDefinition(event, keyword) {
    const popup = document.getElementById('definitionPopup');
    const definition = keywordDefinitions[keyword] || 'Definition not available';

    popup.innerHTML = `<strong>${keyword}:</strong> ${definition}`;
    popup.style.display = 'block';
    popup.style.left = event.pageX + 10 + 'px';
    popup.style.top = event.pageY - 30 + 'px';
}

function hideDefinition() {
    document.getElementById('definitionPopup').style.display = 'none';
}

// Event listeners with mobile optimizations
document.getElementById('searchBox').addEventListener('input', function () {
    // Debounce search on mobile for better performance
    if (isMobile()) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(renderModules, 300);
    } else {
        renderModules();
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderModules();
    });
});

// Enhanced modal handling for mobile
document.getElementById('moduleModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Prevent modal content clicks from closing modal
document.addEventListener('DOMContentLoaded', function () {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', function () {
    setTimeout(function () {
        if (document.getElementById('moduleModal').style.display === 'block') {
            // Recalculate modal position after orientation change
            const modal = document.getElementById('moduleModal');
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = 'calc(100vh - 40px)';
            }
        }
    }, 100);
});

// Handle window resize
window.addEventListener('resize', function () {
    // Re-render modules if switching between mobile and desktop
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function () {
        renderModules();
    }, 250);
});


// Code toggle button logic
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("toggle-code-btn")) {
        const codeBlock = e.target.nextElementSibling;
        const isHidden = codeBlock.style.display === "none";
        codeBlock.style.display = isHidden ? "block" : "none";
        e.target.textContent = isHidden ? "Hide Code" : "Show Code";
    }
});


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("fullscreen-toggle")) {
        const wrapper = e.target.closest(".code-example-wrapper");
        if (!wrapper) return;

        wrapper.classList.add("fullscreen-code");

        const exitBtn = document.createElement("div");
        exitBtn.className = "exit-fullscreen";
        exitBtn.textContent = "⏎ Exit Fullscreen";
        wrapper.appendChild(exitBtn);

        document.body.classList.add("fullscreen-active");
        document.body.style.overflow = "hidden";
    }

    if (e.target.classList.contains("exit-fullscreen")) {
        const wrapper = e.target.closest(".code-example-wrapper");
        if (!wrapper) return;

        wrapper.classList.remove("fullscreen-code");
        e.target.remove();

        document.body.classList.remove("fullscreen-active");
        document.body.style.overflow = "";
    }
});


// Initialize with mobile-aware setup
document.addEventListener('DOMContentLoaded', function () {
    renderModules();
    updateProgress();

    // Add touch feedback after initial render
    setTimeout(addTouchFeedback, 100);
});

// Initialize
renderModules();
updateProgress();