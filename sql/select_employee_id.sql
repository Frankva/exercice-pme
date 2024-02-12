SELECT employee_id
FROM employees
NATURAL JOIN emails
NATURAL JOIN passwords
WHERE text=? AND hash=SHA2(?, 512);
