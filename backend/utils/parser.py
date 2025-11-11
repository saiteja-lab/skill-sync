import pdfplumber
import docx2txt
import os

def extract_text(file):
    filename = file.filename
    if filename.endswith('.pdf'):
        with pdfplumber.open(file) as pdf:
            return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    elif filename.endswith('.docx'):
        return docx2txt.process(file)
    else:
        return file.read().decode('utf-8')
