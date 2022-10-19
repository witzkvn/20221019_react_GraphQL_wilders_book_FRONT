import React from "react";
import IWilderFromDb from "../wilder/IWilderFromDb";

export default interface IAddWilderForm {
  wilderToEdit?: IWilderFromDb | null;
  needUpdateAfterCreation: boolean;
  setWilderToEdit?: React.Dispatch<React.SetStateAction<IWilderFromDb | null>>;
  setNeedUpdateAfterCreation: (value: boolean) => void;
}
