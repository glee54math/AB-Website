export interface MathProblem {
  topic: string,
  question: string;
  hint: string;
  answer: number;
}

export function generateAdditionProblem(): MathProblem {
  const a = Math.floor(Math.random() * 50);
  const b = Math.floor(Math.random() * 50);
  return {
    topic: 'Addition of 2-Digit Nummbers',
    question: `${a} + ${b}`,
    hint: 'Add the tens. Add the ones. Carry over, if needed.',
    answer: a + b,
  };
}

export function generateSubtractionProblem(): MathProblem {
  const a = Math.floor(Math.random() * 50) + 20; // a >= b
  const b = Math.floor(Math.random() * 10) + 10; // 10 <= b < 20
  return {
    topic: 'Subtraction of 2-Digit Nummbers',
    question: `${a} - ${b}`,
    hint: a%10>b%10 ? 'Subtract the ones. Then Subtract the tens.' : 'Consider borrowing from the tens.',
    answer: a - b,
  };
}
