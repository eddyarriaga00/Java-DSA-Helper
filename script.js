// Java DSA Learning Hub - Main JavaScript File

// =================================
// GLOBAL STATE
// =================================
const appState = {
    darkMode: false,
    showComments: true,
    completedModules: new Set(),
    expandedCode: new Set(),
    moduleComments: new Map(),
    moduleLanguages: new Map(),
    moduleModes: new Map(),
    searchTerm: '',
    difficultyFilter: 'all',
    glossarySearch: '',
    currentFlashcard: 0,
    showFlashcardAnswer: false,
    currentQuiz: null,
    scrollY: 0
};

// =================================
// CONSTANTS
// =================================
const CONSTANTS = {
    CODE_PREVIEW_LINES: 15,
    TRUNCATE_INDICATOR: '\n\n// ... (click Expand to see full code)',
    TOTAL_MODULES: 20
};

const SUPPORTED_LANGUAGES = {
    java: { name: 'Java', icon: '☕' },
    cpp: { name: 'C++', icon: '⚡' },
    python: { name: 'Python', icon: '🐍' },
    javascript: { name: 'JavaScript', icon: '🟨' }
};

const CODE_MODES = {
    code: { name: 'Code', icon: '💻' },
    pseudocode: { name: 'Pseudocode', icon: '📝' }
};

const DIFFICULTY_COLORS = {
    beginner: 'bg-emerald-100 text-emerald-800',
    intermediate: 'bg-yellow-100 text-yellow-800', 
    advanced: 'bg-rose-100 text-rose-800',
    default: 'bg-slate-100 text-slate-800'
};

// =================================
// DATA
// =================================

// Flashcards Data
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

// Glossary Data  
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

// Quiz Data
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

// Modules Data (Complete with ALL LANGUAGES)
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
            cpp: `// Array and String fundamentals in C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>

class ArraysAndStrings {
public:
    // Find maximum element in array
    static int findMax(const std::vector<int>& arr) {
        if (arr.empty()) return INT_MIN;
        
        int max = arr[0]; // Initialize with first element
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static std::string reverseString(std::string str) {
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            // Swap characters
            std::swap(str[left], str[right]);
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return str;
    }
    
    // Check if string is palindrome
    static bool isPalindrome(std::string str) {
        // Convert to lowercase and keep only alphanumeric
        std::string cleaned = "";
        for (char c : str) {
            if (std::isalnum(c)) {
                cleaned += std::tolower(c);
            }
        }
        
        int left = 0, right = cleaned.length() - 1;
        while (left < right) {
            if (cleaned[left] != cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
};`,
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

def reverse_string_two_pointers(s):
    """Reverse using two pointers (more explicit)"""
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    while left < right:
        # Swap characters
        chars[left], chars[right] = chars[right], chars[left]
        left += 1   # Move pointers toward center
        right -= 1
    
    return ''.join(chars)

def is_palindrome(s):
    """Check if string is palindrome"""
    # Clean string: lowercase and alphanumeric only
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]  # Compare with reverse

def is_palindrome_two_pointers(s):
    """Check palindrome using two pointers"""
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(cleaned) - 1
    
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False  # Characters don't match
        left += 1
        right -= 1
    
    return True  # All characters matched`,
            javascript: `// Array and String fundamentals in JavaScript
class ArraysAndStrings {
    
    // Find maximum element in array
    static findMax(arr) {
        if (arr.length === 0) return -Infinity;
        
        let max = arr[0]; // Initialize with first element
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static reverseString(str) {
        const chars = str.split('');
        let left = 0, right = chars.length - 1;
        
        while (left < right) {
            // Swap characters
            [chars[left], chars[right]] = [chars[right], chars[left]];
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return chars.join('');
    }
    
    // Check if string is palindrome
    static isPalindrome(str) {
        // Clean string: lowercase and alphanumeric only
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        let left = 0, right = cleaned.length - 1;
        
        while (left < right) {
            if (cleaned[left] !== cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
}

// Alternative functional approach
const findMaxFunctional = arr => arr.length === 0 ? -Infinity : Math.max(...arr);
const reverseStringFunctional = str => str.split('').reverse().join('');
const isPalindromeFunctional = str => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
};`
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
}`,
            cpp: `// Linked List implementation and operations in C++
