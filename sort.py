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
import re
from typing import List

def sort_blocks():
    """Sort the main content blocks of the README file."""
    try:
        # Read the current README
        with open('README.md', 'r', encoding='utf-8') as read_me_file:
            read_me = read_me_file.read()

        # Split into table of contents and content blocks
        parts = read_me.split('- - -', 1)
        if len(parts) < 2:
            print("No content separator found (- - -)")
            return
            
        table_of_contents = parts[0]
        content_blocks = parts[1].split('\n# ')
        
        # Ensure proper formatting for each block
        formatted_blocks = []
        for i, block in enumerate(content_blocks):
            if i == 0:
                formatted_blocks.append(block + '\n')
            else:
                formatted_blocks.append('# ' + block + '\n')

        # Sort the libraries section (first block)
        if formatted_blocks:
            inner_sections = formatted_blocks[0].split('##')
            if len(inner_sections) > 1:
                # Sort alphabetically, case-insensitive
                sorted_sections = sorted(inner_sections[1:], key=lambda x: x.strip().lower())
                # Add the header back to each section
                sorted_sections = ['##' + section for section in sorted_sections]
                formatted_blocks[0] = inner_sections[0] + ''.join(sorted_sections)

        # Reconstruct the README
        final_README = table_of_contents + '- - -' + ''.join(formatted_blocks)

        # Write the sorted content back to the file
        with open('README.md', 'w', encoding='utf-8') as sorted_file:
            sorted_file.write(final_README)
            
    except FileNotFoundError:
        print("Error: README.md file not found.")
    except Exception as e:
        print(f"An error occurred during block sorting: {e}")


def sort_bullet_points():
    """Sort bullet points within the README file."""
    try:
        # Read the current README
        with open('README.md', 'r', encoding='utf-8') as read_me_file:
            read_me_lines = read_me_file.readlines()

        # Cluster lines into blocks based on indentation
        blocks = []
        current_block = []
        last_indent = None
        
        for line in read_me_lines:
            stripped_line = line.lstrip()
            indent = len(line) - len(stripped_line)
            
            # Check if this is a bullet point
            is_bullet_point = any(stripped_line.startswith(prefix) for prefix in ['* [', '- ['])
            
            if is_bullet_point and indent == last_indent:
                current_block.append(line)
            else:
                if current_block:
                    blocks.append(current_block)
                current_block = [line]
                last_indent = indent if is_bullet_point else None

        if current_block:
            blocks.append(current_block)

        # Sort each block alphabetically, case-insensitive
        sorted_blocks = []
        for block in blocks:
            if len(block) > 1 and any(line.lstrip().startswith(('* [', '- [')) for line in block):
                sorted_blocks.append(sorted(block, key=lambda x: x.strip().lower()))
            else:
                sorted_blocks.append(block)

        # Write the sorted content back to the file
        with open('README.md', 'w', encoding='utf-8') as sorted_file:
            for block in sorted_blocks:
                sorted_file.write(''.join(block))
                
    except FileNotFoundError:
        print("Error: README.md file not found.")
    except Exception as e:
        print(f"An error occurred during bullet point sorting: {e}")


def main():
    """Main function to execute the sorting process."""
    print("Sorting README content...")
    sort_bullet_points()
    sort_blocks()
    print("README sorting completed.")


if __name__ == "__main__":
    main()
