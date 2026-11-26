// Each generator gets a new parameter each time it appears in the calendar.
const mathsChallenges = [
  n => {
    const k = n + 3, a = k * (k - 1);
    return ['Number theory', 'The missing denominator',
      `For how many positive integers x is ${a} ÷ (x² + x) at least 1?`,
      'The denominator is the product of two consecutive integers. Where does it reach the numerator?',
      k - 1, `At x = ${k - 1} the product x(x + 1) equals ${a}. It increases strictly for positive x, so every integer from 1 to ${k - 1} works.`,
      'How would you write the count for an arbitrary positive numerator A using a square root and a floor?'];
  },
  n => {
    const k = n + 4;
    return ['Combinatorics', 'Seats with a gap',
      `A row has ${k + 2} seats. In how many ways can you choose three seats so that no two are neighbours?`,
      'Number the chosen seats a < b < c. Try shifting b left one place and c left two.',
      k * (k - 1) * (k - 2) / 6,
      `The shifted positions a, b − 1, c − 2 are three distinct numbers from 1 to ${k}. Every such triple maps back to exactly one valid seating. The count is ${k} choose 3.`,
      'Find and prove a formula for choosing r non-neighbouring seats from a row of N.'];
  },
  n => {
    const k = n + 2;
    return ['Calculus', 'The hidden symmetry',
      `Let I be the integral from 0 to 1 of x^${k} / (x^${k} + (1 − x)^${k}). What is 100I?`,
      'Substitute u = 1 − x. What happens if you add the two versions of I?',
      50, 'Reflection swaps the two terms in the denominator and replaces the numerator by the other term. Adding the integrands gives 1 everywhere, so 2I = 1 and 100I = 50.',
      'Can you replace the powers with a function f? State conditions that make the same proof work.'];
  },
  n => {
    const k = n + 3;
    return ['Probability', 'Waiting for a repeat',
      `You roll a fair ${k}-sided die until a roll matches the one immediately before it. What is the expected total number of rolls, counting both matching rolls?`,
      'After the first roll, the chance of stopping on the very next roll is always the same.',
      k + 1, `After the first roll write E for the expected extra rolls. One roll is certain, and with probability ${k-1}/${k} you are back in the same position. Thus E = 1 + (${k-1}/${k})E, giving ${k} extra rolls.`,
      'How does the expectation change if you need three equal rolls in a row?'];
  },
  n => {
    const k = n + 2;
    return ['Linear algebra', 'A matrix to a high power',
      `The matrix A has rows (1, 2) and (0, 1). What is the top-right entry of A raised to the power ${k + 10}?`,
      'Write A = I + N and calculate N².',
      2 * (k + 10), `N² is the zero matrix. The binomial expansion leaves only I + ${k+10}N, whose top-right entry is ${2*(k+10)}.`,
      'Find the inverse of A and decide whether the same formula holds for negative integer powers.'];
  },
  n => {
    const k = n + 5;
    return ['Graph theory', 'Paths across a square',
      `From (0,0) to (${k},${k}) you can move one step right or up. How many paths change direction exactly twice?`,
      'List the possible patterns of runs. Which run length can you choose freely?',
      2 * (k - 1), `For right–up–right the up run is fixed. Split the ${k} right steps into two positive runs in ${k-1} ways. The reflected up–right–up paths double the count.`,
      'Can you count paths with exactly three changes? Extend your reasoning to a rectangle.'];
  },
  n => {
    const k = n + 4;
    return ['Algebra', 'Roots you never need to find',
      `The roots a and b of x² − ${k}x + 2 = 0 satisfy a + b = ${k}. Find a³ + b³.`,
      'Expand (a + b)³ and group the mixed terms.',
      k ** 3 - 6 * k, `The constant term gives ab = 2. Hence a³ + b³ = (a + b)³ − 3ab(a + b) = ${k}³ − 6 × ${k}.`,
      'Derive a recurrence for aⁿ + bⁿ directly from the quadratic. What starting values does it need?'];
  },
  n => {
    const k = n + 2, side = 2 * k;
    return ['Geometry', 'A lattice diagonal',
      `A rectangle is ${side} unit squares wide and ${3*k} high. How many squares does its diagonal enter? Count only squares whose interior it crosses.`,
      'The diagonal passes through lattice points. Break it into identical pieces between successive lattice points.',
      4*k, `There are ${k} identical 2-by-3 rectangles along the diagonal. In each piece it crosses one internal vertical and two internal horizontal lines at distinct points, visiting four squares.`,
      'For an m-by-n rectangle, explain exactly where gcd(m,n) appears in the answer.'];
  },
  n => {
    const k = n + 3;
    return ['Number theory', 'Factor pairs in disguise',
      `How many ordered pairs of positive integers (x,y) satisfy 1/x + 1/y = 1/${2**k}?`,
      'Multiply through by the denominators and complete a product of the form (x − a)(y − a).',
      2*k+1, `Set a = 2^${k}. Rearranging gives (x − a)(y − a) = a² = 2^${2*k}. Both factors are positive since 1/x and 1/y are each less than 1/a. Choose the first factor as any power of two from exponent 0 to ${2*k}. The second is then fixed.`,
      'How does the answer depend on the prime factorisation of a general denominator a?'];
  },
  n => {
    const k = n + 4;
    return ['Sequences', 'A sum that collapses',
      `Let S = 1/(1×2) + 1/(2×3) + … + 1/(${k}×${k+1}). What is (${k+1})S?`,
      'Write each summand as the difference of two unit fractions.',
      k, `Since 1/[r(r+1)] = 1/r − 1/(r+1), the middle terms cancel. S = 1 − 1/${k+1}, so multiplying by ${k+1} gives ${k}.`,
      'Find the infinite sum of 1/[r(r+2)] for r starting at 1. Justify taking the limit.'];
  },
  n => {
    const k = n + 3;
    return ['Complex numbers', 'A product around the circle',
      `Take all the ${k}th roots of unity except 1. For each root z form (1 − z). What is the product of those factors?`,
      'Factor xᵏ − 1, divide out x − 1, then choose a useful x.',
      k, `The polynomial whose roots are the remaining roots of unity is 1 + x + … + x^${k-1}. At x = 1 its factored form is the required product, and its expanded form is a sum of ${k} ones.`,
      'Interpret the absolute values of the factors as chord lengths. Why does their product have the same value?'];
  },
  n => {
    const k = n + 3;
    return ['Proof', 'Subsets of even size',
      `A set contains ${k} elements. How many of its subsets have an even number of elements, counting the empty set?`,
      'Pick one distinguished element. Toggle whether it belongs to a subset.',
      2**(k-1), `Toggling the distinguished element pairs each even subset with one odd subset. Exactly half of the 2^${k} subsets have even size.`,
      'Find a second proof using the binomial theorem. Why does the pairing argument require a nonempty set?'];
  }
];

function challengeForDay(day) {
  const count = mathsChallenges.length;
  const round = Math.floor(day / count);
  // Interleave the strands and shift the start each round.
  const index = ((day % count) * 5 + round * 2 + 10) % count;
  return mathsChallenges[index](round % 31);
}
