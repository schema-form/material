/*
* Склонение существительных
*
* @example declension("файл", "файлов", "файла", 0); // returns "файлов"
* @example declension("файл", "файлов", "файла", 1); // returns "файл"
* @example declension("файл", "файлов", "файла", 2); // returns "файла"
 */
export function declension(oneNominative: string, severalGenitive: string, severalNominative: string, number: number) {
  number = number % 100;

  return (number <= 14 && number >= 11)
    ? severalGenitive
    : (number %= 10) < 5
      ? number > 2
        ? severalNominative
        : number === 1
          ? oneNominative
          : number === 0
            ? severalGenitive
            : severalNominative//number === 2
      : severalGenitive
    ;
}
