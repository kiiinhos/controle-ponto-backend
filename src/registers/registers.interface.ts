export interface UserEntry {
  userCode: string;
  dateEntry: string;
  hourEntry: string;
}
export interface UserExit {
  userCode: string;
  dateExit: string;
  hourExit: string;
}
export interface UserHistory {
  userCode: string;
  dateEntry: string;
  dateExit: string;
  hourEntry: string;
  hourExit: string;
}
