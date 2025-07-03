const allLocalsQuery = `
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

export {
	allLocalsQuery
}