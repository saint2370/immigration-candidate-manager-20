
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type CaptionProps } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(props.defaultMonth || new Date());
  
  // Composant personnalisé pour le titre du calendrier avec sélecteurs déroulants
  function CustomCaption({ displayMonth }: CaptionProps) {
    const months = [
      "Janvier", "Février", "Mars", "Avril", 
      "Mai", "Juin", "Juillet", "Août", 
      "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    // Génère les années à afficher dans le sélecteur (de 1900 à l'année en cours + 10)
    const years = Array.from({ length: new Date().getFullYear() - 1900 + 11 }, 
      (_, i) => 1900 + i
    );
    
    const handleMonthChange = (monthIndex: string) => {
      const newDate = new Date(displayMonth);
      newDate.setMonth(parseInt(monthIndex));
      setCurrentMonth(newDate);
      props.onMonthChange?.(newDate);
    };
    
    const handleYearChange = (year: string) => {
      const newDate = new Date(displayMonth);
      newDate.setFullYear(parseInt(year));
      setCurrentMonth(newDate);
      props.onMonthChange?.(newDate);
    };
    
    return (
      <div className="flex justify-center space-x-2 items-center">
        <Select
          value={displayMonth.getMonth().toString()}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="w-[110px] h-8">
            <SelectValue placeholder="Mois" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={displayMonth.getFullYear().toString()}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-[90px] h-8">
            <SelectValue placeholder="Année" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden", // Cacher le label par défaut puisqu'on utilise notre composant personnalisé
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
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
