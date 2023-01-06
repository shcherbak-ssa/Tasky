import cloneDeep from 'lodash/cloneDeep';

export function getProjectDueDate(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

export function cloneObject<T>(o: T): T {
  return cloneDeep(o);
}
