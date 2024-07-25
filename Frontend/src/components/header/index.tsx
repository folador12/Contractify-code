import Image from "next/image";

interface HeaderProps {
  isButtonVisible: boolean;
  clickHandler?: () => void;
}

export const Header = ({ isButtonVisible, clickHandler }: HeaderProps) => {
  return (
    <div className="w-1/2 min-h-16 mx-auto flex justify-between items-center bg-primary p-4 rounded-lg">
      <div className="flex items-center">
        <Image src="/logo.png" alt="contractfly" width={200} height={30} />
      </div>
      {isButtonVisible && (
        <button
          className="bg-secundary-500 text-white py-2 px-4 rounded-lg hover:bg-secundary-600"
          onClick={clickHandler}
        >
          Adicionar
        </button>
      )}
    </div>
  );
};
