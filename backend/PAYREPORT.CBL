       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYROLL-REPORT.
       AUTHOR. XOLANI-V.
      
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT PAYROLL-FILE ASSIGN TO "PAYROLL.DAT"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS PAYROLL-KEY
               FILE STATUS IS PAY-FILE-STATUS.
      
           SELECT REPORT-FILE ASSIGN TO "PAYREPORT.TXT"
               ORGANIZATION IS LINE SEQUENTIAL.
      
       DATA DIVISION.
       FILE SECTION.
      
       FD PAYROLL-FILE.
       01 PAYROLL-RECORD.
          05 PAYROLL-KEY.
             10 EMP-ID            PIC X(10).
             10 PAY-DATE          PIC X(10).
          05 PAY-DETAILS.
             10 BASIC-PAY         PIC 9(7)V99.
             10 OVERTIME-PAY      PIC 9(7)V99.
             10 BONUS-PAY         PIC 9(7)V99.
             10 LEAVE-DAYS        PIC 99.
             10 GROSS-PAY         PIC 9(7)V99.
             10 TAX-AMOUNT        PIC 9(7)V99.
             10 OTHER-DEDUCTIONS  PIC 9(7)V99.
             10 NET-PAY           PIC 9(7)V99.
             10 PAY-STATUS        PIC X(1).
      
       FD REPORT-FILE.
       01 REPORT-LINE             PIC X(200).
      
       WORKING-STORAGE SECTION.
       01 WS-TOTALS.
          05 WS-TOTAL-NET-PAY     PIC 9(9)V99 VALUE 0.
      
       01 WS-TOTAL-LINE.
          05 WS-TOTAL-STRING      PIC X(200).
      
       01 WS-END-OF-FILE          PIC X       VALUE 'N'.
       01 PAY-FILE-STATUS         PIC XX.
      
       PROCEDURE DIVISION.
      
       MAIN-PROCESS.
           PERFORM OPEN-FILES
           PERFORM WRITE-HEADER
           PERFORM PROCESS-PAYROLL UNTIL WS-END-OF-FILE = 'Y'
           PERFORM WRITE-TOTALS
           PERFORM CLOSE-FILES
           STOP RUN.
      
       OPEN-FILES.
           OPEN INPUT PAYROLL-FILE
           IF PAY-FILE-STATUS NOT = '00'
              DISPLAY "ERROR OPENING PAYROLL FILE: "
                      PAY-FILE-STATUS
              STOP RUN
           END-IF
      
           OPEN OUTPUT REPORT-FILE.
      
       WRITE-HEADER.
           MOVE
             "EMP-ID|PAY-DATE|BASIC|OVERTIME|BONUS|LEAVE|GROSS|TAX|NET"
              TO REPORT-LINE
           WRITE REPORT-LINE.
      
       PROCESS-PAYROLL.
           READ PAYROLL-FILE NEXT RECORD
           AT END
              MOVE 'Y' TO WS-END-OF-FILE
           NOT AT END
               PERFORM PROCESS-RECORD
           END-READ.
      
       PROCESS-RECORD.
           STRING
              EMP-ID DELIMITED BY SIZE
              "|"
              PAY-DATE DELIMITED BY SIZE
              "|"
              BASIC-PAY DELIMITED BY SIZE
              "|"
              OVERTIME-PAY DELIMITED BY SIZE
              "|"
              BONUS-PAY DELIMITED BY SIZE
              "|"
              LEAVE-DAYS DELIMITED BY SIZE
              "|"
              GROSS-PAY DELIMITED BY SIZE
              "|"
              TAX-AMOUNT DELIMITED BY SIZE
              "|"
              NET-PAY DELIMITED BY SIZE
              INTO REPORT-LINE
           END-STRING
           WRITE REPORT-LINE
      
           ADD NET-PAY TO WS-TOTAL-NET-PAY.
      
       WRITE-TOTALS.
           STRING "TOTAL NET PAY: |" DELIMITED BY SIZE
                  WS-TOTAL-NET-PAY DELIMITED BY SIZE
              INTO WS-TOTAL-STRING
           END-STRING

           MOVE WS-TOTAL-STRING TO REPORT-LINE
           WRITE REPORT-LINE.
      
       CLOSE-FILES.
           CLOSE PAYROLL-FILE
           CLOSE REPORT-FILE.
      
       END PROGRAM PAYROLL-REPORT.