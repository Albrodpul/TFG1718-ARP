import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class ArraySortByFieldPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    if (array !== undefined) {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }

}

@Pipe({
  name: 'sortByNumber'
})
export class ArraySortByNumberPipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (array !== undefined) {
      array.sort((a: number, b: number) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }

}

@Pipe({
  name: 'sortByString'
})
export class ArraySortByStringPipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (array !== undefined) {
      array.sort((a: string, b: string) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }

}