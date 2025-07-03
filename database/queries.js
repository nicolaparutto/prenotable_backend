const getAllLocalsQuery = `
	SELECT
  locals.id,
  locals.title,
  locals.contact_number,
  locals.city,
  locals.province,
  prices.price,
  GROUP_CONCAT(DISTINCT typologies.name ORDER BY typologies.name ASC SEPARATOR ', ') AS typologies
	FROM locals
	JOIN locals_typologies ON locals.id = locals_typologies.local_id -- Join tabella ponte locali-tipologie
	JOIN typologies ON locals_typologies.typology_id = typologies.id -- Join tabella tipologie
	LEFT JOIN prices ON locals.price_id = prices.id -- Join del price
	GROUP BY locals.id;
`

const getLocalQuery = `
SELECT 
  locals.id,
  owners.name AS ownerName,
  locals.title,
  JSON_OBJECT(
    'address', locals.address,
    'province', locals.province,
    'city', locals.city
  ) AS locationData,
  locals.description,
  locals.contact_number,
  prices.price,
  -- Tipologie
  (
    SELECT GROUP_CONCAT(DISTINCT typologies.name ORDER BY typologies.name ASC SEPARATOR ', ')
    FROM locals_typologies
    JOIN typologies ON locals_typologies.typology_id = typologies.id
    WHERE locals_typologies.local_id = locals.id
  ) AS typologies,

  -- Utilities
  (
    SELECT JSON_OBJECT(
      'webSite', utilities.web_site,
      'mapsLocation', utilities.maps_location
    )
    FROM utilities
    WHERE utilities.local_id = locals.id
    LIMIT 1
  ) AS utilities,
  -- Immagini
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'imageId', images.id,
        'imagePath', images.image_path,
        'mainImage', images.main_image
      )
    )
    FROM images
    WHERE images.local_id = locals.id
  ) AS images,
  -- Recensioni
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'reviewId', reviews.id,
        'reviewerName', reviews.reviewer_name,
        'reviewRating', reviews.rating,
        'reviewComment', reviews.comment,
        'createdTime', reviews.created_at
      )
    )
    FROM reviews
    WHERE reviews.local_id = locals.id
  ) AS reviews,
  -- Orari
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'day', timetables.day,
        'openTime', timetables.open_time,
        'closeTime', timetables.close_time,
        'morningOpen', timetables.morning_open_time,
        'morningClose', timetables.morning_close_time,
        'nightOpen', timetables.night_open_time,
        'nightClose', timetables.night_close_time,
        'closingDay', timetables.close
      )
    )
    FROM timetables
    WHERE timetables.local_id = locals.id
  ) AS timetables
FROM locals
LEFT JOIN owners ON locals.owner_id = owners.id
LEFT JOIN prices ON locals.price_id = prices.id
WHERE locals.id = ?;
`

export {
	getAllLocalsQuery,
	getLocalQuery
}