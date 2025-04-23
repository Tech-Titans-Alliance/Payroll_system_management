      *IDENTIFICATION DIVISION.
      *PROGRAM-ID. PAYSLIP.
      *AUTHOR. YOUR-NAME.
       
      *ENVIRONMENT DIVISION.
      *INPUT-OUTPUT SECTION.
      *FILE-CONTROL.
      *    SELECT PAYROLL-FILE ASSIGN TO "PAYROLL.DAT"
      *        ORGANIZATION IS INDEXED
      *        ACCESS MODE IS DYNAMIC
      *        RECORD KEY IS PAYROLL-KEY
      *        FILE STATUS IS PAY-FILE-STATUS.
               
      *    SELECT INPUT-FILE ASSIGN TO "PAYSLIPDET.IN"
      *        ORGANIZATION IS LINE SEQUENTIAL.
               
      *    SELECT OUTPUT-FILE ASSIGN TO "PAYSLIP.OUT"
      *        ORGANIZATION IS LINE SEQUENTIAL.
       
      *DATA DIVISION.
      *FILE SECTION.
      *FD PAYROLL-FILE.
      *01 PAYROLL-RECORD.
      *   05 PAYROLL-KEY.
      *      10 EMP-ID            PIC X(10).
      *      10 PAY-DATE          PIC X(10).
      *   05 PAY-DETAILS.
      *      10 BASIC-PAY         PIC 9(7)V99.
      *      10 OVERTIME-PAY      PIC 9(7)V99.
      *      10 BONUS-PAY         PIC 9(7)V99.
      *      10 LEAVE-DAYS        PIC 99.
      *      10 GROSS-PAY         PIC 9(7)V99.
      *      10 TAX-AMOUNT        PIC 9(7)V99.
      *      10 OTHER-DEDUCTIONS  PIC 9(7)V99.
      *      10 NET-PAY           PIC 9(7)V99.
      *      10 PAY-STATUS        PIC X(1).
       
      *FD INPUT-FILE.
      *01 INPUT-RECORD.
      *   05 IN-EMP-ID            PIC X(10).
      *   05 IN-PAY-DATE          PIC X(10).
       
      *FD OUTPUT-FILE.
      *01 OUTPUT-RECORD           PIC X(79).
       
      *WORKING-STORAGE SECTION.
      *01 PAY-FILE-STATUS         PIC XX.
       
      *PROCEDURE DIVISION.
      *MAIN-PROCESS.
      *    PERFORM GET-INPUT
      *    PERFORM OPEN-FILES
      *    PERFORM GET-PAYSLIP
      *    PERFORM CLOSE-FILES
      *    STOP RUN.
       
      *GET-INPUT.
      *    OPEN INPUT INPUT-FILE
      *    READ INPUT-FILE
      *    CLOSE INPUT-FILE.
       
      *OPEN-FILES.
      *    OPEN INPUT PAYROLL-FILE
      *    IF PAY-FILE-STATUS NOT = '00'
      *       DISPLAY "ERROR OPENING PAYROLL FILE: " PAY-FILE-STATUS
      *       STOP RUN.
               
      *    OPEN OUTPUT OUTPUT-FILE.
       
      *GET-PAYSLIP.
      *    MOVE IN-EMP-ID TO EMP-ID
      *    MOVE IN-PAY-DATE TO PAY-DATE
      *    READ PAYROLL-FILE
      *    INVALID KEY
      *            MOVE SPACES TO OUTPUT-RECORD
      *    NOT INVALID KEY
      *        MOVE PAYROLL-RECORD TO OUTPUT-RECORD
      *    END-READ
      *    WRITE OUTPUT-RECORD.
       
      *CLOSE-FILES.
      *    CLOSE PAYROLL-FILE
      *    CLOSE OUTPUT-FILE.
       
      *END PROGRAM PAYSLIP.
       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYSLIP.
       AUTHOR. YOUR-NAME.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT PAYROLL-FILE ASSIGN TO "PAYROLL.DAT"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS PAYROLL-KEY
               FILE STATUS IS PAY-FILE-STATUS.

           SELECT INPUT-FILE ASSIGN TO "PAYSLIPDET.IN"
               ORGANIZATION IS LINE SEQUENTIAL.

           SELECT OUTPUT-FILE ASSIGN TO "PAYSLIP.OUT"
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
       01 INPUT-RECORD.
          05 IN-EMP-ID            PIC X(10).
          05 IN-PAY-DATE          PIC X(10).

       FD OUTPUT-FILE.
       01 OUTPUT-RECORD           PIC X(200).

       WORKING-STORAGE SECTION.
       01 PAY-FILE-STATUS         PIC XX.

      * Formatted fields
       01 WS-BASIC-PAY            PIC Z(7)9.99.
       01 WS-OVERTIME-PAY         PIC Z(7)9.99.
       01 WS-BONUS-PAY            PIC Z(7)9.99.
       01 WS-GROSS-PAY            PIC Z(7)9.99.
       01 WS-TAX-AMOUNT           PIC Z(7)9.99.
       01 WS-OTHER-DEDUCTIONS     PIC Z(7)9.99.
       01 WS-NET-PAY              PIC Z(7)9.99.
       01 WS-LEAVE-DAYS           PIC 99.

       PROCEDURE DIVISION.
       MAIN-PROCESS.
           PERFORM GET-INPUT
           PERFORM OPEN-FILES
           PERFORM GET-PAYSLIP
           PERFORM CLOSE-FILES
           STOP RUN.

       GET-INPUT.
           OPEN INPUT INPUT-FILE
           READ INPUT-FILE
           CLOSE INPUT-FILE.

       OPEN-FILES.
           OPEN INPUT PAYROLL-FILE
           IF PAY-FILE-STATUS NOT = '00'
              DISPLAY "ERROR OPENING PAYROLL FILE: " PAY-FILE-STATUS
              STOP RUN.
           OPEN OUTPUT OUTPUT-FILE.

       GET-PAYSLIP.
           MOVE IN-EMP-ID TO EMP-ID
           MOVE IN-PAY-DATE TO PAY-DATE
           READ PAYROLL-FILE
           INVALID KEY
                   MOVE "NO MATCH FOUND" TO OUTPUT-RECORD
           NOT INVALID KEY
               MOVE BASIC-PAY TO WS-BASIC-PAY
               MOVE OVERTIME-PAY TO WS-OVERTIME-PAY
               MOVE BONUS-PAY TO WS-BONUS-PAY
               MOVE LEAVE-DAYS TO WS-LEAVE-DAYS
               MOVE GROSS-PAY TO WS-GROSS-PAY
               MOVE TAX-AMOUNT TO WS-TAX-AMOUNT
               MOVE OTHER-DEDUCTIONS TO WS-OTHER-DEDUCTIONS
               MOVE NET-PAY TO WS-NET-PAY

               STRING
                  EMP-ID DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  PAY-DATE DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-BASIC-PAY DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-OVERTIME-PAY DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-BONUS-PAY DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-LEAVE-DAYS DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-GROSS-PAY DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-TAX-AMOUNT DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-OTHER-DEDUCTIONS DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  WS-NET-PAY DELIMITED BY SIZE
                  " " DELIMITED BY SIZE
                  PAY-STATUS DELIMITED BY SIZE
                  INTO OUTPUT-RECORD
               END-STRING
           END-READ
           WRITE OUTPUT-RECORD.

       CLOSE-FILES.
           CLOSE PAYROLL-FILE
           CLOSE OUTPUT-FILE.

       END PROGRAM PAYSLIP.