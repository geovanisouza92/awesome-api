/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const injectKey = Symbol.for('inject');

export function Injectable(target: any): any {
  return class extends target {
    constructor(container: any) {
      super();

      const dependencies: Array<string | symbol> = Reflect.get(this, injectKey);
      dependencies.forEach(dependency => {
        let value: any;

        Object.defineProperty(this, dependency, {
          get() {
            if (!value) {
              value = container[dependency];
            }
            return value;
          }
        })
      });
    }
  };
}

export function Inject(target: object, propertyKey: string | symbol): void {
  const dependencies: Array<string | symbol> = Reflect.get(target, injectKey) || [];
  dependencies.push(propertyKey);
  Reflect.set(target, injectKey, dependencies);
}
