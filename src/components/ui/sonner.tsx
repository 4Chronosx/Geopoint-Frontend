import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "rgba(13, 27, 62, 0.9)",
          "--normal-text": "#e2e8f0",
          "--normal-border": "rgba(0, 212, 255, 0.2)",
          "--success-bg": "rgba(13, 27, 62, 0.9)",
          "--success-text": "#00d4ff",
          "--success-border": "rgba(0, 212, 255, 0.25)",
          "--error-bg": "rgba(13, 27, 62, 0.9)",
          "--error-text": "#f87171",
          "--error-border": "rgba(248, 113, 113, 0.25)",
          "--warning-bg": "rgba(13, 27, 62, 0.9)",
          "--warning-text": "#fbbf24",
          "--warning-border": "rgba(251, 191, 36, 0.25)",
          "--info-bg": "rgba(13, 27, 62, 0.9)",
          "--info-text": "#93c5fd",
          "--info-border": "rgba(147, 197, 253, 0.25)",
          "--border-radius": "0.75rem",
          "--toast-close-button-start": "unset",
          "--toast-close-button-end": "0",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
