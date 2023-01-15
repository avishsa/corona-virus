INSERT INTO [dbo].[countries]
 (    
     [location] ,
     [ISOCODE]
)
VALUES
(
    @location,
    @isocode
)

;
SELECT SCOPE_IDENTITY() AS id;