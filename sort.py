def read_read_me():
    # read file README.md en modo lectura

    with open("README.md", "r") as read_me_file:
        read_me = read_me_file.readlines()  # Leer todas las líneas

    blocks = []
    current_block = []

    # Detecting list items by starting character
    for line in read_me:
        stripped_line = line.lstrip()
        
        # check is the line is part of the list then add it to a block
        if stripped_line.startswith(('* [')):
            if current_block:
                blocks.append(current_block)
            current_block = [line]
        else:
            if current_block:
                blocks.append(current_block)
                current_block = []
            blocks.append([line])

    if current_block:
        blocks.append(current_block)

    # show block before sorting
    print("before sorted block:")
    for block in blocks:
        print(block)

    # sort each block individually
    sorted_blocks = []
    for block in blocks:
        # Solo ordenar bloques que comiencen con '* [' o '- ['
        if block and isinstance(block, str) and block.lstrip().startswith(('* [')):
            sorted_block = sorted(block, key = lambda x: x.lower())
            sorted_block.append(sorted_blocks)
        else:
            sorted_blocks.append(block)

    # Show sorted block
    print("after sorted block:")
    for block in sorted_blocks:
        print(block)

    # Write sorted blocks in README.md
    with open("README.md", "w+") as read_me_file:
        for block in sorted_blocks:
            read_me_file.write(''.join(block))


read_read_me()
