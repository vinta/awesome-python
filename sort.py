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

def sort_blocks():
    # First, we load the current README into memory
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.read()

    # Separating the 'table of contents' from the contents (blocks)
    # The README uses the Markdown horizontal-rule delimiter `---` (three dashes) to
    # separate the table of contents from the rest of the document.  Historically
    # the script expected the string "- - -", which no longer exists in the file
    # and therefore caused the split to fail, producing an IndexError and an empty
    # output.  We now look for the correct delimiter and fall back gracefully if
    # it is missing.
    delimiter = "---"
    parts = read_me.split(delimiter, 1)
    if len(parts) == 1:
        # Delimiter not found – keep behaviour unchanged to avoid corrupting file
        table_of_contents, remainder = parts[0], ""
    else:
        table_of_contents, remainder = parts
    blocks = remainder.split('\n# ')
    # restore the delimiter to be re-inserted later exactly as it appeared
    delimiter_with_newlines = f"\n{delimiter}\n"
    for i in range(len(blocks)):
        if i == 0:
            blocks[i] = blocks[i] + '\n'
        else:
            blocks[i] = '# ' + blocks[i] + '\n'

    # Sorting the libraries
    inner_blocks = sorted(blocks[0].split('##'))
    for i in range(1, len(inner_blocks)):
        if inner_blocks[i][0] != '#':
            inner_blocks[i] = '##' + inner_blocks[i]
    inner_blocks = ''.join(inner_blocks)

    # Replacing the non-sorted libraries by the sorted ones and gathering all at the final_README file
    blocks[0] = inner_blocks
    final_README = table_of_contents + delimiter_with_newlines + ''.join(blocks)

    with open('README.md', 'w+') as sorted_file:
        sorted_file.write(final_README)

def main():
    # First, we load the current README into memory as an array of lines
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.readlines()

    # Then we cluster the lines together as blocks
    # Each block represents a collection of lines that should be sorted
    # This was done by assuming only links ([...](...)) are meant to be sorted
    # Clustering is done by indentation
    blocks = []
    last_indent = None
    for line in read_me:
        s_line = line.lstrip()
        indent = len(line) - len(s_line)

        if any([s_line.startswith(s) for s in ['* [', '- [']]):
            if indent == last_indent:
                blocks[-1].append(line)
            else:
                blocks.append([line])
            last_indent = indent
        else:
            blocks.append([line])
            last_indent = None

    with open('README.md', 'w+') as sorted_file:
        # Then all of the blocks are sorted individually
        blocks = [
            ''.join(sorted(block, key=str.lower)) for block in blocks
        ]
        # And the result is written back to README.md
        sorted_file.write(''.join(blocks))

    # Then we call the sorting method
    sort_blocks()


if __name__ == "__main__":
    main()
