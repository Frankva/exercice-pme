SELECT IF(authorization_group_id, TRUE, FALSE)
FROM employees
NATURAL JOIN employees_belong_authorization_groups
NATURAL JOIN authorization_groups
WHERE authorization_group_id='administrator';
