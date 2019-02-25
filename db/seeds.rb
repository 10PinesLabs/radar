# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

radar_2015 = Radar.create!(
  name: 'Retiro 2015',
  description: 'Descripción del Retiro 2015',
  axes: [
    Axis.new(name: 'Calidad Humana', description: 'Descripcion arista Calidad Humana'),
    Axis.new(name: 'Relacion Sincera', description: 'Descripcion arista Relacion Sincera'),
    Axis.new(name: 'Excelencia Tecnica', description: 'Descripcion arista Excelencia Tecnica'),
    Axis.new(name: 'Felicidad', description: 'Descripcion arista Felicidad'),
    Axis.new(name: 'Fruta', description: 'Descripcion arista Fruta'),
    Axis.new(name: 'Cosas Dulces', description: 'Descripcion arista Cosas Dulces'),
    Axis.new(name: 'Comida', description: 'Descripcion arista Comida')
  ]
)

radar_2016 = Radar.create!(
  name: 'Retiro 2016',
  description: 'Descripción del Retiro 2016',
  axes: [
    Axis.new(name: 'Calidad Humana', description: 'Descripcion arista Calidad Humana'),
    Axis.new(name: 'Relacion Sincera', description: 'Descripcion arista Relacion Sincera'),
    Axis.new(name: 'Excelencia Tecnica', description: 'Descripcion arista Excelencia Tecnica'),
    Axis.new(name: 'Felicidad', description: 'Descripcion arista Felicidad'),
    Axis.new(name: 'Fruta', description: 'Descripcion arista Fruta'),
    Axis.new(name: 'Cosas Dulces', description: 'Descripcion arista Cosas Dulces'),
    Axis.new(name: 'Comida', description: 'Descripcion arista Comida')
  ]
)

radar_2017 = Radar.create!(
  name: 'Retiro 2017',
  description: 'Descripción del Retiro 2017',
  axes: [
    Axis.new(name: 'Calidad Humana', description: 'Descripcion arista Calidad Humana'),
    Axis.new(name: 'Relacion Sincera', description: 'Descripcion arista Relacion Sincera'),
    Axis.new(name: 'Excelencia Tecnica', description: 'Descripcion arista Excelencia Tecnica'),
    Axis.new(name: 'Felicidad', description: 'Descripcion arista Felicidad'),
    Axis.new(name: 'Fruta', description: 'Descripcion arista Fruta'),
    Axis.new(name: 'Cosas Dulces', description: 'Descripcion arista Cosas Dulces'),
    Axis.new(name: 'Comida', description: 'Descripcion arista Comida')
  ]
)