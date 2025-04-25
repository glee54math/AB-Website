export interface MathProblem {
  topic: string,
  question: string;
  hint: string;
  answer: string;
}

export function generateAdditionProblem(): MathProblem {
  const a = Math.floor(Math.random() * 50);
  const b = Math.floor(Math.random() * 50);
  return {
    topic: 'Addition of 2-Digit Nummbers',
    question: `${a} + ${b}`,
    hint: 'Add the tens. Add the ones. Carry over, if needed.',
    answer: (a + b).toString(),
  };
}

export function generateSubtractionProblem(): MathProblem {
  const a = Math.floor(Math.random() * 50) + 20; // a >= b
  const b = Math.floor(Math.random() * 10) + 10; // 10 <= b < 20
  return {
    topic: 'Subtraction of 2-Digit Nummbers',
    question: `${a} - ${b}`,
    hint: a%10>b%10 ? 'Subtract the ones. Then Subtract the tens.' : 'Consider borrowing from the tens.',
    answer: (a - b).toString(),
  };
}

export function generateMultiplicationProblem(): MathProblem {
  const a = Math.floor(Math.random()*90)+10;
  const b = Math.floor(Math.random()*9)+1;

  return {
    topic: "Multiplication of 2-digit by 1-digit",
    question: `${a} × ${b}`,
    hint: "Multiply the ones. Carry the tens. Multiply the tens place and add the carry.",
    answer: (a*b).toString(),
  }
}

export function generateDivisionProblem(): MathProblem {
  const a = Math.floor(Math.random()*90)+10;
  const b = Math.floor(Math.random()*9)+2;

  return {
    topic: "Division of 2-digit by 1-digit",
    question: `${a} ÷ ${b}`,
    hint: `Find the closest multiple. ${b} &#x2715___ gets you close to ${a}. Find how much remains.`,
    answer: `${Math.floor(a/b)} R ${a%b}`,
  }
}