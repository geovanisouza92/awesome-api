/* eslint-disable @typescript-eslint/no-explicit-any */

type Validator<T> = (value: T | undefined, name: string) => void;

class InvalidValue extends Error {}

function RequiredValue<T>(value: T, name: string): void {
  if (!value || value === undefined || value === null) {
    throw new InvalidValue(`Required value for "${name}" was not provided`);
  }
}

type Source = {
  [key: string]: string | undefined;
};

type Parser<T> = (value: string | undefined) => T;
const StringValue: Parser<string> = String;
const NumberValue = parseFloat as Parser<number>;
const BoolValue: Parser<boolean> = Boolean;

class Value<T = any> {
  private validators: Validator<T>[] = [];
  private parse: Parser<any> = StringValue;
  private defaultValue?: T;

  constructor(private name: string) {}

  defaultTo(value: T): Value<T> {
    this.defaultValue = value;
    return this;
  }

  asNumber(): Value<number> {
    this.parse = NumberValue;
    return (this as any) as Value<number>;
  }

  asBool(): Value<number> {
    this.parse = BoolValue;
    return (this as any) as Value<number>;
  }

  isRequired(): Value<T> {
    this.validators.push(RequiredValue);
    return this;
  }

  apply(source: Source): T | undefined {
    const value = this.name in source ? (this.parse as Parser<T>)(source[this.name]) : this.defaultValue;
    this.validators.forEach((validate) => validate(value, this.name));
    return value;
  }
}

export function fromKey(name: string): Value<string> {
  return new Value<string>(name);
}

type Spec = {
  [key: string]: string | number | boolean | Spec | Value;
};

export type Out<S extends Spec> = {
  [K in keyof S]: S[K] extends string
    ? string
    : S[K] extends number
    ? number
    : S[K] extends boolean
    ? boolean
    : S[K] extends Spec
    ? Out<S[K]>
    : S[K] extends Value<infer T>
    ? T
    : never;
};

function isValue(value: any): value is Value<any> {
  return typeof (value as Value).apply === 'function';
}

function isSpec(spec: any): spec is Spec {
  return typeof spec === 'object' && Object.values(spec).some(isValue);
}

export function apply<S extends Spec>(spec: S, source: Source): Out<S> {
  return Object.keys(spec).reduce((values, key) => {
    let value = spec[key];
    if (isValue(value)) {
      value = value.apply(source);
    }
    if (isSpec(value)) {
      value = apply(value, source);
    }
    return {
      ...values,
      [key]: value,
    };
  }, ({} as any) as Out<S>);
}
