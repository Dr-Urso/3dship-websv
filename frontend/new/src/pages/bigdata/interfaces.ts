export interface utils {
  count: number;
  countFinished: number;
  countGroup: number;
  countWorkpack: number;
  countWorkpackFinished: number;
  multibarData: multiBar[];
}

export interface multiBar {
  Group: string;
  count: number;
  type: string;
}
