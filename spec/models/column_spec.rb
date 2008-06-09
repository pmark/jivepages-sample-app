require File.dirname(__FILE__) + '/../spec_helper'

describe Column, "being created" do
  before(:each) do
    @column = Column.create!
  end

  it "should be valid" do
    @column.should be_valid
  end    
end

describe Column, "in a row" do
  before(:each) do
    @jivepage = Jivepage.create!
    @row = Row.create!(:jivepage => @jivepage)
    @column1 = Column.create!(:row => @row)
    @column2 = Column.create!(:row => @row)
    @box1 = @column1.create_box!
    @box2 = @column2.create_box!
  end

  it "should receive all boxes from another column"

  it "should delete its boxes when being deleted" do
    @column1.boxes.size.should == 1
    lambda {
      @column1.destroy
    }.should change(Box, :count).by(-1)
  end
end

