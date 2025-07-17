import React, { useState, useCallback, useMemo } from 'react';

const JavaDSALearningHub = () => {
  // =================================
  // STATE MANAGEMENT
  // =================================
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [glossarySearch, setGlossarySearch] = useState('');
  
  // Code display settings
  const [showComments, setShowComments] = useState(true);
  const [expandedCode, setExpandedCode] = useState(new Set());
  const [moduleComments, setModuleComments] = useState(new Map());
  const [moduleLanguages, setModuleLanguages] = useState(new Map());
  const [moduleModes, setModuleModes] = useState(new Map());

  // =================================
  // CONSTANTS
  // =================================
  const CONSTANTS = {
    CODE_PREVIEW_LINES: 15,
    TRUNCATE_INDICATOR: '\n\n// ... (click Expand to see full code)'
  };

  const SUPPORTED_LANGUAGES = {
    java: { name: 'Java', icon: '☕' },
    python: { name: 'Python', icon: '🐍' },
    cpp: { name: 'C++', icon: '⚡' },
    javascript: { name: 'JavaScript', icon: '🟨' }
  };

  const CODE_MODES = {
    code: { name: 'Code', icon: '💻' },
    pseudocode: { name: 'Pseudocode', icon: '📝' }
  };

  const DIFFICULTY_COLORS = {
    beginner: 'bg-green-500 text-white',
    intermediate: 'bg-yellow-500 text-white', 
    advanced: 'bg-red-500 text-white',
    default: 'bg-gray-500 text-white'
  };

  // =================================
  // FLASHCARDS DATA
  // =================================
  const flashcards = [
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by index?",
      answer: "O(1) - Constant time\n\nArrays provide direct access to elements using their index. Since memory addresses are calculated using: base_address + (index × element_size), this operation takes the same amount of time regardless of array size."
    },
    {
      id: 2,
      question: "What is the difference between Array and ArrayList in Java?",
      answer: "Array: Fixed size, can store primitives and objects, faster access\nArrayList: Dynamic size, only stores objects (autoboxes primitives), part of Collections framework\n\nArray: int[] arr = new int[5];\nArrayList: ArrayList<Integer> list = new ArrayList<>();"
    },
    {
      id: 3,
      question: "Explain the Two Pointer technique with an example.",
      answer: "Two Pointer technique uses two pointers (usually left and right) to traverse data from both ends toward the center.\n\nExample - Checking palindrome:\nleft = 0, right = str.length - 1\nCompare characters at both positions\nMove pointers inward until they meet\n\nTime: O(n), Space: O(1)"
    },
    {
      id: 4,
      question: "What is a LinkedList and when would you use it over an Array?",
      answer: "LinkedList: Dynamic data structure where elements (nodes) contain data and pointer to next node.\n\nUse LinkedList when:\n• Frequent insertions/deletions at beginning\n• Unknown size that changes often\n• No need for random access\n\nUse Array when:\n• Need random access by index\n• Memory usage is a concern\n• Cache performance matters"
    },
    {
      id: 5,
      question: "How does Floyd's Cycle Detection Algorithm work?",
      answer: "Floyd's Algorithm (Tortoise and Hare):\n• Two pointers: slow (moves 1 step) and fast (moves 2 steps)\n• If there's a cycle, fast will eventually meet slow\n• If no cycle, fast reaches null\n\nWhy it works: In a cycle, the fast pointer gains 1 position on slow pointer each iteration, so they must eventually meet."
    },
    {
      id: 6,
      question: "What is the difference between Stack and Queue?",
      answer: "Stack (LIFO - Last In, First Out):\n• push() - add to top\n• pop() - remove from top\n• Used in: function calls, undo operations, expression evaluation\n\nQueue (FIFO - First In, First Out):\n• enqueue() - add to rear\n• dequeue() - remove from front\n• Used in: BFS, scheduling, buffering"
    },
    {
      id: 7,
      question: "Explain Big O notation with examples.",
      answer: "Big O describes upper bound of time/space complexity:\n\nO(1) - Constant: array[index]\nO(log n) - Logarithmic: binary search\nO(n) - Linear: array traversal\nO(n log n) - Linearithmic: merge sort\nO(n²) - Quadratic: nested loops\nO(2ⁿ) - Exponential: recursive fibonacci\n\nFocus on worst-case, drop constants and lower terms."
    },
    {
      id: 8,
      question: "What is a Binary Search Tree (BST) and its properties?",
      answer: "BST Properties:\n• Left subtree values < root value\n• Right subtree values > root value\n• Both subtrees are also BSTs\n• No duplicate values (typically)\n\nOperations (average case):\n• Search: O(log n)\n• Insert: O(log n)\n• Delete: O(log n)\n\nWorst case (unbalanced): O(n)"
    }
  ];

  // =================================
  // GLOSSARY DATA  
  // =================================
  const glossaryTerms = [
    {
      term: "Algorithm",
      definition: "A step-by-step procedure or formula for solving a problem. Must be finite, definite, and effective.",
      category: "General"
    },
    {
      term: "Array",
      definition: "A data structure consisting of elements stored in contiguous memory locations, accessible by index.",
      category: "Data Structures"
    },
    {
      term: "Big O Notation",
      definition: "Mathematical notation describing the upper bound of algorithm complexity in terms of time or space.",
      category: "Complexity"
    },
    {
      term: "Binary Search",
      definition: "Efficient search algorithm for sorted arrays with O(log n) time complexity by repeatedly dividing search space in half.",
      category: "Algorithms"
    },
    {
      term: "Binary Tree",
      definition: "Hierarchical data structure where each node has at most two children (left and right).",
      category: "Data Structures"
    },
    {
      term: "Breadth-First Search (BFS)",
      definition: "Graph traversal algorithm that explores vertices level by level using a queue.",
      category: "Algorithms"
    },
    {
      term: "Depth-First Search (DFS)",
      definition: "Graph traversal algorithm that explores as far as possible along each branch using a stack or recursion.",
      category: "Algorithms"
    },
    {
      term: "Dynamic Programming",
      definition: "Problem-solving technique that breaks complex problems into simpler subproblems and stores results to avoid redundant calculations.",
      category: "Techniques"
    },
    {
      term: "Graph",
      definition: "Non-linear data structure consisting of vertices (nodes) connected by edges.",
      category: "Data Structures"
    },
    {
      term: "Hash Table",
      definition: "Data structure that implements associative array using hash function to compute index for key-value pairs.",
      category: "Data Structures"
    },
    {
      term: "Heap",
      definition: "Complete binary tree where parent nodes are ordered with respect to children (min-heap or max-heap).",
      category: "Data Structures"
    },
    {
      term: "Linked List",
      definition: "Linear data structure where elements are stored in nodes, each containing data and pointer to next node.",
      category: "Data Structures"
    },
    {
      term: "Queue",
      definition: "FIFO (First In, First Out) data structure with enqueue and dequeue operations.",
      category: "Data Structures"
    },
    {
      term: "Recursion",
      definition: "Programming technique where function calls itself with smaller input until reaching base case.",
      category: "Techniques"
    },
    {
      term: "Stack",
      definition: "LIFO (Last In, First Out) data structure with push and pop operations.",
      category: "Data Structures"
    },
    {
      term: "Time Complexity",
      definition: "Measure of execution time of algorithm as function of input size.",
      category: "Complexity"
    },
    {
      term: "Space Complexity",
      definition: "Measure of memory space required by algorithm as function of input size.",
      category: "Complexity"
    },
    {
      term: "Tree Traversal",
      definition: "Process of visiting each node in tree exactly once (inorder, preorder, postorder).",
      category: "Algorithms"
    },
    {
      term: "Two Pointers",
      definition: "Technique using two pointers to traverse data structure, often from opposite ends.",
      category: "Techniques"
    },
    {
      term: "Greedy Algorithm",
      definition: "Problem-solving approach that makes locally optimal choice at each step.",
      category: "Techniques"
    }
  ];

  // =================================
  // QUIZ DATA
  // =================================
  const quizData = {
    'arrays-strings': {
      parts: [{
        questions: [
          {
            id: 1,
            question: "What is the time complexity of accessing an element in an array by its index?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correct: 0,
            explanation: "Array access by index is O(1) because memory address is calculated as: base_address + (index × element_size)"
          },
          {
            id: 2,
            question: "Which technique is most efficient for checking if a string is a palindrome?",
            options: ["Reverse and compare", "Two pointers", "Recursion", "Stack-based approach"],
            correct: 1,
            explanation: "Two pointers technique is most efficient with O(n) time and O(1) space complexity"
          },
          {
            id: 3,
            question: "What is the space complexity of the two-pointer palindrome check?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
            correct: 2,
            explanation: "Two pointers use only a constant amount of extra space regardless of input size"
          }
        ]
      }]
    },
    'linked-lists': {
      parts: [{
        questions: [
          {
            id: 1,
            question: "What is the main advantage of linked lists over arrays?",
            options: ["Faster access", "Better cache performance", "Dynamic size", "Less memory usage"],
            correct: 2,
            explanation: "Linked lists can grow or shrink during runtime, unlike fixed-size arrays"
          },
          {
            id: 2,
            question: "In Floyd's cycle detection, why does the fast pointer eventually meet the slow pointer in a cycle?",
            options: ["They start at the same position", "Fast pointer moves twice as fast", "Fast pointer gains 1 position each iteration", "Cycle length is always even"],
            correct: 2,
            explanation: "Fast pointer gains exactly 1 position on slow pointer each iteration, so they must eventually meet"
          },
          {
            id: 3,
            question: "What is the time complexity of inserting at the beginning of a linked list?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correct: 0,
            explanation: "Insertion at the beginning requires only updating a few pointers, regardless of list size"
          }
        ]
      }]
    }
  };

  // =================================
  // DATA - EXPANDED WITH BLANK MODULES
  // =================================
  const modules = [
    {
      id: 'arrays-strings',
      title: 'Arrays and Strings',
      description: 'Master fundamental array operations, string manipulation, and essential algorithms for both data structures.',
      difficulty: 'beginner',
      topics: ['Array Traversal', 'String Methods', 'Two Pointers', 'Sliding Window', 'Array Sorting'],
      codeExamples: {
        java: `// Array and String fundamentals
public class ArraysAndStrings {
    
    // Find maximum element in array
    public static int findMax(int[] arr) {
        if (arr.length == 0) return Integer.MIN_VALUE;
        
        int max = arr[0]; // Initialize with first element
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    public static String reverseString(String str) {
        char[] chars = str.toCharArray();
        int left = 0, right = chars.length - 1;
        
        while (left < right) {
            // Swap characters
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return new String(chars);
    }
    
    // Check if string is palindrome
    public static boolean isPalindrome(String str) {
        str = str.toLowerCase().replaceAll("[^a-z0-9]", "");
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
}`,
        python: `# Array and String fundamentals in Python
def find_max(arr):
    """Find maximum element in array"""
    if not arr:
        return float('-inf')
    
    max_val = arr[0]  # Initialize with first element
    for num in arr[1:]:
        if num > max_val:
            max_val = num  # Update maximum
    return max_val

def reverse_string(s):
    """Reverse a string using slicing"""
    return s[::-1]  # Python's elegant slicing

def is_palindrome(s):
    """Check if string is palindrome"""
    # Clean string: lowercase and alphanumeric only
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]  # Compare with reverse`
      },
      explanation: 'Arrays and strings form the foundation of programming. Arrays provide indexed access to elements, while strings are sequences of characters. Key concepts include traversal patterns, the two-pointer technique for efficient processing, and understanding how memory layout affects performance. These data structures appear in countless real-world applications.',
      resources: ['Array Manipulation Guide', 'String Processing Techniques', 'Two Pointer Method']
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Understand linked list structures, traversal, insertion, deletion, and advanced techniques like cycle detection.',
      difficulty: 'intermediate',
      topics: ['Singly Linked Lists', 'Doubly Linked Lists', 'Cycle Detection', 'List Reversal', 'Merge Operations'],
      codeExamples: {
        java: `// Linked List implementation and operations
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class LinkedListOperations {
    
    // Reverse a linked list iteratively
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next; // Store next node
            current.next = prev;              // Reverse link
            prev = current;                   // Move prev forward
            current = nextTemp;               // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head;      // Tortoise: moves 1 step
        ListNode fast = head.next; // Hare: moves 2 steps
        
        while (fast != null && fast.next != null) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // Dummy node for easy handling
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = (l1 != null) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
}`
      },
      explanation: 'Linked lists provide dynamic memory allocation and efficient insertion/deletion at any position. Unlike arrays, they don\'t require contiguous memory but sacrifice random access. Understanding pointer manipulation and edge cases (null checks, single nodes) is crucial for mastering linked list algorithms.',
      resources: ['Linked List Visualization', 'Floyd\'s Cycle Detection', 'Pointer Manipulation Guide']
    },
    // BLANK TEMPLATE MODULES (15+)
    {
      id: 'stacks-queues',
      title: 'Stacks and Queues',
      description: 'Learn LIFO and FIFO data structures, their implementations, and common applications in problem solving.',
      difficulty: 'beginner',
      topics: ['Stack Operations', 'Queue Operations', 'Deque', 'Priority Queue', 'Applications'],
      codeExample: `// Stacks and Queues - READY FOR YOUR EXPANSION
// Stack implementation coming soon...
class Stack {
    // TODO: Add your implementation here
}

// Queue implementation coming soon...
class Queue {
    // TODO: Add your implementation here
}`,
      explanation: 'Stack and queue concepts will be expanded...',
      resources: ['Stack Applications', 'Queue Implementations']
    },
    {
      id: 'trees-basics',
      title: 'Binary Trees',
      description: 'Explore tree structures, traversals, and fundamental tree operations.',
      difficulty: 'intermediate',
      topics: ['Tree Traversal', 'Binary Search Trees', 'Tree Height', 'Path Problems', 'Tree Construction'],
      codeExample: `// Binary Trees - READY FOR YOUR EXPANSION
class TreeNode {
    int val;
    TreeNode left, right;
    
    // TODO: Add tree operations here
}`,
      explanation: 'Binary tree concepts will be expanded...',
      resources: ['Tree Traversals', 'BST Operations']
    },
    {
      id: 'hash-tables',
      title: 'Hash Tables and Maps',
      description: 'Master hash-based data structures for efficient lookups and data organization.',
      difficulty: 'intermediate',
      topics: ['Hash Functions', 'Collision Resolution', 'HashMap Operations', 'Hash Sets', 'Load Factor'],
      codeExample: `// Hash Tables - READY FOR YOUR EXPANSION
// HashMap operations coming soon...
class HashTable {
    // TODO: Add your implementation here
}`,
      explanation: 'Hash table concepts will be expanded...',
      resources: ['Hash Function Design', 'Collision Handling']
    },
    {
      id: 'heaps',
      title: 'Heaps and Priority Queues',
      description: 'Understand heap properties, heap operations, and priority queue applications.',
      difficulty: 'intermediate',
      topics: ['Min Heap', 'Max Heap', 'Heap Operations', 'Heapify', 'Priority Queues'],
      codeExample: `// Heaps - READY FOR YOUR EXPANSION
class MinHeap {
    // TODO: Add heap implementation here
}`,
      explanation: 'Heap concepts will be expanded...',
      resources: ['Heap Properties', 'Priority Queue Applications']
    },
    {
      id: 'sorting-algorithms',
      title: 'Sorting Algorithms',
      description: 'Compare and implement various sorting techniques with complexity analysis.',
      difficulty: 'intermediate',
      topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'],
      codeExample: `// Sorting Algorithms - READY FOR YOUR EXPANSION
public class SortingAlgorithms {
    // TODO: Add sorting implementations here
}`,
      explanation: 'Sorting algorithm concepts will be expanded...',
      resources: ['Sorting Comparisons', 'Algorithm Complexity']
    },
    {
      id: 'searching-algorithms',
      title: 'Searching Algorithms',
      description: 'Learn efficient search techniques for different data structures.',
      difficulty: 'beginner',
      topics: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Exponential Search'],
      codeExample: `// Searching Algorithms - READY FOR YOUR EXPANSION
public class SearchingAlgorithms {
    // TODO: Add search implementations here
}`,
      explanation: 'Searching algorithm concepts will be expanded...',
      resources: ['Binary Search Guide', 'Search Optimization']
    },
    {
      id: 'recursion',
      title: 'Recursion and Backtracking',
      description: 'Master recursive thinking and backtracking problem-solving techniques.',
      difficulty: 'intermediate',
      topics: ['Recursive Functions', 'Base Cases', 'Backtracking', 'Memoization', 'Tree Recursion'],
      codeExample: `// Recursion - READY FOR YOUR EXPANSION
public class RecursionExamples {
    // TODO: Add recursion examples here
}`,
      explanation: 'Recursion concepts will be expanded...',
      resources: ['Recursion Patterns', 'Backtracking Guide']
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      description: 'Solve optimization problems using dynamic programming principles.',
      difficulty: 'advanced',
      topics: ['Memoization', 'Tabulation', 'Optimal Substructure', 'Overlapping Subproblems'],
      codeExample: `// Dynamic Programming - READY FOR YOUR EXPANSION
public class DynamicProgramming {
    // TODO: Add DP solutions here
}`,
      explanation: 'Dynamic programming concepts will be expanded...',
      resources: ['DP Patterns', 'Optimization Techniques']
    },
    {
      id: 'greedy-algorithms',
      title: 'Greedy Algorithms',
      description: 'Learn greedy strategy for optimization problems.',
      difficulty: 'intermediate',
      topics: ['Greedy Choice', 'Activity Selection', 'Huffman Coding', 'Minimum Spanning Tree'],
      codeExample: `// Greedy Algorithms - READY FOR YOUR EXPANSION
public class GreedyAlgorithms {
    // TODO: Add greedy solutions here
}`,
      explanation: 'Greedy algorithm concepts will be expanded...',
      resources: ['Greedy Strategy', 'Optimization Problems']
    },
    {
      id: 'graph-algorithms',
      title: 'Graph Algorithms',
      description: 'Explore graph representations and fundamental graph algorithms.',
      difficulty: 'advanced',
      topics: ['Graph Representation', 'DFS', 'BFS', 'Shortest Path', 'Minimum Spanning Tree'],
      codeExample: `// Graph Algorithms - READY FOR YOUR EXPANSION
class Graph {
    // TODO: Add graph implementation here
}`,
      explanation: 'Graph concepts will be expanded...',
      resources: ['Graph Algorithms', 'DFS and BFS']
    },
    {
      id: 'algorithm-analysis',
      title: 'Algorithm Analysis and Big O',
      description: 'Time and space complexity analysis, Big O notation, and algorithm optimization.',
      difficulty: 'advanced',
      topics: ['Big O Notation', 'Time Complexity', 'Space Complexity', 'Best/Worst Case', 'Algorithm Optimization'],
      codeExample: `// Algorithm Analysis - READY FOR YOUR EXPANSION
// O(1) - Constant time
public int getFirst(int[] arr) {
    return arr[0];
}

// O(n) - Linear time  
public int sum(int[] arr) {
    int total = 0;
    for (int num : arr) total += num;
    return total;
}`,
      explanation: 'Algorithm analysis concepts will be expanded...',
      resources: ['Big O Guide', 'Complexity Analysis']
    },
    {
      id: 'tries',
      title: 'Tries (Prefix Trees)',
      description: 'Learn trie data structure for efficient string operations.',
      difficulty: 'intermediate',
      topics: ['Trie Construction', 'Insert/Search/Delete', 'Prefix Matching', 'Auto-complete'],
      codeExample: `// Tries - READY FOR YOUR EXPANSION
class TrieNode {
    // TODO: Add trie implementation here
}`,
      explanation: 'Trie concepts will be expanded...',
      resources: ['Trie Applications', 'String Processing']
    },
    {
      id: 'union-find',
      title: 'Union-Find (Disjoint Set)',
      description: 'Master union-find data structure for connectivity problems.',
      difficulty: 'intermediate',
      topics: ['Union by Rank', 'Path Compression', 'Connected Components', 'Cycle Detection'],
      codeExample: `// Union-Find - READY FOR YOUR EXPANSION
class UnionFind {
    // TODO: Add union-find implementation here
}`,
      explanation: 'Union-Find concepts will be expanded...',
      resources: ['Disjoint Set Operations', 'Path Compression']
    },
    {
      id: 'segment-trees',
      title: 'Segment Trees',
      description: 'Implement segment trees for efficient range queries and updates.',
      difficulty: 'advanced',
      topics: ['Range Queries', 'Lazy Propagation', 'Point Updates', 'Range Updates'],
      codeExample: `// Segment Trees - READY FOR YOUR EXPANSION
class SegmentTree {
    // TODO: Add segment tree implementation here
}`,
      explanation: 'Segment tree concepts will be expanded...',
      resources: ['Range Query Optimization', 'Lazy Propagation']
    },
    {
      id: 'binary-indexed-trees',
      title: 'Binary Indexed Trees (Fenwick Trees)',
      description: 'Learn BIT for efficient prefix sum queries and updates.',
      difficulty: 'advanced',
      topics: ['Prefix Sums', 'Range Sum Queries', 'Point Updates', 'Lower Bit Operation'],
      codeExample: `// Binary Indexed Trees - READY FOR YOUR EXPANSION
class BinaryIndexedTree {
    // TODO: Add BIT implementation here
}`,
      explanation: 'Binary Indexed Tree concepts will be expanded...',
      resources: ['Fenwick Tree Guide', 'Prefix Sum Optimization']
    },
    {
      id: 'advanced-trees',
      title: 'Advanced Tree Structures',
      description: 'Explore AVL trees, Red-Black trees, and other balanced tree structures.',
      difficulty: 'advanced',
      topics: ['AVL Trees', 'Red-Black Trees', 'B-Trees', 'Splay Trees', 'Tree Rotations'],
      codeExample: `// Advanced Trees - READY FOR YOUR EXPANSION
class AVLTree {
    // TODO: Add AVL tree implementation here
}`,
      explanation: 'Advanced tree concepts will be expanded...',
      resources: ['Self-Balancing Trees', 'Tree Rotation Techniques']
    },
    {
      id: 'string-algorithms',
      title: 'Advanced String Algorithms',
      description: 'Master advanced string processing techniques and pattern matching.',
      difficulty: 'advanced',
      topics: ['KMP Algorithm', 'Rabin-Karp', 'Boyer-Moore', 'Suffix Arrays', 'String Hashing'],
      codeExample: `// String Algorithms - READY FOR YOUR EXPANSION
public class StringAlgorithms {
    // TODO: Add string algorithm implementations here
}`,
      explanation: 'Advanced string algorithm concepts will be expanded...',
      resources: ['Pattern Matching', 'String Processing Optimization']
    },
    {
      id: 'computational-geometry',
      title: 'Computational Geometry',
      description: 'Solve geometric problems using algorithmic approaches.',
      difficulty: 'advanced',
      topics: ['Point Operations', 'Line Intersection', 'Convex Hull', 'Closest Pair', 'Area Calculation'],
      codeExample: `// Computational Geometry - READY FOR YOUR EXPANSION
public class GeometryAlgorithms {
    // TODO: Add geometry implementations here
}`,
      explanation: 'Computational geometry concepts will be expanded...',
      resources: ['Geometric Algorithms', 'Convex Hull Methods']
    },
    {
      id: 'number-theory',
      title: 'Number Theory Algorithms',
      description: 'Apply number theory concepts to algorithmic problem solving.',
      difficulty: 'intermediate',
      topics: ['Prime Numbers', 'GCD/LCM', 'Modular Arithmetic', 'Sieve of Eratosthenes', 'Fast Exponentiation'],
      codeExample: `// Number Theory - READY FOR YOUR EXPANSION
public class NumberTheory {
    // TODO: Add number theory implementations here
}`,
      explanation: 'Number theory concepts will be expanded...',
      resources: ['Prime Algorithms', 'Modular Arithmetic']
    },
    {
      id: 'bit-manipulation',
      title: 'Bit Manipulation',
      description: 'Master bitwise operations and bit manipulation techniques.',
      difficulty: 'intermediate',
      topics: ['Bitwise Operators', 'Bit Masks', 'Power of Two', 'XOR Properties', 'Bit Counting'],
      codeExample: `// Bit Manipulation - READY FOR YOUR EXPANSION
public class BitManipulation {
    // TODO: Add bit manipulation implementations here
}`,
      explanation: 'Bit manipulation concepts will be expanded...',
      resources: ['Bitwise Operations', 'Bit Tricks']
    }
  ];

  // =================================
  // HELPER FUNCTIONS
  // =================================

  // Code processing functions
  const removeComments = useCallback((code) => {
    return code
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*[\r\n]/gm, '')
      .trim();
  }, []);

  const convertToPseudocode = useCallback((javaCode, shouldKeepComments = true) => {
    let code = javaCode;
    
    if (!shouldKeepComments) {
      code = removeComments(code);
    }
    
    return code
      .replace(/public\s+class\s+(\w+)/g, 'DEFINE CLASS $1')
      .replace(/public\s+static\s+void\s+main.*?\{/g, 'BEGIN MAIN')
      .replace(/public\s+(\w+)\s+(\w+)\s*\(/g, 'FUNCTION $2 RETURNS $1 (')
      .replace(/private\s+(\w+)\s+(\w+)\s*\(/g, 'PRIVATE FUNCTION $2 RETURNS $1 (')
      .replace(/if\s*\(/g, 'IF (')
      .replace(/else\s+if\s*\(/g, 'ELSE IF (')
      .replace(/else/g, 'ELSE')
      .replace(/while\s*\(/g, 'WHILE (')
      .replace(/for\s*\(/g, 'FOR (')
      .replace(/return\s+/g, 'RETURN ')
      .replace(/System\.out\.println\s*\(/g, 'PRINT(')
      .replace(/int\s+(\w+)/g, 'INTEGER $1')
      .replace(/String\s+(\w+)/g, 'STRING $1')
      .replace(/boolean\s+(\w+)/g, 'BOOLEAN $1')
      .replace(/double\s+(\w+)/g, 'REAL $1')
      .replace(/;$/gm, '')
      .replace(/\{/g, '')
      .replace(/\}/g, 'END');
  }, [removeComments]);

  const truncateCode = useCallback((code, lines = CONSTANTS.CODE_PREVIEW_LINES) => {
    const codeLines = code.split('\n');
    if (codeLines.length <= lines) {
      return code;
    }
    return codeLines.slice(0, lines).join('\n') + CONSTANTS.TRUNCATE_INDICATOR;
  }, []);

  // Module state functions  
  const shouldShowComments = useCallback((moduleId) => {
    const individualSetting = moduleComments.get(moduleId);
    return individualSetting !== undefined ? individualSetting : showComments;
  }, [moduleComments, showComments]);

  const getModuleLanguage = useCallback((moduleId) => {
    return moduleLanguages.get(moduleId) || 'java';
  }, [moduleLanguages]);

  const getModuleMode = useCallback((moduleId) => {
    return moduleModes.get(moduleId) || 'code';
  }, [moduleModes]);

  const getCodeExample = useCallback((module) => {
    const language = getModuleLanguage(module.id);
    if (module.codeExamples && module.codeExamples[language]) {
      return module.codeExamples[language];
    }
    return module.codeExample || 'Code example coming soon...';
  }, [getModuleLanguage]);

  const processCode = useCallback((code, moduleId) => {
    const showCommentsForModule = shouldShowComments(moduleId);
    const mode = getModuleMode(moduleId);

    if (mode === 'pseudocode') {
      return convertToPseudocode(code, showCommentsForModule);
    } else if (!showCommentsForModule) {
      return removeComments(code);
    }
    return code;
  }, [shouldShowComments, getModuleMode, convertToPseudocode, removeComments]);

  const getDifficultyColor = useCallback((difficulty) => {
    return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
  }, []);

  // Toggle functions
  const toggleCodeExpansion = useCallback((moduleId) => {
    setExpandedCode(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  }, []);

  const toggleModuleComments = useCallback((moduleId) => {
    setModuleComments(prev => {
      const newMap = new Map(prev);
      const currentSetting = newMap.get(moduleId);
      newMap.set(moduleId, currentSetting === undefined ? !showComments : !currentSetting);
      return newMap;
    });
  }, [showComments]);

  const setModuleLanguage = useCallback((moduleId, language) => {
    setModuleLanguages(prev => new Map(prev).set(moduleId, language));
  }, []);

  const setModuleMode = useCallback((moduleId, mode) => {
    setModuleModes(prev => new Map(prev).set(moduleId, mode));
  }, []);

  const toggleCompletion = useCallback((moduleId) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  }, []);

  // =================================
  // FLASHCARD FUNCTIONS
  // =================================
  const nextFlashcard = useCallback(() => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(prev => prev + 1);
      setShowFlashcardAnswer(false);
    }
  }, [currentFlashcard, flashcards.length]);

  const prevFlashcard = useCallback(() => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(prev => prev - 1);
      setShowFlashcardAnswer(false);
    }
  }, [currentFlashcard]);

  const randomFlashcard = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentFlashcard(randomIndex);
    setShowFlashcardAnswer(false);
  }, [flashcards.length]);

  const toggleFlashcardAnswer = useCallback(() => {
    setShowFlashcardAnswer(prev => !prev);
  }, []);

  // =================================
  // QUIZ FUNCTIONS
  // =================================
  const openQuiz = useCallback((moduleId) => {
    const quiz = quizData[moduleId];
    if (quiz && quiz.parts[0].questions.length > 0) {
      setCurrentQuiz({
        moduleId,
        questions: quiz.parts[0].questions,
        currentQuestion: 0,
        answers: [],
        showResults: false,
        score: 0
      });
    }
  }, []);

  const closeQuiz = useCallback(() => {
    setCurrentQuiz(null);
  }, []);

  const answerQuestion = useCallback((answerIndex) => {
    if (!currentQuiz) return;
    
    const newAnswers = [...currentQuiz.answers];
    newAnswers[currentQuiz.currentQuestion] = answerIndex;
    
    setCurrentQuiz(prev => ({
      ...prev,
      answers: newAnswers
    }));
  }, [currentQuiz]);

  const nextQuestion = useCallback(() => {
    if (!currentQuiz) return;
    
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuiz(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Calculate score and show results
      const score = currentQuiz.answers.reduce((acc, answer, index) => {
        return acc + (answer === currentQuiz.questions[index].correct ? 1 : 0);
      }, 0);
      
      setCurrentQuiz(prev => ({
        ...prev,
        showResults: true,
        score
      }));
    }
  }, [currentQuiz]);

  const prevQuestion = useCallback(() => {
    if (!currentQuiz) return;
    
    if (currentQuiz.currentQuestion > 0) {
      setCurrentQuiz(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  }, [currentQuiz]);

  const restartQuiz = useCallback(() => {
    if (!currentQuiz) return;
    
    setCurrentQuiz(prev => ({
      ...prev,
      currentQuestion: 0,
      answers: [],
      showResults: false,
      score: 0
    }));
  }, [currentQuiz]);

  // Filter modules
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = searchTerm === '' || 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [modules, searchTerm, difficultyFilter]);

  // Filter glossary terms
  const filteredGlossaryTerms = useMemo(() => {
    return glossaryTerms.filter(term =>
      term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      term.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      term.category.toLowerCase().includes(glossarySearch.toLowerCase())
    );
  }, [glossarySearch]);

  // =================================
  // THEME OBJECT
  // =================================
  const theme = {
    bg: {
      primary: darkMode ? 'bg-slate-900' : 'bg-gray-50',
      secondary: darkMode ? 'bg-slate-800' : 'bg-white',
      accent: darkMode ? 'bg-slate-700' : 'bg-gray-100'
    },
    text: {
      primary: darkMode ? 'text-slate-100' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600',
      accent: darkMode ? 'text-indigo-400' : 'text-indigo-600'
    },
    border: darkMode ? 'border-slate-700' : 'border-slate-200'
  };

  // =================================
  // RENDER
  // =================================
  return (
    <div className={`min-h-screen transition-all duration-300 ${theme.bg.primary}`}>
      {/* Header */}
      <div className={`${theme.bg.secondary} border-b ${theme.border} sticky top-0 z-40 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className={`text-2xl sm:text-4xl font-bold ${theme.text.accent} leading-tight`}>
                ☕ Java DSA Learning Hub
              </h1>
              <p className={`${theme.text.secondary} text-sm sm:text-base mt-1 sm:mt-2`}>
                Master Data Structures & Algorithms with Interactive Learning
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
              >
                ⚙️ Settings
              </button>
              
              <button
                onClick={() => setShowGlossary(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
              >
                📚 Glossary
              </button>
              
              <button
                onClick={() => setShowFlashcards(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
              >
                🎯 Flashcards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Progress Overview */}
        <div className={`${theme.bg.secondary} rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl border ${theme.border}`}>
          <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme.text.accent}`}>📊 Learning Progress</h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm sm:text-base">
              <span className={`${theme.text.primary} font-medium`}>
                {completedModules.size} of {modules.length} modules completed
              </span>
              <div className={`w-full sm:w-64 h-2 sm:h-3 ${theme.bg.accent} rounded-full mt-2 overflow-hidden`}>
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${(completedModules.size / modules.length) * 100}%` }}
                />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${theme.text.accent}`}>
              {Math.round((completedModules.size / modules.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`${theme.bg.secondary} rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl border ${theme.border}`}>
          <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme.text.accent}`}>Find Your Learning Path</h3>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search modules by title, description, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-200 text-sm sm:text-base ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-indigo-400' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              />
            </div>
            <div className="w-full sm:w-auto">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className={`w-full sm:w-48 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-200 text-sm sm:text-base ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-indigo-400' 
                    : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          {filteredModules.length !== modules.length && (
            <div className={`mt-3 sm:mt-4 text-xs sm:text-sm ${theme.text.secondary}`}>
              Showing {filteredModules.length} of {modules.length} modules
            </div>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredModules.map((module) => {
            const isCompleted = completedModules.has(module.id);
            const isCodeExpanded = expandedCode.has(module.id);
            const currentLanguage = getModuleLanguage(module.id);
            const currentMode = getModuleMode(module.id);
            const hasMultipleLanguages = module.codeExamples && Object.keys(module.codeExamples).length > 1;

            const codeToDisplay = getCodeExample(module);
            const displayCode = isCodeExpanded ? codeToDisplay : truncateCode(codeToDisplay);
            const showExpandButton = codeToDisplay.split('\n').length > CONSTANTS.CODE_PREVIEW_LINES;

            const processedCode = processCode(displayCode, module.id);

            return (
              <div
                key={module.id}
                className={`${theme.bg.secondary} rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border ${theme.border} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <h3 className={`text-xl sm:text-2xl font-semibold ${theme.text.accent} leading-tight`}>
                    {module.title}
                  </h3>
                  <span className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto`}>
                    {module.difficulty}
                  </span>
                </div>

                <p className={`${theme.text.secondary} mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed`}>{module.description}</p>

                {/* Topics */}
                <div className="mb-4 sm:mb-6">
                  <h4 className={`font-semibold mb-2 sm:mb-3 ${theme.text.primary} text-sm sm:text-base`}>Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {module.topics.map((topic, index) => (
                      <span
                        key={index}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md sm:rounded-lg font-medium ${
                          darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div className={`${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-lg sm:rounded-xl border overflow-hidden mb-4 sm:mb-6`}>
                  {/* Code Header */}
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 ${darkMode ? 'border-b border-slate-700 bg-slate-800' : 'border-b border-slate-200 bg-slate-100'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>💻 Code Example</span>
                      {hasMultipleLanguages && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium">
                          {SUPPORTED_LANGUAGES[currentLanguage]?.icon} {SUPPORTED_LANGUAGES[currentLanguage]?.name}
                        </span>
                      )}
                      {currentMode === 'pseudocode' && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-medium">
                          📝 Pseudocode Mode
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
                      {/* Comments Toggle - FIXED */}
                      <button
                        onClick={() => toggleModuleComments(module.id)}
                        className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${
                          shouldShowComments(module.id)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                        title={shouldShowComments(module.id) ? 'Hide Comments' : 'Show Comments'}
                      >
                        <span className="hidden xs:inline">💬 Comments {shouldShowComments(module.id) ? 'ON' : 'OFF'}</span>
                        <span className="xs:hidden">💬 {shouldShowComments(module.id) ? 'ON' : 'OFF'}</span>
                      </button>

                      {/* Language Selector */}
                      {hasMultipleLanguages && (
                        <select
                          value={currentLanguage}
                          onChange={(e) => setModuleLanguage(module.id, e.target.value)}
                          className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium"
                          title="Select Programming Language"
                        >
                          {Object.entries(SUPPORTED_LANGUAGES).map(([langKey, langInfo]) =>
                            module.codeExamples && module.codeExamples[langKey] ? (
                              <option key={langKey} value={langKey} className="bg-white text-black">
                                {langInfo.icon} {langInfo.name}
                              </option>
                            ) : null
                          )}
                        </select>
                      )}

                      {/* Code Mode Selector */}
                      <select
                        value={currentMode}
                        onChange={(e) => setModuleMode(module.id, e.target.value)}
                        className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border-0 font-medium ${
                          currentMode === 'pseudocode' 
                            ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                        }`}
                        title="Select Code Display Mode"
                      >
                        {Object.entries(CODE_MODES).map(([modeKey, modeInfo]) => (
                          <option key={modeKey} value={modeKey} className="bg-white text-black">
                            {modeInfo.icon} {modeInfo.name}
                          </option>
                        ))}
                      </select>

                      {/* Expand Button - RESTORED TO BETTER VERSION */}
                      {showExpandButton && (
                        <button
                          onClick={() => toggleCodeExpansion(module.id)}
                          className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${
                            isCodeExpanded 
                              ? 'bg-slate-500 hover:bg-slate-600 text-white' 
                              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          }`}
                        >
                          <span className="hidden sm:inline">{isCodeExpanded ? '📄 Collapse Code' : '📖 Expand Code'}</span>
                          <span className="sm:hidden">{isCodeExpanded ? '📄' : '📖'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-3 sm:p-6 overflow-x-auto">
                    <pre className="text-xs sm:text-sm leading-relaxed">
                      <code className="whitespace-pre-wrap font-mono">
                        {processedCode}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Explanation */}
                <div className={`${darkMode ? 'bg-indigo-900/30 border-indigo-400/40' : 'bg-indigo-50 border-indigo-200'} border-l-4 border-l-indigo-500 p-4 sm:p-6 mb-4 sm:mb-6 rounded-r-lg sm:rounded-r-xl`}>
                  <div className={`whitespace-pre-line text-sm sm:text-base ${theme.text.primary}`}>{module.explanation}</div>
                </div>

                {/* Resources */}
                <div className="mb-4 sm:mb-6">
                  <h4 className={`font-semibold mb-2 sm:mb-3 ${theme.text.primary} text-sm sm:text-base`}>📚 Learning Resources:</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {module.resources.map((resource, index) => (
                      <div 
                        key={index}
                        className={`${theme.text.accent} hover:text-indigo-800 dark:hover:text-indigo-300 text-xs sm:text-sm transition-colors duration-200 cursor-pointer`}
                      >
                        • {resource}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => openQuiz(module.id)}
                    className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                      quizData[module.id] && quizData[module.id].parts[0].questions.length > 0
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:-translate-y-0.5'
                        : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'
                    }`}
                    disabled={!quizData[module.id] || quizData[module.id].parts[0].questions.length === 0}
                  >
                    {quizData[module.id] && quizData[module.id].parts[0].questions.length > 0 
                      ? '🧠 Take Quiz' 
                      : '🔒 Quiz Coming Soon'
                    }
                  </button>
                  
                  <button
                    onClick={() => toggleCompletion(module.id)}
                    className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-0.5'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:-translate-y-0.5'
                    }`}
                  >
                    {isCompleted ? '✅ Completed!' : '📝 Mark as Complete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSettings(false);
            }
          }}
        >
          <div 
            className={`rounded-2xl w-full max-w-md shadow-2xl ${theme.bg.secondary} border ${theme.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex justify-between items-center p-6 border-b ${theme.border}`}>
              <h3 className={`text-2xl font-semibold ${theme.text.accent}`}>Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className={`text-2xl transition-colors duration-200 ${theme.text.secondary} hover:${theme.text.primary}`}
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <label className={`font-medium ${theme.text.primary}`}>Dark Mode</label>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-14 h-7 rounded-full transition-colors duration-200 ${
                    darkMode ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                      darkMode ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className={`font-medium ${theme.text.primary}`}>Show Code Comments (Default)</label>
                  <p className={`text-xs mt-1 ${theme.text.secondary}`}>
                    Each module can override this setting
                  </p>
                </div>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`w-14 h-7 rounded-full transition-colors duration-200 ${
                    showComments ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                      showComments ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className={`p-6 border-t ${theme.border}`}>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-medium"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glossary Modal */}
      {showGlossary && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowGlossary(false);
            }
          }}
        >
          <div 
            className={`rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col ${theme.bg.secondary} border ${theme.border}`}
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex justify-between items-center p-6 border-b ${theme.border}`}>
              <h3 className={`text-3xl font-semibold ${theme.text.accent}`}>📚 Java DSA Glossary</h3>
              <button
                onClick={() => setShowGlossary(false)}
                className={`text-2xl transition-colors duration-200 hover:scale-110 ${theme.text.secondary} hover:${theme.text.primary}`}
              >
                ×
              </button>
            </div>

            <div className="p-6 pb-4">
              <input
                type="text"
                placeholder="Search glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-indigo-400' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGlossaryTerms.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      darkMode 
                        ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' 
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold text-lg ${theme.text.accent}`}>{item.term}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${theme.text.primary}`}>{item.definition}</p>
                  </div>
                ))}
              </div>
              
              {filteredGlossaryTerms.length === 0 && (
                <div className="text-center py-12">
                  <p className={`text-lg ${theme.text.secondary}`}>No terms found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Flashcards Modal */}
      {showFlashcards && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFlashcards(false);
            }
          }}
        >
          <div 
            className={`rounded-2xl w-full max-w-4xl shadow-2xl ${theme.bg.secondary} border ${theme.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex justify-between items-center p-6 border-b ${theme.border}`}>
              <h3 className={`text-3xl font-semibold ${theme.text.accent}`}>🎯 DSA Flashcards</h3>
              <button
                onClick={() => setShowFlashcards(false)}
                className={`text-2xl transition-colors duration-200 hover:scale-110 ${theme.text.secondary} hover:${theme.text.primary}`}
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  Card {currentFlashcard + 1} of {flashcards.length}
                </span>
              </div>

              <div 
                className={`rounded-2xl p-8 min-h-80 flex flex-col justify-center cursor-pointer transition-all duration-300 hover:shadow-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 hover:border-slate-500' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
                onClick={toggleFlashcardAnswer}
              >
                {!showFlashcardAnswer ? (
                  <div className="text-center">
                    <div className="mb-6">
                      <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">Question</span>
                    </div>
                    <p className="text-xl mb-6 leading-relaxed">{flashcards[currentFlashcard].question}</p>
                    <p className={`text-sm ${theme.text.secondary}`}>Click to reveal answer</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-6">
                      <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">Answer</span>
                    </div>
                    <div className="text-lg leading-relaxed whitespace-pre-line">{flashcards[currentFlashcard].answer}</div>
                    <p className={`text-sm mt-6 ${theme.text.secondary}`}>Click to hide answer</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={prevFlashcard}
                  disabled={currentFlashcard === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                    currentFlashcard === 0
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-500 hover:bg-slate-600 text-white hover:-translate-y-0.5'
                  }`}
                >
                  ← Previous
                </button>

                <div className="flex gap-3">
                  <button 
                    onClick={toggleFlashcardAnswer} 
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {showFlashcardAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </div>

                <button
                  onClick={nextFlashcard}
                  disabled={currentFlashcard === flashcards.length - 1}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                    currentFlashcard === flashcards.length - 1
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-500 hover:bg-slate-600 text-white hover:-translate-y-0.5'
                  }`}
                >
                  Next →
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={randomFlashcard}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  🔀 Random Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {currentQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className={`rounded-2xl w-full max-w-4xl shadow-2xl ${theme.bg.secondary} border ${theme.border} max-h-90vh overflow-y-auto`}
          >
            <div className={`flex justify-between items-center p-6 border-b ${theme.border}`}>
              <h3 className={`text-2xl font-semibold ${theme.text.accent}`}>
                🧠 Quiz: {modules.find(m => m.id === currentQuiz.moduleId)?.title}
              </h3>
              <button
                onClick={closeQuiz}
                className={`text-2xl transition-colors duration-200 hover:scale-110 ${theme.text.secondary} hover:${theme.text.primary}`}
              >
                ×
              </button>
            </div>

            <div className="p-8">
              {!currentQuiz.showResults ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-sm ${theme.text.secondary}`}>
                        Question {currentQuiz.currentQuestion + 1} of {currentQuiz.questions.length}
                      </span>
                      <div className={`h-2 bg-gray-200 rounded-full flex-1 ml-4 overflow-hidden`}>
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300"
                          style={{ 
                            width: `${((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    <h4 className={`text-xl font-semibold mb-6 ${theme.text.primary}`}>
                      {currentQuiz.questions[currentQuiz.currentQuestion].question}
                    </h4>
                  </div>

                  <div className="space-y-3 mb-8">
                    {currentQuiz.questions[currentQuiz.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => answerQuestion(index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          currentQuiz.answers[currentQuiz.currentQuestion] === index
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : `border-gray-200 dark:border-slate-600 hover:border-indigo-300 ${theme.bg.accent}`
                        }`}
                      >
                        <span className={`font-medium ${theme.text.primary}`}>
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuiz.currentQuestion === 0}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        currentQuiz.currentQuestion === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      Previous
                    </button>

                    <button
                      onClick={nextQuestion}
                      disabled={currentQuiz.answers[currentQuiz.currentQuestion] === undefined}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        currentQuiz.answers[currentQuiz.currentQuestion] === undefined
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                    >
                      {currentQuiz.currentQuestion === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <div className={`text-6xl mb-4`}>
                      {currentQuiz.score === currentQuiz.questions.length ? '🎉' : 
                       currentQuiz.score >= currentQuiz.questions.length * 0.7 ? '👏' : '📚'}
                    </div>
                    <h4 className={`text-3xl font-bold mb-2 ${theme.text.accent}`}>Quiz Complete!</h4>
                    <p className={`text-xl ${theme.text.primary}`}>
                      You scored {currentQuiz.score} out of {currentQuiz.questions.length}
                    </p>
                    <p className={`text-lg ${theme.text.secondary}`}>
                      ({Math.round((currentQuiz.score / currentQuiz.questions.length) * 100)}%)
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {currentQuiz.questions.map((question, index) => (
                      <div key={index} className={`text-left p-4 rounded-xl border ${
                        currentQuiz.answers[index] === question.correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">
                            {currentQuiz.answers[index] === question.correct ? '✅' : '❌'}
                          </span>
                          <div className="flex-1">
                            <p className={`font-medium mb-2 ${theme.text.primary}`}>{question.question}</p>
                            <p className={`text-sm ${theme.text.secondary}`}>
                              <strong>Your answer:</strong> {question.options[currentQuiz.answers[index]]}
                            </p>
                            {currentQuiz.answers[index] !== question.correct && (
                              <p className={`text-sm ${theme.text.secondary}`}>
                                <strong>Correct answer:</strong> {question.options[question.correct]}
                              </p>
                            )}
                            <p className={`text-sm mt-2 ${theme.text.primary}`}>
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={restartQuiz}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      🔄 Retake Quiz
                    </button>
                    <button
                      onClick={closeQuiz}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JavaDSALearningHub;