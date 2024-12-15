import { UserStatus } from "@/types/authTypes";
import { JobsStatus, ProductType } from "@/types/entitysType";

export const parserDayToPt = (day: string) => {
  switch (day) {
    case "SUNDAY":
      return "Domingo";
    case "MONDAY":
      return "Segunda-feira";
    case "TUESDAY":
      return "Terça-feira";
    case "WEDNESDAY":
      return "Quarta-feira";
    case "THURSDAY":
      return "Quinta-feira";
    case "FRIDAY":
      return "Sexta-feira";
    case "SATURDAY":
      return "Sabádo";
  }
};

export const parserDayToInt = (day: string): number => {
  switch (day) {
    case "SUNDAY":
      return 1;
    case "MONDAY":
      return 2;
    case "TUESDAY":
      return 3;
    case "WEDNESDAY":
      return 4;
    case "THURSDAY":
      return 5;
    case "FRIDAY":
      return 6;
    case "SATURDAY":
      return 7;
    default:
      return -1;
  }
};

export const parseDay = (day: string) => {
  switch (day) {
    case "Dom":
      return "SUNDAY";
    case "Seg":
      return "MONDAY";
    case "Ter":
      return "TUESDAY";
    case "Qua":
      return "WEDNESDAY";
    case "Qui":
      return "THURSDAY";
    case "Sex":
      return "FRIDAY";
    case "Sáb":
      return "SATURDAY";
  }
};