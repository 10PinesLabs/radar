namespace :radars do
  desc 'Generate votes for a given radar and iso information'
  task :generate_votes_from_iso_data, %i[radar_id file_path] => :environment do |_, args|
    file = File.open(args.file_path)
    iso_data = file.read

    def get_and_update_points(aux_points, axis_id)
      axis_data = aux_points.find{|axis_data| axis_data[:axis_id] === axis_id}
      returned_points = nil
      while returned_points.nil?
        possible_point = rand(5)
        if axis_data[:available_points][possible_point] > 0
          returned_points = possible_point + 1
          axis_data[:available_points][possible_point] = axis_data[:available_points][possible_point] - 1
        end
      end
      returned_points
    end

    def validate_all_axes_have_same_count!(data, amount_of_votes)
      raise RuntimeError.new("Hay aristas con cantidades distintas") unless data.map{|data| data[:available_points].sum}.all?{|axis_count| axis_count === amount_of_votes}
    end

    Radar.transaction do
      radar = Radar.find(args.radar_id)
      # this basically makes a copy of iso data to avoid messing that up
      aux_points = YAML.load(iso_data).map{|axis_data| {axis_id: axis_data["axis_id"], available_points: axis_data["votes"].map{|vote_number| vote_number.to_i}}}
      amount_of_votes = aux_points[0][:available_points].sum
      validate_all_axes_have_same_count!(aux_points, amount_of_votes)

      amount_of_votes.to_i.times do
        answers = aux_points.map do |axis_data|
          #this will generate one answer per axis
          points = get_and_update_points(aux_points, axis_data[:axis_id])
          puts("Creating answer: axisID: #{axis_data[:axis_id]}, points: #{points}, radar: #{radar.id}")
          Answer.new(axis_id: axis_data[:axis_id], points: points, radar: radar)
        end
        Vote.create!(answers: answers)

        puts("Created vote. Answers: #{answers.each{|answer| puts("| axis_id: #{answer.axis_id}, points: #{answer.points}|")}}")
        puts("Aux Points: #{aux_points.map{|axis| puts("|axis_id: #{axis[:axis_id]}, available_points: #{axis[:available_points]}|")}}")
      end

    end



  end
end
