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


def main():
    # First, we load the current README into memory
    with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.read()
        
    # Separating the 'table of contents' from the contents (blocks)
    table_of_contents = ''.join(read_me.split('- - -')[0])
    blocks = ''.join(read_me.split('- - -')[1]).split('\n# ')
    for i in range(len(blocks)):
        if i == 0:
            blocks[i] = blocks[i]+'\n'
        else:
            blocks[i] = '#' + blocks[i]+'\n'
                
    # Sorting the libraries         
    inner_blocks = sorted(blocks[0].split('##'))
    for i in range(1 , len(inner_blocks)):
        if inner_blocks[i][0] != '#':
            inner_blocks[i]='##'+inner_blocks[i]
    inner_blocks=''.join(inner_blocks)

    # Replacing the non-sorted libraries by the sorted ones and gathering all at the final_README file
    blocks[0] = inner_blocks
    final_README = table_of_contents + '- - -'+ ''.join(blocks)
    
    with open('README.md', 'w+') as sorted_file:
        sorted_file.write(final_README)


if __name__ == "__main__":
    main()
