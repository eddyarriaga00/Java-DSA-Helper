import React, { useState, useMemo, useCallback, useEffect, useReducer } from 'react';

const JavaDSALearningHub = () => {
    // =================================
    // STATE MANAGEMENT
    // =================================
    const [completedModules, setCompletedModules] = useState(new Set());
    const [showSettings, setShowSettings] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showComments, setShowComments] = useState(true);
    const [showGlossary, setShowGlossary] = useState(false);
    const [showFlashcards, setShowFlashcards] = useState(false);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [glossarySearch, setGlossarySearch] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuizModule, setCurrentQuizModule] = useState(null);
    const [currentQuizPart, setCurrentQuizPart] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [expandedCode, setExpandedCode] = useState(new Set());
    const [moduleComments, setModuleComments] = useState(new Map());
    const [moduleLanguages, setModuleLanguages] = useState(new Map());
    const [moduleModes, setModuleModes] = useState(new Map()); // NEW: pseudocode/code mode per module
    const [scrollY, setScrollY] = useState(0);

    // =================================
    // CONSTANTS
    // =================================
    const CONSTANTS = {
        TOTAL_MODULES: 15,
        CODE_PREVIEW_LINES: 15,
        TRUNCATE_INDICATOR: "\n\n// … Click 'Expand Code' to see the complete example with detailed explanations …"
    };

    const CREATOR_INFO = {
        name: "Your Name",
        paypalEmail: "your.email@paypal.com",
        githubUrl: "https://github.com/yourusername",
        portfolioUrl: "https://yourwebsite.com",
        supportMessage: "Created with ❤️ for CS students by [Your Name]"
    };

    const DIFFICULTY_COLORS = {
        beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
        default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
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

    // =================================
    // SCROLL EFFECT
    // =================================
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getHeaderShrinkValues = useCallback(() => {
        const progress = Math.min(scrollY / 200, 1);
        return {
            isScrolled: scrollY > 10,
            isFullyShrunken: scrollY > 100,
            subtitleOpacity: Math.max(1 - progress * 1.5, 0),
            headerPadding: { y: Math.max(16 - progress * 8, 8) },
            buttonScale: Math.max(1 - progress * 0.3, 0.7),
            buttonOpacity: Math.max(1 - progress * 1.2, 0)
        };
    }, [scrollY]);

    // =================================
    // UTILITY FUNCTIONS
    // =================================
    const truncateCode = (code, lines = CONSTANTS.CODE_PREVIEW_LINES) => {
        const codeLines = code.split('\n');
        return codeLines.length <= lines ? code : codeLines.slice(0, lines).join('\n') + CONSTANTS.TRUNCATE_INDICATOR;
    };

    const removeComments = (code, language = 'java') => {
        let processedCode = code;
        switch (language) {
            case 'python':
                processedCode = code.split('\n').map(line => {
                    if (line.match(/^\s*#\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                    return line.replace(/#.*$/, '').trimEnd();
                }).join('\n').replace(/"""[\s\S]*?"""/g, '').replace(/'''[\s\S]*?'''/g, '');
                break;
            default:
                processedCode = code.split('\n').map(line => {
                    if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                    return line.replace(/\/\/.*$/, '').trimEnd();
                }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
                break;
        }
        return processedCode.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
    };

    const convertToPseudocode = (code, language = 'java', shouldKeepComments = true) => {
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
            default:
                return processedCode
                    .replace(/public\s+class\s+(\w+)/g, 'DEFINE CLASS $1')
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
                    .replace(/return\s+([^;]+);/g, 'RETURN $1')
                    .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                    .replace(/public|private|static/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        }
    };

    const generatePayPalUrl = (amount, description) => {
        const params = new URLSearchParams({
            business: CREATOR_INFO.paypalEmail,
            amount: amount,
            currency_code: "USD",
            item_name: description
        });
        return `https://www.paypal.com/donate?${params.toString()}`;
    };

    // =================================
    // HELPER FUNCTIONS
    // =================================
    const toggleCodeExpansion = (moduleId) => {
        setExpandedCode(prev => {
            const newSet = new Set(prev);
            newSet.has(moduleId) ? newSet.delete(moduleId) : newSet.add(moduleId);
            return newSet;
        });
    };

    const toggleModuleComments = (moduleId) => {
        setModuleComments(prev => {
            const newMap = new Map(prev);
            const currentSetting = newMap.get(moduleId);
            newMap.set(moduleId, currentSetting === undefined ? !showComments : !currentSetting);
            return newMap;
        });
    };

    const setModuleLanguage = (moduleId, language) => {
        setModuleLanguages(prev => new Map(prev).set(moduleId, language));
    };

    const setModuleMode = (moduleId, mode) => {
        setModuleModes(prev => new Map(prev).set(moduleId, mode));
    };

    const shouldShowComments = (moduleId) => {
        const individualSetting = moduleComments.get(moduleId);
        return individualSetting !== undefined ? individualSetting : showComments;
    };

    const getModuleLanguage = (moduleId) => moduleLanguages.get(moduleId) || 'java';
    const getModuleMode = (moduleId) => moduleModes.get(moduleId) || 'code';

    const getCodeExample = (module) => {
        const language = getModuleLanguage(module.id);
        if (module.codeExamples && module.codeExamples[language]) {
            return module.codeExamples[language];
        }
        return module.codeExample || 'Code example coming soon…';
    };

    const processCode = (code, moduleId) => {
        const showCommentsForModule = shouldShowComments(moduleId);
        const language = getModuleLanguage(moduleId);
        const mode = getModuleMode(moduleId);

        if (mode === 'pseudocode') {
            return convertToPseudocode(code, language, showCommentsForModule);
        } else if (!showCommentsForModule) {
            return removeComments(code, language);
        }
        return code;
    };

    const toggleCompletion = (moduleId) => {
        setCompletedModules(prev => {
            const newSet = new Set(prev);
            newSet.has(moduleId) ? newSet.delete(moduleId) : newSet.add(moduleId);
            return newSet;
        });
    };

    const resetProgress = () => {
        if (window.confirm('Are you sure you want to reset all progress?')) {
            setCompletedModules(new Set());
            setModuleComments(new Map());
            setExpandedCode(new Set());
            setModuleLanguages(new Map());
            setModuleModes(new Map());
            setSearchTerm('');
            setDifficultyFilter('all');
            setGlossarySearch('');
            setCurrentFlashcard(0);
            setShowFlashcardAnswer(false);
            setShowQuiz(false);
            setShowSettings(false);
            setShowGlossary(false);
            setShowFlashcards(false);
            setCurrentQuizModule(null);
            setCurrentQuizPart(0);
            setQuizAnswers({});
            setQuizCompleted(false);
            setQuizSubmitted(false);
            setQuizScore(0);
        }
    };

    const nextFlashcard = () => {
        setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
        setShowFlashcardAnswer(false);
    };

    const prevFlashcard = () => {
        setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        setShowFlashcardAnswer(false);
    };

    const getDifficultyColor = (difficulty) => DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;

    // SIMPLIFIED Quiz functions
    const openQuiz = (moduleId) => {
        setCurrentQuizModule(moduleId);
        setCurrentQuizPart(0);
        setQuizAnswers({});
        setQuizCompleted(false);
        setQuizSubmitted(false);
        setQuizScore(0);
        setShowQuiz(true);
    };

    const submitQuizAnswer = (questionId, answer) => {
        setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const submitQuiz = () => {
        const currentQuiz = quizData[currentQuizModule];
        if (!currentQuiz || !currentQuiz.parts[currentQuizPart]) return;

        const questions = currentQuiz.parts[currentQuizPart].questions;
        let correct = 0;

        questions.forEach(question => {
            const userAnswer = quizAnswers[question.id];
            if (question.type === 'multiple-choice' && userAnswer === question.correct) {
                correct++;
            }
        });

        const finalScore = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
        setQuizScore(finalScore);
        setQuizSubmitted(true);
        setQuizCompleted(true);
    };

    const areAllQuestionsAnswered = () => {
        const currentQuiz = quizData[currentQuizModule];
        if (!currentQuiz || !currentQuiz.parts[currentQuizPart]) return false;

        const questions = currentQuiz.parts[currentQuizPart].questions;
        return questions.every(question => quizAnswers[question.id] !== undefined);
    };

    // =================================
    // DATA
    // =================================
    const glossary = [
        {
            term: "Algorithm",
            definition: "A step-by-step procedure or formula for solving a problem. In programming, it's a set of rules to be followed to solve a computational problem.",
            example: "Bubble sort algorithm sorts an array by repeatedly comparing adjacent elements."
        },
        {
            term: "Array",
            definition: "A data structure consisting of elements of the same type stored in contiguous memory locations, accessible by index.",
            example: "int[] numbers = {1, 2, 3, 4, 5}; // Array of integers"
        },
        {
            term: "Big O Notation",
            definition: "A mathematical notation describing the limiting behavior of a function, used to classify algorithms by how they respond to changes in input size.",
            example: "O(n) means linear time - if input doubles, time roughly doubles."
        },
        {
            term: "Class",
            definition: "A blueprint or template for creating objects, defining properties (fields) and behaviors (methods) that objects will have.",
            example: "class Car defines what properties (color, model) and methods (start, stop) all car objects will have."
        },
        {
            term: "Constructor",
            definition: "A special method that is called when an object is created, used to initialize the object's state.",
            example: "public Student(String name) { this.name = name; } // Constructor"
        },
        {
            term: "Data Structure",
            definition: "A way of organizing and storing data so that it can be accessed and modified efficiently.",
            example: "Arrays, linked lists, stacks, and queues are all data structures."
        },
        {
            term: "Encapsulation",
            definition: "The bundling of data and methods that operate on that data within a single unit (class), hiding internal implementation details.",
            example: "Private fields with public getter/setter methods demonstrate encapsulation."
        },
        {
            term: "Hash Table",
            definition: "A data structure that implements an associative array, mapping keys to values using a hash function.",
            example: "HashMap<String, Integer> ages stores name-age pairs for fast lookup."
        },
        {
            term: "Inheritance",
            definition: "A mechanism where a new class inherits properties and methods from an existing class.",
            example: "class Dog extends Animal inherits all Animal properties and methods."
        },
        {
            term: "Linked List",
            definition: "A linear data structure where elements (nodes) are stored in sequence, but not in contiguous memory locations.",
            example: "Each node contains data and a reference to the next node in the sequence."
        },
        {
            term: "Node",
            definition: "A basic unit of a data structure containing data and references to other nodes.",
            example: "In a linked list, each node has data and a 'next' pointer to the following node."
        },
        {
            term: "Object",
            definition: "An instance of a class - a concrete entity created from the class blueprint with actual values.",
            example: "Student alice = new Student('Alice', 20); // alice is an object"
        },
        {
            term: "Polymorphism",
            definition: "The ability of objects of different types to be treated as instances of the same type through a common interface.",
            example: "A Dog and Cat can both be treated as Animals, each responding differently to makeSound()."
        },
        {
            term: "Queue",
            definition: "A linear data structure following First-In-First-Out (FIFO) principle - elements are added at the rear and removed from the front.",
            example: "Like a line at a store - first person in line is first to be served."
        },
        {
            term: "Recursion",
            definition: "A programming technique where a function calls itself to solve a smaller instance of the same problem.",
            example: "factorial(n) = n * factorial(n-1) until n reaches the base case of 1."
        },
        {
            term: "Stack",
            definition: "A linear data structure following Last-In-First-Out (LIFO) principle - elements are added and removed from the same end.",
            example: "Like a stack of plates - you can only add or remove from the top."
        },
        {
            term: "Time Complexity",
            definition: "A measure of the amount of time an algorithm takes to complete as a function of the input size.",
            example: "O(1) is constant time, O(n) is linear time, O(n²) is quadratic time."
        },
        {
            term: "Tree",
            definition: "A hierarchical data structure consisting of nodes connected by edges, with one root node and no cycles.",
            example: "Binary trees have at most two children per node: left and right."
        }
    ];

    const flashcards = glossary.map(item => ({
        question: `What is ${item.term}?`,
        answer: `${item.definition}\n\nExample: ${item.example}`
    }));

    // SIMPLIFIED Quiz Data
    const quizData = {
        'oop-fundamentals': {
            title: "OOP Fundamentals Quiz",
            parts: [
                {
                    title: "Part 1: Classes and Objects",
                    description: "Test your understanding of basic OOP concepts",
                    questions: [
                        {
                            id: 1,
                            type: "multiple-choice",
                            question: "What keyword is used to create inheritance in Java?",
                            options: ["extends", "implements", "inherits", "super"],
                            correct: "extends",
                            explanation: "The 'extends' keyword is used to create inheritance relationships between classes in Java."
                        },
                        {
                            id: 2,
                            type: "multiple-choice",
                            question: "Which access modifier provides the highest level of encapsulation?",
                            options: ["public", "private", "protected", "default"],
                            correct: "private",
                            explanation: "Private access modifier restricts access to only within the same class, providing the highest encapsulation."
                        },
                        {
                            id: 3,
                            type: "multiple-choice",
                            question: "What does 'this' keyword refer to in Java?",
                            options: ["Parent class", "Current object", "Static methods", "Constructor"],
                            correct: "Current object",
                            explanation: "'this' keyword refers to the current object instance within a class."
                        }
                    ]
                }
            ]
        },
        'arrays-basics': {
            title: "Arrays Quiz",
            parts: [
                {
                    title: "Part 1: Array Fundamentals",
                    description: "Test your understanding of array concepts",
                    questions: [
                        {
                            id: 1,
                            type: "multiple-choice",
                            question: "What is the index of the first element in an array?",
                            options: ["1", "0", "-1", "Depends on the language"],
                            correct: "0",
                            explanation: "Arrays in most programming languages, including Java, use zero-based indexing."
                        }
                    ]
                }
            ]
        }
    };

    const modules = [
        {
            id: 'oop-fundamentals',
            title: 'Object-Oriented Programming Fundamentals',
            description: 'Master the core principles of OOP including classes, objects, inheritance, polymorphism, and encapsulation. This is your foundation for understanding programming.',
            difficulty: 'beginner',
            topics: ['Classes & Objects', 'Constructors', 'Methods', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
            codeExamples: {
                java: `// 🎯 COMPLETE OOP EXAMPLE: Building a Student Management System

// 📚 DEFINITION: A class is a blueprint for creating objects
public class Student {
// 🔒 ENCAPSULATION: Private fields (data hiding)
private String name;
private int age;
private double gpa;

// 🏗️ CONSTRUCTOR: Special method to initialize objects
public Student(String name, int age, double gpa) {
this.name = name;  // 'this' refers to current object
this.age = age;
this.gpa = gpa;
System.out.println("Created student: " + name);
}

// 🔓 GETTER METHODS: Controlled access to private data
public String getName() { return name; }
public int getAge() { return age; }
public double getGpa() { return gpa; }

// 🔄 SETTER METHODS: Controlled modification of private data
public void setGpa(double gpa) {
if (gpa >= 0.0 && gpa <= 4.0) {  // Input validation
this.gpa = gpa;
System.out.println("Updated GPA for " + name + " to " + gpa);
} else {
System.out.println("Invalid GPA! Must be between 0.0 and 4.0");
}
}

// 🎯 METHOD: Behavior that objects can perform
public String getStudentInfo() {
return "Name: " + name + ", Age: " + age + ", GPA: " + gpa;
}

// 📊 METHOD: Check if student is on honor roll
public boolean isHonorRoll() {
return gpa >= 3.5;
}
}

// 📈 INHERITANCE: GraduateStudent extends Student
public class GraduateStudent extends Student {
private String researchArea;
private String advisor;

// 🏗️ Constructor calls parent constructor with super()
public GraduateStudent(String name, int age, double gpa,
String researchArea, String advisor) {
super(name, age, gpa);  // Call parent constructor FIRST
this.researchArea = researchArea;
this.advisor = advisor;
System.out.println("Created graduate student in " + researchArea);
}

// 🔄 METHOD OVERRIDING: Changing parent's behavior
@Override
public String getStudentInfo() {
return super.getStudentInfo() +
", Research: " + researchArea +
", Advisor: " + advisor;
}

// 🆕 NEW METHOD: Specific to graduate students
public void conductResearch() {
System.out.println(getName() + " is conducting research in " + researchArea);
}
}`,
                python: `# 🎯 COMPLETE OOP EXAMPLE: Building a Student Management System in Python

# 📚 DEFINITION: A class is a blueprint for creating objects
class Student:
def __init__(self, name, age, gpa):
"""🏗️ CONSTRUCTOR: Special method to initialize objects"""
# 🔒 ENCAPSULATION: Protected attributes (using underscore convention)
self._name = name
self._age = age
self._gpa = gpa
print(f"Created student: {name}")

# 🔓 GETTER METHODS: Controlled access to private data using properties
@property
def name(self):
return self._name

@property
def age(self):
return self._age

@property
def gpa(self):
return self._gpa

# 🔄 SETTER METHODS: Controlled modification of private data
@gpa.setter
def gpa(self, new_gpa):
if 0.0 <= new_gpa <= 4.0:  # Input validation
self._gpa = new_gpa
print(f"Updated GPA for {self._name} to {new_gpa}")
else:
print("Invalid GPA! Must be between 0.0 and 4.0")

# 🎯 METHOD: Behavior that objects can perform
def get_student_info(self):
return f"Name: {self._name}, Age: {self._age}, GPA: {self._gpa}"

# 📊 METHOD: Check if student is on honor roll
def is_honor_roll(self):
return self._gpa >= 3.5

# 📈 INHERITANCE: GraduateStudent extends Student
class GraduateStudent(Student):
def __init__(self, name, age, gpa, research_area, advisor):
"""🏗️ Constructor calls parent constructor with super()"""
super().__init__(name, age, gpa)  # Call parent constructor FIRST
self._research_area = research_area
self._advisor = advisor
print(f"Created graduate student in {research_area}")

# 🔄 METHOD OVERRIDING: Changing parent's behavior
def get_student_info(self):
return (super().get_student_info() +
f", Research: {self._research_area}, Advisor: {self._advisor}")

# 🆕 NEW METHOD: Specific to graduate students
def conduct_research(self):
print(f"{self.name} is conducting research in {self._research_area}")`
            },
            explanation: `Key OOP Concepts Explained:

**Class**: A blueprint that defines properties (fields) and behaviors (methods) that objects of this type will have. Think of it like a cookie cutter - it defines the shape, but isn't the actual cookie.

**Object**: An instance of a class - the actual "thing" created from the blueprint. Each object has its own copy of the class's fields with potentially different values.

**Encapsulation**: Hiding internal details and providing controlled access through methods. Private fields can only be accessed through public getter/setter methods, protecting data integrity.

**Inheritance**: Creating new classes based on existing ones, inheriting their properties and methods. GraduateStudent "extends" Student, getting all Student features plus new ones.

**Polymorphism**: The ability for objects of different types to be treated as instances of the same type. A GraduateStudent can be used anywhere a Student is expected.

**Constructor**: A special method that runs when an object is created, used to initialize the object's state. Must have the same name as the class.

**Method Overriding**: Changing the behavior of a parent class method in a child class. Use @Override annotation for clarity and compiler checking.`,
            resources: [
                'Oracle Java OOP Tutorial',
                'CodeAcademy Java OOP',
                'GeeksforGeeks OOP Concepts',
                'Tutorialspoint Java Classes'
            ]
        },
        {
            id: 'arrays-basics',
            title: 'Arrays and Array Operations',
            description: 'Learn about arrays, the fundamental data structure for storing collections of elements in Java.',
            difficulty: 'beginner',
            topics: ['Array Declaration', 'Array Initialization', 'Array Traversal', 'Multi-dimensional Arrays', 'Array Algorithms', 'Common Array Problems'],
            codeExamples: {
                java: `// 🎯 COMPLETE ARRAY GUIDE: From Basics to Advanced Operations

// 📚 DEFINITION: An array is a collection of elements of the same type
public class ArrayOperations {
public static void main(String[] args) {
// 🔧 ARRAY DECLARATION AND INITIALIZATION
int[] numbers = new int[5];  // Creates array of size 5
int[] scores = {85, 92, 78, 96, 88};  // Initialize with values

// 📝 ACCESSING ARRAY ELEMENTS (0-indexed)
System.out.println("First score: " + scores[0]);  // Output: 85
System.out.println("Array length: " + scores.length);  // Output: 5

// 🔄 ARRAY TRAVERSAL - Method 1: Traditional for loop
System.out.println("All scores (traditional loop):");
for (int i = 0; i < scores.length; i++) {
System.out.println("Score " + (i+1) + ": " + scores[i]);
}

// 🔄 ARRAY TRAVERSAL - Method 2: Enhanced for loop (for-each)
System.out.println("All scores (enhanced loop):");
for (int score : scores) {
System.out.println("Score: " + score);
}

// 🧮 COMMON ARRAY OPERATIONS
int sum = calculateSum(scores);
double average = calculateAverage(scores);
int maximum = findMaximum(scores);
int minimum = findMinimum(scores);

System.out.println("Sum: " + sum);
System.out.println("Average: " + average);
System.out.println("Maximum: " + maximum);
System.out.println("Minimum: " + minimum);
}

// 🧮 METHOD: Calculate sum of array elements
public static int calculateSum(int[] array) {
int sum = 0;
for (int element : array) {
sum += element;
}
return sum;
}

// 📊 METHOD: Calculate average of array elements
public static double calculateAverage(int[] array) {
if (array.length == 0) return 0;
return (double) calculateSum(array) / array.length;
}

// 🔺 METHOD: Find maximum element in array
public static int findMaximum(int[] array) {
if (array.length == 0) throw new IllegalArgumentException("Array is empty");
int max = array[0];
for (int i = 1; i < array.length; i++) {
if (array[i] > max) {
max = array[i];
}
}
return max;
}

// 🔻 METHOD: Find minimum element in array
public static int findMinimum(int[] array) {
if (array.length == 0) throw new IllegalArgumentException("Array is empty");
int min = array[0];
for (int element : array) {
if (element < min) {
min = element;
}
}
return min;
}
}`,
                python: `# 🎯 COMPLETE ARRAY GUIDE: From Basics to Advanced Operations in Python

# 📚 DEFINITION: Lists in Python are similar to arrays in other languages
def array_operations_demo():
print("=== Python Array (List) Operations Demo ===\\n")

# 🔧 LIST DECLARATION AND INITIALIZATION
numbers = [0] * 5  # Creates list of size 5 with zeros
scores = [85, 92, 78, 96, 88]  # Initialize with values

# 📝 ACCESSING LIST ELEMENTS (0-indexed)
print(f"First score: {scores[0]}")  # Output: 85
print(f"List length: {len(scores)}")  # Output: 5

# 🔄 LIST TRAVERSAL - Method 1: Traditional for loop with indices
print("All scores (traditional loop):")
for i in range(len(scores)):
print(f"Score {i+1}: {scores[i]}")

# 🔄 LIST TRAVERSAL - Method 2: Enhanced for loop (for-each)
print("All scores (enhanced loop):")
for score in scores:
print(f"Score: {score}")

# 🧮 COMMON LIST OPERATIONS
total = sum(scores)  # Python built-in function
average = total / len(scores) if scores else 0
maximum = max(scores) if scores else None
minimum = min(scores) if scores else None

print(f"Sum: {total}")
print(f"Average: {average}")
print(f"Maximum: {maximum}")
print(f"Minimum: {minimum}")

if __name__ == "__main__":
array_operations_demo()`
            },
            explanation: `Key Array Concepts Explained:

**Array**: A collection of elements of the same type stored in contiguous memory locations. Think of it as a row of boxes, each holding a value and numbered starting from 0.

**Index**: The position of an element in an array, starting from 0. So the first element is at index 0, second at index 1, etc.

**Length**: The number of elements in an array, accessed with .length property. This is fixed at creation time.

**Traversal**: The process of visiting each element in an array. Can be done with traditional for loops or enhanced for-each loops.

**Linear Search**: A simple search algorithm that checks each element sequentially until the target is found or all elements are checked.

**2D Array**: An array of arrays, creating a matrix-like structure. Useful for representing grids, tables, or matrices.`,
            resources: [
                'Oracle Arrays Tutorial',
                'GeeksforGeeks Arrays',
                'CodeAcademy Java Arrays',
                'Tutorialspoint Arrays'
            ]
        }
    ];

    // =================================
    // COMPUTED VALUES
    // =================================
    const filteredModules = modules.filter(module => {
        const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    const filteredGlossary = glossary.filter(item =>
        item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );

    const progressPercentage = Math.round((completedModules.size / CONSTANTS.TOTAL_MODULES) * 100);
    const shrinkValues = getHeaderShrinkValues();

    // =================================
    // MAIN RENDER
    // =================================
    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            {/* Header */}
            <header
                className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white sticky top-0 z-50 shadow-xl transition-all duration-300 ${shrinkValues.isScrolled ? 'shadow-2xl backdrop-blur-sm' : ''
                    }`}
                style={{
                    paddingTop: `${shrinkValues.headerPadding.y}px`,
                    paddingBottom: `${shrinkValues.headerPadding.y}px`,
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="w-full sm:w-auto transition-all duration-300">
                            <h1 className={`font-bold leading-tight transition-all duration-300 ${shrinkValues.isFullyShrunken
                                    ? 'text-lg sm:text-xl lg:text-2xl'
                                    : 'text-2xl sm:text-3xl lg:text-4xl'
                                }`}>
                                Java DSA Learning Hub
                            </h1>
                            <p
                                className={`text-blue-100 text-sm sm:text-base lg:text-lg mt-1 transition-all duration-300 ${shrinkValues.isFullyShrunken ? 'text-xs opacity-75' : ''
                                    }`}
                                style={{
                                    opacity: shrinkValues.subtitleOpacity,
                                    transform: shrinkValues.subtitleOpacity < 0.3 ? 'translateY(-10px)' : 'translateY(0)'
                                }}
                            >
                                CSC230 - Complete Data Structures & Algorithms Guide
                            </p>
                        </div>
                        <div
                            className={`flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end transition-all duration-300`}
                            style={{
                                opacity: shrinkValues.buttonOpacity,
                                transform: `scale(${shrinkValues.buttonScale})`,
                                transformOrigin: 'top right'
                            }}
                        >
                            {shrinkValues.buttonOpacity > 0.1 && (
                                <>
                                    <button
                                        onClick={() => setShowFlashcards(true)}
                                        className={`bg-purple-500 hover:bg-purple-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${shrinkValues.isFullyShrunken ? 'text-xs' : 'text-sm sm:text-base'
                                            }`}
                                    >
                                        🎯 <span className={shrinkValues.isFullyShrunken ? 'hidden' : 'hidden xs:inline'}>Flashcards</span><span className={shrinkValues.isFullyShrunken ? 'inline' : 'xs:hidden'}>Cards</span>
                                    </button>
                                    <button
                                        onClick={() => setShowGlossary(true)}
                                        className={`bg-emerald-500 hover:bg-emerald-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${shrinkValues.isFullyShrunken ? 'text-xs' : 'text-sm sm:text-base'
                                            }`}
                                    >
                                        📚 <span className={shrinkValues.isFullyShrunken ? 'hidden' : 'hidden xs:inline'}>Glossary</span><span className={shrinkValues.isFullyShrunken ? 'inline' : 'xs:hidden'}>Terms</span>
                                    </button>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className={`bg-indigo-500 hover:bg-indigo-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${shrinkValues.isFullyShrunken ? 'text-xs' : 'text-sm sm:text-base'
                                            }`}
                                    >
                                        ⚙️ <span className={shrinkValues.isFullyShrunken ? 'hidden' : 'hidden sm:inline'}>Settings</span>
                                    </button>
                                    <button
                                        onClick={resetProgress}
                                        className={`bg-rose-500 hover:bg-rose-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${shrinkValues.isFullyShrunken ? 'text-xs' : 'text-sm sm:text-base'
                                            }`}
                                    >
                                        🔄 <span className={shrinkValues.isFullyShrunken ? 'hidden' : 'hidden sm:inline'}>Reset</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Intro */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        Master Java DSA Step by Step
                    </h2>
                    <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto leading-relaxed`}>
                        A comprehensive, beginner-friendly journey through Data Structures and Algorithms in Java.
                        Each module includes detailed explanations, extensive code examples, and practical exercises.
                    </p>
                </div>

                {/* Progress Section */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl border`}>
                    <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Your Learning Progress</h3>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 sm:h-6 mb-3 sm:mb-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-4 sm:h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2 sm:pr-3"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            {progressPercentage > 15 && (
                                <span className="text-white text-xs sm:text-sm font-medium">{progressPercentage}%</span>
                            )}
                        </div>
                    </div>
                    <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
                        {completedModules.size} of {CONSTANTS.TOTAL_MODULES} modules completed ({progressPercentage}%)
                    </p>
                </div>

                {/* Support Section */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-white text-center shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">❤️ Love this learning hub?</h3>
                    <p className="mb-4 sm:mb-6 opacity-90 text-base sm:text-lg">Help keep this resource free and updated with new content!</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <a
                            href={generatePayPalUrl("5.00", "Java DSA Learning Hub - Coffee Support")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            ☕ Buy me a coffee ($5)
                        </a>
                        <a
                            href={CREATOR_INFO.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            ⭐ Star on GitHub
                        </a>
                        <a
                            href={generatePayPalUrl("25.00", "Java DSA Learning Hub - Sponsor Support")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            💝 Sponsor ($25)
                        </a>
                    </div>
                    <p className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-75">{CREATOR_INFO.supportMessage}</p>
                </div>

                {/* Search and Filter */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl border`}>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Find Your Learning Path</h3>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Search modules by title, description, or topics..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-200 text-sm sm:text-base ${darkMode
                                        ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-indigo-400'
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500'
                                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                            />
                        </div>
                        <div className="w-full sm:w-auto">
                            <select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                className={`w-full sm:w-48 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-200 text-sm sm:text-base ${darkMode
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
                        <div className={`mt-3 sm:mt-4 text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
                                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                {/* Module Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <h3 className={`text-xl sm:text-2xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} leading-tight`}>
                                        {module.title}
                                    </h3>
                                    <span className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto`}>
                                        {module.difficulty}
                                    </span>
                                </div>

                                <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed`}>{module.description}</p>

                                {/* Topics */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className={`font-semibold mb-2 sm:mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'} text-sm sm:text-base`}>Topics Covered:</h4>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {module.topics.map((topic, index) => (
                                            <span
                                                key={index}
                                                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md sm:rounded-lg font-medium ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
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
                                            {/* Comments Toggle */}
                                            <button
                                                onClick={() => toggleModuleComments(module.id)}
                                                className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${shouldShowComments(module.id)
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

                                            {/* Code Mode Selector (NEW: replaces pseudocode toggle) */}
                                            <select
                                                value={currentMode}
                                                onChange={(e) => setModuleMode(module.id, e.target.value)}
                                                className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border-0 font-medium ${currentMode === 'pseudocode'
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

                                            {/* Expand Button */}
                                            {showExpandButton && (
                                                <button
                                                    onClick={() => toggleCodeExpansion(module.id)}
                                                    className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${isCodeExpanded
                                                            ? 'bg-slate-500 hover:bg-slate-600 text-white'
                                                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                        }`}
                                                >
                                                    <span className="hidden sm:inline">{isCodeExpanded ? '📄 Collapse' : '📖 Expand'}</span>
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
                                    <div className={`whitespace-pre-line text-sm sm:text-base ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{module.explanation}</div>
                                </div>

                                {/* Resources */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className={`font-semibold mb-2 sm:mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'} text-sm sm:text-base`}>📚 Learning Resources:</h4>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {module.resources.map((resource, index) => (
                                            <div
                                                key={index}
                                                className={`${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} text-xs sm:text-sm transition-colors duration-200 cursor-pointer`}
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
                                        className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base ${quizData[module.id] && quizData[module.id].parts[0].questions.length > 0
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:-translate-y-0.5'
                                                : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'
                                            }`}
                                        disabled={!quizData[module.id] || quizData[module.id].parts[0].questions.length === 0}
                                    >
                                        {quizData[module.id] && quizData[module.id].parts[0].questions.length > 0
                                            ? '🧠 Take Quiz'
                                            : '🧠 Quiz Coming Soon'}
                                    </button>

                                    <button
                                        onClick={() => toggleCompletion(module.id)}
                                        className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base ${isCompleted
                                                ? 'bg-slate-400 text-white cursor-not-allowed'
                                                : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white hover:-translate-y-0.5'
                                            }`}
                                        disabled={isCompleted}
                                    >
                                        {isCompleted ? '✅ Completed' : '📝 Mark as Complete'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <footer className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl sm:rounded-2xl p-6 sm:p-8 mt-8 sm:mt-12 shadow-xl border`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3 sm:mb-4 text-base sm:text-lg`}>📖 Study Tools</h4>
                            <div className="space-y-2 sm:space-y-3">
                                <button
                                    onClick={() => setShowFlashcards(true)}
                                    className={`block text-left ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'} transition-colors duration-200 text-sm sm:text-base`}
                                >
                                    🎯 Practice Flashcards
                                </button>
                                <button
                                    onClick={() => setShowGlossary(true)}
                                    className={`block text-left ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'} transition-colors duration-200 text-sm sm:text-base`}
                                >
                                    📚 DSA Glossary
                                </button>
                                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`}>🧠 Interactive Quizzes (Available!)</div>
                            </div>
                        </div>
                        <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3 sm:mb-4 text-base sm:text-lg`}>🚀 Features</h4>
                            <div className={`space-y-2 sm:space-y-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`}>
                                <div>💬 Individual Comment Controls</div>
                                <div>📝 Pseudocode Conversion</div>
                                <div>🛠️ Multi-Language Support</div>
                                <div>📱 Mobile-Optimized Design</div>
                                <div>🌙 Dark Mode Support</div>
                            </div>
                        </div>
                        <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3 sm:mb-4 text-base sm:text-lg`}>💖 Support Creator</h4>
                            <div className="space-y-2 sm:space-y-3">
                                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`}>Made with ❤️ for CS students</div>
                                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`}>Help keep this resource free!</div>
                                <div className="flex gap-2 mt-3 sm:mt-4">
                                    <a
                                        href={generatePayPalUrl("5.00", "Coffee Support")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        ☕ Coffee
                                    </a>
                                    <a
                                        href={generatePayPalUrl("25.00", "Sponsor Support")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        💝 Sponsor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-slate-500 dark:text-slate-400">
                        <p className="text-sm sm:text-base">{CREATOR_INFO.supportMessage.replace('[Your Name]', CREATOR_INFO.name)}</p>
                        <p className="text-xs sm:text-sm mt-2">Java DSA Learning Hub © 2024 | Open Source ❤️</p>
                    </div>
                </footer>
            </div>

            {/* Modals */}
            {/* Quiz Modal */}
            {showQuiz && currentQuizModule && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowQuiz(false);
                        }
                    }}
                >
                    <div
                        className={`rounded-xl sm:rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] ${darkMode
                                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                : 'bg-white text-slate-900 border border-slate-200'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`flex justify-between items-center p-4 sm:p-6 ${darkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'
                            }`}>
                            <div>
                                <h3 className={`text-xl sm:text-2xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                    }`}>
                                    🧠 {quizData[currentQuizModule]?.title || 'Quiz'}
                                </h3>
                                <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                                    }`}>
                                    {quizData[currentQuizModule]?.parts[currentQuizPart]?.title || 'Quiz Part'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowQuiz(false)}
                                className={`text-xl sm:text-2xl transition-colors duration-200 hover:scale-110 ${darkMode
                                        ? 'text-slate-400 hover:text-slate-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    } p-1`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
                            {quizData[currentQuizModule]?.parts[currentQuizPart]?.questions.length > 0 ? (
                                <div className="space-y-6">
                                    {quizData[currentQuizModule].parts[currentQuizPart].questions.map((question, qIndex) => (
                                        <div key={question.id} className={`rounded-lg p-4 border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'
                                            }`}>
                                            <h4 className={`text-base font-semibold mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'
                                                }`}>
                                                {qIndex + 1}. {question.question}
                                            </h4>

                                            {question.type === 'multiple-choice' && (
                                                <div>
                                                    <div className="space-y-2 mb-4">
                                                        {question.options.map((option, optionIndex) => (
                                                            <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${question.id}`}
                                                                    value={option}
                                                                    checked={quizAnswers[question.id] === option}
                                                                    onChange={(e) => submitQuizAnswer(question.id, e.target.value)}
                                                                    className="w-4 h-4 text-indigo-600"
                                                                />
                                                                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>

                                                    {quizSubmitted && (
                                                        <div className={`mt-3 p-3 rounded border-l-4 ${quizAnswers[question.id] === question.correct
                                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                                                : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                                                            }`}>
                                                            <div className={`flex items-center gap-2 ${quizAnswers[question.id] === question.correct
                                                                    ? 'text-green-700 dark:text-green-300'
                                                                    : 'text-red-700 dark:text-red-300'
                                                                }`}>
                                                                <span className="text-lg">{quizAnswers[question.id] === question.correct ? '✅' : '❌'}</span>
                                                                <span className="font-medium text-sm">
                                                                    {quizAnswers[question.id] === question.correct ? 'Correct!' : `Incorrect. Answer: ${question.correct}`}
                                                                </span>
                                                            </div>
                                                            <p className={`text-xs mt-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                                {question.explanation}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {!quizSubmitted && (
                                        <div className="mt-6 text-center">
                                            <button
                                                onClick={submitQuiz}
                                                disabled={!areAllQuestionsAnswered()}
                                                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${areAllQuestionsAnswered()
                                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    }`}
                                            >
                                                {areAllQuestionsAnswered() ? '📋 Submit Quiz' : 'Answer all questions first'}
                                            </button>
                                        </div>
                                    )}

                                    {quizSubmitted && (
                                        <div className={`mt-6 rounded-lg p-4 text-center border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'
                                            }`}>
                                            <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'
                                                }`}>
                                                Quiz Results 🎉
                                            </h4>

                                            <div className={`text-3xl font-bold mb-3 ${quizScore >= 80 ? 'text-green-500' :
                                                    quizScore >= 60 ? 'text-blue-500' : 'text-orange-500'
                                                }`}>
                                                {quizScore}%
                                            </div>

                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => {
                                                        setQuizAnswers({});
                                                        setQuizSubmitted(false);
                                                        setQuizCompleted(false);
                                                        setQuizScore(0);
                                                    }}
                                                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    🔄 Retake
                                                </button>
                                                <button
                                                    onClick={() => setShowQuiz(false)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    ✅ Continue
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                                    }`}>
                                    <div className="text-4xl mb-3">🚧</div>
                                    <h4 className="text-lg font-semibold mb-2">Coming Soon!</h4>
                                    <p>Quiz questions are being prepared.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className={`rounded-2xl w-full max-w-md shadow-2xl ${darkMode
                            ? 'bg-slate-800 text-slate-100 border border-slate-700'
                            : 'bg-white text-slate-900 border border-slate-200'
                        }`}>
                        <div className={`flex justify-between items-center p-6 ${darkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'
                            }`}>
                            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                }`}>Settings</h3>
                            <button
                                onClick={() => setShowSettings(false)}
                                className={`text-2xl transition-colors duration-200 ${darkMode
                                        ? 'text-slate-400 hover:text-slate-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'
                                    }`}>Dark Mode</label>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`w-14 h-7 rounded-full transition-colors duration-200 ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${darkMode ? 'translate-x-7' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'
                                        }`}>Show Code Comments (Default)</label>
                                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                        Each module can override this setting
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowComments(!showComments)}
                                    className={`w-14 h-7 rounded-full transition-colors duration-200 ${showComments ? 'bg-indigo-600' : 'bg-slate-300'
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${showComments ? 'translate-x-7' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className={`p-6 ${darkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'
                            }`}>
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
                        className={`rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col ${darkMode
                                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                : 'bg-white text-slate-900 border border-slate-200'
                            }`}
                        style={{ maxHeight: '90vh' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`flex justify-between items-center p-6 ${darkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'
                            }`}>
                            <h3 className={`text-3xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                }`}>📚 Java DSA Glossary</h3>
                            <button
                                onClick={() => setShowGlossary(false)}
                                className={`text-2xl transition-colors duration-200 hover:scale-110 ${darkMode
                                        ? 'text-slate-400 hover:text-slate-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
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
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${darkMode
                                        ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-indigo-400'
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500'
                                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                            />
                            {filteredGlossary.length !== glossary.length && (
                                <div className={`mt-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'
                                    }`}>
                                    Showing {filteredGlossary.length} of {glossary.length} terms
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            <div className="grid gap-6">
                                {filteredGlossary.map((item, index) => (
                                    <div key={index} className={`rounded-xl p-6 border ${darkMode
                                            ? 'bg-slate-700 border-slate-600'
                                            : 'bg-slate-50 border-slate-200'
                                        }`}>
                                        <h4 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                            }`}>{item.term}</h4>
                                        <p className={`mb-4 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'
                                            }`}>{item.definition}</p>
                                        <div className={`p-4 rounded-lg border-l-4 border-l-indigo-500 ${darkMode
                                                ? 'bg-slate-600 border-slate-500'
                                                : 'bg-indigo-50 border-indigo-200'
                                            }`}>
                                            <p className={`text-sm font-medium ${darkMode ? 'text-slate-100' : 'text-slate-800'
                                                }`}>
                                                <strong className={darkMode ? 'text-indigo-300' : 'text-indigo-700'}>
                                                    Example:
                                                </strong> {item.example}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {filteredGlossary.length === 0 && (
                                    <div className={`text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                        <p className="text-lg">No terms found matching "{glossarySearch}"</p>
                                        <p className="text-sm mt-2">Try a different search term.</p>
                                    </div>
                                )}
                            </div>
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
                        className={`rounded-2xl w-full max-w-3xl shadow-2xl ${darkMode
                                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                : 'bg-white text-slate-900 border border-slate-200'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`flex justify-between items-center p-6 ${darkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'
                            }`}>
                            <h3 className={`text-3xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                }`}>🎯 DSA Flashcards</h3>
                            <button
                                onClick={() => setShowFlashcards(false)}
                                className={`text-2xl transition-colors duration-200 hover:scale-110 ${darkMode
                                        ? 'text-slate-400 hover:text-slate-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="mb-6 text-center">
                                <span className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    Card {currentFlashcard + 1} of {flashcards.length}
                                </span>
                            </div>

                            <div
                                className={`rounded-2xl p-8 min-h-80 flex flex-col justify-center cursor-pointer transition-all duration-300 hover:shadow-lg border ${darkMode
                                        ? 'bg-slate-700 border-slate-600 hover:border-slate-500'
                                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                    }`}
                                onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                            >
                                {!showFlashcardAnswer ? (
                                    <div className="text-center">
                                        <div className="mb-6">
                                            <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">Question</span>
                                        </div>
                                        <p className="text-xl mb-6 leading-relaxed">{flashcards[currentFlashcard].question}</p>
                                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                            }`}>Click to reveal answer</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-6">
                                            <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">Answer</span>
                                        </div>
                                        <div className="text-lg leading-relaxed whitespace-pre-line">{flashcards[currentFlashcard].answer}</div>
                                        <p className={`text-sm mt-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                            }`}>Click to hide answer</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-8">
                                <button
                                    onClick={prevFlashcard}
                                    disabled={currentFlashcard === 0}
                                    className="bg-slate-500 hover:bg-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-lg disabled:hover:transform-none hover:-translate-y-0.5"
                                >
                                    ← Previous
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        {showFlashcardAnswer ? 'Hide Answer' : 'Show Answer'}
                                    </button>
                                </div>

                                <button
                                    onClick={nextFlashcard}
                                    disabled={currentFlashcard === flashcards.length - 1}
                                    className="bg-slate-500 hover:bg-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-lg disabled:hover:transform-none hover:-translate-y-0.5"
                                >
                                    Next →
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        setCurrentFlashcard(Math.floor(Math.random() * flashcards.length));
                                        setShowFlashcardAnswer(false);
                                    }}
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    🔀 Random Card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JavaDSALearningHub;