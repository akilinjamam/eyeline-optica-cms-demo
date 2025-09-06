/* eslint-disable @typescript-eslint/no-explicit-any */

import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

type TFilterFunction = (value: any) => void;

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterationProps {
  filterSummary?: string;
  search: string;
  setSearch: TFilterFunction;
  filters?: {
    label: string; // e.g. "Type"
    placeholder?: string;
    options: FilterOption[];
    onChange: TFilterFunction;
  }[];
  minPrice?: string;
  maxPrice?: string;
  setMinPrice?: TFilterFunction;
  setMaxPrice?: TFilterFunction;
  showPriceRange?: boolean;
  searchPlaceholder?: string;
}

const Filteration = ({
  filterSummary,
  search,
  setSearch,
  filters = [],
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  showPriceRange = false,
  searchPlaceholder = "Search...",
}: FilterationProps) => {

    
  return (
    <Accordion type="single" collapsible className="mb-4 border border-gray-200 rounded-md px-2">
      <AccordionItem value="filters">
        <AccordionTrigger className="text-lg font-medium flex items-center gap-2">
          <div><Search className="w-4 h-4" /></div>
          <span className="text-sm text-gray-500">{filterSummary ?? "Filters"}</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-2">
            {/* 🔍 Search */}
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-2"
            />

            {/* 🎛️ Dynamic Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, idx) => (
                <Select key={idx} onValueChange={filter.onChange}>
                  <SelectTrigger className="lg:w-40 md:w-40 w-full">
                    <SelectValue placeholder={filter.placeholder ?? `Filter by ${filter.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}

              {/* 💰 Price Range */}
              {showPriceRange && setMinPrice && setMaxPrice && (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-28"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-28"
                  />
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Filteration;
