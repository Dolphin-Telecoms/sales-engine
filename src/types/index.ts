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
