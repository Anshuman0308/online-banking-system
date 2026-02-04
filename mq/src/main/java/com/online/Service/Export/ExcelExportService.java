package com.online.Service.Export;

import com.online.Entity.Account;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelExportService {

    public ByteArrayInputStream exportAccountsToExcel(List<Account> accounts) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Accounts");
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("ID");
            headerRow.createCell(1).setCellValue("Account Holder Name");
            headerRow.createCell(2).setCellValue("Balance");
            
            // Create data rows
            int rowIdx = 1;
            for (Account account : accounts) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(account.getId());
                row.createCell(1).setCellValue(account.getAccountHolderName());
                row.createCell(2).setCellValue(account.getBalance().doubleValue());
            }
            
            // Auto size columns
            for (int i = 0; i < 3; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Error generating Excel file", e);
        }
    }
}