
// Copied from GitHub https://gist.github.com/srikumarks/4303229

// Assumes a valid matrix and returns its dimension array.
// Won't work for irregular matrices, but is cheap.
function dim(mat) {
    if (mat instanceof Array) {
        return [mat.length].concat(dim(mat[0]));
    } else {
        return [];
    }
}

// Makes a validator function for a given matrix structure d.
function validator(d) {
    return function (mat) {
        if (mat instanceof Array) {
            return d.length > 0
                && d[0] === mat.length
                && every(mat, validator(d.slice(1)));
        } else {
            return d.length === 0;
        }
    };
}

// Combines dim and validator to get the required function.
function getdim(mat) {
    var d = dim(mat);
    return validator(d)(mat) ? d : false;
}

// Checks whether predicate applies to every element of array arr.
// This ought to be built into JS some day!
function every(arr, predicate) {
    var i, N;
    for (i = 0, N = arr.length; i < N; ++i) {
        if (!predicate(arr[i])) {
            return false;
        }
    }

    return true;
}

// End Github Code


const zeros = (w, h) => {
    return Array.from(Array(h), _ => Array(w).fill(0))
}

/**
 * 
 * @param {Matrix} m 
 * @param {Column to fill} col 
 * @param {Value to fill with} val 
 * @param {Keep matrix state} bool
 */
const fillCol = (m, col, val, bool = false) => {
    if(bool){
        for(let i = 0; i < m.length; i++){
            m[i][col] = val;
        }
    } else {
        m = zeros(m[0].length, m.length);
        for(let i = 0; i < m.length; i++){
            m[i][col] = val;
        }
    }
    return m;
}

/**
 * 
 * @param {Matrix} m 
 * @param {Row to fill} row 
 * @param {Value to fill with} val 
 * @param {Keep matrix state} bool 
 */
const fillRow = (m, row, val, bool = false) => {
    if(bool){
        for(let i = 0; i < m[row].length; i++){
            m[row][i] = val;
        }
    } else {
        m = zeros(m[0].length, m.length);
        for(let i = 0; i < m[row].length; i++){
            m[row][i] = val;
        }
    }
    return m;
}

/**
 * 
 * @param {Matrix} m | Check to see if there are any nonzero values in array/matrix
 */
const any = (m) => {
    // First check how many dimensions it has (1 or 2)
    if(m[0].length){
        // Then we know it's 2 dimensions
        for(let row of m){
            // Will be true if we find anything nonzero
            var isAnyNonZero = row.some(item => item !== 0);

            // If we found anything nonzero, return true
            if(isAnyNonZero) return true;
        }

        // If we find nothing, return false
        return false;
    } else { 
        // If anything is nonzero, return true
        if(m.some(item => item !== 0)){
            return true;
        }

        // If we find nothing, return false
        return true; 
    }
}

const filterMask = (m, mask) => {
    // Get dimensions
    var mdims = getdim(m);
    var maskdims = getdim(mask);

    // Make sure that they have the same dimensions
    for(let i = 0; i < mdims.length; i++){
        if(mdims[i] !== maskdims[i]){
            return false;
        }
    }

    // Now loop through the activity matrix, and if 
    // anything is nonzero, grab that coordinate from the 
    // data matrix
    var variable = [];
    for(let row = 0; row < m.length; row++){
        for(let col = 0; col < m[0].length; col++){
            if(mask[row][col]){
                variable.push(m[row][col]);
            }
        }
    }

    return variable;
}

export {
    zeros,
    fillRow,
    fillCol,
    any,
    filterMask
}