import { Dimensions, PixelRatio } from "react-native";

export const getPixelsFromPercentageHeight = (percentage: number): number => {
  const screenHeight = Dimensions.get("window").height;
  return Math.round((percentage / 100) * screenHeight);
};

export const getPixelsFromPercentageWidth = (percentage: number): number => {
  const screenWidth = Dimensions.get("window").width;
  return Math.round((percentage / 100) * screenWidth);
};
