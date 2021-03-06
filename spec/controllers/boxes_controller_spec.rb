require File.dirname(__FILE__) + '/../spec_helper'

describe BoxesController do
  describe "handling GET /boxes" do

    before(:each) do
      @box = mock_model(Box)
      Box.stub!(:find).and_return([@box])
    end
  
    def do_get
      get :index
    end
  
    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should render index template" do
      do_get
      response.should render_template('index')
    end
  
    it "should find all boxes" do
      Box.should_receive(:find).with(:all).and_return([@box])
      do_get
    end
  
    it "should assign the found boxes for the view" do
      do_get
      assigns[:boxes].should == [@box]
    end
  end

  describe "handling GET /boxes.xml" do

    before(:each) do
      @boxes = mock("Array of Boxes", :to_xml => "XML")
      Box.stub!(:find).and_return(@boxes)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :index
    end
  
    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should find all boxes" do
      Box.should_receive(:find).with(:all).and_return(@boxes)
      do_get
    end
  
    it "should render the found boxes as xml" do
      @boxes.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /boxes/1" do

    before(:each) do
      @box = mock_model(Box)
      Box.stub!(:find).and_return(@box)
    end
  
    def do_get
      get :show, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render show template" do
      do_get
      response.should render_template('show')
    end
  
    it "should find the box requested" do
      Box.should_receive(:find).with("1").and_return(@box)
      do_get
    end
  
    it "should assign the found box for the view" do
      do_get
      assigns[:box].should equal(@box)
    end
  end

  describe "handling GET /boxes/1.xml" do

    before(:each) do
      @box = mock_model(Box, :to_xml => "XML")
      Box.stub!(:find).and_return(@box)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :show, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should find the box requested" do
      Box.should_receive(:find).with("1").and_return(@box)
      do_get
    end
  
    it "should render the found box as xml" do
      @box.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /boxes/new" do

    before(:each) do
      @box = mock_model(Box)
      Box.stub!(:new).and_return(@box)
    end
  
    def do_get
      get :new
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render new template" do
      do_get
      response.should render_template('new')
    end
  
    it "should create an new box" do
      Box.should_receive(:new).and_return(@box)
      do_get
    end
  
    it "should not save the new box" do
      @box.should_not_receive(:save)
      do_get
    end
  
    it "should assign the new box for the view" do
      do_get
      assigns[:box].should equal(@box)
    end
  end

  describe "handling GET /boxes/1/edit" do

    before(:each) do
      @box = mock_model(Box)
      Box.stub!(:find).and_return(@box)
    end
  
    def do_get
      get :edit, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render edit template" do
      do_get
      response.should render_template('edit')
    end
  
    it "should find the box requested" do
      Box.should_receive(:find).and_return(@box)
      do_get
    end
  
    it "should assign the found Box for the view" do
      do_get
      assigns[:box].should equal(@box)
    end
  end

  describe "handling POST /boxes" do

    before(:each) do
      @box = mock_model(Box, :to_param => "1")
      Box.stub!(:new).and_return(@box)
    end
    
    describe "with successful save" do
  
      def do_post
        @box.should_receive(:save).and_return(true)
        post :create, :box => {}
      end
  
      it "should create a new box" do
        Box.should_receive(:new).with({}).and_return(@box)
        do_post
      end

      it "should redirect to the new box" do
        do_post
        response.should redirect_to(box_url("1"))
      end
      
    end
    
    describe "with failed save" do

      def do_post
        @box.should_receive(:save).and_return(false)
        post :create, :box => {}
      end
  
      it "should re-render 'new'" do
        do_post
        response.should render_template('new')
      end
      
    end
  end

  describe "handling PUT /boxes/1" do

    before(:each) do
      @box = mock_model(Box, :to_param => "1")
      Box.stub!(:find).and_return(@box)
    end
    
    describe "with successful update" do

      def do_put
        @box.should_receive(:update_attributes).and_return(true)
        put :update, :id => "1"
      end

      it "should find the box requested" do
        Box.should_receive(:find).with("1").and_return(@box)
        do_put
      end

      it "should update the found box" do
        do_put
        assigns(:box).should equal(@box)
      end

      it "should assign the found box for the view" do
        do_put
        assigns(:box).should equal(@box)
      end

      it "should redirect to the box" do
        do_put
        response.should redirect_to(box_url("1"))
      end

    end
    
    describe "with failed update" do

      def do_put
        @box.should_receive(:update_attributes).and_return(false)
        put :update, :id => "1"
      end

      it "should re-render 'edit'" do
        do_put
        response.should render_template('edit')
      end

    end
  end

  describe "handling DELETE /boxes/1" do

    before(:each) do
      @box = mock_model(Box, :destroy => true)
      Box.stub!(:find).and_return(@box)
    end
  
    def do_delete
      delete :destroy, :id => "1"
    end

    it "should find the box requested" do
      Box.should_receive(:find).with("1").and_return(@box)
      do_delete
    end
  
    it "should call destroy on the found box" do
      @box.should_receive(:destroy)
      do_delete
    end
  
    it "should redirect to the boxes list" do
      do_delete
      response.should redirect_to(boxes_url)
    end
  end
end