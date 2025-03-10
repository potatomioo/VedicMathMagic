// Global game data and configuration

const GameData = {
    score: 0,
    level: 1,
    stars: 0,
    totalLevels: 4,
    playerName: 'Wizard Apprentice',
    levelConfig: [
        {
            id: 1,
            name: "Magical Addition",
            description: "Learn to add numbers instantly using left-to-right method!",
            backgroundColor: 0xf3e5f5, // Light purple
            problemsToSolve: 5,
            timePerProblem: 40,
            focus: "left-to-right addition",
            type: "addition",
            difficulty: 1,
            // Character properties
            characterType: "wizard",
            characterColor: 0x9c27b0,
            characterName: "Wizard Addy",
            characterMessage: "I'll teach you to add numbers from left to right!"
        },
        {
            id: 2,
            name: "Multiplication by 11",
            description: "Discover the magical pattern for multiplying any number by 11!",
            backgroundColor: 0xe3f2fd, // Light blue
            problemsToSolve: 5,
            timePerProblem: 40,
            focus: "multiplying by 11",
            type: "multiplication",
            difficulty: 2,
            // Character properties
            characterType: "owl",
            characterColor: 0x1976d2,
            characterName: "Professor Owlgebra",
            characterMessage: "Learn the secret pattern for multiplying by 11!"
        },
        {
            id: 3,
            name: "Squaring Numbers",
            description: "Master the art of squaring numbers ending in 5!",
            backgroundColor: 0xe8f5e9, // Light green
            problemsToSolve: 5,
            timePerProblem: 45,
            focus: "squaring numbers ending in 5",
            type: "squaring",
            difficulty: 3,
            // Character properties
            characterType: "dragon",
            characterColor: 0x388e3c,
            characterName: "Drago the Square Master",
            characterMessage: "I'll show you how to square numbers ending in 5 in seconds!"
        },
        {
            id: 4,
            name: "Nines Complement",
            description: "Learn the magic of complements for lightning-fast subtraction!",
            backgroundColor: 0xfff3e0, // Light orange
            problemsToSolve: 5,
            timePerProblem: 50,
            focus: "subtraction using complements",
            type: "subtraction",
            difficulty: 4,
            // Character properties
            characterType: "phoenix",
            characterColor: 0xff5722,
            characterName: "Phoenix the Subtracter",
            characterMessage: "Master the art of quick subtraction using complements!"
        }
    ],
    
    // Reset game data
    reset: function() {
        this.score = 0;
        this.level = 1;
        this.stars = 0;
    }
};