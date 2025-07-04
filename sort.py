#!/usr/bin/env python
# coding: utf-8

"""
README.md file sorting utility with ReportLab PDF generation.
Windows-friendly solution.
"""

import os
import sys
import re
from pathlib import Path

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

def generate_reportlab_pdf():
    """Generate PDF using ReportLab"""
    try:
        print("📄 Generating PDF with ReportLab...")
        
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch, cm
        from reportlab.lib.colors import HexColor
        from reportlab.pdfgen import canvas
        
        class NumberedCanvas(canvas.Canvas):
            def __init__(self, *args, **kwargs):
                canvas.Canvas.__init__(self, *args, **kwargs)
                self._saved_page_states = []

            def showPage(self):
                self._saved_page_states.append(dict(self.__dict__))
                self._startPage()

            def save(self):
                num_pages = len(self._saved_page_states)
                for (page_num, page_state) in enumerate(self._saved_page_states):
                    self.__dict__.update(page_state)
                    self.draw_page_number(page_num + 1, num_pages)
                    canvas.Canvas.showPage(self)
                canvas.Canvas.save(self)

            def draw_page_number(self, page_num, total_pages):
                self.setFont("Helvetica", 9)
                self.setFillColor(HexColor("#666666"))
                self.drawRightString(A4[0] - 2*cm, 1.5*cm, f"Page {page_num} of {total_pages}")
                self.drawString(2*cm, 1.5*cm, "Awesome Python")

        # PDF dokument oluştur
        doc = SimpleDocTemplate(
            "awesome-python.pdf",
            pagesize=A4,
            rightMargin=2*cm,
            leftMargin=2*cm,
            topMargin=3*cm,
            bottomMargin=3*cm
        )
        
        # Stiller
        styles = getSampleStyleSheet()
        
        # Özel stiller tanımla
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Title'],
            fontSize=24,
            textColor=HexColor('#d32f2f'),
            spaceAfter=30,
            alignment=1  # Center
        )
        
        heading1_style = ParagraphStyle(
            'CustomHeading1',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=HexColor('#d32f2f'),
            spaceBefore=20,
            spaceAfter=12,
            borderWidth=0,
            borderColor=HexColor('#d32f2f'),
            borderPadding=5
        )
        
        heading2_style = ParagraphStyle(
            'CustomHeading2',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=HexColor('#1976d2'),
            spaceBefore=15,
            spaceAfter=8
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=10,
            leading=14,
            spaceAfter=6
        )
        
        bullet_style = ParagraphStyle(
            'CustomBullet',
            parent=styles['Normal'],
            fontSize=9,
            leading=13,
            leftIndent=20,
            bulletIndent=10,
            spaceAfter=3
        )
        
        # README içeriğini oku
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # PDF içeriğini oluştur
        story = []
        
        # Başlık sayfası
        story.append(Paragraph("🐍 Awesome Python", title_style))
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph("A curated list of awesome Python frameworks, libraries and software", styles['Normal']))
        story.append(Spacer(1, 0.3*inch))
        story.append(Paragraph("Generated automatically from README.md", styles['Italic']))
        story.append(PageBreak())
        
        # İçeriği parse et
        lines = content.split('\n')
        current_section = ""
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Ana başlıklar
            if line.startswith('# ') and not line.startswith('# Awesome Python'):
                title = line[2:].strip()
                # Badge'leri temizle
                title = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', title).strip()
                story.append(Paragraph(title, heading1_style))
                current_section = title
                
            # Alt başlıklar
            elif line.startswith('## '):
                title = line[3:].strip()
                story.append(Paragraph(title, heading2_style))
                
            # Linkler
            elif line.startswith('* [') or line.startswith('- ['):
                # Markdown link'i parse et
                link_match = re.match(r'[*-]\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)', line)
                if link_match:
                    name, url, description = link_match.groups()
                    # URL'yi kısalt
                    display_url = url if len(url) < 50 else url[:47] + "..."
                    text = f'<b>{name}</b> - {description} <i>({display_url})</i>'
                    story.append(Paragraph(text, bullet_style))
                else:
                    # Basit parse
                    text = line[2:].strip()
                    story.append(Paragraph(text, bullet_style))
                    
            # Normal metin
            elif line and not line.startswith(('---', '- - -', 'Inspired by')):
                # Markdown linklerini parse et
                text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<b>\1</b>', line)
                story.append(Paragraph(text, body_style))
        
        # PDF'i oluştur
        doc.build(story, canvasmaker=NumberedCanvas)
        
        print("✅ PDF successfully generated: awesome-python.pdf")
        print(f"📄 File size: {os.path.getsize('awesome-python.pdf')} bytes")
        
    except ImportError:
        print("❌ ReportLab not installed. Install with: pip install reportlab")
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")

