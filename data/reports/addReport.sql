INSERT INTO [dbo].[reports] (   ISOCODE,ReportDate,Total_cases,New_cases,Total_deaths)
VALUES
(
    @ISOCODE,
@reportDate,
@total_cases,
@new_cases,
@total_deaths
)

;
SELECT SCOPE_IDENTITY() AS id;