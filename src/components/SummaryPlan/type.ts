export type SummaryItem = {
    id: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    value?: string;
  };
  
  export type PricingItem = {
    label: string;
    value: number;
    type?: string;
  };