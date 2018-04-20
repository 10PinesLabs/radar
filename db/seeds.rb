# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Radar.create!(
    name: 'Retiro 2015',
    description: 'Descripción del Retiro 2015',
    axes: [
        Axis.new(description: 'Calidad Humana'),
        Axis.new(description: 'Relacion Sincera'),
        Axis.new(description: 'Excelencia Tecnica'),
        Axis.new(description: 'Felicidad'),
        Axis.new(description: 'Fruta'),
        Axis.new(description: 'Cosas Dulces'),
        Axis.new(description: 'Comida')
    ]
)
