export type Many2One = [number, string];
export type One2Many = number[];

export interface HomeCategory {
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
