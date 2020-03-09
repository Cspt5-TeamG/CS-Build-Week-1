# Sample Python code that can be used to generate rooms in
# a zig-zag pattern.
#
# You can modify generate_rooms() to create your own
# procedural generation algorithm and use print_rooms()
# to see the world.

from adventure.models import Room

room_names = ['Vault of the Forsaken Mage',
 'Vault of the White Knight',
 'Lair of the Ghost Hunter',
 'Catacombs of the Mourning Army',
 'The Abandoned Burrows',
 'The Nether Caverns',
 'The Fallen Legion Lair',
 'The Coral Labyrinth',
 'The Lonely Quarters',
 'The Burned Grotto',
 'Pits of the Frozen Serpent',
 'Delves of the Frozen Jungle',
 'Tunnels of the Cursed Monk',
 'Pits of the Burning Oracle',
 'The Bloodlust Catacombs',
 'The Nether Chambers',
 'The Black Forest Catacombs',
 'The Silent Delves',
 'The Sleeping Haunt',
 'The Hidden Tombs',
 'Vault of the Destroyed Warrior',
 'Tunnels of the Nightmare Hunter',
 'Grotto of the Shunned Morass',
 'Grotto of the Scarlet Jungle',
 'The Narrow Catacombs',
 'The Serene Vault',
 'The Wondering Labyrinth',
 'The Black Forest Dungeon',
 'The Fearsome Dungeon',
 'The Decayed Tombs',
 'Labyrinth of the Uncanny Legion',
 'Tombs of the Vanishing King',
 'Cells of the White Legion',
 'Labyrinth of the Uncanny Forest',
 'The Thundering Burrows',
 'The Broken Curse Quarters',
 'The Lifeless Caverns',
 'The Northern Dungeon',
 'The Howling Caverns',
 'The Thief Delves',
 'Pits of the Cruel Queen',
 'Tunnels of the Black Elf',
 'Quarters of the Black Swamp',
 'Grotto of the Ruthless Morass',
 'The Swamp Pits',
 'The Ogre Cells',
 'The Mocking Grotto',
 'The Withered Crypt',
 'The Moaning Burrows',
 'The Destroyed Haunt',
 'Tombs of the Destroyed Swamp',
 'Quarters of the Hidden Ogre',
 'Haunt of the Conquered Scorpion',
 'Tunnels of the Mourning King',
 'The Deepwood Catacombs',
 'The Desolated Tombs',
 'The Narrow Crypt',
 'The Dream Labyrinth',
 'The Perfumed Catacombs',
 'The Mysterious Cells',
 'Tunnels of the Fallen Scorpion',
 'Lair of the Elemental Goblin',
 'Labyrinth of the Savage Hunter',
 'Caverns of the Forbidden Phoenix',
 'The Violent Maze',
 'The Diamond Crypt',
 'The Fire Mountain Burrows',
 'The Terraced Maze',
 'The Broken Curse Catacombs',
 'The Oblivion Dungeon',
 'Pits of the Golden Orc',
 'Labyrinth of the Poisoned Orc',
 'Cells of the Granite Forest',
 'Cells of the Crystal Lion',
 'The Yawning Grotto',
 'The Mesmerizing Cells',
 'The Phoenix Grotto',
 'The Murky Burrows',
 'The Dreaded Cells',
 'The Living Tunnels',
 'ombs of the Savage Warrior',
 'Tunnels of the Hopeless Occult',
 'Haunt of the Lonely Occult',
 'Haunt of the Silver Occult',
 'The Unknown Tombs',
 'The Wailing Tunnels',
 'The Feared Pits',
 'The Eternal Point',
 'The Mysterious Labyrinth',
 'The Adamantine Pits',
 'Delves of the Forbidden Giant',
 'Tombs of the Silver Emperor',
 'Quarters of the Uncanny Elf',
 'Chambers of the Dark Mountain',
 'The Spirit Vault',
 'The Bare Cells',
 'The Living Dungeon',
 'The Dragonclaw Lair',
 'The Scheming Tunnels',
 'The Crystal Labyrinth']


class World:
    def __init__(self):
        self.grid = None
        self.width = 0
        self.height = 0
    def generate_rooms(self, size_x, size_y, num_rooms):
        '''
        Fill up the grid, bottom to top, in a zig-zag pattern
        '''

        # Initialize the grid
        self.grid = [None] * size_y
        self.width = size_x
        self.height = size_y
        for i in range( len(self.grid) ):
            self.grid[i] = [None] * size_x

        # Start from lower-left corner (0,0)
        x = -1 # (this will become 0 on the first step)
        y = 0
        room_count = 1

        # Start generating rooms to the east
        direction = 1  # 1: east, -1: west


        # While there are rooms to be created...
        previous_room = None
        while room_count < num_rooms:

            # Calculate the direction of the room to be created
            if direction > 0 and x < size_x - 1:
                room_direction = "e"
                x += 1
            elif direction < 0 and x > 0:
                room_direction = "w"
                x -= 1
            else:
                # If we hit a wall, turn north and reverse direction
                room_direction = "n"
                y += 1
                direction *= -1

            # Create a room in the given direction
            room = Room(id=room_count, title=room_names[room_count - 1], description="There is still so much to explore. Keep going!", x=x, y=y)
            # Note that in Django, you'll need to save the room after you create it
            room.save()
            # Save the room in the World grid
            self.grid[y][x] = room

            # Connect the new room to the previous room
            if previous_room is not None:
                previous_room.connectRooms(room, room_direction)

            # Update iteration variables
            previous_room = room
            room_count += 1



    def print_rooms(self):
        '''
        Print the rooms in room_grid in ascii characters.
        '''

        # Add top border
        str = "# " * ((3 + self.width * 5) // 2) + "\n"

        # The console prints top to bottom but our array is arranged
        # bottom to top.
        #
        # We reverse it so it draws in the right direction.
        reverse_grid = list(self.grid) # make a copy of the list
        reverse_grid.reverse()
        for row in reverse_grid:
            # PRINT NORTH CONNECTION ROW
            str += "#"
            for room in row:
                if room is not None and room.n_to is not None:
                    str += "  |  "
                else:
                    str += "     "
            str += "#\n"
            # PRINT ROOM ROW
            str += "#"
            for room in row:
                if room is not None and room.w_to is not None:
                    str += "-"
                else:
                    str += " "
                if room is not None:
                    str += f"{room.id}".zfill(3)
                else:
                    str += "   "
                if room is not None and room.e_to is not None:
                    str += "-"
                else:
                    str += " "
            str += "#\n"
            # PRINT SOUTH CONNECTION ROW
            str += "#"
            for room in row:
                if room is not None and room.s_to is not None:
                    str += "  |  "
                else:
                    str += "     "
            str += "#\n"

        # Add bottom border
        str += "# " * ((3 + self.width * 5) // 2) + "\n"

        # Print string
        print(str)


# w = World()
# num_rooms = 100
# width = 10
# height = 10
# w.generate_rooms(width, height, num_rooms)
# w.print_rooms()


# print(f"\n\nWorld\n  height: {height}\n  width: {width},\n  num_rooms: {num_rooms}\n")
