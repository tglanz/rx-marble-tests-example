const { assert } = require('chai');
const { Observable, TestScheduler } = require("rxjs");

const utils = {
  add: (x, y) => x + y
}

describe("Tests", () => {
  it("Just a merge", () => {
    const testScheduler = new TestScheduler(assert.deepEqual);

    const first =   "-x-x-x-x|";
    const second =  "x-x-x-x-|";
    const merged =  "xxxxxxxx|";

    const first$ = testScheduler.createHotObservable(first);
    const second$ = testScheduler.createHotObservable(second);

    const merged$ = Observable.merge(first$, second$);

    testScheduler.expectObservable(merged$).toBe(merged);

    testScheduler.flush();
  })

  it("Reduce", () => {
    const testScheduler = new TestScheduler(assert.deepEqual);

    const values = "-a-b-c|";
    const result = "------(y|)"

    const values$ = testScheduler.createHotObservable(values, {
      a: 1, b: 4, c: 5
    });

    const result$ = values$.reduce(utils.add);

    testScheduler.expectObservable(result$).toBe(result, {
      y: 1 + 4 + 5
    })

    testScheduler.flush();
  })
})