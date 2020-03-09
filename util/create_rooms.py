from util.sample_generator import World
from adventure.models import Player
w = World()
num_rooms = 100
width = 10
height = 10
w.generate_rooms(width, height, num_rooms)
w.print_rooms()

players = Player.objects.all()

for p in players:
    p.currentRoom = 1
    p.save()