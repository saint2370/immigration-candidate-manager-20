
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, CaptionProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Customisation du composant Caption pour ajouter des sélecteurs de mois et d'année
function CustomCaption(props: CaptionProps) {
  const { displayMonth } = props;
  
  // Utiliser les propriétés correctes de CaptionProps pour la navigation
  const handleMonthChange = (newMonth: string) => {
    if (!props.onMonthChange) return;
    const newDate = new Date(displayMonth);
    newDate.setMonth(parseInt(newMonth));
    props.onMonthChange(newDate);
  };
  
  const handleYearChange = (newYear: string) => {
    if (!props.onMonthChange) return;
    const newDate = new Date(displayMonth);
    newDate.setFullYear(parseInt(newYear));
    props.onMonthChange(newDate);
  };
  
  // Générer la liste des mois avec le bon locale
  const months = Array.from({ length: 12 }).map((_, i) => {
    const month = new Date();
    month.setMonth(i);
    return {
      value: i.toString(),
      label: month.toLocaleString(props.displayMonth.toLocaleString('fr-FR'), { month: 'long' })
    };
  });
  
  // Générer la liste des années (10 ans avant et après l'année actuelle)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }).map((_, i) => {
    const year = currentYear - 10 + i;
    return {
      value: year.toString(),
      label: year.toString()
    };
  });
  
  return (
    <div className="flex justify-center pt-1 relative items-center">
      <div className="flex space-x-2 items-center">
        <Select
          value={displayMonth.getMonth().toString()}
          onValueChange={handleMonthChange}
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
          onValueChange={handleYearChange}
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
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
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
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
