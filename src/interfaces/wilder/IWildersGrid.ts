import IWilderFromDb from "./IWilderFromDb";

export default interface IWildersGrid {
  wilders: IWilderFromDb[];
  setNeedUpdateAfterCreation: (value: boolean) => void;
  setWilderToEdit?: React.Dispatch<React.SetStateAction<IWilderFromDb | null>>;
}
