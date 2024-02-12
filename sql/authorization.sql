SELECT IF(authorization_group_id, TRUE, FALSE)
FROM employees
NATURAL JOIN employees_belong_authorization_groups
NATURAL JOIN authorization_groups
WHERE (name='administrator') AND (employee_id=2);