#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedListOperations {
public:
    // Reverse a linked list iteratively
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        
        while (current != nullptr) {
            ListNode* nextTemp = current->next; // Store next node
            current->next = prev;               // Reverse link
            prev = current;                     // Move prev forward
            current = nextTemp;                 // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    bool hasCycle(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return false;
        }
        
        ListNode* slow = head;       // Tortoise: moves 1 step
        ListNode* fast = head->next; // Hare: moves 2 steps
        
        while (fast != nullptr && fast->next != nullptr) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow->next;
            fast = fast->next->next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); // Dummy node for easy handling
        ListNode* current = &dummy;
        
        while (l1 != nullptr && l2 != nullptr) {
            if (l1->val <= l2->val) {
                current->next = l1;
                l1 = l1->next;
            } else {
                current->next = l2;
                l2 = l2->next;
            }
            current = current->next;
        }
        
        // Attach remaining nodes
        current->next = (l1 != nullptr) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
};`,
            python: `# Linked List implementation and operations in Python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedListOperations:
    
    def reverse_list(self, head):
        """Reverse a linked list iteratively"""
        prev = None
        current = head
        
        while current:
            next_temp = current.next  # Store next node
            current.next = prev       # Reverse link
            prev = current           # Move prev forward
            current = next_temp      # Move current forward
        
        return prev  # New head of reversed list
    
    def has_cycle(self, head):
        """Detect cycle using Floyd's algorithm (tortoise and hare)"""
        if not head or not head.next:
            return False
        
        slow = head       # Tortoise: moves 1 step
        fast = head.next  # Hare: moves 2 steps
        
        while fast and fast.next:
            if slow == fast:
                return True  # Cycle detected
            slow = slow.next
            fast = fast.next.next
        
        return False  # No cycle found
    
    def merge_two_lists(self, l1, l2):
        """Merge two sorted linked lists"""
        dummy = ListNode(0)  # Dummy node for easy handling
        current = dummy
        
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        # Attach remaining nodes
        current.next = l1 if l1 else l2
        
        return dummy.next  # Return actual head`,
            javascript: `// Linked List implementation and operations in JavaScript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedListOperations {
    
    // Reverse a linked list iteratively
    reverseList(head) {
        let prev = null;
        let current = head;
        
        while (current !== null) {
            const nextTemp = current.next; // Store next node
            current.next = prev;           // Reverse link
            prev = current;                // Move prev forward
            current = nextTemp;            // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    hasCycle(head) {
        if (!head || !head.next) {
            return false;
        }
        
        let slow = head;      // Tortoise: moves 1 step
        let fast = head.next; // Hare: moves 2 steps
        
        while (fast && fast.next) {
            if (slow === fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    mergeTwoLists(l1, l2) {
        const dummy = new ListNode(0); // Dummy node for easy handling
        let current = dummy;
        
        while (l1 && l2) {
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
        current.next = l1 || l2;
        
        return dummy.next; // Return actual head
    }
}`
        },
        explanation: 'Linked lists provide dynamic memory allocation and efficient insertion/deletion at any position. Unlike arrays, they don\'t require contiguous memory but sacrifice random access. Understanding pointer manipulation and edge cases (null checks, single nodes) is crucial for mastering linked list algorithms.',
        resources: ['Linked List Visualization', 'Floyd\'s Cycle Detection', 'Pointer Manipulation Guide']
    },
    // Additional modules (blank templates as in original)
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
// UTILITY FUNCTIONS
// =================================

// Local Storage Management
function saveToLocalStorage() {
    const stateToSave = {
        darkMode: appState.darkMode,
        showComments: appState.showComments,
        completedModules: Array.from(appState.completedModules),
        expandedCode: Array.from(appState.expandedCode),
        moduleComments: Array.from(appState.moduleComments.entries()),
        moduleLanguages: Array.from(appState.moduleLanguages.entries()),
        moduleModes: Array.from(appState.moduleModes.entries()),
        searchTerm: appState.searchTerm,
        difficultyFilter: appState.difficultyFilter,
        currentFlashcard: appState.currentFlashcard
    };
    localStorage.setItem('javaDSAHub', JSON.stringify(stateToSave));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('javaDSAHub');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            appState.darkMode = state.darkMode || false;
            appState.showComments = state.showComments !== undefined ? state.showComments : true;
            appState.completedModules = new Set(state.completedModules || []);
            appState.expandedCode = new Set(state.expandedCode || []);
            appState.moduleComments = new Map(state.moduleComments || []);
            appState.moduleLanguages = new Map(state.moduleLanguages || []);
            appState.moduleModes = new Map(state.moduleModes || []);
            appState.searchTerm = state.searchTerm || '';
            appState.difficultyFilter = state.difficultyFilter || 'all';
            appState.currentFlashcard = state.currentFlashcard || 0;
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

// Code Processing Functions
function removeComments(code, language = 'java') {
    let processedCode = code;
    switch (language) {
        case 'python':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*#\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/#.*$/, '').trimEnd();
            }).join('\n').replace(/"""[\s\S]*?"""/g, '').replace(/'''[\s\S]*?'''/g, '');
            break;
        case 'javascript':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
        default: // java, cpp
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
    }
    return processedCode.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
}

function convertToPseudocode(code, language = 'java', shouldKeepComments = true) {
    let processedCode = shouldKeepComments ? code : removeComments(code, language);

    switch (language) {
        case 'python':
            return processedCode
                .replace(/class\s+(\w+).*?:/g, 'DEFINE CLASS $1')
                .replace(/def\s+__init__\s*\(.*?\):/g, 'CONSTRUCTOR')
                .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'FUNCTION $1')
                .replace(/if\s+__name__\s*==\s*["']__main__["']:/g, 'BEGIN PROGRAM')
                .replace(/if\s+(.+?):/g, 'IF $1 THEN')
                .replace(/elif\s+(.+?):/g, 'ELSE IF $1 THEN')
                .replace(/else:/g, 'ELSE')
                .replace(/for\s+(\w+)\s+in\s+(.+?):/g, 'FOR EACH $1 in $2')
                .replace(/while\s+(.+?):/g, 'WHILE $1')
                .replace(/print\s*\(\s*([^)]+)\s*\)/g, 'PRINT $1')
                .replace(/return\s+(.+)/g, 'RETURN $1')
                .replace(/:/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        case 'javascript':
            return processedCode
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/constructor\s*\([^)]*\)\s*\{/g, 'CONSTRUCTOR')
                .replace(/function\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(?:let|const)\s+(\w+)\s+of\s+(\w+)\s*\)/g, 'FOR EACH $1 in $2')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/console\.log\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/let|const|var/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        default: // java, cpp
            return processedCode
                .replace(/public\s+class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/struct\s+(\w+)/g, 'DEFINE STRUCTURE $1')
                .replace(/public\s+static\s+void\s+main.*?\{/g, 'BEGIN PROGRAM')
                .replace(/public\s+(\w+)\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $2 RETURNS $1')
                .replace(/private\s+(\w+)\s+(\w+);/g, 'DECLARE private $1 variable $2')
                .replace(/(\w+)\s*=\s*new\s+(\w+)\s*\([^)]*\);/g, 'CREATE new $2 object and assign to $1')
                .replace(/for\s*\(\s*int\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(\w+)\s+(\w+)\s*:\s*(\w+)\s*\)/g, 'FOR EACH $2 in $3')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/System\.out\.println\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/std::cout\s*<<\s*([^;]+)\s*;/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/public|private|static/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
    }
}

