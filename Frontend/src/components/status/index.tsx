import { StatusType, printStatus } from "@/utils/types/EnumStatus";

export function getStatusClass(status: StatusType) {
  switch (status) {
    case StatusType.APPROVED:
      return (
        <span className="px-2 w-20 flex justify-center text-xs leading-5 font-semibold rounded-full bg-secundary-500 bg-opacity-[.25] text-secundary-500">
          {printStatus(status)}
        </span>
      );

    case StatusType.REJECTED:
      return (
        <span className="px-2 w-20 flex justify-center text-xs leading-5 font-semibold rounded-full bg-danger bg-opacity-[.25] text-danger">
          {printStatus(status)}
        </span>
      );

    default:
      return (
        <span className="px-2 w-20 flex justify-center text-xs leading-5 font-semibold rounded-full bg-primary bg-opacity-[.32] text-primary">
          {printStatus(status)}
        </span>
      );
  }
}
