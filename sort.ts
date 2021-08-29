#!/usr/bin/env python
# coding: utf-8


   sort_blocks():
     with open('README.md', 'r') as read_me_file:
        read_me = read_me_file.read()
 

    table_of_contents = ''.join(read_me.split('- - -')[0])
    blocks = ''.join(read_me.split('- - -')[1]).split('\n# ')
       i  range(len(blocks)):
          i == 0:
            blocks[i] = blocks[i] + '\n'
            :
            blocks[i] = '# ' + blocks[i] + '\n'

    
    inner_blocks = sorted(blocks[0].split('##'))
       i in range(1, len(inner_blocks)):
          inner_blocks[i][0] != '#':
            inner_blocks[i] = '##' + inner_blocks[i]
    inner_blocks = ''.join(inner_blocks)


    blocks[0] = inner_blocks
    final_README = table_of_contents + '- - -' + ''.join(blocks)

    with open('README.md', 'w+')  sorted_file:
        sorted_file.write(final_README)

    ():
    
        open('README.md', 'r')   read_me_file:
        read_me = read_me_file.readlines()

    

    blocks = []
    last_indent = None
        line   read_me:
        s_line = line.lstrip()
        indent = len(line) - len(s_line)

         any([s_line.startswith(s)    s    ['* [', '- [']]):
             indent == last_indent:
                blocks[-1].append(line)
                :
                blocks.append([line])
                        = indent
            :
            blocks.append([line])
                        = None

    with open('README.md', 'w+') as sorted_file:
        
        blocks = [
            ''.join(sorted(block, key=str.lower)) for block in blocks
        ]
        
        sorted_file.write(''.join(blocks))

    
    sort_blocks()


if __name__ == "__main__":
    main()
