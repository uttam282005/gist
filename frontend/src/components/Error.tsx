import { X } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  message: string
  onClose?: () => void
}

export const Error = ({ message, onClose }: ErrorProps) => {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto bg-red-600 text-white border-none">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <AlertTitle className="text-lg font-semibold mb-2">Error</AlertTitle>
          <AlertDescription className="text-sm">{message}</AlertDescription>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-red-700 -mt-2 -mr-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </Alert>
  )
}
