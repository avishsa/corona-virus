INSERT INTO [dbo].[countries]
 (    
     [location] ,
     [ISOCODE]
)
VALUES
(
    @location,
    @iso_code
)

;
SELECT SCOPE_IDENTITY() AS id;