#!/usr/bin/env python
# coding: utf-8

"""
    The approach taken is explained below. I decided to do it simply.
    Initially I was considering parsing the data into some sort of
    structure and then generating an appropriate README. I am still
    considering doing it - but for now this should work. The only issue
    I see is that it only sorts the entries at the lowest level, and that
    the order of the top-level contents do not match the order of the actual
    entries.

    This could be extended by having nested blocks, sorting them recursively
    and flattening the end structure into a list of lines. Revision 2 maybe ^.^.
"""

from __future__ import annotations

def sort_blocks() -> None:
    split_at: str = '- - -'
    first_sep: str = '# '
    second_sep: str = '##'

    with open('README.md', 'r') as read_me_file:
        read_me: str = read_me_file.read()

    table_of_contents, blocks = read_me.split(split_at)
    blocks = [first_sep + i + '\n' for i in blocks.split('\n# ')]
    blocks[0] = blocks[0].removeprefix(first_sep)
    
    # Sorting the libraries   
    inner_blocks: list = sorted(blocks[0].split(second_sep))
    inner_blocks = [second_sep + i for i in inner_blocks if i[0] != '#']
    inner_blocks[0] = inner_blocks[0].removeprefix(second_sep)
    blocks[0] = ''.join(inner_blocks)
    
    # Replacing the non-sorted libraries by the sorted ones and gathering all at the final_README file
    final_README = table_of_contents + split_at + ''.join(blocks)

    with open('README.md', 'w+') as sorted_file:
        sorted_file.write(final_README)

def main() -> None:
    # First, we load the current README into memory as an array of lines
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.readlines()

    # We cluster the lines together as blocks
    # Each block represents a collection of lines that should be sorted.
    # This was done by assuming only links ([...](...)) are meant to be sorted.
    
    # Clustering is done by indentation
    blocks: list[list] = []
    last_indent: int = None
    for line in read_me:
        s_line: str = line.lstrip()
        indent: int = len(line) - len(s_line)

        if any([s_line.startswith(s) for s in ['* [', '- [']]):
            if indent == last_indent:
                blocks[-1].append(line)  # appends to the last list.
            else:
                blocks.append([line])  # appends at the end.
            last_indent = indent
        else:
            blocks.append([line])
            last_indent = None

    with open('README.md', 'w+') as sorted_file:
        # Then all of the blocks are sorted individually
        blocks = [''.join(sorted(block, key=str.lower)) for block in blocks]
        
        # We write it back to README.md
        sorted_file.write(''.join(blocks))

    # Then we call the sorting method
    sort_blocks()


if __name__ == "__main__":
    main()
