/**
 * Bubble sort is a simple sorting algorithm that repeatedly steps through the
 * list to be sorted, compares each pair of adjacent items and swaps them if they
 * are in the wrong order. The pass through the list is repeated until no swaps
 * are needed, which indicates that the list is sorted.
 *
 * Complexity: Time complexity
 * Best	 Average		Worst
 * O(n)	  O(n^2)	    O(n^2)
 */

// array to sort
var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

// swap function helper
function swap(array, cur, next) {
  let temp = array[cur];
  array[cur] = array[next];
  array[next] = temp;
}

// correct implementation: this is the usual implementation of the bubble sort
// algorithm. Some loops execution are avoided if not they are not needed
function bubbleSort(array) {
  var swapped;
  do {
    swapped = false;
    for(var i = 0; i < array.length; i++) {
		let cur = array[i] || null;
		let next = array[i+1] || null;
		if(cur && next && cur > next) {
	        swap(array, i, i + 1);
	        swapped = true;
	    }
    }
  } while(swapped);
  return array;
}

console.log(bubbleSort(array.slice())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]