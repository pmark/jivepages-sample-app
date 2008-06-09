class JivepagesToVersion8 < ActiveRecord::Migration
  def self.up
    Engines.plugins["jivepages"].migrate(8)
  end

  def self.down
    Engines.plugins["jivepages"].migrate(0)
  end
end
