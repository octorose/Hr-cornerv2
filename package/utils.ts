import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// @ts-ignore
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getColorName = (character: string) => {
  let color;

  switch (character) {
    case "a":
    case "b":
      color = "green";
      break;

    case "c":
    case "d":
      color = "red";
      break;

    case "e":
    case "f":
      color = "orange";
      break;

    case "g":
    case "h":
      color = "indigo";
      break;

    case "i":
    case "j":
      color = "yellow";
      break;

    case "k":
    case "l":
      color = "lime";
      break;

    case "m":
    case "n":
      color = "green";
      break;

    case "o":
    case "p":
      color = "red";
      break;

    case "q":
    case "r":
      color = "teal";
      break;

    case "s":
    case "t":
      color = "blue";
      break;

    case "u":
    case "v":
      color = "violet";
      break;

    case "w":
    case "x":
      color = "pink";
      break;

    case "y":
    case "z":
      color = "purple";
      break;

    default:
      color = "rose";
  }

  return color;
};

export const getTailwindFromColor = (color: string) => {
  let returnColor;

  switch (color) {
    case "green":
      returnColor = "from-green-600";
      break;

    case "red":
      returnColor = "from-red-600";
      break;

    case "orange":
      returnColor = "from-orange-600";
      break;

    case "indigo":
      returnColor = "from-indigo-600";
      break;

    case "yellow":
      returnColor = "from-yellow-600";
      break;

    case "lime":
      returnColor = "from-lime-600";
      break;

    case "green":
      returnColor = "from-green-600";
      break;

    case "red":
      returnColor = "from-red-600";
      break;

    case "teal":
      returnColor = "from-teal-600";
      break;

    case "blue":
      returnColor = "from-blue-600";
      break;

    case "violet":
      returnColor = "from-violet-600";
      break;

    case "pink":
      returnColor = "from-pink-600";
      break;

    case "purple":
      returnColor = "from-purple-600";
      break;

    default:
      returnColor = "from-rose-600";
  }

  return returnColor;
};

export const getTailwindToColor = (color: string) => {
  let returnColor;

  switch (color) {
    case "green":
      returnColor = "to-green-600";
      break;

    case "red":
      returnColor = "to-red-600";
      break;

    case "orange":
      returnColor = "to-orange-600";
      break;

    case "indigo":
      returnColor = "to-indigo-600";
      break;

    case "yellow":
      returnColor = "to-yellow-600";
      break;

    case "lime":
      returnColor = "to-lime-600";
      break;

    case "green":
      returnColor = "to-green-600";
      break;

    case "red":
      returnColor = "to-red-600";
      break;

    case "teal":
      returnColor = "to-teal-600";
      break;

    case "blue":
      returnColor = "to-blue-600";
      break;

    case "violet":
      returnColor = "to-violet-600";
      break;

    case "pink":
      returnColor = "to-pink-600";
      break;

    case "purple":
      returnColor = "to-purple-600";
      break;

    default:
      returnColor = "to-rose-600";
  }

  return returnColor;
};

export const getTwoColorsByAddress = (address: string) => {
  const regX = /^[a-zA-Z]+$/;
  let UniqueLetterCounter = 0;
  let FirstColor: string = "pink";
  let SecondColor: string = "blue";
  for (let i = 0; i < address?.length; i++) {
    if (address.charAt(i).match(regX)) {
      if (i > 1) {
        if (UniqueLetterCounter < 1) {
          UniqueLetterCounter++;
          FirstColor = getColorName(address.charAt(i).toLocaleLowerCase());
          continue;
        } else if (
          !(
            FirstColor.localeCompare(
              getColorName(address.charAt(i).toLocaleLowerCase())
            ) == 0
          )
        ) {
          SecondColor = getColorName(address.charAt(i).toLocaleLowerCase());
          break;
        }
      }
    }
  }
  return [getTailwindFromColor(FirstColor), getTailwindToColor(SecondColor)];
};