function truncateCode(code, lines = CONSTANTS.CODE_PREVIEW_LINES) {
    const codeLines = code.split('\n');
    if (codeLines.length <= lines) {
        return code;
    }
    return codeLines.slice(0, lines).join('\n') + CONSTANTS.TRUNCATE_INDICATOR;
}

// Module Helper Functions
function shouldShowComments(moduleId) {
    const individualSetting = appState.moduleComments.get(moduleId);
    return individualSetting !== undefined ? individualSetting : appState.showComments;
}

function getModuleLanguage(moduleId) {
    return appState.moduleLanguages.get(moduleId) || 'java';
}

function getModuleMode(moduleId) {
    return appState.moduleModes.get(moduleId) || 'code';
}

function getCodeExample(module) {
    const language = getModuleLanguage(module.id);
    if (module.codeExamples && module.codeExamples[language]) {
        return module.codeExamples[language];
    }
    return module.codeExample || 'Code example coming soon...';
}

function processCode(code, moduleId) {
    const showCommentsForModule = shouldShowComments(moduleId);
    const language = getModuleLanguage(moduleId);
    const mode = getModuleMode(moduleId);

    if (mode === 'pseudocode') {
        return convertToPseudocode(code, language, showCommentsForModule);
    } else if (!showCommentsForModule) {
        return removeComments(code, language);
    }
    return code;
}

function getDifficultyColor(difficulty) {
    return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
}

// =================================
// UI UPDATE FUNCTIONS
// =================================

function updateProgress() {
    const progressPercentage = Math.round((appState.completedModules.size / CONSTANTS.TOTAL_MODULES) * 100);
    
    document.getElementById('progress-text').textContent = 
        `${appState.completedModules.size} of ${CONSTANTS.TOTAL_MODULES} modules completed`;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;
}

function updateDarkMode() {
    const body = document.body;
    const darkModeSlider = document.getElementById('dark-mode-slider');
    
    if (appState.darkMode) {
        body.classList.add('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-slate-300');
        document.getElementById('dark-mode-toggle').classList.add('bg-indigo-600');
        darkModeSlider.classList.remove('translate-x-0.5');
        darkModeSlider.classList.add('translate-x-7');
    } else {
        body.classList.remove('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-indigo-600');
        document.getElementById('dark-mode-toggle').classList.add('bg-slate-300');
        darkModeSlider.classList.remove('translate-x-7');
        darkModeSlider.classList.add('translate-x-0.5');
    }
}

function updateCommentsToggle() {
    const commentsSlider = document.getElementById('comments-slider');
    const commentsToggle = document.getElementById('comments-toggle');
    
    if (appState.showComments) {
        commentsToggle.classList.remove('bg-slate-300');
        commentsToggle.classList.add('bg-indigo-600');
        commentsSlider.classList.remove('translate-x-0.5');
        commentsSlider.classList.add('translate-x-7');
    } else {
        commentsToggle.classList.remove('bg-indigo-600');
        commentsToggle.classList.add('bg-slate-300');
        commentsSlider.classList.remove('translate-x-7');
        commentsSlider.classList.add('translate-x-0.5');
    }
}

function updateHeaderShrink() {
    const header = document.getElementById('main-header');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('main-subtitle');
    const buttons = document.getElementById('header-buttons');
    
    const progress = Math.min(appState.scrollY / 200, 1);
    const isScrolled = appState.scrollY > 10;
    const isFullyShrunken = appState.scrollY > 100;
    
    // Header padding - smaller values for optimization
    const paddingY = Math.max(12 - progress * 6, 6);
    header.style.paddingTop = `${paddingY}px`;
    header.style.paddingBottom = `${paddingY}px`;
    
    // Title size - optimized sizes
    if (isFullyShrunken) {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-lg sm:text-xl lg:text-2xl';
    } else {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-xl sm:text-2xl lg:text-3xl';
    }
    
    // Subtitle opacity
    const subtitleOpacity = Math.max(1 - progress * 1.5, 0);
    subtitle.style.opacity = subtitleOpacity;
    subtitle.style.transform = subtitleOpacity < 0.3 ? 'translateY(-10px)' : 'translateY(0)';
    
    // Buttons
    const buttonOpacity = Math.max(1 - progress * 1.2, 0);
    const buttonScale = Math.max(1 - progress * 0.3, 0.7);
    buttons.style.opacity = buttonOpacity;
    buttons.style.transform = `scale(${buttonScale})`;
    buttons.style.transformOrigin = 'top right';
    
    // Add/remove shadow
    if (isScrolled) {
        header.classList.add('shadow-2xl', 'backdrop-blur-sm');
    } else {
        header.classList.remove('shadow-2xl', 'backdrop-blur-sm');
    }
}

function filterModules() {
    return modules.filter(module => {
        const matchesSearch = appState.searchTerm === '' || 
            module.title.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
            module.description.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
            module.topics.some(topic => topic.toLowerCase().includes(appState.searchTerm.toLowerCase()));
        
        const matchesDifficulty = appState.difficultyFilter === 'all' || module.difficulty === appState.difficultyFilter;
        
        return matchesSearch && matchesDifficulty;
    });
}

