namespace :radar_template_containers do
  desc 'Creates samples of votings for a container'
  task :sample_votings, %i[container_id user_id amount_of_votings amount_of_votes_per_voting] => :environment do |_, args|
    RadarTemplateContainer.transaction do
      container = RadarTemplateContainer.find(args.container_id)
      user = User.find(args.user_id)
      date = DateTime.now

      [*1..args.amount_of_votings.to_i].each_with_index do |_, index|
        date = date + 1.month
        puts "Generating Voting n#{index + 1}"
        voting = Voting.generate!(container, "#{index + 1}° Voting", date)
        voting.radars.each do |radar|
          [*1..args.amount_of_votes_per_voting.to_i].each do
            puts "Generating vote for Voting n#{index + 1}"
            Vote.create!(answers: radar.axes.map { |axis| Answer.new(axis_id: axis.id, points: [1,2,3,4,5].sample, radar: radar) })
          end
        end
        container.close_active_voting user
      end
    end
  end
end
