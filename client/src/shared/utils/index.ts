import cloneDeep from 'lodash/cloneDeep';
import { PAGE_TITLE_DIVIDER, PageTitle, EMPTY_STRING } from 'shared/constants';

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

export function updateDocumentTitle(pageTitle: string = EMPTY_STRING): void {
  let title: string = PageTitle.BASE;

  if (pageTitle !== EMPTY_STRING) {
    title = [title, pageTitle].join(PAGE_TITLE_DIVIDER);
  }

  document.title = title;
}
