  select top 10 countries.location, countries.ISOCODE,reports.total_cases,reports.total_deaths
  from [CORONA].[dbo].[reports] reports
  INNER JOIN 
  (select  max(reportdate) reportdate ,ISOCODE
  FROM [CORONA].[dbo].[reports]  
  Group by ISOCODE ) latestreports
  ON reports.reportdate=latestreports.reportdate AND reports.ISOCODE=latestreports.ISOCODE
  INNER JOIN [CORONA].[dbo].[countries] countries
   ON  reports.ISOCODE=countries.ISOCODE
  ORDER BY total_cases desc
  ;
