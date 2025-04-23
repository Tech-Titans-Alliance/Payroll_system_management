       IDENTIFICATION DIVISION.
       PROGRAM-ID. EMPLOYEE-MAINTENANCE.
       AUTHOR. YOUR-NAME.
       
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT EMPLOYEE-FILE ASSIGN TO "EMPLOYEE.DAT"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS EMP-ID
               FILE STATUS IS EMP-FILE-STATUS.
       
       DATA DIVISION.
       FILE SECTION.
       FD EMPLOYEE-FILE.
       01 EMPLOYEE-RECORD.
           05 EMP-ID               PIC X(10).
           05 EMP-NAME             PIC X(50).
           05 EMP-DEPT             PIC X(20).
           05 EMP-POSITION         PIC X(30).
           05 EMP-BASIC-SALARY     PIC 9(7)V99.
           05 EMP-JOIN-DATE        PIC X(10).
           05 EMP-STATUS           PIC X(1).
               88 ACTIVE-EMPLOYEE  VALUE 'A'.
               88 INACTIVE-EMPLOYEE VALUE 'I'.
       
       WORKING-STORAGE SECTION.
       01 EMP-FILE-STATUS          PIC XX.
       01 WS-CHOICE                PIC 9.
       01 WS-INPUT-DATA.
           05 WS-EMP-ID            PIC X(10).
           05 WS-EMP-NAME          PIC X(50).
           05 WS-EMP-DEPT          PIC X(20).
           05 WS-EMP-POSITION      PIC X(30).
           05 WS-EMP-SALARY        PIC 9(7)V99.
           05 WS-EMP-JOIN-DATE     PIC X(10).
           05 WS-EMP-STATUS        PIC X(1).
       
       PROCEDURE DIVISION.
       MAIN-PROCESS.
           PERFORM OPEN-FILE
           MOVE 9 TO WS-CHOICE
           PERFORM DISPLAY-MENU UNTIL WS-CHOICE = 0
           PERFORM CLOSE-FILE
           STOP RUN.
       
       OPEN-FILE.
           OPEN I-O EMPLOYEE-FILE
           IF EMP-FILE-STATUS NOT = '00'
               DISPLAY "ERROR OPENING EMPLOYEE FILE: " EMP-FILE-STATUS
               STOP RUN.
       
       DISPLAY-MENU.
           DISPLAY "EMPLOYEE MAINTENANCE MENU"
           DISPLAY "1. ADD NEW EMPLOYEE"
           DISPLAY "2. UPDATE EMPLOYEE"
           DISPLAY "3. DELETE EMPLOYEE"
           DISPLAY "4. VIEW EMPLOYEE"
           DISPLAY "0. EXIT"
           DISPLAY "ENTER YOUR CHOICE: " WITH NO ADVANCING
           ACCEPT WS-CHOICE
           
           EVALUATE WS-CHOICE
               WHEN 1 PERFORM ADD-EMPLOYEE
               WHEN 2 PERFORM UPDATE-EMPLOYEE
               WHEN 3 PERFORM DELETE-EMPLOYEE
               WHEN 4 PERFORM VIEW-EMPLOYEE
               WHEN 0 CONTINUE
               WHEN OTHER DISPLAY "INVALID CHOICE"
           END-EVALUATE.
       
       ADD-EMPLOYEE.
           DISPLAY "ENTER EMPLOYEE DETAILS:"
           DISPLAY "EMPLOYEE ID: " WITH NO ADVANCING
           ACCEPT WS-EMP-ID
           DISPLAY "NAME: " WITH NO ADVANCING
           ACCEPT WS-EMP-NAME
           DISPLAY "DEPARTMENT: " WITH NO ADVANCING
           ACCEPT WS-EMP-DEPT
           DISPLAY "POSITION: " WITH NO ADVANCING
           ACCEPT WS-EMP-POSITION
           DISPLAY "BASIC SALARY: " WITH NO ADVANCING
           ACCEPT WS-EMP-SALARY
           DISPLAY "JOIN DATE (YYYY-MM-DD): " WITH NO ADVANCING
           ACCEPT WS-EMP-JOIN-DATE
           MOVE 'A' TO WS-EMP-STATUS
           
           MOVE WS-INPUT-DATA TO EMPLOYEE-RECORD
           WRITE EMPLOYEE-RECORD
               INVALID KEY DISPLAY "EMPLOYEE ID ALREADY EXISTS"
               NOT INVALID KEY DISPLAY "EMPLOYEE ADDED SUCCESSFULLY"
           END-WRITE.
       
       UPDATE-EMPLOYEE.
           DISPLAY "ENTER EMPLOYEE ID TO UPDATE: " WITH NO ADVANCING
           ACCEPT WS-EMP-ID
           MOVE WS-EMP-ID TO EMP-ID
           READ EMPLOYEE-FILE
               INVALID KEY DISPLAY "EMPLOYEE NOT FOUND"
               NOT INVALID KEY
                   DISPLAY "CURRENT DETAILS:"
                   DISPLAY "NAME: " EMP-NAME
                   DISPLAY "DEPARTMENT: " EMP-DEPT
                   DISPLAY "POSITION: " EMP-POSITION
                   DISPLAY "SALARY: " EMP-BASIC-SALARY
                   DISPLAY "JOIN DATE: " EMP-JOIN-DATE
                   DISPLAY "STATUS: " EMP-STATUS
                   
                   DISPLAY "ENTER NEW DETAILS (LEAVE BLANK TO KEEP CURR"
                   DISPLAY "NAME: " WITH NO ADVANCING
                   ACCEPT WS-EMP-NAME
                   IF WS-EMP-NAME NOT = SPACES
                       MOVE WS-EMP-NAME TO EMP-NAME
                   END-IF
                   
                   DISPLAY "DEPARTMENT: " WITH NO ADVANCING
                   ACCEPT WS-EMP-DEPT
                   IF WS-EMP-DEPT NOT = SPACES
                       MOVE WS-EMP-DEPT TO EMP-DEPT
                   END-IF
                   
                   DISPLAY "POSITION: " WITH NO ADVANCING
                   ACCEPT WS-EMP-POSITION
                   IF WS-EMP-POSITION NOT = SPACES
                       MOVE WS-EMP-POSITION TO EMP-POSITION
                   END-IF
                   
                   DISPLAY "SALARY: " WITH NO ADVANCING
                   ACCEPT WS-EMP-SALARY
                   IF WS-EMP-SALARY NOT = ZEROES
                       MOVE WS-EMP-SALARY TO EMP-BASIC-SALARY
                   END-IF
                   
                   DISPLAY "STATUS (A=Active, I=Inactive): " WITH NO
                   ADVANCING
                   ACCEPT WS-EMP-STATUS
                   IF WS-EMP-STATUS = 'A' OR 'I'
                       MOVE WS-EMP-STATUS TO EMP-STATUS
                   END-IF
                   
                   REWRITE EMPLOYEE-RECORD
                       INVALID KEY DISPLAY "ERROR UPDATING EMPLOYEE"
                       NOT INVALID KEY DISPLAY "EMPLOYEE UPDATED"
                   END-REWRITE
           END-READ.
       
       DELETE-EMPLOYEE.
           DISPLAY "ENTER EMPLOYEE ID TO DELETE: " WITH NO ADVANCING
           ACCEPT WS-EMP-ID
           MOVE WS-EMP-ID TO EMP-ID
           READ EMPLOYEE-FILE
               INVALID KEY DISPLAY "EMPLOYEE NOT FOUND"
               NOT INVALID KEY
                   DISPLAY "EMPLOYEE FOUND: " EMP-NAME
                   DISPLAY "ARE YOU SURE YOU WANT TO DELETE? (Y/N): " 
                       WITH NO ADVANCING
                   ACCEPT WS-EMP-STATUS
                   IF WS-EMP-STATUS = 'Y' OR 'y'
                       DELETE EMPLOYEE-FILE RECORD
                           INVALID KEY DISPLAY "ERROR DELETING EMPLOYEE"
                           NOT INVALID KEY DISPLAY "EMPLOYEE DELETED"
                       END-DELETE
                   ELSE
                       DISPLAY "DELETION CANCELLED"
                   END-IF
           END-READ.
       
       VIEW-EMPLOYEE.
           DISPLAY "ENTER EMPLOYEE ID TO VIEW: " WITH NO ADVANCING
           ACCEPT WS-EMP-ID
           MOVE WS-EMP-ID TO EMP-ID
           READ EMPLOYEE-FILE
               INVALID KEY DISPLAY "EMPLOYEE NOT FOUND"
               NOT INVALID KEY
                   DISPLAY "EMPLOYEE DETAILS:"
                   DISPLAY "ID: " EMP-ID
                   DISPLAY "NAME: " EMP-NAME
                   DISPLAY "DEPARTMENT: " EMP-DEPT
                   DISPLAY "POSITION: " EMP-POSITION
                   DISPLAY "SALARY: " EMP-BASIC-SALARY
                   DISPLAY "JOIN DATE: " EMP-JOIN-DATE
                   DISPLAY "STATUS: " EMP-STATUS
           END-READ.
       
       CLOSE-FILE.
           CLOSE EMPLOYEE-FILE.
       
       END PROGRAM EMPLOYEE-MAINTENANCE.