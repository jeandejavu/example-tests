import sortObjects from "./sortObjects";

interface ParameterLinkFields<T, K extends keyof T> {
  registers: Array<T>;
  compareFields: Array<K>;
  dontSort?: boolean;
}

interface ParameterLinkMain<T, K extends keyof T>
  extends ParameterLinkFields<T, K> {
  setFieldName: K;
}

interface ParameterLink<T, U, K extends keyof T, L extends keyof U> {
  main: ParameterLinkMain<T, K>;
  child?: ParameterLinkFields<U, L>;
  parent?: ParameterLinkFields<U, L>;
  convertInString?: boolean;
}

/* eslint-disable no-param-reassign */
function linkObjects<
  T extends Object,
  U extends Object,
  K extends keyof T,
  L extends keyof U
>({
  main,
  child,
  parent,
  convertInString = false,
}: ParameterLink<T, U, K, L>): void {
  if (!child && !parent) return;

  const node = child || parent;
  if (!node) return;

  if (!node.registers || !main.registers) return;

  if (!main.dontSort) sortObjects(main.registers, main.compareFields);
  if (!node.dontSort) sortObjects(node.registers, node.compareFields);

  let lastEqualsCompareIndex = 0;
  let lastIndex = 0;

  let lastCompare = "";
  main.registers.forEach((register) => {
    if (child) {
      ((register[main.setFieldName] as unknown) as Array<U>) = Array<U>();
    }

    if (main.compareFields.map((c) => register[c]).join("-") === lastCompare) {
      lastIndex = lastEqualsCompareIndex;
    }
    lastEqualsCompareIndex = lastIndex;

    for (let i = lastIndex; i < node.registers.length; i += 1) {
      const compare = node.registers[i];

      let equals = true;
      for (let u = 0; u < node.compareFields.length; u += 1) {
        const compareModifyField = main.compareFields[u];
        const compareField = node.compareFields[u];

        let registerValue = register[compareModifyField] as unknown;
        let compareValue = compare[compareField] as unknown;

        if (convertInString) {
          registerValue = String(registerValue);
          compareValue = String(compareValue);
        }

        if (registerValue !== compareValue) {
          equals = false;
          break;
        }
      }
      if (equals) {
        lastCompare = node.compareFields.map((c) => compare[c]).join("-");

        if (!child) {
          ((register[main.setFieldName] as unknown) as U) = compare;
          lastIndex = i;
          break;
        } else {
          ((register[main.setFieldName] as unknown) as Array<U>).push(compare);
        }
      }

      let next = false;
      for (let u = 0; u < node.compareFields.length; u += 1) {
        const compareModifyField = main.compareFields[u];
        const compareField = node.compareFields[u];

        let registerValue = register[compareModifyField] as any;
        let compareValue = compare[compareField] as any;

        if (convertInString) {
          registerValue = String(registerValue);
          compareValue = String(compareValue);
        }

        if (compareValue < registerValue) {
          break;
        }
        if (compareValue > registerValue) {
          next = true;
          break;
        }
      }
      if (next) break;
      lastIndex = i;
    }
  });
}
/* eslint-enable no-param-reassign */
export default linkObjects;
