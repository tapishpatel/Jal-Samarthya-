import { toast } from "sonner";

// Compatibility wrapper for existing toast usage
export const useToast = () => ({
  toast,
});

export { toast };