export class Helper {
  static getNumberOfPages = (total, limit) => {
    return Math.ceil(total / limit);
  };
}