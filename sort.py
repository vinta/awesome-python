#!/usr/bin/env python
# coding: utf-8

"""
README.md file sorting utility for organizing markdown links and sections.

This script provides two main sorting approaches:
1. Line-based link sorting: Groups and sorts links by indentation level
2. Section-based sorting: Separates content into TOC and main sections, 
   then sorts subsections within the main content area

The implementation focuses on maintaining the original structure while
ensuring alphabetical ordering of link entries and subsections.
"""

def sort_links_by_line():
    """
    Groups and sorts link lines in README based on indentation level.
    
    This function processes the README.md file line by line, identifying
    markdown links (starting with '* [' or '- [') and grouping them by
    their indentation level. Each group is then sorted alphabetically.
    
    Returns:
        str: The complete file content with sorted link blocks
    """
    with open('README.md', 'r') as f:
        lines = f.readlines()
    
    blocks = []
    current_block = []
    current_indent = None
    
    for line in lines:
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        
        # Check if the line is a markdown link
        if stripped.startswith(('* [', '- [')):
            if indent == current_indent:
                current_block.append(line)
            else:
                if current_block:
                    blocks.append(current_block)
                current_block = [line]
                current_indent = indent
        else:
            if current_block:
                blocks.append(current_block)
                current_block = []
            blocks.append([line])
            current_indent = None
    
    if current_block:
        blocks.append(current_block)
    
    # Sort each block containing multiple links
    sorted_blocks = []
    for block in blocks:
        if len(block) > 1 and block[0].lstrip().startswith(('* [', '- [')):
            sorted_blocks.append(sorted(block, key=str.lower))
        else:
            sorted_blocks.append(block)
    
    return ''.join([''.join(block) for block in sorted_blocks])

def sort_content_sections():
    """
    Separates content into Table of Contents and main sections, then sorts subsections.
    
    This function splits the README content at the '- - -' separator, treating
    the first part as the Table of Contents and the second part as the main content.
    It then sorts the subsections within the first main section (typically the
    library listing section).
    
    Returns:
        str: The complete file content with sorted subsections
    """
    with open('README.md', 'r') as f:
        content = f.read()
    
    # Split content into TOC and main sections
    if '- - -' in content:
        toc, main_content = content.split('- - -', 1)
        
        # Split main content into sections
        sections = main_content.split('\n# ')
        
        # Process the first section (library listing)
        if sections:
            first_section = sections[0]
            subsections = first_section.split('##')
            
            # Sort subsections alphabetically
            if len(subsections) > 1:
                header = subsections[0]
                sorted_subs = sorted(subsections[1:], key=str.lower)
                sections[0] = header + '##' + '##'.join(sorted_subs)
        
        # Reconstruct the main content
        if len(sections) > 1:
            main_content = sections[0] + '\n# ' + '\n# '.join(sections[1:])
        else:
            main_content = sections[0]
        
        return toc + '- - -' + main_content
    
    return content

def main():
    """
    Main function that applies both sorting methods sequentially.
    
    This function orchestrates the sorting process by:
    1. First applying line-based link sorting
    2. Then applying section-based sorting
    3. Writing the final sorted content to the README.md file
    """
    print("Sorting README.md file...")
    
    # Step 1: Apply line-based link sorting
    sorted_content = sort_links_by_line()
    
    with open('README.md', 'w') as f:
        f.write(sorted_content)
    
    # Step 2: Apply section-based sorting
    final_content = sort_content_sections()
    
    with open('README.md', 'w') as f:
        f.write(final_content)
    
    print("README.md file successfully sorted!")


if __name__ == "__main__":
    main()