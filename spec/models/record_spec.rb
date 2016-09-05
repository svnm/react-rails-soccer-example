require 'rails_helper'

describe Record do

  describe 'title' do
    it 'should have a single record.' do
      record = create(:record)
      expect(Record.count).to eq(1)
    end

    it 'will create a record with a title' do
      record = create(:record)
      record.title = 'what a title'
      record.valid?
      expect(record.title).to eq 'what a title'
    end
  end
end
