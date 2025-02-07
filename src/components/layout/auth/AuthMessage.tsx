import { cn } from "@/lib/utils";

export interface IMessage {
  message: string;
  type: "success" | "error";
}

export interface AuthMessageProps {
  message: IMessage;
}

export function AuthMessage({ message }: AuthMessageProps) {
  return (
    <div
      className={cn(
        "border rounded-md p-4 m-4 flex flex-col items-center justify-center",
        message.type === "success"
          ? "bg-green-200 text-green-800 border-green-800"
          : "bg-red-200 text-red-800 border-red-800"
      )}
    >
      <p>{message.message}</p>
    </div>
  );
}
