SELECT [id],
    [ISOCODE],
    [ReportDate],
    [Total_cases],
    [New_cases],
    [Total_deaths],
FROM [dbo].[reports];
WHERE ISOCODE=@isocode AND ReportDate BETWEEN @earliest,@today
ORDER BY ReportDate;