function renderModules() {
    const filteredModules = filterModules();
    const grid = document.getElementById('modules-grid');
    const searchResultsCount = document.getElementById('search-results-count');
    
    // Update search results count
    if (filteredModules.length !== modules.length) {
        searchResultsCount.textContent = `Showing ${filteredModules.length} of ${modules.length} modules`;
        searchResultsCount.style.display = 'block';
    } else {
        searchResultsCount.style.display = 'none';
    }
    
    grid.innerHTML = filteredModules.map(module => {
        const isCompleted = appState.completedModules.has(module.id);
        const isCodeExpanded = appState.expandedCode.has(module.id);
        const currentLanguage = getModuleLanguage(module.id);
        const currentMode = getModuleMode(module.id);
        const hasMultipleLanguages = module.codeExamples && Object.keys(module.codeExamples).length > 1;
        
        const codeToDisplay = getCodeExample(module);
        const displayCode = isCodeExpanded ? codeToDisplay : truncateCode(codeToDisplay);
        const showExpandButton = codeToDisplay.split('\n').length > CONSTANTS.CODE_PREVIEW_LINES;
        
        const processedCode = processCode(displayCode, module.id);
        
        return `
            <div class="module-card bg-white border-slate-200 rounded-xl p-4 sm:p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <!-- Module Header -->
                <div class="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h3 class="text-lg sm:text-xl font-semibold text-indigo-600 leading-tight">
                        ${module.title}
                    </h3>
                    <span class="px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto difficulty-badge">
                        ${module.difficulty}
                    </span>
                </div>

                <p class="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">${module.description}</p>

                <!-- Topics -->
                <div class="mb-3 sm:mb-4">
                    <h4 class="font-semibold mb-2 text-slate-800 text-sm">Topics Covered:</h4>
                    <div class="flex flex-wrap gap-1 sm:gap-1.5">
                        ${module.topics.map(topic => `
                            <span class="px-2 py-0.5 sm:py-1 text-xs rounded-md font-medium bg-slate-100 text-slate-700">
                                ${topic}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Code Example -->
                <div class="bg-slate-50 border-slate-200 rounded-lg border overflow-hidden mb-3 sm:mb-4">
                    <!-- Code Header -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-100">
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs font-medium text-slate-600">💻 Code Example</span>
                            ${hasMultipleLanguages ? `
                                <span class="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                                    ${SUPPORTED_LANGUAGES[currentLanguage]?.icon} ${SUPPORTED_LANGUAGES[currentLanguage]?.name}
                                </span>
                            ` : ''}
                            ${currentMode === 'pseudocode' ? `
                                <span class="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                                    📝 Pseudocode
                                </span>
                            ` : ''}
                        </div>

                        <div class="flex flex-wrap gap-1 w-full sm:w-auto">
                            <!-- Comments Toggle -->
                            <button onclick="toggleModuleComments('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${shouldShowComments(module.id) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}" title="${shouldShowComments(module.id) ? 'Hide Comments' : 'Show Comments'}">
                                💬 ${shouldShowComments(module.id) ? 'ON' : 'OFF'}
                            </button>

                            <!-- Language Selector -->
                            ${hasMultipleLanguages ? `
                                <select onchange="setModuleLanguage('${module.id}', this.value)" class="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium" title="Select Programming Language">
                                    ${Object.entries(SUPPORTED_LANGUAGES).map(([langKey, langInfo]) =>
                                        module.codeExamples && module.codeExamples[langKey] ? `
                                            <option value="${langKey}" ${currentLanguage === langKey ? 'selected' : ''} class="bg-white text-black">
                                                ${langInfo.icon} ${langInfo.name}
                                            </option>
                                        ` : ''
                                    ).join('')}
                                </select>
                            ` : ''}

                            <!-- Code Mode Selector -->
                            <select onchange="setModuleMode('${module.id}', this.value)" class="text-xs px-2 py-1 rounded border-0 font-medium ${currentMode === 'pseudocode' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}" title="Select Code Display Mode">
                                ${Object.entries(CODE_MODES).map(([modeKey, modeInfo]) => `
                                    <option value="${modeKey}" ${currentMode === modeKey ? 'selected' : ''} class="bg-white text-black">
                                        ${modeInfo.icon} ${modeInfo.name}
                                    </option>
                                `).join('')}
                            </select>

                            <!-- Expand Button -->
                            ${showExpandButton ? `
                                <button onclick="toggleCodeExpansion('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${isCodeExpanded ? 'bg-slate-500 hover:bg-slate-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}">
                                    ${isCodeExpanded ? '📄 Collapse' : '📖 Expand'}
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Code Content -->
                    <div class="p-3 overflow-x-auto">
                        <pre class="text-xs leading-relaxed">
                            <code class="whitespace-pre-wrap font-mono">${processedCode}</code>
                        </pre>
                    </div>
                </div>

                <!-- Explanation -->
                <div class="bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500 p-3 sm:p-4 mb-3 sm:mb-4 rounded-r-lg">
                    <div class="whitespace-pre-line text-xs sm:text-sm text-slate-800">${module.explanation}</div>
                </div>

                <!-- Resources -->
                <div class="mb-3 sm:mb-4">
                    <h4 class="font-semibold mb-2 text-slate-800 text-sm">📚 Learning Resources:</h4>
                    <div class="space-y-1">
                        ${module.resources.map(resource => `
                            <div class="text-indigo-600 hover:text-indigo-800 text-xs transition-colors duration-200 cursor-pointer">
                                • ${resource}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Buttons -->
                <div class="space-y-2">
                    <button onclick="openQuiz('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${quizData[module.id] && quizData[module.id].parts[0].questions.length > 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'}" ${!quizData[module.id] || quizData[module.id].parts[0].questions.length === 0 ? 'disabled' : ''}>
                        ${quizData[module.id] && quizData[module.id].parts[0].questions.length > 0 ? '🧠 Take Quiz' : '🔒 Quiz Coming Soon'}
                    </button>
                    
                    <button onclick="toggleCompletion('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:-translate-y-0.5'}">
                        ${isCompleted ? '✅ Completed!' : '📝 Mark as Complete'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderGlossary() {
    const filteredTerms = glossaryTerms.filter(term =>
        term.term.toLowerCase().includes(appState.glossarySearch.toLowerCase()) ||
        term.definition.toLowerCase().includes(appState.glossarySearch.toLowerCase()) ||
        term.category.toLowerCase().includes(appState.glossarySearch.toLowerCase())
    );

    const content = document.getElementById('glossary-content');
    
    if (filteredTerms.length === 0) {
        content.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <p class="text-lg text-slate-600">No terms found matching your search.</p>
            </div>
        `;
        return;
    }

    content.innerHTML = filteredTerms.map(item => `
        <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg bg-slate-50 border-slate-200 hover:bg-white">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-lg text-indigo-600">${item.term}</h4>
                <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    ${item.category}
                </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-800">${item.definition}</p>
        </div>
    `).join('');
}

function renderFlashcard() {
    const card = flashcards[appState.currentFlashcard];
    const content = document.getElementById('flashcard-content');
    const counter = document.getElementById('flashcard-counter');
    const toggleButton = document.getElementById('toggle-flashcard-answer');
    const prevButton = document.getElementById('prev-flashcard');
    const nextButton = document.getElementById('next-flashcard');

    counter.textContent = `Card ${appState.currentFlashcard + 1} of ${flashcards.length}`;

    if (!appState.showFlashcardAnswer) {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <span class="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">Question</span>
                </div>
                <p class="text-xl mb-6 leading-relaxed">${card.question}</p>
                <p class="text-sm text-slate-500">Click to reveal answer</p>
            </div>
        `;
        toggleButton.textContent = 'Show Answer';
    } else {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <span class="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">Answer</span>
                </div>
                <div class="text-lg leading-relaxed whitespace-pre-line">${card.answer}</div>
                <p class="text-sm mt-6 text-slate-500">Click to hide answer</p>
            </div>
        `;
        toggleButton.textContent = 'Hide Answer';
    }

    // Update button states
    prevButton.disabled = appState.currentFlashcard === 0;
    nextButton.disabled = appState.currentFlashcard === flashcards.length - 1;

    if (prevButton.disabled) {
        prevButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.remove('hover:-translate-y-0.5');
    } else {
        prevButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.add('hover:-translate-y-0.5');
    }

    if (nextButton.disabled) {
        nextButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.remove('hover:-translate-y-0.5');
    } else {
        nextButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.add('hover:-translate-y-0.5');
    }
}

// =================================
// EVENT HANDLERS
// =================================

// Module Functions
function toggleCodeExpansion(moduleId) {
    if (appState.expandedCode.has(moduleId)) {
        appState.expandedCode.delete(moduleId);
    } else {
        appState.expandedCode.add(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

function toggleModuleComments(moduleId) {
    const currentSetting = appState.moduleComments.get(moduleId);
    appState.moduleComments.set(moduleId, currentSetting === undefined ? !appState.showComments : !currentSetting);
    renderModules();
    saveToLocalStorage();
}

function setModuleLanguage(moduleId, language) {
    appState.moduleLanguages.set(moduleId, language);
    renderModules();
    saveToLocalStorage();
}

function setModuleMode(moduleId, mode) {
    appState.moduleModes.set(moduleId, mode);
    renderModules();
    saveToLocalStorage();
}

function toggleCompletion(moduleId) {
    if (appState.completedModules.has(moduleId)) {
        appState.completedModules.delete(moduleId);
    } else {
        appState.completedModules.add(moduleId);
    }
    updateProgress();
    renderModules();
    saveToLocalStorage();
}

// Modal Functions
function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function openGlossary() {
    document.getElementById('glossary-modal').style.display = 'flex';
    renderGlossary();
}

function closeGlossary() {
    document.getElementById('glossary-modal').style.display = 'none';
}

function openFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'flex';
    renderFlashcard();
}

function closeFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'none';
}

// Flashcard Functions
function prevFlashcard() {
    if (appState.currentFlashcard > 0) {
        appState.currentFlashcard--;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function nextFlashcard() {
    if (appState.currentFlashcard < flashcards.length - 1) {
        appState.currentFlashcard++;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function randomFlashcard() {
    appState.currentFlashcard = Math.floor(Math.random() * flashcards.length);
    appState.showFlashcardAnswer = false;
    renderFlashcard();
    saveToLocalStorage();
}

function toggleFlashcardAnswer() {
    appState.showFlashcardAnswer = !appState.showFlashcardAnswer;
    renderFlashcard();
}

// Quiz Functions
function openQuiz(moduleId) {
    const quiz = quizData[moduleId];
    if (!quiz || !quiz.parts[0].questions.length) return;

    appState.currentQuiz = {
        moduleId,
        questions: quiz.parts[0].questions,
        currentQuestion: 0,
        answers: [],
        showResults: false,
        score: 0
    };

    document.getElementById('quiz-modal').style.display = 'flex';
    renderQuiz();
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    appState.currentQuiz = null;
}

function renderQuiz() {
    if (!appState.currentQuiz) return;

    const module = modules.find(m => m.id === appState.currentQuiz.moduleId);
    const title = document.getElementById('quiz-title');
    const content = document.getElementById('quiz-content');

    title.textContent = `🧠 Quiz: ${module?.title || 'Quiz'}`;

    if (!appState.currentQuiz.showResults) {
        content.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-slate-600">
                        Question ${appState.currentQuiz.currentQuestion + 1} of ${appState.currentQuiz.questions.length}
                    </span>
                    <div class="h-2 bg-gray-200 rounded-full flex-1 ml-4 overflow-hidden">
                        <div class="h-full bg-indigo-500 transition-all duration-300" style="width: ${((appState.currentQuiz.currentQuestion + 1) / appState.currentQuiz.questions.length) * 100}%"></div>
                    </div>
                </div>
                <h4 class="text-xl font-semibold mb-6 text-slate-800">
                    ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].question}
                </h4>
            </div>

            <div class="space-y-3 mb-8">
                ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].options.map((option, index) => `
                    <button onclick="answerQuestion(${index})" class="w-full p-4 text-left rounded-xl border-2 transition-all duration-200 quiz-option ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === index ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-slate-50'}">
                        <span class="font-medium text-slate-800">
                            ${String.fromCharCode(65 + index)}. ${option}
                        </span>
                    </button>
                `).join('')}
            </div>

            <div class="flex justify-between">
                <button onclick="prevQuestion()" ${appState.currentQuiz.currentQuestion === 0 ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 ${appState.currentQuiz.currentQuestion === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 text-white'}">
                    Previous
                </button>

                <button onclick="nextQuestion()" ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === undefined ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}">
                    ${appState.currentQuiz.currentQuestion === appState.currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <div class="text-6xl mb-4">
                        ${appState.currentQuiz.score === appState.currentQuiz.questions.length ? '🎉' : 
                          appState.currentQuiz.score >= appState.currentQuiz.questions.length * 0.7 ? '👏' : '📚'}
                    </div>
                    <h4 class="text-3xl font-bold mb-2 text-indigo-600">Quiz Complete!</h4>
                    <p class="text-xl text-slate-800">
                        You scored ${appState.currentQuiz.score} out of ${appState.currentQuiz.questions.length}
                    </p>
                    <p class="text-lg text-slate-600">
                        (${Math.round((appState.currentQuiz.score / appState.currentQuiz.questions.length) * 100)}%)
                    </p>
                </div>

                <div class="space-y-4 mb-8">
                    ${appState.currentQuiz.questions.map((question, index) => `
                        <div class="text-left p-4 rounded-xl border ${appState.currentQuiz.answers[index] === question.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}">
                            <div class="flex items-start gap-3">
                                <span class="text-xl">
                                    ${appState.currentQuiz.answers[index] === question.correct ? '✅' : '❌'}
                                </span>
                                <div class="flex-1">
                                    <p class="font-medium mb-2 text-slate-800">${question.question}</p>
                                    <p class="text-sm text-slate-600">
                                        <strong>Your answer:</strong> ${question.options[appState.currentQuiz.answers[index]]}
                                    </p>
                                    ${appState.currentQuiz.answers[index] !== question.correct ? `
                                        <p class="text-sm text-slate-600">
                                            <strong>Correct answer:</strong> ${question.options[question.correct]}
                                        </p>
                                    ` : ''}
                                    <p class="text-sm mt-2 text-slate-800">
                                        <strong>Explanation:</strong> ${question.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex gap-4 justify-center">
                    <button onclick="restartQuiz()" class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        🔄 Retake Quiz
                    </button>
                    <button onclick="closeQuiz()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Close
                    </button>
                </div>
            </div>
        `;
    }
}

function answerQuestion(answerIndex) {
    if (!appState.currentQuiz) return;
    appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] = answerIndex;
    renderQuiz();
}

function nextQuestion() {
    if (!appState.currentQuiz) return;
    
    if (appState.currentQuiz.currentQuestion < appState.currentQuiz.questions.length - 1) {
        appState.currentQuiz.currentQuestion++;
        renderQuiz();
    } else {
        // Calculate score and show results
        const score = appState.currentQuiz.answers.reduce((acc, answer, index) => {
            return acc + (answer === appState.currentQuiz.questions[index].correct ? 1 : 0);
        }, 0);
        
        appState.currentQuiz.showResults = true;
        appState.currentQuiz.score = score;
        renderQuiz();
    }
}

function prevQuestion() {
    if (!appState.currentQuiz) return;
    
    if (appState.currentQuiz.currentQuestion > 0) {
        appState.currentQuiz.currentQuestion--;
        renderQuiz();
    }
}

function restartQuiz() {
    if (!appState.currentQuiz) return;
    
    appState.currentQuiz.currentQuestion = 0;
    appState.currentQuiz.answers = [];
    appState.currentQuiz.showResults = false;
    appState.currentQuiz.score = 0;
    renderQuiz();
}

// Other Functions
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress?')) {
        appState.completedModules.clear();
        appState.expandedCode.clear();
        appState.moduleComments.clear();
        appState.moduleLanguages.clear();
        appState.moduleModes.clear();
        appState.searchTerm = '';
        appState.difficultyFilter = 'all';
        appState.glossarySearch = '';
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        appState.currentQuiz = null;

        // Reset UI
        document.getElementById('search-input').value = '';
        document.getElementById('difficulty-filter').value = 'all';
        document.getElementById('glossary-search').value = '';

        updateProgress();
        renderModules();
        saveToLocalStorage();
    }
}

// =================================
// INITIALIZATION
// =================================

function init() {
    // Load saved state
    loadFromLocalStorage();

    // Apply loaded state to UI
    updateDarkMode();
    updateCommentsToggle();
    updateProgress();
    renderModules();

    // Set initial form values
    document.getElementById('search-input').value = appState.searchTerm;
    document.getElementById('difficulty-filter').value = appState.difficultyFilter;

    // Add event listeners
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    document.getElementById('close-settings').addEventListener('click', closeSettings);
    document.getElementById('save-settings').addEventListener('click', closeSettings);

    document.getElementById('glossary-btn').addEventListener('click', openGlossary);
    document.getElementById('close-glossary').addEventListener('click', closeGlossary);

    document.getElementById('flashcards-btn').addEventListener('click', openFlashcards);
    document.getElementById('close-flashcards').addEventListener('click', closeFlashcards);

    document.getElementById('close-quiz').addEventListener('click', closeQuiz);

    document.getElementById('reset-btn').addEventListener('click', resetProgress);

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        appState.darkMode = !appState.darkMode;
        updateDarkMode();
        saveToLocalStorage();
    });

    // Comments toggle
    document.getElementById('comments-toggle').addEventListener('click', () => {
        appState.showComments = !appState.showComments;
        updateCommentsToggle();
        renderModules();
        saveToLocalStorage();
    });

    // Search and filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        appState.searchTerm = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
        appState.difficultyFilter = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    // Glossary search
    document.getElementById('glossary-search').addEventListener('input', (e) => {
        appState.glossarySearch = e.target.value;
        renderGlossary();
    });

    // Flashcard event listeners
    document.getElementById('prev-flashcard').addEventListener('click', prevFlashcard);
    document.getElementById('next-flashcard').addEventListener('click', nextFlashcard);
    document.getElementById('random-flashcard').addEventListener('click', randomFlashcard);
    document.getElementById('toggle-flashcard-answer').addEventListener('click', toggleFlashcardAnswer);
    document.getElementById('flashcard-content').addEventListener('click', toggleFlashcardAnswer);

    // Scroll event for header shrinking
    window.addEventListener('scroll', () => {
        appState.scrollY = window.scrollY;
        updateHeaderShrink();
    });

    // Modal backdrop clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
            if (e.target.id === 'settings-modal') closeSettings();
            if (e.target.id === 'glossary-modal') closeGlossary();
            if (e.target.id === 'flashcards-modal') closeFlashcards();
            if (e.target.id === 'quiz-modal') closeQuiz();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeSettings();
            closeGlossary();
            closeFlashcards();
            closeQuiz();
        }

        // Arrow keys for flashcards (when flashcard modal is open)
        if (document.getElementById('flashcards-modal').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevFlashcard();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextFlashcard();
            }
            if (e.key === ' ') {
                e.preventDefault();
                toggleFlashcardAnswer();
            }
        }
    });

    console.log('Java DSA Learning Hub initialized successfully!');
}

// =================================
// ADDITIONAL UTILITY FUNCTIONS
// =================================

// Generate PayPal donation URL
function generatePayPalUrl(amount, description) {
    const params = new URLSearchParams({
        business: 'your.email@paypal.com',
        amount: amount,
        currency_code: 'USD',
        item_name: description
    });
    return `https://www.paypal.com/donate?${params.toString()}`;
}

// Copy code to clipboard
function copyCodeToClipboard(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const code = getCodeExample(module);
    navigator.clipboard.writeText(code).then(() => {
        // Show temporary success message
        showToast('Code copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showToast('Failed to copy code', 'error');
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full`;
    
    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Enhanced search functionality
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Module statistics
function getModuleStats() {
    const total = modules.length;
    const completed = appState.completedModules.size;
    const byDifficulty = modules.reduce((acc, module) => {
        acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        return acc;
    }, {});
    
    const completedByDifficulty = modules.reduce((acc, module) => {
        if (appState.completedModules.has(module.id)) {
            acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        }
        return acc;
    }, {});
    
    return {
        total,
        completed,
        percentage: Math.round((completed / total) * 100),
        byDifficulty,
        completedByDifficulty
    };
}

// Export progress as JSON
function exportProgress() {
    const stats = getModuleStats();
    const exportData = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        stats,
        progress: {
            completedModules: Array.from(appState.completedModules),
            moduleSettings: {
                comments: Array.from(appState.moduleComments.entries()),
                languages: Array.from(appState.moduleLanguages.entries()),
                modes: Array.from(appState.moduleModes.entries())
            },
            preferences: {
                darkMode: appState.darkMode,
                showComments: appState.showComments
            }
        }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `java-dsa-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Progress exported successfully!', 'success');
}

// Import progress from JSON
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);
            
            if (importData.version && importData.progress) {
                // Restore progress
                appState.completedModules = new Set(importData.progress.completedModules);
                appState.moduleComments = new Map(importData.progress.moduleSettings.comments);
                appState.moduleLanguages = new Map(importData.progress.moduleSettings.languages);
                appState.moduleModes = new Map(importData.progress.moduleSettings.modes);
                appState.darkMode = importData.progress.preferences.darkMode;
                appState.showComments = importData.progress.preferences.showComments;
                
                // Update UI
                updateDarkMode();
                updateCommentsToggle();
                updateProgress();
                renderModules();
                saveToLocalStorage();
                
                showToast('Progress imported successfully!', 'success');
            } else {
                throw new Error('Invalid file format');
            }
        } catch (error) {
            console.error('Import error:', error);
            showToast('Failed to import progress. Invalid file format.', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Print study guide
function printStudyGuide() {
    const completedModules = modules.filter(m => appState.completedModules.has(m.id));
    
    if (completedModules.length === 0) {
        showToast('Complete some modules first to generate a study guide!', 'warning');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Java DSA Study Guide</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
                h2 { color: #6366f1; margin-top: 30px; }
                .module { margin-bottom: 30px; page-break-inside: avoid; }
                .topics { background: #f8fafc; padding: 10px; border-radius: 5px; }
                .explanation { margin: 15px 0; line-height: 1.6; }
                .resources { margin-top: 15px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>Java DSA Study Guide</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Completed Modules: ${completedModules.length} of ${modules.length}</p>
            
            ${completedModules.map(module => `
                <div class="module">
                    <h2>${module.title}</h2>
                    <p><strong>Difficulty:</strong> ${module.difficulty}</p>
                    <div class="topics">
                        <strong>Topics:</strong> ${module.topics.join(', ')}
                    </div>
                    <div class="explanation">
                        ${module.explanation.replace(/\n/g, '<br>')}
                    </div>
                    <div class="resources">
                        <strong>Resources:</strong>
                        <ul>
                            ${module.resources.map(resource => `<li>${resource}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Enhanced error handling
function handleError(error, context = 'Application') {
    console.error(`${context} Error:`, error);
    showToast(`${context} error occurred. Please try again.`, 'error');
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Theme management
function toggleTheme() {
    appState.darkMode = !appState.darkMode;
    updateDarkMode();
    saveToLocalStorage();
    announceToScreenReader(`Switched to ${appState.darkMode ? 'dark' : 'light'} mode`);
}

// Advanced search with debouncing
let searchTimeout;
function debouncedSearch(searchTerm) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        appState.searchTerm = searchTerm;
        renderModules();
        saveToLocalStorage();
    }, 300);
}

// Mobile detection and optimization
function isMobile() {
    return window.innerWidth <= 768;
}

function optimizeForMobile() {
    if (isMobile()) {
        // Reduce animations on mobile for better performance
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
}

// Service Worker registration for offline support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Analytics and usage tracking (privacy-friendly)
function trackUsage(action, category = 'General') {
    const usage = JSON.parse(localStorage.getItem('dsaHubUsage') || '{}');
    const today = new Date().toISOString().split('T')[0];
    
    if (!usage[today]) {
        usage[today] = {};
    }
    
    if (!usage[today][category]) {
        usage[today][category] = {};
    }
    
    usage[today][category][action] = (usage[today][category][action] || 0) + 1;
    
    localStorage.setItem('dsaHubUsage', JSON.stringify(usage));
}

// Module recommendation system
function getRecommendedModules() {
    const completed = Array.from(appState.completedModules);
    const incomplete = modules.filter(m => !completed.includes(m.id));
    
    if (completed.length === 0) {
        // Recommend beginner modules
        return incomplete.filter(m => m.difficulty === 'beginner').slice(0, 3);
    }
    
    // Simple recommendation based on completed modules
    const completedDifficulties = completed.map(id => 
        modules.find(m => m.id === id)?.difficulty
    ).filter(Boolean);
    
    const mostCommonDifficulty = completedDifficulties
        .reduce((acc, diff) => {
            acc[diff] = (acc[diff] || 0) + 1;
            return acc;
        }, {});
    
    const recommended = Object.keys(mostCommonDifficulty)
        .sort((a, b) => mostCommonDifficulty[b] - mostCommonDifficulty[a])[0];
    
    return incomplete.filter(m => m.difficulty === recommended).slice(0, 3);
}

// Study session timer
let studyTimer = {
    startTime: null,
    totalTime: 0,
    isActive: false
};

function startStudySession() {
    studyTimer.startTime = Date.now();
    studyTimer.isActive = true;
    trackUsage('study_session_started', 'Learning');
}

function endStudySession() {
    if (studyTimer.isActive && studyTimer.startTime) {
        const sessionTime = Date.now() - studyTimer.startTime;
        studyTimer.totalTime += sessionTime;
        studyTimer.isActive = false;
        
        const minutes = Math.round(sessionTime / 60000);
        showToast(`Study session completed: ${minutes} minutes`, 'success');
        trackUsage('study_session_completed', 'Learning');
    }
}

// Enhanced quiz functionality
function getQuizStats() {
    const quizData = JSON.parse(localStorage.getItem('dsaHubQuizStats') || '{}');
    return quizData;
}

function saveQuizResult(moduleId, score, totalQuestions) {
    const stats = getQuizStats();
    const today = new Date().toISOString().split('T')[0];
    
    if (!stats[moduleId]) {
        stats[moduleId] = [];
    }
    
    stats[moduleId].push({
        date: today,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
    });
    
    localStorage.setItem('dsaHubQuizStats', JSON.stringify(stats));
    trackUsage('quiz_completed', 'Assessment');
}

// Learning path suggestions
function generateLearningPath() {
    const completed = Array.from(appState.completedModules);
    const recommended = getRecommendedModules();
    
    const path = {
        next: recommended[0],
        upcoming: recommended.slice(1),
        completed: completed.length,
        total: modules.length,
        progress: Math.round((completed.length / modules.length) * 100)
    };
    
    return path;
}

// Add to the window object for global access
window.javaDSAHub = {
    exportProgress,
    importProgress,
    printStudyGuide,
    generateLearningPath,
    getModuleStats,
    getQuizStats,
    toggleTheme,
    trackUsage
};

// Error boundary
window.addEventListener('error', (event) => {
    handleError(event.error, 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Promise');
});

// Visibility change handler for study sessions
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        endStudySession();
    } else {
        startStudySession();
    }
});

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    registerServiceWorker();
    startStudySession();
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', () => {
    optimizeForMobile();
    updateHeaderShrink(); // Recalculate header shrinking on resize
});

console.log('Java DSA Learning Hub - All systems loaded successfully! 🚀');