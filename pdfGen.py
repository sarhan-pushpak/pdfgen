from fastapi import FastAPI
from fpdf import FPDF
import time
import xlsxwriter
import uvicorn
from typing import List

app = FastAPI()
#  
@app.post('/pdf')
async def pdfGen(data: List):
#   === PDF GENERATE ===
    # pdf = FPDF()
    # pdf = FPDF()
    # pdf.add_page()
    # pdf.set_font("Times", size=7)
    # line_height = pdf.font_size * 2.5
    # col_width = pdf.epw / 6
    # for row in data:
    #     for datum in row:
    #         pdf.multi_cell(col_width, line_height, datum, border=1,
    #                 new_x="RIGHT", new_y="TOP", max_line_height=pdf.font_size)
    #     pdf.ln(line_height)


    TABLE_COL_NAMES = ("Id","VehicleNumber","EntryGate","ExitGate", "EntryTime", "ExitTime")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Times", size=16)
    line_height = pdf.font_size * 2
    col_width = pdf.epw / 4  # distribute content evenly

    def render_table_header():
        pdf.set_font(style="B")  # enabling bold text
        for col_name in TABLE_COL_NAMES:
            pdf.cell(col_width, line_height, col_name, border=1)
        pdf.ln(line_height)
        pdf.set_font(style="")  # disabling bold text

    render_table_header()
    for _ in range(10):  # repeat data rows
        for row in data:
            if pdf.will_page_break(line_height):
                render_table_header()
            for datum in row:
                pdf.cell(col_width, line_height, datum, border=1)
            pdf.ln(line_height)

    t = time.localtime()
    pdfName= time.strftime("%H%M%S", t)
    pdf.output( f'{pdfName}.pdf')

#   === EXCEL GENERATE ===
    tempName= time.strftime("%H%M%S", t)
    workbook_name = f'{tempName}.xlsx'
    workbook = xlsxwriter.Workbook(workbook_name)  
    worksheet = workbook.add_worksheet("firstSheet")
    for index, header in enumerate(["Id","VehicleNumber","EntryGate","ExitGate", "EntryTime", "ExitTime"]):
        worksheet.write(0, index, str(header).capitalize())
    for index1, entry in enumerate(data):
        for index2, header in enumerate(["Id","VehicleNumber","EntryGate","ExitGate","EntryTime","ExitTime"]):
            worksheet.write(index1+1, index2, entry[header])
    workbook.close()
    return [pdfName,workbook_name]

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
