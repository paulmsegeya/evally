# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# # ================= User =====================

current_user = User.find_or_create_by(email: 'john.doe@example.com') do |user|
  user.password = '1234qwer'
  user.first_name = 'John'
  user.last_name = 'Doe'
end

puts 'john.doe@example.com'
