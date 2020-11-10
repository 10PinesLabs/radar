require 'rails_helper'

RSpec.describe RadarTemplateContainer, type: :model do

  let(:radar_template_container){create :radar_template_container, owner: owner}
  let(:owner){create :user}
  let(:another_user){create :user}
  let(:yet_another_user){create :user}

  let(:new_name) { "New name" }
  let(:new_description) { "New description" }
  let(:should_share) { false }
  let(:received_user) { owner }

  let!(:radar_template) { create :radar_template, radar_template_container: radar_template_container}
  let!(:another_radar_template) { create :radar_template, radar_template_container: radar_template_container}

  def filter_axes_attrs(axes)
    return axes.map {|axis| axis.attributes.except("id", "updated_at", "created_at", "radar_template_id")}
  end

  describe '#clone_container!' do

    subject do
      radar_template_container.clone_container!(received_user, new_name, new_description, share: should_share)
    end

    context "if everything is all right" do

      before do
        radar_template_container.add_user owner, another_user
        radar_template_container.add_user owner, yet_another_user
      end

      it "creates a new radar template container with the same owner and new name and description" do
        expect(RadarTemplateContainer.count).to eq 1
        cloned_container = subject
        expect(RadarTemplateContainer.count).to eq 2
        expect(cloned_container.name).to eq new_name
        expect(cloned_container.description).to eq new_description
        expect(cloned_container.owner).to eq radar_template_container.owner
        expect(cloned_container.users.to_a).to contain_exactly()
      end

      it "creates the same set of radar templates but different instances" do
        expect(RadarTemplate.count).to eq 2
        cloned_container = subject
        expect(RadarTemplate.count).to eq 4
        expect(cloned_container.radar_templates.count).to eq 2
      end

      it "the cloned templates have the same data as the original ones" do
        cloned_container = subject

        first_cloned_template = cloned_container.radar_templates.first
        second_cloned_template = cloned_container.radar_templates.second

        expect(first_cloned_template.name).to eq radar_template.name
        expect(first_cloned_template.description).to eq radar_template.description
        expect(filter_axes_attrs(first_cloned_template.axes)).to match_array(filter_axes_attrs(radar_template.axes))

        expect(second_cloned_template.name).to eq another_radar_template.name
        expect(second_cloned_template.description).to eq another_radar_template.description
        expect(filter_axes_attrs(second_cloned_template.axes)).to match_array(filter_axes_attrs(another_radar_template.axes))
      end

      it "the cloned templates will have the owner of cloned container as owner" do
        cloned_container = subject

        first_cloned_template = cloned_container.radar_templates.first
        second_cloned_template = cloned_container.radar_templates.second
        expect(first_cloned_template.owner).to eq radar_template_container.owner
        expect(second_cloned_template.owner).to eq radar_template_container.owner
      end

      it "the cloned templates wont have any radars because they start from scratch without voting information" do
        cloned_container = subject
        expect(cloned_container.radar_templates.first.radars).to be_empty
        expect(cloned_container.radar_templates.second.radars).to be_empty
      end

      context "regarding share flag" do

        context "if set to true" do
          let(:should_share) { true }

          it "the cloned container will have the same set of users as the original one" do
            cloned_container = subject
            expect(cloned_container.users).to match_array(radar_template_container.users)
          end
        end

        context "if set to false" do
          let(:should_share) { false }

          it "the cloned container wont have any users set" do
            cloned_container = subject
            expect(cloned_container.users).to be_empty
          end
        end

        context "if not passed" do
          subject do
            radar_template_container.clone_container!(received_user, new_name, new_description)
          end

          it "the cloned container wont have any users set" do
            cloned_container = subject
            expect(cloned_container.users).to be_empty
          end
        end
      end

    end

    context "if the passed user does not own the container" do

      let(:received_user) { another_user }

      it "fails with the expected error" do
        expect{subject}.to raise_error(RuntimeError, Ownerable::OWNER_ERROR)
      end

      it "does not clone the container" do
        radar_template_container
        expect(RadarTemplateContainer.count).to eq 1
        expect(RadarTemplate.count).to eq 2
        subject
        fail("The test should have been failed")
      rescue RuntimeError
        expect(RadarTemplateContainer.count).to eq 1
        expect(RadarTemplate.count).to eq 2
      end
    end

    context "if the received name already exists" do

      let(:new_name) { radar_template_container.name }

      it "fails with the expected error" do
        expect{subject}.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: Name has already been taken")
      end

      it "does not clone the container" do
        radar_template_container
        expect(RadarTemplateContainer.count).to eq 1
        expect(RadarTemplate.count).to eq 2
        subject
        fail("The test should have been failed")
      rescue ActiveRecord::RecordInvalid
        expect(RadarTemplateContainer.count).to eq 1
        expect(RadarTemplate.count).to eq 2
      end
    end

  end
end
