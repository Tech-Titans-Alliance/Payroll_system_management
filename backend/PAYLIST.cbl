       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYLIST.
       AUTHOR. YOUR-NAME.
       
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT PAYROLL-FILE ASSIGN TO "PAYROLL.DAT"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS PAYROLL-KEY
               FILE STATUS IS PAY-FILE-STATUS.
               
           SELECT INPUT-FILE ASSIGN TO "PAYSLIP.IN"
               ORGANIZATION IS LINE SEQUENTIAL.
               
           SELECT OUTPUT-FILE ASSIGN TO "PAYLIST.OUT"
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
       
       FD INPUT-FILE.
       01 INPUT-RECORD            PIC X(10).
       
       FD OUTPUT-FILE.
       01 OUTPUT-RECORD           PIC X(10).
       
       WORKING-STORAGE SECTION.
       01 WS-EMPLOYEE-ID          PIC X(10).
       01 WS-END-OF-FILE          PIC X       VALUE 'N'.
       01 PAY-FILE-STATUS         PIC XX.
       
       PROCEDURE DIVISION.
       MAIN-PROCESS.
           PERFORM GET-EMPLOYEE-ID
           PERFORM OPEN-FILES
           PERFORM LIST-PAYSLIPS
           PERFORM CLOSE-FILES
           STOP RUN.
       
       GET-EMPLOYEE-ID.
           OPEN INPUT INPUT-FILE
           READ INPUT-FILE INTO WS-EMPLOYEE-ID
           CLOSE INPUT-FILE.
       
       OPEN-FILES.
           OPEN INPUT PAYROLL-FILE
           IF PAY-FILE-STATUS NOT = '00'
              DISPLAY "ERROR OPENING PAYROLL FILE: " PAY-FILE-STATUS
              STOP RUN.
               
           OPEN OUTPUT OUTPUT-FILE.
       
       LIST-PAYSLIPS.
           MOVE WS-EMPLOYEE-ID TO EMP-ID
           START PAYROLL-FILE KEY IS EQUAL TO EMP-ID
           INVALID KEY
                   MOVE 'Y' TO WS-END-OF-FILE
           END-START
           
           PERFORM UNTIL WS-END-OF-FILE = 'Y'
                   READ PAYROLL-FILE NEXT RECORD
                   AT END
                      MOVE 'Y' TO WS-END-OF-FILE
                   NOT AT END
                       IF EMP-ID = WS-EMPLOYEE-ID
                          MOVE PAY-DATE TO OUTPUT-RECORD
                          WRITE OUTPUT-RECORD
                       ELSE
                          MOVE 'Y' TO WS-END-OF-FILE
                       END-IF
                   END-READ
           END-PERFORM.
       
       CLOSE-FILES.
           CLOSE PAYROLL-FILE
           CLOSE OUTPUT-FILE.
       
       END PROGRAM PAYLIST.