import random

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.connected_rooms = {}

    def connect(self, room, direction):
        self.connected_rooms[direction] = room

    def get_directions(self):
        return list(self.connected_rooms.keys())

    def get_next_room(self, direction):
        return self.connected_rooms.get(direction)

class Player:
    def __init__(self):
        self.current_room = None

    def move(self, direction):
        next_room = self.current_room.get_next_room(direction)
        if next_room:
            self.current_room = next_room
            print(f"You are now in the {next_room.name}.")
        else:
            print("You can't go that way.")

def create_rooms():
    room1 = Room("Entrance", "You stand at the entrance of a mysterious cave.")
    room2 = Room("Cave Passage", "You are in a dark, winding passage.")
    room3 = Room("Treasure Room", "You've found a room filled with glittering treasure!")
    room4 = Room("Dead End", "This is a dead-end. Nothing interesting here.")

    room1.connect(room2, "east")
    room2.connect(room1, "west")
    room2.connect(room3, "north")
    room3.connect(room2, "south")

    return room1

def main():
    print("Welcome to the Text-Based Adventure Game!")
    player = Player()
    player.current_room = create_rooms()
    
    while True:
        print(player.current_room.description)
        directions = player.current_room.get_directions()
        print("Available directions: " + ", ".join(directions))
        
        choice = input("Where do you want to go? (Type 'quit' to exit): ").lower()
        
        if choice == "quit":
            print("Thanks for playing!")
            break
        elif choice in directions:
            player.move(choice)
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