def generate_html_pdf():
    """Generate HTML file that can be converted to PDF by browser"""
    try:
        print("📄 Generating HTML file for PDF conversion...")
        
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        html_content = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Awesome Python</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #d32f2f;
            border-bottom: 3px solid #d32f2f;
            padding-bottom: 10px;
            page-break-before: always;
            margin-top: 0;
        }
        h1:first-of-type {
            page-break-before: avoid;
            text-align: center;
            font-size: 2.5em;
        }
        h2 {
            color: #1976d2;
            border-bottom: 2px solid #e3f2fd;
            padding-bottom: 5px;
            margin-top: 30px;
        }
        h3 { color: #388e3c; }
        a { color: #1976d2; text-decoration: none; }
        ul, ol { padding-left: 20px; }
        li { margin: 8px 0; line-height: 1.5; }
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
        }
        .toc { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        @media print {
            .no-print { display: none; }
        }
    </style>
</head>
<body>"""
        
        # Basit markdown -> HTML
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                html_content += '<br>\n'
            elif line.startswith('# '):
                html_content += f'<h1>{line[2:]}</h1>\n'
            elif line.startswith('## '):
                html_content += f'<h2>{line[3:]}</h2>\n'
            elif line.startswith('### '):
                html_content += f'<h3>{line[4:]}</h3>\n'
            elif line.startswith(('* [', '- [')):
                # Link parse
                link_match = re.match(r'[*-]\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)', line)
                if link_match:
                    name, url, description = link_match.groups()
                    html_content += f'<li><a href="{url}"><strong>{name}</strong></a> - {description}</li>\n'
                else:
                    html_content += f'<li>{line[2:]}</li>\n'
            elif line.startswith(('* ', '- ')):
                html_content += f'<li>{line[2:]}</li>\n'
            elif line.startswith(('---', '- - -')):
                html_content += '<hr>\n'
            else:
                html_content += f'<p>{line}</p>\n'
        
        html_content += """
<div class="no-print" style="margin-top: 50px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
    <h3>PDF'e Dönüştürme:</h3>
    <p>Bu sayfayı PDF olarak kaydetmek için:</p>
    <ol>
        <li>Ctrl+P (Print) tuşlarına basın</li>
        <li>Printer olarak "Save as PDF" seçin</li>
        <li>Save butonuna basın</li>
    </ol>
</div>
</body>
</html>"""
        
        with open('awesome-python.html', 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print("✅ HTML file generated: awesome-python.html")
        print("📄 Open this file in browser and use Ctrl+P -> Save as PDF")
        
        # Tarayıcıda aç
        import webbrowser
        webbrowser.open('awesome-python.html')
        
    except Exception as e:
        print(f"❌ Error generating HTML: {e}")

def main():
    """Main function with multiple PDF generation options"""
    print("🔄 Sorting README.md file...")
    
    # Step 1: Apply line-based link sorting
    sorted_content = sort_links_by_line()
    
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(sorted_content)
    
    # Step 2: Apply section-based sorting
    final_content = sort_content_sections()
    
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("✅ README.md file successfully sorted!")
    
    # Step 3: PDF generation options
    if len(sys.argv) > 1 and sys.argv[1] == '--pdf':
        generate_reportlab_pdf()
    elif len(sys.argv) > 1 and sys.argv[1] == '--html':
        generate_html_pdf()
    else:
        print("\n📄 Choose PDF generation method:")
        print("1. ReportLab (Professional, requires installation)")
        print("2. HTML (Simple, works with any browser)")
        print("3. Skip PDF generation")
        
        choice = input("Enter choice (1/2/3): ").strip()
        
        if choice == '1':
            generate_reportlab_pdf()
        elif choice == '2':
            generate_html_pdf()
        else:
            print("PDF generation skipped.")

if __name__ == "__main__":
    main()