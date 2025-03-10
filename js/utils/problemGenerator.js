// Problem generator utility for different Vedic math levels

const ProblemGenerator = {
    // Generate a math problem based on the current level
    generateProblem: function(level) {
        const levelData = GameData.levelConfig[level - 1];
        let problem = {};
        
        switch(levelData.type) {
            case "addition":
                problem = this.generateAdditionProblem(levelData);
                break;
            case "multiplication":
                problem = this.generateMultiplicationProblem(levelData);
                break;
            case "squaring":
                problem = this.generateSquaringProblem(levelData);
                break;
            case "subtraction":
                problem = this.generateSubtractionProblem(levelData);
                break;
            default:
                problem = this.generateAdditionProblem(levelData);
        }
        
        return problem;
    },
    
    // Level 1: Left-to-right addition
    generateAdditionProblem: function(levelData) {
        // Generate two multi-digit numbers suitable for left-to-right addition
        const num1 = Math.floor(Math.random() * 900) + 100; // 3-digit number
        const num2 = Math.floor(Math.random() * 900) + 100; // 3-digit number
        
        const answer = num1 + num2;
        
        const steps = this.getAdditionSteps(num1, num2);
        
        return {
            question: `${num1} + ${num2} = ?`,
            num1: num1,
            num2: num2,
            answer: answer,
            hint: "Start adding from left to right (hundreds, then tens, then ones)",
            vedic_technique: "Left-to-right addition",
            steps: steps,
            explanation: `To add ${num1} and ${num2} from left to right:\n${steps}`
        };
    },
    
    // Helper method to generate addition steps
    getAdditionSteps: function(num1, num2) {
        // Convert to strings to work with individual digits
        const num1Str = num1.toString();
        const num2Str = num2.toString();
        
        // Pad the shorter number with leading zeros
        const maxLength = Math.max(num1Str.length, num2Str.length);
        const num1Padded = num1Str.padStart(maxLength, '0');
        const num2Padded = num2Str.padStart(maxLength, '0');
        
        let steps = "";
        let partialSum = 0;
        let partialResult = "";
        
        // Process each position from left to right
        for (let i = 0; i < maxLength; i++) {
            const digit1 = parseInt(num1Padded[i]);
            const digit2 = parseInt(num2Padded[i]);
            const positionSum = digit1 + digit2;
            
            partialSum = partialSum * 10 + positionSum;
            partialResult += positionSum;
            
            const placeValue = Math.pow(10, maxLength - i - 1);
            steps += `Step ${i + 1}: Add ${digit1} and ${digit2} at the ${this.getPlaceValueName(placeValue)} position: ${positionSum}\n`;
        }
        
        return steps;
    },
    
    // Helper to get place value name
    getPlaceValueName: function(placeValue) {
        if (placeValue === 1000000) return "millions";
        if (placeValue === 100000) return "hundred thousands";
        if (placeValue === 10000) return "ten thousands";
        if (placeValue === 1000) return "thousands";
        if (placeValue === 100) return "hundreds";
        if (placeValue === 10) return "tens";
        if (placeValue === 1) return "ones";
        return "place";
    },
    
    // Level 2: Multiplication by 11
    generateMultiplicationProblem: function(levelData) {
        // Generate a 2-digit number for multiplying by 11
        const num = Math.floor(Math.random() * 90) + 10; // 2-digit number
        const answer = num * 11;
        
        const firstDigit = Math.floor(num / 10);
        const secondDigit = num % 10;
        const middleDigit = firstDigit + secondDigit;
        
        let explanation;
        if (middleDigit >= 10) {
            explanation = `To multiply ${num} by 11:\n` +
                          `1. Take the first digit: ${firstDigit}\n` +
                          `2. Add the digits: ${firstDigit} + ${secondDigit} = ${middleDigit}\n` +
                          `3. Since ${middleDigit} >= 10, carry the 1: ${Math.floor(middleDigit / 10)} to the hundreds place\n` +
                          `4. Keep the ones digit of the sum: ${middleDigit % 10} in the tens place\n` +
                          `5. Last digit: ${secondDigit}\n` +
                          `6. Result: ${answer}`;
        } else {
            explanation = `To multiply ${num} by 11:\n` +
                          `1. Take the first digit: ${firstDigit}\n` +
                          `2. Add the digits for the middle: ${firstDigit} + ${secondDigit} = ${middleDigit}\n` +
                          `3. Take the last digit: ${secondDigit}\n` +
                          `4. Put them together: ${firstDigit}${middleDigit}${secondDigit} = ${answer}`;
        }
        
        return {
            question: `${num} × 11 = ?`,
            num1: num,
            num2: 11,
            answer: answer,
            hint: `Try adding the digits (${firstDigit}+${secondDigit}) and placing the sum between them`,
            vedic_technique: "Multiply by 11 pattern",
            explanation: explanation
        };
    },
    
    // Level 3: Squaring numbers ending in 5
    generateSquaringProblem: function(levelData) {
        // Generate a number ending in 5 (between 15 and 95)
        const base = Math.floor(Math.random() * 9) + 1; // 1-9
        const num = base * 10 + 5; // Number ending in 5
        const answer = num * num;
        
        const explanation = `To square ${num}:\n` +
                           `1. Take the first digit: ${base}\n` +
                           `2. Multiply it by the next consecutive number: ${base} × ${base + 1} = ${base * (base + 1)}\n` +
                           `3. That gives the first part of the answer: ${base * (base + 1)}${base === 1 ? '0' : '00'}\n` +
                           `4. The last part is always 25\n` +
                           `5. Full answer: ${base * (base + 1)}25 = ${answer}`;
        
        return {
            question: `${num}² = ?`,
            num1: num,
            answer: answer,
            hint: `For numbers ending in 5, multiply the first digit(s) by the next consecutive number, then add 25 at the end`,
            vedic_technique: "Squaring numbers ending in 5",
            explanation: explanation
        };
    },
    
    // Level 4: Subtraction using complements
    generateSubtractionProblem: function(levelData) {
        // Generate a subtraction problem suitable for complement method
        // Generate minuend (larger number) with digits mostly larger than the subtrahend's digits
        let minuend, subtrahend;
        do {
            minuend = Math.floor(Math.random() * 900) + 100; // 3-digit number
            subtrahend = Math.floor(Math.random() * (minuend - 10)) + 10; // Smaller number
        } while (minuend <= subtrahend);
        
        const answer = minuend - subtrahend;
        
        // Calculate the 10's complement of the subtrahend
        const complement = this.calculateComplement(subtrahend, minuend);
        
        const explanation = `To subtract ${subtrahend} from ${minuend} using complements:\n` +
                           `1. Find the 10's complement of ${subtrahend}: ${complement}\n` +
                           `2. Add it to ${minuend}: ${minuend} + ${complement} = ${minuend + complement}\n` +
                           `3. Drop the leftmost digit '1': ${(minuend + complement).toString().slice(1)}\n` +
                           `4. Final answer: ${answer}`;
        
        return {
            question: `${minuend} - ${subtrahend} = ?`,
            num1: minuend,
            num2: subtrahend,
            answer: answer,
            hint: `Try using the complement method: find the 10's complement of ${subtrahend} (the number that adds up to a power of 10)`,
            vedic_technique: "Subtraction using complements",
            explanation: explanation
        };
    },
    
    // Helper to calculate complement
    calculateComplement: function(num, baseNum) {
        // Calculate the next power of 10 larger than baseNum
        const numDigits = baseNum.toString().length;
        const powerOf10 = Math.pow(10, numDigits);
        
        // Return the complement (difference between the power of 10 and num)
        return powerOf10 - num;
    }
};