//recurssive
const fib = n => n < 2 ? n ? fib(n-1) + fib(n-2);

// for large numbers, recurssive solution overkilled
// The golden ration "phi" ^ n / sqrt(5) is asymptotic
// to the fibonacci of n, if we round that value up, we
// indeed get the fibonacci value.

const fibonacci = (n, sqrtFive = Math.sqrt(5)) => {
	let phi = (1 + sqrtFive)/2;
	let asymp = Math.pow(phi, n) / sqrtFive;
	return Math.round(asymp);
}