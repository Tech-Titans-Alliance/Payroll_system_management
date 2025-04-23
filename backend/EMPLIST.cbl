       IDENTIFICATION DIVISION.
       PROGRAM-ID. EMPLIST.
       AUTHOR. YOUR-NAME.
       
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT EMPLOYEE-FILE ASSIGN TO "EMPLOYEE.DAT"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS EMP-ID
               FILE STATUS IS EMP-FILE-STATUS.
               
           SELECT OUTPUT-FILE ASSIGN TO "EMPLIST.OUT"
               ORGANIZATION IS LINE SEQUENTIAL.
       
       DATA DIVISION.
       FILE SECTION.
       FD EMPLOYEE-FILE.
       01 EMPLOYEE-RECORD.
          05 EMP-ID            PIC X(10).
          05 EMP-NAME          PIC X(50).
          05 EMP-DEPT          PIC X(20).
          05 EMP-POSITION      PIC X(30).
          05 EMP-BASIC-SALARY  PIC 9(7)V99.
          05 EMP-JOIN-DATE     PIC X(10).
          05 EMP-STATUS        PIC X(1).
       
       FD OUTPUT-FILE.
       01 OUTPUT-RECORD        PIC X(129).
       
       WORKING-STORAGE SECTION.
       01 WS-END-OF-FILE       PIC X       VALUE 'N'.
       01 EMP-FILE-STATUS      PIC XX.
       
       PROCEDURE DIVISION.
       MAIN-PROCESS.
           PERFORM OPEN-FILES
           PERFORM READ-EMPLOYEES UNTIL WS-END-OF-FILE = 'Y'
           PERFORM CLOSE-FILES
           STOP RUN.
       
       OPEN-FILES.
           OPEN INPUT EMPLOYEE-FILE
           IF EMP-FILE-STATUS NOT = '00'
              DISPLAY "ERROR OPENING EMPLOYEE FILE: " EMP-FILE-STATUS
              STOP RUN.
               
           OPEN OUTPUT OUTPUT-FILE.
       
       READ-EMPLOYEES.
           READ EMPLOYEE-FILE NEXT RECORD
           AT END
              MOVE 'Y' TO WS-END-OF-FILE
           NOT AT END
               PERFORM WRITE-OUTPUT
           END-READ.
       
       WRITE-OUTPUT.
           MOVE EMPLOYEE-RECORD TO OUTPUT-RECORD
           WRITE OUTPUT-RECORD.
       
       CLOSE-FILES.
           CLOSE EMPLOYEE-FILE
           CLOSE OUTPUT-FILE.
       
       END PROGRAM EMPLIST.