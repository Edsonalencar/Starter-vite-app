import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { Address } from "@/types/authTypes";

export async function copyText(link?: string) {
  if (!link) return;

  try {
    await navigator.clipboard.writeText(link);
    toast.success("Link copiado com sucesso!");
  } catch (err) {
    toast.success("Falha ao copiar o link!");
  }
}

export const getContrastColor = (hexColor?: string) => {
  if (!hexColor) return "black";
  hexColor = hexColor.replace("#", "");

  // Converte a cor para componentes RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calcula o brilho usando a fórmula de luminância relativa
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto para cores claras e branco para cores escuras
  return brightness > 128 ? "black" : "white";
};

export const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function calculateAge(birthDate?: string) {
  if (!birthDate) return undefined;

  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age + " anos";
}

export const formatterAddres = (address?: Address) => {
  if (!address) return "Não informado";
  return `${address?.city}/${address?.state}`;
};

export function getNextRepetitionDate(
  repetitionType: string,
  repetitionNumber: number,
  startDate: Date = new Date() // opcionalmente, você pode fornecer uma data de início
): Date {
  let nextDate = new Date(startDate); // Copia a data de início

  if (repetitionNumber == 0) return nextDate;

  switch (repetitionType) {
    case "SINGLE":
      return nextDate; // Retorna a data de início sem alteração

    case "WEEKLY":
      nextDate.setDate(nextDate.getDate() + 7 * repetitionNumber);
      break;

    case "BIWEEKLY":
      nextDate.setDate(nextDate.getDate() + 14 * repetitionNumber);
      break;

    case "MONTHLY":
      nextDate.setMonth(nextDate.getMonth() + repetitionNumber);
      break;

    default:
      throw new Error("Tipo de repetição inválido");
  }

  return nextDate;
}

export const convertBoleanToString = (value?: boolean) => {
  return value ? "Sim" : "Não";
};

export const disablePastDates = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf("day");
};

export const convertRcFileToFile = (rcFile: RcFile): File => {
  return new File([rcFile], rcFile.name, { type: rcFile.type });
};