let count = 10;

export function increment() {
    return count++;
}

function decrement() {
    return count--;
}

export { decrement };

export type Increment = number;
