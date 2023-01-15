SELECT [id],
    [ISOCODE],
    [ReportDate],
    [Total_cases],
    [New_cases],
    [Total_deaths],
FROM [dbo].[reports];

ORDER BY ReportDate;