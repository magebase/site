class MakeTenantNullableInAhoyTables < ActiveRecord::Migration[8.0]
  def change
    change_column_null :ahoy_visits, :tenant_id, true
    change_column_null :ahoy_events, :tenant_id, true
  end
end
