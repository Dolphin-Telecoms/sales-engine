// Tuple type for fields like [id, name]
export type OdooRef = [number, string];

// Main interface
export interface AttributeValue {
  id: number;
  display_name: string;
  ptav_active: boolean;
  name: string;

  product_attribute_value_id: OdooRef;
  attribute_line_id: OdooRef;

  price_extra: number;
  currency_id: OdooRef;

  exclude_for: any[]; // can refine if needed

  product_tmpl_id: OdooRef;
  attribute_id: OdooRef;

  ptav_product_variant_ids: number[];

  html_color: string | false;
  is_custom: boolean;

  display_type: "select" | "radio" | "color" | string;

  color: number;
  image: string | false;

  create_uid: OdooRef;
  create_date: string;

  write_uid: OdooRef;
  write_date: string;
}

export type ServiceAvailability = {
  city: string;
  address: string;
  coverage: "FIBRE" | "LTE" | string;
  available: boolean;
  available_service_types: ("FIBRE" | "LTE" | string)[];
  requires_service_selection: boolean;
  fibre_priority_enabled: boolean;
  service_use: "HOME" | "BUSINESS" | string;
  service_code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  validated_at: string; // ISO date string
  log_id: number;
};

export type Step = {
  label: string;
  link: string;
};

export type Many2One = [number, string];
export type One2Many = number[];
export type OdooDateTime = string;

export interface ProductCategory {
  id: number;
  display_name: string;

  // Message fields
  message_is_follower: boolean;
  message_follower_ids: number[];
  message_partner_ids: number[];
  message_ids: number[];
  has_message: boolean;
  message_needaction: boolean;
  message_needaction_counter: number;
  message_has_error: boolean;
  message_has_error_counter: number;
  message_attachment_count: number;
  rating_ids: number[];
  website_message_ids: number[];
  message_has_sms_error: boolean;

  // Core fields
  name: string;
  complete_name: string;
  parent_id: Many2One | false;
  parent_path: string;
  child_id: One2Many;
  product_count: number;

  product_properties_definition: any[];

  // Audit fields
  create_uid: Many2One;
  create_date: string;
  write_uid: Many2One;
  write_date: string;

  // Accounting
  property_account_income_categ_id: Many2One;
  property_account_expense_categ_id: Many2One;
  products: ProductTemplate[];

  // Inventory / logistics
  route_ids: number[];
  removal_strategy_id: Many2One | false;
  parent_route_ids: number[];
  total_route_ids: number[];
  putaway_rule_ids: number[];

  packaging_reserve_method: string;
  filter_for_stock_putaway_rule: boolean;
  anglo_saxon_accounting: boolean;

  property_valuation: string;
  property_cost_method: string;

  property_stock_journal: Many2One;
  property_stock_valuation_account_id: Many2One;
  property_price_difference_account_id: Many2One | false;
  property_stock_account_production_cost_id: Many2One | false;
}

export interface ProductAttributeLine {
  id: number;
  display_name: string;
  active: boolean;

  product_tmpl_id: Many2One;
  sequence: number;

  attribute_id: Many2One;

  value_ids: number[];
  value_count: number;
  product_template_value_ids: number[];

  create_uid: Many2One;
  create_date: OdooDateTime;
  write_uid: Many2One;
  write_date: OdooDateTime;

  // ✅ NEW FIELD
  values: AttributeValue[];
}

export interface ProductTemplate {
  id: number;
  display_name: string;
  name: string;

  // Images
  image_1920: string | false;
  image_1024: string | false;
  image_512: string | false;
  image_256: string | false;
  image_128: string | false;

  // Category & pricing
  categ_id: Many2One;
  currency_id: Many2One;
  cost_currency_id: Many2One;

  list_price: number;
  standard_price: number;

  // UOM
  uom_id: Many2One;
  uom_ids: One2Many;
  uom_name: string;

  // Company
  company_id: Many2One;

  // Flags
  active: boolean;
  sale_ok: boolean;
  purchase_ok: boolean;

  // Type
  type: "service" | "consu" | "product";

  // Attributes
  attribute_line_ids: number[];
  valid_product_template_attribute_line_ids: number[];

  // Variants
  product_variant_ids: number[];
  product_variant_id: Many2One;
  product_variant_count: number;

  // Stock
  qty_available: number;
  virtual_available: number;
  incoming_qty: number;
  outgoing_qty: number;

  // Accounting
  property_account_income_id: Many2One;
  property_account_expense_id: Many2One;

  // Dates
  create_uid: Many2One;
  create_date: OdooDateTime;
  write_uid: Many2One;
  write_date: OdooDateTime;

  // Misc
  description: string | false;
  description_sale: string | false;
  description_purchase: string | false;

  default_code: string | false;
  barcode: string | false;

  taxes_id: number[];
  supplier_taxes_id: number[];

  // Custom enriched field 👇
  attributes: ProductAttributeLine[];
}

export type Voucher = {
  id: string;
  name: string;
  slug: string;
  color: string;
  available_count: number;

  prices: Price[];

  metadata: Metadata;
};

export type Price = {
  value: string; // API gives string (e.g. "10.0000")
  currency: string; // "USD" | "EUR" | "GBP" (can union if fixed)
  available: number;
};

export type Metadata = {
  group: string;
  group_label: string;
  logo_url: string;
  description: string;
  delivery_hint: string | null;
};

export type TransactionResponse = {
  success: boolean;
  transaction_id: string;
  status: "completed" | "pending" | "failed";
  amount: number;
  currency: string;
  payment_method: string;
  account_number: string;
  customer_name: string;
  reference: string;
  created_at: string;
  completed_at: string;
  provider_reference: string;
  payment_id: number;
  payment_reference: string;
  ecocash_reference: string;
  phone: string;
};