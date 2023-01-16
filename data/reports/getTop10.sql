Select TOP 10 t1.total_cases,t1.total_deaths,t3.location,t2.rd
From [CORONA].[dbo].[reports] t1,  (select max(reportdate) rd,ISOCODE
  FROM [CORONA].[dbo].[reports]
  Group by ISOCODE) t2,
  [CORONA].[dbo].[countries] t3
  where t1.reportdate=t2.rd AND t1.ISOCODE =t2.ISOCODE
  AND t1.ISOCODE =t3.ISOCODE
  ORDER BY  t1.total_cases desc  ;