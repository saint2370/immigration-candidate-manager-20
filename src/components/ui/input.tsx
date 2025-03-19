
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  dateFormat?: boolean;
}

// Fonction pour formater une date en JJ/MM/AAAA
export const formatDateString = (date: Date | null): string => {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Fonction pour parser une date entrée manuellement (format DD/MM/YYYY)
export const parseDateString = (input: string): Date | null => {
  // Motif pour DD/MM/YYYY
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = input.match(regex);
  
  if (!match) return null;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // Mois commencent à 0 en JS
  const year = parseInt(match[3], 10);
  
  // Vérifier si la date est valide
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null; // Date invalide
  }
  
  return date;
};

const DateInput = React.forwardRef<
  HTMLInputElement, 
  Omit<InputProps, "type" | "value" | "onChange"> & {
    value: Date | undefined | null;
    onChange: (date: Date | undefined) => void;
  }
>((props, ref) => {
  const { value, onChange, className, ...restProps } = props;
  const [inputValue, setInputValue] = React.useState<string>(value ? formatDateString(value) : '');
  
  // Mettre à jour l'état interne lorsque la value externe change
  React.useEffect(() => {
    if (value) {
      setInputValue(formatDateString(value));
    } else {
      setInputValue('');
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue === '') {
      onChange(undefined);
      return;
    }
    
    const date = parseDateString(newValue);
    if (date) {
      onChange(date);
    }
    // Si la date est invalide, ne pas mettre à jour le champ externe
  };
  
  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="JJ/MM/AAAA"
      className={className}
      ref={ref}
      {...restProps}
    />
  );
});
DateInput.displayName = "DateInput";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, dateFormat, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input";

export { Input, DateInput };
