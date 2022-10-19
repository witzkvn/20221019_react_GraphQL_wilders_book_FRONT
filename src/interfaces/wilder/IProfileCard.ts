import IWilderFromDb from "./IWilderFromDb";

export default interface IProfileCard extends IWilderFromDb {
    wilderObj: IWilderFromDb;
    setNeedUpdateAfterCreation: (value: boolean) => void;
    setWilderToEdit: React.Dispatch<React.SetStateAction<IWilderFromDb | null>>;
}
