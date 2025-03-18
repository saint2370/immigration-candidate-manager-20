
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerSingleProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Redéfinir les types pour être compatibles avec react-day-picker v8
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // État local pour suivre le mois affiché
  const [month, setMonth] = React.useState<Date>(props.defaultMonth || new Date());
  const [manualDateInput, setManualDateInput] = React.useState<string>("");
  
  // Fonction pour changer de mois
  const handleMonthChange = React.useCallback((date: Date) => {
    setMonth(date);
    props.onMonthChange?.(date);
  }, [props.onMonthChange]);

  // Générer la liste des mois avec le bon locale
  const months = React.useMemo(() => Array.from({ length: 12 }).map((_, i) => {
    const date = new Date();
    date.setMonth(i);
    return {
      value: i.toString(),
      label: date.toLocaleString('fr-FR', { month: 'long' })
    };
  }), []);
  
  // Générer la liste des années (10 ans avant et après l'année actuelle)
  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => Array.from({ length: 21 }).map((_, i) => {
    const year = currentYear - 10 + i;
    return {
      value: year.toString(),
      label: year.toString()
    };
  }), [currentYear]);

  // Fonction pour parser une date entrée manuellement (format DD/MM/YYYY)
  const parseManualDate = (input: string): Date | null => {
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

  // Gérer la saisie manuelle de date
  const handleManualDateChange = (input: string) => {
    setManualDateInput(input);
    
    const parsedDate = parseManualDate(input);
    if (parsedDate) {
      // Si la date est valide, mettre à jour la sélection et afficher ce mois
      if (props.mode === "single" && (props as DayPickerSingleProps).onSelect) {
        (props as DayPickerSingleProps).onSelect(parsedDate);
      }
      // Afficher ce mois
      handleMonthChange(parsedDate);
    }
  };

  // Composant de navigation personnalisé
  const CustomCaption = React.useCallback(({ displayMonth }: { displayMonth: Date }) => {
    const handleSelectMonth = (value: string) => {
      const newDate = new Date(displayMonth);
      newDate.setMonth(parseInt(value));
      handleMonthChange(newDate);
    };
    
    const handleSelectYear = (value: string) => {
      const newDate = new Date(displayMonth);
      newDate.setFullYear(parseInt(value));
      handleMonthChange(newDate);
    };
    
    return (
      <div className="flex justify-center pt-1 relative items-center">
        <div className="flex space-x-2 items-center">
          <Select
            value={displayMonth.getMonth().toString()}
            onValueChange={handleSelectMonth}
          >
            <SelectTrigger className="h-7 w-24 text-xs">
              <SelectValue placeholder="Mois" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value} className="text-xs">
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={displayMonth.getFullYear().toString()}
            onValueChange={handleSelectYear}
          >
            <SelectTrigger className="h-7 w-20 text-xs">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value} className="text-xs">
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }, [months, years, handleMonthChange]);

  return (
    <div className="space-y-2">
      {/* Champ de saisie manuelle de date */}
      <div className="px-3 pt-3">
        <Input
          placeholder="JJ/MM/AAAA"
          value={manualDateInput}
          onChange={(e) => handleManualDateChange(e.target.value)}
          className="text-sm h-8"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Saisissez une date au format JJ/MM/AAAA
        </p>
      </div>

      <DayPicker
        month={month}
        onMonthChange={handleMonthChange}
        showOutsideDays={showOutsideDays}
        className={cn("p-3 pointer-events-auto", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
          Caption: CustomCaption
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
