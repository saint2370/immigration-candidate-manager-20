
import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
  format?: string;
  disabledDates?: (date: Date) => boolean;
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Sélectionner une date",
  disabled = false,
  fromYear = 1900,
  toYear = new Date().getFullYear() + 10,
  format: dateFormat = "dd/MM/yyyy",
  disabledDates,
}: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState<string>(
    date ? format(date, dateFormat, { locale: fr }) : ""
  );
  const [isOpen, setIsOpen] = React.useState(false);

  // Met à jour l'input quand la date change
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, dateFormat, { locale: fr }));
    } else {
      setInputValue("");
    }
  }, [date, dateFormat]);

  // Gère la saisie manuelle de date
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Essaie de parser la date
    try {
      const parsedDate = parse(value, dateFormat, new Date());
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      }
    } catch (error) {
      // Si le format ne correspond pas, on ne fait rien
    }
  };

  // Gère le focus perdu sur l'input
  const handleBlur = () => {
    // Si la valeur de l'input n'est pas une date valide, on réinitialise
    try {
      const parsedDate = parse(inputValue, dateFormat, new Date());
      if (!isValid(parsedDate)) {
        setInputValue(date ? format(date, dateFormat, { locale: fr }) : "");
      }
    } catch (error) {
      setInputValue(date ? format(date, dateFormat, { locale: fr }) : "");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(true)}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={disabled}
              icon={<CalendarIcon className="h-4 w-4" />}
              onClick={(e) => e.stopPropagation()} // Empêche le bouton de se déclencher lors du clic sur l'input
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              setIsOpen(false);
            }}
            disabled={disabledDates}
            initialFocus
            fromYear={fromYear}
            toYear={toYear}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
