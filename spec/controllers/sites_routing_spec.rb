require File.dirname(__FILE__) + '/../spec_helper'

describe SitesController do
  describe "route generation" do

    it "should map { :controller => 'sites', :action => 'index' } to /sites" do
      route_for(:controller => "sites", :action => "index").should == "/sites"
    end
  
    it "should map { :controller => 'sites', :action => 'new' } to /sites/new" do
      route_for(:controller => "sites", :action => "new").should == "/sites/new"
    end
  
    it "should map { :controller => 'sites', :action => 'show', :id => 1 } to /sites/1" do
      route_for(:controller => "sites", :action => "show", :id => 1).should == "/sites/1"
    end
  
    it "should map { :controller => 'sites', :action => 'edit', :id => 1 } to /sites/1/edit" do
      route_for(:controller => "sites", :action => "edit", :id => 1).should == "/sites/1/edit"
    end
  
    it "should map { :controller => 'sites', :action => 'update', :id => 1} to /sites/1" do
      route_for(:controller => "sites", :action => "update", :id => 1).should == "/sites/1"
    end
  
    it "should map { :controller => 'sites', :action => 'destroy', :id => 1} to /sites/1" do
      route_for(:controller => "sites", :action => "destroy", :id => 1).should == "/sites/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'sites', action => 'index' } from GET /sites" do
      params_from(:get, "/sites").should == {:controller => "sites", :action => "index"}
    end
  
    it "should generate params { :controller => 'sites', action => 'new' } from GET /sites/new" do
      params_from(:get, "/sites/new").should == {:controller => "sites", :action => "new"}
    end
  
    it "should generate params { :controller => 'sites', action => 'create' } from POST /sites" do
      params_from(:post, "/sites").should == {:controller => "sites", :action => "create"}
    end
  
    it "should generate params { :controller => 'sites', action => 'show', id => '1' } from GET /sites/1" do
      params_from(:get, "/sites/1").should == {:controller => "sites", :action => "show", :id => "1"}
    end
  
    it "should generate params { :controller => 'sites', action => 'edit', id => '1' } from GET /sites/1;edit" do
      params_from(:get, "/sites/1/edit").should == {:controller => "sites", :action => "edit", :id => "1"}
    end
  
    it "should generate params { :controller => 'sites', action => 'update', id => '1' } from PUT /sites/1" do
      params_from(:put, "/sites/1").should == {:controller => "sites", :action => "update", :id => "1"}
    end
  
    it "should generate params { :controller => 'sites', action => 'destroy', id => '1' } from DELETE /sites/1" do
      params_from(:delete, "/sites/1").should == {:controller => "sites", :action => "destroy", :id => "1"}
    end
  end
end