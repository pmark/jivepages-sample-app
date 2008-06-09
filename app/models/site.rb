class Site < ActiveRecord::Base
  validates_presence_of :user
  has_many :jivepages
  belongs_to :user
  
  
  #
  #
  #
  def user_can_edit?(user)
    
  end
  
end
