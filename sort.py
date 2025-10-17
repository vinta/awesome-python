#!/usr/bin/env python
# coding: utf-8

"""
Enhanced README.md to PDF converter with beautiful design
Modern, professional layout with improved typography and visual elements
"""

import os
import sys
import re
from pathlib import Path
from datetime import datetime

def sort_links_by_line():
    """Groups and sorts link lines in README based on indentation level."""
    with open('README.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    blocks = []
    current_block = []
    current_indent = None
    
    for line in lines:
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        
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
    
    sorted_blocks = []
    for block in blocks:
        if len(block) > 1 and block[0].lstrip().startswith(('* [', '- [')):
            sorted_blocks.append(sorted(block, key=str.lower))
        else:
            sorted_blocks.append(block)
    
    return ''.join([''.join(block) for block in sorted_blocks])

def sort_content_sections():
    """Separates content into TOC and main sections, then sorts subsections."""
    with open('README.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '- - -' in content:
        toc, main_content = content.split('- - -', 1)
        
        sections = main_content.split('\n# ')
        
        if sections:
            first_section = sections[0]
            subsections = first_section.split('##')
            
            if len(subsections) > 1:
                header = subsections[0]
                sorted_subs = sorted(subsections[1:], key=str.lower)
                sections[0] = header + '##' + '##'.join(sorted_subs)
        
        if len(sections) > 1:
            main_content = sections[0] + '\n# ' + '\n# '.join(sections[1:])
        else:
            main_content = sections[0]
        
        return toc + '- - -' + main_content
    
    return content

def generate_premium_pdf():
    """Generate a premium-quality PDF with modern design"""
    try:
        print("🎨 Generating Premium PDF with modern design...")
        
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, 
                                      PageBreak, Table, TableStyle, KeepTogether,
                                      Image, Flowable)
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch, cm, mm
        from reportlab.lib.colors import HexColor, Color
        from reportlab.pdfgen import canvas
        from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
        from reportlab.platypus.tableofcontents import TableOfContents
        
        class ModernCanvas(canvas.Canvas):
            def __init__(self, *args, **kwargs):
                canvas.Canvas.__init__(self, *args, **kwargs)
                self._saved_page_states = []
                self.page_count = 0

            def showPage(self):
                self._saved_page_states.append(dict(self.__dict__))
                self._startPage()

            def save(self):
                num_pages = len(self._saved_page_states)
                for (page_num, page_state) in enumerate(self._saved_page_states):
                    self.__dict__.update(page_state)
                    self.draw_page_elements(page_num + 1, num_pages)
                    canvas.Canvas.showPage(self)
                canvas.Canvas.save(self)

            def draw_page_elements(self, page_num, total_pages):
                # Modern header with gradient effect
                self.setFillColor(HexColor('#f8f9fa'))
                self.rect(0, A4[1] - 2*cm, A4[0], 2*cm, fill=1, stroke=0)
                
                # Header line
                self.setStrokeColor(HexColor('#e74c3c'))
                self.setLineWidth(3)
                self.line(2*cm, A4[1] - 2*cm, A4[0] - 2*cm, A4[1] - 2*cm)
                
                # Footer with modern styling
                self.setFillColor(HexColor('#2c3e50'))
                self.rect(0, 0, A4[0], 1.5*cm, fill=1, stroke=0)
                
                # Page number with modern typography
                self.setFillColor(HexColor('#ffffff'))
                self.setFont("Helvetica-Bold", 10)
                self.drawRightString(A4[0] - 2*cm, 0.5*cm, f"{page_num}")
                
                # Document title in footer
                self.setFillColor(HexColor('#ffffff'))
                self.setFont("Helvetica", 9)
                self.drawString(2*cm, 0.5*cm, "🐍 Awesome Python - Curated List")
                
                # Decorative elements
                self.setFillColor(HexColor('#3498db'))
                self.circle(1*cm, A4[1] - 1*cm, 3*mm, fill=1, stroke=0)
                self.setFillColor(HexColor('#e74c3c'))
                self.circle(A4[0] - 1*cm, A4[1] - 1*cm, 3*mm, fill=1, stroke=0)

        class ColoredBox(Flowable):
            def __init__(self, width, height, color):
                self.width = width
                self.height = height
                self.color = color
                
            def draw(self):
                self.canv.setFillColor(self.color)
                self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

        # PDF document setup
        doc = SimpleDocTemplate(
            "awesome-python-premium.pdf",
            pagesize=A4,
            rightMargin=2.5*cm,
            leftMargin=2.5*cm,
            topMargin=3.5*cm,
            bottomMargin=3*cm
        )
        
        # Enhanced styles
        styles = getSampleStyleSheet()
        
        # Cover page title
        cover_title = ParagraphStyle(
            'CoverTitle',
            parent=styles['Title'],
            fontSize=36,
            textColor=HexColor('#2c3e50'),
            spaceAfter=20,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        # Cover subtitle
        cover_subtitle = ParagraphStyle(
            'CoverSubtitle',
            parent=styles['Normal'],
            fontSize=16,
            textColor=HexColor('#3498db'),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Oblique'
        )
        
        # Modern heading styles
        heading1_style = ParagraphStyle(
            'ModernHeading1',
            parent=styles['Heading1'],
            fontSize=20,
            textColor=HexColor('#2c3e50'),
            spaceBefore=25,
            spaceAfter=15,
            fontName='Helvetica-Bold',
            borderWidth=0,
            borderColor=HexColor('#e74c3c'),
            borderPadding=0,
            leftIndent=0
        )
        
        heading2_style = ParagraphStyle(
            'ModernHeading2',
            parent=styles['Heading2'],
            fontSize=16,
            textColor=HexColor('#34495e'),
            spaceBefore=18,
            spaceAfter=10,
            fontName='Helvetica-Bold',
            leftIndent=5
        )
        
        heading3_style = ParagraphStyle(
            'ModernHeading3',
            parent=styles['Heading3'],
            fontSize=14,
            textColor=HexColor('#7f8c8d'),
            spaceBefore=12,
            spaceAfter=8,
            fontName='Helvetica-Bold'
        )
        
        # Enhanced body text
        body_style = ParagraphStyle(
            'ModernBody',
            parent=styles['Normal'],
            fontSize=11,
            leading=16,
            spaceAfter=8,
            fontName='Helvetica',
            textColor=HexColor('#2c3e50'),
            alignment=TA_JUSTIFY
        )
        
        # Modern bullet style with icons
        bullet_style = ParagraphStyle(
            'ModernBullet',
            parent=styles['Normal'],
            fontSize=10,
            leading=15,
            leftIndent=25,
            bulletIndent=15,
            spaceAfter=5,
            fontName='Helvetica',
            textColor=HexColor('#2c3e50')
        )
        
        # Info box style
        info_box_style = ParagraphStyle(
            'InfoBox',
            parent=styles['Normal'],
            fontSize=10,
            leading=14,
            spaceAfter=10,
            fontName='Helvetica',
            textColor=HexColor('#2c3e50'),
            borderWidth=1,
            borderColor=HexColor('#3498db'),
            borderPadding=10,
            backColor=HexColor('#ecf0f1')
        )
        
        # Read README content
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Build PDF content
        story = []
        
        # Cover page
        story.append(Spacer(1, 2*inch))
        story.append(Paragraph("🐍", cover_title))
        story.append(Paragraph("Awesome Python", cover_title))
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph("A Curated List of Awesome Python Frameworks, Libraries and Software", cover_subtitle))
        story.append(Spacer(1, 0.3*inch))
        story.append(Paragraph("Professional Edition", cover_subtitle))
        story.append(Spacer(1, 1*inch))
        
        # Add modern info box
        current_date = datetime.now().strftime("%B %d, %Y")
        info_text = f"""
        <b>Document Information:</b><br/>
        Generated: {current_date}<br/>
        Source: README.md<br/>
        Format: Premium PDF<br/>
        Pages: Auto-generated
        """
        story.append(Paragraph(info_text, info_box_style))
        story.append(PageBreak())
        
        # Parse content
        lines = content.split('\n')
        toc_entries = []
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Main headings
            if line.startswith('# ') and not line.startswith('# Awesome Python'):
                title = line[2:].strip()
                # Clean badges
                title = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', title).strip()
                title = re.sub(r'!\[.*?\]\(.*?\)', '', title).strip()
                
                # Add section divider
                story.append(ColoredBox(15*cm, 3*mm, HexColor('#e74c3c')))
                story.append(Spacer(1, 5*mm))
                story.append(Paragraph(title, heading1_style))
                toc_entries.append((title, 1))
                
            # Subheadings
            elif line.startswith('## '):
                title = line[3:].strip()
                title = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', title).strip()
                
                # Add subtle divider
                story.append(ColoredBox(10*cm, 1*mm, HexColor('#3498db')))
                story.append(Spacer(1, 2*mm))
                story.append(Paragraph(title, heading2_style))
                toc_entries.append((title, 2))
                
            # Sub-subheadings
            elif line.startswith('### '):
                title = line[4:].strip()
                story.append(Paragraph(title, heading3_style))
                toc_entries.append((title, 3))
                
            # Links with enhanced formatting
            elif line.startswith('* [') or line.startswith('- ['):
                link_match = re.match(r'[*-]\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)', line)
                if link_match:
                    name, url, description = link_match.groups()
                    
                    # Clean description
                    description = description.strip()
                    if description.startswith('- '):
                        description = description[2:]
                    
                    # Create styled link entry
                    if len(url) > 60:
                        display_url = url[:57] + "..."
                    else:
                        display_url = url
                    
                    # Enhanced link format with icon
                    text = f'''
                    <b><font color="#e74c3c">▶</font> <font color="#2c3e50">{name}</font></b><br/>
                    <font color="#7f8c8d">{description}</font><br/>
                    <font color="#3498db" size="8"><i>{display_url}</i></font>
                    '''
                    
                    story.append(Paragraph(text, bullet_style))
                    story.append(Spacer(1, 3*mm))
                    
            # Regular text
            elif line and not line.startswith(('---', '- - -', 'Inspired by', 'Contribution')):
                # Handle markdown links
                text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<font color="#3498db"><b>\1</b></font>', line)
                # Handle bold text
                text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
                # Handle italic text
                text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
                
                story.append(Paragraph(text, body_style))
        
        # Add footer info
        story.append(PageBreak())
        story.append(Spacer(1, 2*inch))
        story.append(Paragraph("Document Generation Complete", heading2_style))
        story.append(Spacer(1, 0.5*inch))
        
        footer_info = f"""
        This document was automatically generated from README.md using a premium Python script.
        The content includes a curated list of awesome Python frameworks, libraries, and software.
        
        <b>Statistics:</b><br/>
        • Generated on: {current_date}<br/>
        • Total sections: {len([t for t in toc_entries if t[1] == 1])}<br/>
        • Processing time: Optimized for quality<br/>
        • Format: Professional PDF with modern styling
        """
        story.append(Paragraph(footer_info, info_box_style))
        
        # Generate PDF
        doc.build(story, canvasmaker=ModernCanvas)
        
        file_size = os.path.getsize('awesome-python-premium.pdf')
        print(f"✅ Premium PDF generated successfully!")
        print(f"📄 File: awesome-python-premium.pdf")
        print(f"📊 Size: {file_size:,} bytes ({file_size/1024:.1f} KB)")
        print(f"🎨 Features: Modern design, colored sections, enhanced typography")
        
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("💡 Install with: pip install reportlab")
    except Exception as e:
        print(f"❌ Error generating premium PDF: {e}")

def generate_modern_html():
    """Generate modern HTML with CSS animations and responsive design"""
    try:
        print("🌐 Generating Modern HTML with animations...")
        
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐍 Awesome Python - Modern Edition</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.7;
            color: #2c3e50;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
            animation: slide 20s linear infinite;
        }
        
        @keyframes slide {
            0% { transform: translateX(-50px) translateY(-50px); }
            100% { transform: translateX(0px) translateY(0px); }
        }
        
        .header h1 {
            font-size: 3.5em;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .section {
            margin: 40px 0;
            padding: 30px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-left: 5px solid #3498db;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        h1 {
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 20px;
            position: relative;
            padding-left: 20px;
        }
        
        h1::before {
            content: '🐍';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.8em;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-60%) scale(1.1); }
        }
        
        h2 {
            color: #34495e;
            font-size: 2em;
            margin: 30px 0 15px 0;
            padding: 15px 20px;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
        }
        
        h2::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        h2:hover::after {
            left: 100%;
        }
        
        h3 {
            color: #7f8c8d;
            font-size: 1.5em;
            margin: 20px 0 10px 0;
            padding: 10px 15px;
            background: #ecf0f1;
            border-radius: 8px;
            border-left: 4px solid #95a5a6;
        }
        
        .link-item {
            margin: 15px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #e74c3c;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .link-item::before {
            content: '▶';
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #e74c3c;
            font-size: 1.2em;
            transition: transform 0.3s ease;
        }
        
        .link-item:hover {
            background: #ffffff;
            transform: translateX(10px);
            box-shadow: 0 5px 20px rgba(231,76,60,0.2);
        }
        
        .link-item:hover::before {
            transform: translateY(-50%) scale(1.2);
        }
        
        .link-name {
            font-size: 1.1em;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            margin-left: 25px;
        }
        
        .link-description {
            color: #7f8c8d;
            margin-bottom: 8px;
            margin-left: 25px;
        }
        
        .link-url {
            font-size: 0.9em;
            color: #3498db;
            font-family: 'Courier New', monospace;
            background: #ecf0f1;
            padding: 4px 8px;
            border-radius: 4px;
            margin-left: 25px;
        }
        
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            border-radius: 15px;
            text-align: center;
        }
        
        .stat-item {
            flex: 1;
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            display: block;
        }
        
        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }
        
        .footer {
            text-align: center;
            padding: 40px 20px;
            background: #2c3e50;
            color: white;
            border-radius: 15px;
            margin-top: 40px;
        }
        
        .print-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 1.1em;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(231,76,60,0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .print-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(231,76,60,0.4);
        }
        
        @media print {
            body { background: white; }
            .container { background: white; box-shadow: none; }
            .print-button { display: none; }
        }
        
        @media (max-width: 768px) {
            .container { margin: 10px; padding: 15px; }
            .header h1 { font-size: 2.5em; }
            .stats { flex-direction: column; gap: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐍 Awesome Python</h1>
            <p>A Curated List of Awesome Python Frameworks, Libraries and Software</p>
        </div>
        
        <div class="stats">
            <div class="stat-item">
                <span class="stat-number" id="section-count">0</span>
                <span class="stat-label">Sections</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="library-count">0</span>
                <span class="stat-label">Libraries</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="generated-date">''' + datetime.now().strftime("%Y") + '''</span>
                <span class="stat-label">Generated</span>
            </div>
        </div>
'''
        
        # Parse markdown content
        lines = content.split('\n')
        section_count = 0
        library_count = 0
        current_section = None
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Main headings
            if line.startswith('# ') and not line.startswith('# Awesome Python'):
                if current_section:
                    html_content += '</div>\n'
                
                title = line[2:].strip()
                title = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', title).strip()
                
                html_content += f'<div class="section">\n<h1>{title}</h1>\n'
                current_section = title
                section_count += 1
                
            # Subheadings
            elif line.startswith('## '):
                title = line[3:].strip()
                title = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', title).strip()
                html_content += f'<h2>{title}</h2>\n'
                
            # Sub-subheadings
            elif line.startswith('### '):
                title = line[4:].strip()
                html_content += f'<h3>{title}</h3>\n'
                
            # Links
            elif line.startswith('* [') or line.startswith('- ['):
                link_match = re.match(r'[*-]\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)', line)
                if link_match:
                    name, url, description = link_match.groups()
                    description = description.strip()
                    if description.startswith('- '):
                        description = description[2:]
                    
                    display_url = url if len(url) < 60 else url[:57] + "..."
                    
                    html_content += f'''
                    <div class="link-item">
                        <div class="link-name">{name}</div>
                        <div class="link-description">{description}</div>
                        <div class="link-url">{display_url}</div>
                    </div>
                    '''
                    library_count += 1
                    
            # Regular text
            elif line and not line.startswith(('---', '- - -', 'Inspired by')):
                text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" style="color: #3498db; text-decoration: none; font-weight: bold;">\1</a>', line)
                text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
                text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
                html_content += f'<p style="margin: 15px 0; color: #2c3e50;">{text}</p>\n'
        
        if current_section:
            html_content += '</div>\n'
        
        # Add footer
        html_content += f'''
        <div class="footer">
            <h3>🎯 Document Complete</h3>
            <p>This modern, responsive document was generated from README.md</p>
            <p>Total sections: {section_count} | Libraries: {library_count} | Generated: {datetime.now().strftime("%B %d, %Y")}</p>
        </div>
    </div>
    
    <button class="print-button" onclick="window.print()">
        📄 Print/Save PDF
    </button>
    
    <script>
        // Update statistics
        document.getElementById('section-count').textContent = '{section_count}';
        document.getElementById('library-count').textContent = '{library_count}';
        
        // Smooth scrolling for links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {{
            anchor.addEventListener('click', function (e) {{
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({{
                    behavior: 'smooth'
                }});
            }});
        }});
        
        // Add fade-in animation for sections
        const observerOptions = {{
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }};
        
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }}
            }});
        }}, observerOptions);
        
        // Apply animation to sections
        document.querySelectorAll('.section').forEach(section => {{
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }});
        
        // Dynamic counter animation
        function animateCounters() {{
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {{
                const target = parseInt(counter.textContent);
                if (target > 0) {{
                    const increment = target / 30;
                    let current = 0;
                    const timer = setInterval(() => {{
                        current += increment;
                        if (current >= target) {{
                            counter.textContent = target;
                            clearInterval(timer);
                        }} else {{
                            counter.textContent = Math.ceil(current);
                        }}
                    }}, 50);
                }}
            }});
        }}
        
        // Run counter animation when page loads
        window.addEventListener('load', animateCounters);
        
        // Add hover effects for links
        document.querySelectorAll('.link-item').forEach(item => {{
            item.addEventListener('mouseenter', function() {{
                this.style.borderLeftColor = '#2ecc71';
            }});
            item.addEventListener('mouseleave', function() {{
                this.style.borderLeftColor = '#e74c3c';
            }});
        }});
    </script>
