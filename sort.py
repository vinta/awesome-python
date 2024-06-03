#!/usr/bin/env python
# coding: utf-8

"""
This script sorts the entries in the README.md file. It clusters the lines 
into blocks based on indentation and sorts each block individually. 
"""

def sort_readme():
    # Load the current README into memory as an array of lines
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.readlines()

    # Cluster lines into blocks based on indentation
    blocks = []
    current_block = []
    last_indent = None
    
    for line in read_me:
        stripped_line = line.lstrip()
        indent = len(line) - len(stripped_line)
        
        # Detecting list items by starting character
        if stripped_line.startswith(('* [', '- [')):
            if indent == last_indent:
                current_block.append(line)
            else:
                if current_block:
                    blocks.append(current_block)
                current_block = [line]
            last_indent = indent
        else:
            if current_block:
                blocks.append(current_block)
                current_block = []
            blocks.append([line])
            last_indent = None

    if current_block:
        blocks.append(current_block)
    
    # Sort each block individually
    sorted_blocks = []
    for block in blocks:
        if block[0].lstrip().startswith(('* [', '- [')):
            sorted_blocks.append(sorted(block, key=lambda s: s.lower()))
        else:
            sorted_blocks.append(block)
    
    # Write the sorted blocks back to the README.md file
    with open('README.md', 'w') as sorted_file:
        for block in sorted_blocks:
            sorted_file.write(''.join(block))

if __name__ == "__main__":
    sort_readme()
#!/usr/bin/env python
# coding: utf-8

"""
This script sorts the entries in the README.md file. It clusters the lines 
into blocks based on indentation and sorts each block individually. 
"""

def sort_readme():
    # Load the current README into memory as an array of lines
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.readlines()

    # Cluster lines into blocks based on indentation
    blocks = []
    current_block = []
    last_indent = None
    
    for line in read_me:
        stripped_line = line.lstrip()
        indent = len(line) - len(stripped_line)
        
        # Detecting list items by starting character
        if stripped_line.startswith(('* [', '- [')):
            if indent == last_indent:
                current_block.append(line)
            else:
                if current_block:
                    blocks.append(current_block)
                current_block = [line]
            last_indent = indent
        else:
            if current_block:
                blocks.append(current_block)
                current_block = []
            blocks.append([line])
            last_indent = None

    if current_block:
        blocks.append(current_block)
    
    # Sort each block individually
    sorted_blocks = []
    for block in blocks:
        if block[0].lstrip().startswith(('* [', '- [')):
            sorted_blocks.append(sorted(block, key=lambda s: s.lower()))
        else:
            sorted_blocks.append(block)
    
    # Write the sorted blocks back to the README.md file
    with open('README.md', 'w') as sorted_file:
        for block in sorted_blocks:
            sorted_file.write(''.join(block))

if __name__ == "__main__":
    sort_readme()
