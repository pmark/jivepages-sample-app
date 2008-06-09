steps_for(:guest_creating_page) do
  
  # Scenario: Guest creating their first Jivepage
  Given "a guest user" do
    # no-op
  end
  
  When "they navigate to the homepage" do
    get '/'
  end
  
  Then "there should be a link to create a new page" do
    response.should have_tag('input[type=submit]')
    response.should have_tag('form[action=?]', jivepages_path)
  end
  
  When "they click the new page button" do
    @jivepage_count = Jivepage.count
    post jivepages_path
  end
  
  Then "they should be redirected to the Page Editor" do
    response.should be_redirect
  end

  Then "a new page should be created" do
    Jivepage.count.should == @jivepage_count + 1
    @jivepage = Jivepage.find(:all).last
  end
  
  Then "it should have $rows row, $cols column and $boxes textblock box" do |rows, cols, boxes|
    @jivepage.rows.size.should == rows.to_i
    @jivepage.rows.first.columns.size.should == cols.to_i
    @jivepage.rows.first.columns.first.boxes.size.should == boxes.to_i
  end

  Then "it should have one big column" do
    get edit_jivepage_path(@jivepage)
    response.should have_tag('div[class=column]', :count => 1)
  end
  
  Then "it should have one textblock" do
    response.should have_tag('div[class*=textblock]', :count => 1)
  end
  
  Then "the textblock should have some default text" do
    txt = /InPlaceEditor/
    response.should have_tag('div[class*=textblock]', :text => txt)
  end
  

  # Scenario: Guest reformatting a row
  Given "a new page in edit mode" do
    post jivepages_path
    @jivepage = Jivepage.find(:all).last
    get edit_jivepage_path(@jivepage)
  end
  
  When "the user splits the row into halves" do
    id = @jivepage.rows.first.id
    put "/rows/format/#{id}", {:grid_type => "5050"}#, :authenticity_token => token}    
  end
   
  Then "the page should have 2 columns" do
  end
  


  # Scenario: Guest adding a textblock to their new page
  Given "a new page in edit mode" do
    post jivepages_path
    @jivepage = Jivepage.find(:all).last
    get edit_jivepage_path(@jivepage)
  end
  
  When "the user clicks the column" do
  end
  
  Then "the content menu appears" do
  end
  
  Then "it appears at the mouse pointer position" do
  end
  
  Then "the content menu has a text icon" do
  end
  
  When "the user clicks the text icon" do
  end
  
  Then "a textblock appears in edit state" do
  end
  
  
end