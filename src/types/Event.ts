export interface EventItem {
  TITLE: string;
  DATE: string;
  [key: string]: any;
}

export interface Event {
  CODENAME: string;
  TITLE: string;
  DATE: string;
  GUNAME: string;
  PLACE: string;
  ORG_NAME: string;
  MAIN_IMG: string;
  [key: string]: string;
}
