import { decrement, Increment, increment } from "./counter";

export const incrementThenDecrement = (): Increment => {
    increment();
    return decrement();
};
