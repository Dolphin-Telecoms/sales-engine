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

  variant_id: number;
  variant_name: string;

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

export interface Product {
  id: number;
  display_name: string;
  image_1920: boolean | string;
  image_1024: boolean | string;
  image_512: boolean | string;
  image_256: boolean | string;
  image_128: boolean | string;

  activity_ids: number[];
  activity_state: boolean | string;
  activity_user_id: boolean | [number, string];
  activity_type_id: boolean | [number, string];
  activity_type_icon: boolean | string;
  activity_date_deadline: boolean | string;
  my_activity_date_deadline: boolean | string;
  activity_summary: boolean | string;
  activity_exception_decoration: boolean | string;
  activity_exception_icon: boolean | string;
  activity_calendar_event_id: boolean | number;

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

  name: string;
  sequence: number;

  description: string;
  description_purchase: boolean | string;
  description_sale: boolean | string;

  type: string;

  combo_ids: number[];

  service_tracking: string;

  categ_id: [number, string];
  currency_id: [number, string];
  cost_currency_id: [number, string];

  list_price: number;
  standard_price: number;

  volume: number;
  volume_uom_name: string;

  weight: number;
  weight_uom_name: string;

  sale_ok: boolean;
  purchase_ok: boolean;

  uom_id: [number, string];
  uom_ids: number[];
  uom_name: string;

  company_id: boolean | number;

  seller_ids: number[];
  variant_seller_ids: number[];

  active: boolean;
  color: number;

  is_product_variant: boolean;

  attribute_line_ids: number[];
  valid_product_template_attribute_line_ids: number[];

  product_variant_ids: number[];
  product_variant_id: [number, string];

  product_variant_count: number;

  barcode: boolean | string;
  default_code: boolean | string;

  pricelist_rule_ids: number[];

  product_document_ids: number[];
  product_document_count: number;

  can_image_1024_be_zoomed: boolean;
  has_configurable_attributes: boolean;
  is_dynamically_created: boolean;

  product_tooltip: string;

  is_favorite: boolean;

  product_tag_ids: number[];
  product_properties: unknown[];

  create_uid: [number, string];
  create_date: string;

  write_uid: [number, string];
  write_date: string;

  taxes_id: number[];
  tax_string: string;

  supplier_taxes_id: number[];

  property_account_income_id: boolean | number;
  property_account_expense_id: boolean | number;

  account_tag_ids: number[];

  fiscal_country_codes: string;

  is_storable: boolean;

  responsible_id: [number, string];

  property_stock_production: [number, string];
  property_stock_inventory: [number, string];

  sale_delay: number;

  tracking: string;

  lot_sequence_id: [number, string];

  serial_prefix_format: string;
  next_serial: string;

  description_picking: boolean | string;
  description_pickingout: boolean | string;
  description_pickingin: boolean | string;

  qty_available: number;
  virtual_available: number;
  incoming_qty: number;
  outgoing_qty: number;

  location_id: boolean | number;
  warehouse_id: boolean | number;

  has_available_route_ids: boolean;

  route_ids: number[];

  nbr_moves_in: number;
  nbr_moves_out: number;

  nbr_reordering_rules: number;

  reordering_min_qty: number;
  reordering_max_qty: number;

  route_from_categ_ids: number[];

  show_on_hand_qty_status_button: boolean;
  show_forecasted_qty_status_button: boolean;
  show_qty_update_button: boolean;

  hs_code: boolean | string;

  can_be_expensed: boolean;

  bom_line_ids: number[];
  bom_ids: number[];

  bom_count: number;
  used_in_bom_count: number;

  mrp_product_qty: number;

  is_kits: boolean;

  purchased_product_qty: number;

  purchase_method: string;

  purchase_line_warn_msg: boolean | string;

  cost_method: string;
  valuation: string;

  lot_valuated: boolean;

  property_price_difference_account_id: boolean | number;

  version: number;

  eco_count: number;
  eco_ids: number[];

  service_type: string;

  sale_line_warn_msg: boolean | string;

  expense_policy: string;
  visible_expense_policy: boolean;

  sales_count: number;

  invoice_policy: string;

  optional_product_ids: number[];

  service_to_purchase: boolean;

  expense_policy_tooltip: boolean | string;

  recurring_invoice: boolean;
  allow_one_time_sale: boolean;
  allow_prorated_price: boolean;

  subscription_rule_ids: number[];
  subscription_rule_ids_fixed: number[];

  display_subscription_pricing: boolean;

  project_id: boolean | number;
  project_template_id: boolean | number;
  task_template_id: boolean | number;

  service_policy: boolean | string;

  service_upsell_threshold: number;
  service_upsell_threshold_ratio: boolean | number;

  allow_worksheets: boolean;

  worksheet_template_id: boolean | number;

  attributes: unknown[];
}
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

  product_properties_definition: unknown[];

  // Audit
  create_uid: Many2One;
  create_date: string;

  write_uid: Many2One;
  write_date: string;

  // Accounting
  property_account_income_categ_id: Many2One | false;

  property_account_expense_categ_id: Many2One | false;
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
  status: "completed" | "pending" | "failed" | "cancelled" | "processing";
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


export interface AirtimeBundle {
  BundleId: number;
  BrandId: number;
  Network: string;
  ProductCode: string;
  Amount: number;
  Name: string;
  Description: string;
  ValidityPeriod: number;
}