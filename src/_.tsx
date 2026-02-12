import { useWindowDimensions } from "react-native";

export function formatNumber(value: number): string {
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2);
}

export class Constants {
  static FAVORITES = ",favories"
}


export function useOrientation() {
  const { width, height } = useWindowDimensions();
  return width > height ? 'landscape' : 'portrait';
}


export function useIsOrientationPortrait():boolean {
  return useOrientation() === "portrait"
}