</body>
</html>'''
        
        with open('awesome-python-modern.html', 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✅ Modern HTML generated successfully!")
        print(f"📄 File: awesome-python-modern.html")
        print(f"🎨 Features: Animations, responsive design, interactive elements")
        print(f"📊 Statistics: {section_count} sections, {library_count} libraries")
        
        # Open in browser
        import webbrowser
        file_path = os.path.abspath('awesome-python-modern.html')
        webbrowser.open(f'file://{file_path}')
        
    except Exception as e:
        print(f"❌ Error generating modern HTML: {e}")

def generate_interactive_dashboard():
    """Generate an interactive dashboard with charts and statistics"""
    try:
        print("📊 Generating Interactive Dashboard...")
        
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Analyze content for statistics
        lines = content.split('\n')
        categories = {}
        total_links = 0
        
        current_category = None
        for line in lines:
            line = line.strip()
            if line.startswith('## ') and not line.startswith('## Contents'):
                current_category = line[3:].strip()
                current_category = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', current_category).strip()
                categories[current_category] = 0
            elif (line.startswith('* [') or line.startswith('- [')) and current_category:
                categories[current_category] += 1
                total_links += 1
        
        dashboard_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐍 Awesome Python Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #2c3e50;
        }}
        
        .dashboard {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }}
        
        .header {{
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }}
        
        .header h1 {{
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .stat-card {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }}
        
        .stat-card:hover {{
            transform: translateY(-5px);
        }}
        
        .stat-value {{
            font-size: 3em;
            font-weight: bold;
            color: #3498db;
            margin-bottom: 10px;
        }}
        
        .stat-label {{
            font-size: 1.1em;
            color: #7f8c8d;
        }}
        
        .charts-container {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .chart-card {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        
        .chart-title {{
            font-size: 1.5em;
            margin-bottom: 20px;
            color: #2c3e50;
            text-align: center;
        }}
        
        .top-categories {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        
        .category-item {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin: 10px 0;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #3498db;
        }}
        
        .category-name {{
            font-weight: bold;
            color: #2c3e50;
        }}
        
        .category-count {{
            background: #3498db;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
        }}
        
        @media (max-width: 768px) {{
            .charts-container {{
                grid-template-columns: 1fr;
            }}
            .header h1 {{
                font-size: 2em;
            }}
        }}
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🐍 Awesome Python Dashboard</h1>
            <p>Interactive Analytics & Statistics</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">{total_links}</div>
                <div class="stat-label">Total Libraries</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{len(categories)}</div>
                <div class="stat-label">Categories</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{max(categories.values()) if categories else 0}</div>
                <div class="stat-label">Largest Category</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{round(total_links / len(categories) if categories else 0, 1)}</div>
                <div class="stat-label">Avg per Category</div>
            </div>
        </div>
        
        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-title">📊 Category Distribution</div>
                <canvas id="categoryChart"></canvas>
            </div>
            <div class="chart-card">
                <div class="chart-title">📈 Library Count by Category</div>
                <canvas id="barChart"></canvas>
            </div>
        </div>
        
        <div class="top-categories">
            <h2 style="margin-bottom: 20px; color: #2c3e50;">🏆 Top Categories</h2>'''
        
        # Sort categories by count
        sorted_categories = sorted(categories.items(), key=lambda x: x[1], reverse=True)[:10]
        
        for category, count in sorted_categories:
            dashboard_html += f'''
            <div class="category-item">
                <span class="category-name">{category}</span>
                <span class="category-count">{count}</span>
            </div>'''
        
        # Prepare data for charts
        chart_labels = [cat[0][:20] + '...' if len(cat[0]) > 20 else cat[0] for cat in sorted_categories[:8]]
        chart_data = [cat[1] for cat in sorted_categories[:8]]
        
        dashboard_html += f'''
        </div>
    </div>
    
    <script>
        // Category Pie Chart
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        new Chart(categoryCtx, {{
            type: 'doughnut',
            data: {{
                labels: {chart_labels},
                datasets: [{{
                    data: {chart_data},
                    backgroundColor: [
                        '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
                        '#9b59b6', '#1abc9c', '#34495e', '#e67e22'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }}]
            }},
            options: {{
                responsive: true,
                plugins: {{
                    legend: {{
                        position: 'bottom'
                    }}
                }}
            }}
        }});
        
        // Bar Chart
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {{
            type: 'bar',
            data: {{
                labels: {chart_labels},
                datasets: [{{
                    label: 'Number of Libraries',
                    data: {chart_data},
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    borderRadius: 5
                }}]
            }},
            options: {{
                responsive: true,
                scales: {{
                    y: {{
                        beginAtZero: true,
                        grid: {{
                            color: 'rgba(0,0,0,0.1)'
                        }}
                    }},
                    x: {{
                        grid: {{
                            display: false
                        }}
                    }}
                }},
                plugins: {{
                    legend: {{
                        display: false
                    }}
                }}
            }}
        }});
        
        // Animate counters
        function animateCounters() {{
            document.querySelectorAll('.stat-value').forEach(counter => {{
                const target = parseFloat(counter.textContent);
                const increment = target / 50;
                let current = 0;
                const timer = setInterval(() => {{
                    current += increment;
                    if (current >= target) {{
                        counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                        clearInterval(timer);
                    }} else {{
                        counter.textContent = current % 1 === 0 ? Math.ceil(current) : current.toFixed(1);
                    }}
                }}, 30);
            }});
        }}
        
        window.addEventListener('load', animateCounters);
    </script>
</body>
</html>'''
        
        with open('awesome-python-dashboard.html', 'w', encoding='utf-8') as f:
            f.write(dashboard_html)
        
        print(f"✅ Interactive Dashboard generated!")
        print(f"📄 File: awesome-python-dashboard.html")
        print(f"📊 Features: Interactive charts, statistics, responsive design")
        print(f"🏆 Top category: {sorted_categories[0][0]} ({sorted_categories[0][1]} items)")
        
        # Open dashboard
        import webbrowser
        file_path = os.path.abspath('awesome-python-dashboard.html')
        webbrowser.open(f'file://{file_path}')
        
    except Exception as e:
        print(f"❌ Error generating dashboard: {e}")

def main():
    """Enhanced main function with multiple beautiful output options"""
    print("🎨 Enhanced README Processor with Beautiful Design Options")
    print("=" * 60)
    
    if not os.path.exists('README.md'):
        print("❌ README.md file not found!")
        return
    
    print("🔄 Sorting README.md file...")
    
    # Apply sorting
    sorted_content = sort_links_by_line()
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(sorted_content)
    
    final_content = sort_content_sections()
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("✅ README.md file successfully sorted!")
    
    # Enhanced options menu
    if len(sys.argv) > 1:
        option = sys.argv[1].lower()
        if option == '--premium-pdf':
            generate_premium_pdf()
        elif option == '--modern-html':
            generate_modern_html()
        elif option == '--dashboard':
            generate_interactive_dashboard()
        elif option == '--all':
            generate_premium_pdf()
            generate_modern_html()
            generate_interactive_dashboard()
    else:
        print("\n🎨 Choose your beautiful output format:")
        print("1. 📄 Premium PDF (Professional design with ReportLab)")
        print("2. 🌐 Modern HTML (Responsive with animations)")
        print("3. 📊 Interactive Dashboard (Charts and statistics)")
        print("4. 🎯 Generate All Formats")
        print("5. Skip generation")
        
        choice = input("\nEnter choice (1-5): ").strip()
        
        if choice == '1':
            generate_premium_pdf()
        elif choice == '2':
            generate_modern_html()
        elif choice == '3':
            generate_interactive_dashboard()
        elif choice == '4':
            print("\n🚀 Generating all formats...")
            generate_premium_pdf()
            generate_modern_html()
            generate_interactive_dashboard()
            print("\n🎉 All formats generated successfully!")
        else:
            print("Generation skipped.")

if __name__ == "__main__":
    main()